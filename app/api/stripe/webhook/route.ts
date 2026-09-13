import { after } from "next/server";
import Stripe from "stripe";
import { stripeSecretKey, stripeWebhookSecret } from "@/lib/env";
import { receiveCheckoutJob } from "@/lib/jobs/create";
import { processJob } from "@/lib/pipeline";
import { extractCustomerEmail, extractSiteUrl } from "@/lib/stripe/extract";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const HANDLED = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

function stripeClient() {
  return new Stripe(stripeSecretKey() || "sk_placeholder_webhook_only");
}

export async function POST(request: Request) {
  const secret = stripeWebhookSecret();
  if (!secret) {
    return Response.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured." },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "Missing stripe-signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = stripeClient().webhooks.constructEvent(rawBody, signature, secret);
  } catch {
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (!HANDLED.has(event.type)) {
    return Response.json({ received: true, ignored: event.type });
  }

  let session = event.data.object as Stripe.Checkout.Session;
  if (session.mode && session.mode !== "payment") {
    return Response.json({ received: true, ignored: "non-payment session" });
  }

  const secretKey = stripeSecretKey();
  if (secretKey && session.id) {
    try {
      session = await stripeClient().checkout.sessions.retrieve(session.id);
    } catch {
      // Use the payload session if retrieve fails.
    }
  }

  const email = extractCustomerEmail(session);
  const siteUrl = extractSiteUrl(session) ?? "";

  if (!email) {
    return Response.json(
      { error: "Checkout session is missing a customer email." },
      { status: 422 },
    );
  }

  const { job, created } = await receiveCheckoutJob({
    stripeSessionId: session.id,
    email,
    siteUrl,
  });

  const shouldProcess =
    created ||
    (job.status !== "emailed" && (job.status === "received" || job.status === "failed"));

  if (shouldProcess) {
    after(() => processJob(job.id));
  }

  return Response.json({
    received: true,
    jobId: job.id,
    created,
    status: job.status,
  });
}

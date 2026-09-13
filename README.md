# CiteScore

Pre-sell MVP for a GEO / AI-visibility audit. Paste a URL, pay **$39 once**, get a scored report (ChatGPT, Perplexity, Google AI Overviews) plus the concrete fixes that would get the site cited.

This repository is the marketing site, sample report, and checkout stub. The crawler, scorer, and PDF email are the **next** build — not this one.

## Local run

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

Requires Node 20+.

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Landing: value prop, 3 steps, deliverables, sample teaser, $39 pricing, FAQ |
| `/sample` | Printable HTML sample report (fictional SaaS “Northbound”) |
| `/checkout` | Payment-link CTA, or waitlist form if the link is unset |
| `/privacy` | URL + LLM disclosure |
| `/api/waitlist` | `POST { email, url }` — file-backed waitlist |

## Environment

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_CHECKOUT_URL` | No | Stripe Payment Link or Lemon Squeezy checkout/share URL. Inlined at **build** time. |
| `WAITLIST_PATH` | No | Absolute path to the waitlist JSON. Defaults to `data/waitlist.json` locally and `/tmp/citescore-waitlist.json` on Vercel. |

Copy `.env.example` to `.env.local` for development.

## Plug in a payment link

1. Create a **$39 one-time** Payment Link in [Stripe](https://dashboard.stripe.com/payment-links) or a checkout link in [Lemon Squeezy](https://lemonsqueezy.com/).
2. Set `NEXT_PUBLIC_CHECKOUT_URL` to that URL in the host (Vercel → Project → Settings → Environment Variables).
3. Redeploy. `/checkout` switches from the waitlist form to **Continue to payment**.
4. CiteScore appends `site_url` to the link. Map that query param to:
   - **Stripe:** Payment Link custom field / metadata, or a short thank-you page that reads the query string
   - **Lemon Squeezy:** checkout custom data (`checkout[custom][site_url]` can be added later if you prefer their format)

Until the variable is set, the site still captures **email + URL** via `POST /api/waitlist`.

Waitlist storage is intentionally tiny: [`lib/waitlist.ts`](lib/waitlist.ts). Swap that module for Airtable, a spreadsheet webhook, Resend + a sheet, or a database without changing the API route’s JSON shape.

On Vercel the default file store is **ephemeral** (`/tmp`). Use it to confirm the form works, then replace the store before you rely on it.

## Deploy on Vercel

1. Import this GitHub repo in Vercel (Next.js preset; no extra config).
2. Add `NEXT_PUBLIC_CHECKOUT_URL` when you have a payment link.
3. Deploy. Framework: Next.js App Router. No auth, no database, no provider keys required for the pre-sell.

## Next build phase

After this pre-sell converts:

1. **Checkout completion webhook** (Stripe `checkout.session.completed` or Lemon Squeezy `order_created`) with `site_url` + buyer email.
2. **Crawl** the public URL (HTML, titles, schema, robots, `llms.txt`, a few important internal links).
3. **Score** 0–100 with the same dimensions as `/sample` (answer fitness, entity clarity, evidence, markup, freshness, crawler access, mention share).
4. **Draft ~10 fixes** (LLM-assisted; URL content may be sent to a model — already disclosed on the site).
5. **Render the report** (reuse the `/sample` HTML) and **email a PDF**.

Out of scope here: the crawler, live scoring, accounts, dashboards, and raw payment-provider secret keys.

## Design notes

Editorial / citation-desk look (warm paper, ink, forest, copper). No purple AI gradients. The sample report is labeled **sample** and is not a fake testimonial.

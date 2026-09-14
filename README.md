# CiteScore

A $39 one-time GEO / AI-visibility audit. Paste a URL, pay on a Stripe Payment Link, and the fulfillment engine crawls the public site, scores on-page GEO signals, renders a PDF, and emails it.

This repository is the marketing site **and** the happy-path fulfillment engine (webhook → job → crawl → score → PDF → email).

## Local run

```bash
npm install
cp .env.example .env.local
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
| `/` | Landing: value prop, 3 steps, deliverables, sample teaser, $39 pricing, guides, FAQ |
| `/blog` | GEO / AI-visibility guides index |
| `/blog/what-is-geo` | What is GEO (generative engine optimization)? |
| `/blog/chatgpt-citation-checklist` | ChatGPT citation checklist for SaaS homepages |
| `/blog/citescore-vs-enterprise-geo-tools` | CiteScore vs Otterly- / Profound-class tools |
| `/geo-audit` | High-intent GEO audit landing + $39 checkout form |
| `/alternatives` | Comparison hub |
| `/alternatives/otterly` | CiteScore vs Otterly |
| `/sample` | Printable HTML sample report (fictional SaaS “Northbound”) |
| `/sitemap.xml` | Generated from `app/sitemap.ts` |
| `/robots.txt` | Generated from `app/robots.ts` |
| `/api/reports/sample/pdf` | Same sample, as a PDF |
| `/checkout` | Payment-link CTA, or waitlist form if the link is unset |
| `/thanks` | Post-payment “we’re crawling it” page (set this as the Payment Link success URL) |
| `/privacy` | URL + LLM disclosure |
| `/r/[token]` | Buyer web copy of a paid report |
| `/admin` | Job queue (gated by `ADMIN_TOKEN`) |
| `POST /api/waitlist` | `{ email, url }` — file-backed waitlist |
| `POST /api/stripe/webhook` | Stripe `checkout.session.completed` |
| `GET/POST /api/jobs` | Admin list / create a manual job |
| `GET /api/jobs/:id` | Admin job detail (includes crawl + events) |
| `POST /api/jobs/:id/process` | Admin/cron retry |
| `GET/POST /api/cron/process` | Pick up stuck `received` / in-flight jobs |
| `GET /api/reports/:token/pdf` | Secure PDF download |

## How payment becomes a report

1. The homepage form sends the buyer to `/checkout?url=…`.
2. `/checkout` builds the Stripe Payment Link with:
   - `client_reference_id` = site URL (first 200 characters) — **this is how the webhook recovers the URL**
   - `site_url` = the same URL (useful on a custom thank-you page)
3. Stripe collects the customer email (enable it on the Payment Link; it is on by default).
4. Stripe `POST`s `checkout.session.completed` to `/api/stripe/webhook`.
5. The webhook verifies the signature, upserts a job (idempotent on `checkout.session.id`), and runs the pipeline via Next.js `after()`:
   `received → crawling → scoring → rendering → emailed | failed`
6. On success the buyer gets a Resend email with the PDF attached plus `/r/[token]` and `/api/reports/[token]/pdf` links.
7. On failure they get a “we’re on it” email (once). Retry from `/admin` or `POST /api/jobs/:id/process`.

### How `site_url` is read from Stripe

In order, the webhook uses:

1. `session.metadata.site_url` or `session.metadata.url`
2. `session.client_reference_id` — **this is the supported Payment Link query param CiteScore sets**
3. Checkout custom fields whose key/label looks like `site_url` / “Site URL”
4. `site_url` on `success_url` / `cancel_url` if you put it there

If `STRIPE_SECRET_KEY` is set, the webhook re-fetches the session before extracting fields.

**Payment Link dashboard setup**

1. Create a **$39 one-time** [Payment Link](https://dashboard.stripe.com/payment-links).
2. Collect customer email.
3. Optional: add a custom text field keyed `site_url` labeled “Site URL” as a backup if someone opens the raw link without our query string.
4. After completion → redirect to `https://YOUR_DOMAIN/thanks`.
5. Set `NEXT_PUBLIC_CHECKOUT_URL` to the Payment Link and redeploy (it is inlined at **build** time).

Do **not** rely on `?site_url=` surviving onto the session by itself. Stripe ignores unknown query params. `client_reference_id` is the reliable hook.

## Stripe webhook

1. Stripe Dashboard → Developers → Webhooks → Add endpoint.
2. Endpoint URL: `https://YOUR_DOMAIN/api/stripe/webhook`
3. Events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded` (delayed methods)
4. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

### Local test with Stripe CLI

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# put the printed whsec_… into .env.local as STRIPE_WEBHOOK_SECRET

stripe trigger checkout.session.completed
```

`stripe trigger` does not include your site URL. For a real local run:

1. Set `ADMIN_TOKEN` and open `/admin`.
2. Queue `{ email, site_url }` — that exercises crawl → score → PDF → email without Stripe.
3. Or complete a test-mode Payment Link that was opened from `/checkout?url=https://example.com`.

## Environment

Copy `.env.example` to `.env.local`. **Never commit secrets.**

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_CHECKOUT_URL` | For paid checkout | Stripe Payment Link. Inlined at build time. |
| `APP_URL` | Recommended in prod | Canonical origin for email links. Falls back to `NEXT_PUBLIC_APP_URL`, then `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`. |
| `STRIPE_WEBHOOK_SECRET` | For fulfillment | Webhook signing secret. |
| `STRIPE_SECRET_KEY` | Optional | Re-fetch Checkout Session if the event payload is thin. |
| `RESEND_API_KEY` | For email | [Resend](https://resend.com) API key. |
| `EMAIL_FROM` | For email | Must be a verified Resend domain, e.g. `CiteScore <reports@yourdomain.com>`. |
| `OPENAI_API_KEY` | One LLM key | Preferred when set. Used to draft summary + 10 fixes. |
| `OPENAI_MODEL` | No | Default `gpt-4o-mini`. |
| `ANTHROPIC_API_KEY` | One LLM key | Used when OpenAI is unset. |
| `ANTHROPIC_MODEL` | No | Default `claude-3-5-haiku-20241022`. |
| `SUPABASE_URL` | Production store | Project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | Production store | Server-only. Bypasses RLS. |
| `ADMIN_TOKEN` | For `/admin` | Bearer token for job APIs. |
| `CRON_SECRET` | For Vercel Cron | Vercel sends `Authorization: Bearer $CRON_SECRET`. |
| `JOBS_PATH` | No | Absolute path for the JSON job store. |
| `WAITLIST_PATH` | No | Absolute path for the waitlist JSON. |

If no LLM key is set, the pipeline still produces a heuristic report from crawl signals (and says so). If Resend is missing, the report is stored but the job is marked `failed` so you can retry after adding keys.

## Job store tradeoffs

| Backend | When | Durable? | Notes |
| --- | --- | --- | --- |
| **Supabase** | `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Yes | Use this on Vercel. Run [`supabase/schema.sql`](supabase/schema.sql) once. REST only — no extra SDK. |
| **JSON file** | Otherwise | Local yes; Vercel **no** | `data/jobs.json` locally. `/tmp/citescore-jobs.json` on Vercel (ephemeral, not shared across instances). |

`/tmp` is fine for a smoke test. It is not fine for real payments. Prefer Supabase (or any Postgres that speaks PostgREST with this schema).

Waitlist storage is unchanged: [`lib/waitlist.ts`](lib/waitlist.ts), file-backed.

## Scoring honesty

Paid reports **do not** claim a live ChatGPT / Perplexity / AI Overviews query. The engine snapshot is inferred from:

- Title, H1, meta, definitional lead copy
- FAQ / question headings
- JSON-LD (Organization, SoftwareApplication, FAQPage, …)
- Evidence (numbers, dates, research language)
- `robots.txt` rules for GPTBot / PerplexityBot / Google-Extended
- `/llms.txt` and a few same-host key pages (`/about`, `/pricing`, `/faq`, `/compare`, …)

An LLM, when configured, rewrites the executive summary and the ten fixes from those extracts. Public URL content may be sent to the model — already disclosed on `/privacy`.

The crawler skips private/loopback IPs, caps HTML size (~1.5 MB), and times out at 10s per fetch. If `robots.txt` disallows generic crawlers we still fetch the URL the buyer paid to audit (owner-requested) and record the block as a signal.

## Deploy on Vercel

1. Import this GitHub repo (Next.js preset).
2. Set the env vars above on the project. Remember to **redeploy** after changing `NEXT_PUBLIC_*`.
3. Add the Stripe webhook to `https://YOUR_DOMAIN/api/stripe/webhook`.
4. Verify a Resend domain and set `EMAIL_FROM`.
5. Run `supabase/schema.sql` and set the Supabase keys.
6. Set Payment Link success URL to `https://YOUR_DOMAIN/thanks`.

### Timeouts

The webhook and process routes set `maxDuration = 60`. Crawl + LLM + PDF + email usually fits in a Vercel Pro function. On Hobby (10s) the `after()` work may be cut short — `/api/cron/process` (daily on Hobby) and `/admin` retry are the backup.

`vercel.json` registers a daily cron at 13:00 UTC. On Pro you can tighten the schedule. Send `Authorization: Bearer $CRON_SECRET`.

## Admin / ops

- Open `/admin`, paste `ADMIN_TOKEN`.
- Or `GET /api/jobs` with `Authorization: Bearer $ADMIN_TOKEN`.
- Retry: `POST /api/jobs/:id/process`.
- Manual audit (no Stripe): `POST /api/jobs` with `{ "email", "site_url" }`.

## Design notes

Editorial / citation-desk look (warm paper, ink, forest, copper). No purple AI gradients. The sample report is labeled **sample** and is not a fake testimonial.

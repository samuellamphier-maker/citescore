import Link from "next/link";
import { site } from "@/lib/site";

export function VsEnterpriseArticle() {
  return (
    <>
      <p>
        CiteScore is a {site.priceLabel} one-off. Profound- and Otterly-class
        tools are subscriptions that watch live prompts across answer
        engines, often with seats, APIs, and a CSM. Those are not the same
        job. If a vendor blurs them, they are selling you a dashboard you
        will forget to open.
      </p>
      <p>
        Public pricing moves. The figures below are what those products
        published in 2026, noted so you can re-check the source before you
        budget. We are not a reseller and we do not have affiliate links.
      </p>

      <h2>Side by side</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th> </th>
              <th>CiteScore</th>
              <th>Otterly-class</th>
              <th>Profound-class</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">What you buy</th>
              <td>One scored PDF on one URL</td>
              <td>Daily prompt / mention monitoring</td>
              <td>Citation share, teams, enterprise controls</td>
            </tr>
            <tr>
              <th scope="row">Queries ChatGPT live?</th>
              <td>No. On-page signals + LLM review of fetched HTML</td>
              <td>Yes, for the prompts you track</td>
              <td>Yes, across the engines on your plan</td>
            </tr>
            <tr>
              <th scope="row">Public price (2026)</th>
              <td>{site.priceLabel} once</td>
              <td>
                Lite about $29/mo; Standard $189/mo; Premium $489/mo
              </td>
              <td>
                Self-serve from about $99/mo; Growth about $399/mo;
                Enterprise custom
              </td>
            </tr>
            <tr>
              <th scope="row">Best default user</th>
              <td>Indie founder or a one-client agency kickoff</td>
              <td>Marketer who will actually read a weekly mention report</td>
              <td>In-house GEO / AEO program with procurement</td>
            </tr>
            <tr>
              <th scope="row">What you should not expect</th>
              <td>A time series, competitor share, or Slack alerts</td>
              <td>A cheap substitute for rewriting the homepage</td>
              <td>A $39 education on whether your H1 is a slogan</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>When the $39 audit is enough</h2>
      <p>
        You have a public SaaS homepage, you suspect it reads like a tagline,
        and you want a short list you can finish this week. You do not have
        fifteen branded prompts to babysit. You do not want another login.
        That is CiteScore: crawl, score, PDF, email.{" "}
        <Link href="/geo-audit">The GEO audit page</Link> spells out the
        deliverable.
      </p>
      <p>
        Weekly rescans at {site.subscriptionPriceLabel} are on our roadmap.
        They are not for sale today. We mention them so the pricing page
        stays honest — not so we bait-and-switch you into a card on file.
      </p>

      <h2>When Otterly-class monitoring wins</h2>
      <p>
        Buy a monitor when you already have pages worth citing and you need
        to know whether ChatGPT, AI Overviews, Perplexity, or Copilot{" "}
        <em>actually</em> mention you for a prompt set. Otterly’s public
        plans are built around tracked prompts, brand reports, and (on higher
        tiers) thousands of GEO URL audits a month. That is a measurement
        product.{" "}
        <Link href="/alternatives/otterly">
          CiteScore vs Otterly
        </Link>{" "}
        is the dedicated comparison.
      </p>
      <p>
        Lite at $29/month can be rational for a single brand and a tiny
        prompt list. It is still a subscription, and 15 prompts is a small
        sample. If you only needed to fix the homepage definition, you
        overbought.
      </p>

      <h2>When Profound-class tools win</h2>
      <p>
        Profound is the enterprise-shaped answer: citation categories, share
        of voice, multiple engines, and the SSO / SOC 2 / API checklist a
        security review will ask for. Public self-serve in 2026 started
        around $99/month (narrower engine coverage) and $399/month (a
        broader three-engine Growth plan), with Enterprise quoted. Third-party
        writeups put serious enterprise contracts much higher. If that is
        your budget, you are not our customer — and that is fine.
      </p>
      <p>
        What those platforms will not do for you, on day one, is sit you down
        and say “your H1 is a metaphor; write the product sentence.” They
        assume you have a content ops team. CiteScore assumes you do not.
      </p>

      <h2>You can use both, in order</h2>
      <p>
        A sane sequence for a small team: fix the page (checklist or a{" "}
        <Link href="/#audit">CiteScore report</Link>), ship the copy,{" "}
        <em>then</em> decide whether live tracking is worth $29–$399 a
        month. Measuring a slogan you have not rewritten yet is how GEO
        budgets evaporate.
      </p>
      <p>
        If you want the category primer first, read{" "}
        <Link href="/blog/what-is-geo">what GEO is</Link>. If you want the
        on-page work without buying anything, use the{" "}
        <Link href="/blog/chatgpt-citation-checklist">
          ChatGPT citation checklist
        </Link>
        .
      </p>
    </>
  );
}

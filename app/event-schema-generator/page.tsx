import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { EventSchemaGenerator } from "@/components/EventSchemaGenerator";
import { JsonLd } from "@/components/JsonLd";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/event-schema-generator");

const faqs = [
  {
    q: "Does Event schema guarantee an event rich result or an AI citation?",
    a: "No. Google’s event documentation says marking an event with name, startDate, and a physical location can make it eligible for an event experience in Search. Google does not guarantee that experience. The same page says a virtual experience with no real-world component is not supported, and that the event has to be bookable by the general public. The script does not make ChatGPT, Perplexity, Claude, DeepSeek, or Google AI Overviews cite the page. A date that exists only in the script describes an event the page does not show.",
  },
  {
    q: "Which fields does Google require, and which does this form require?",
    a: "Google’s event documentation, read on 20 October 2026, lists location, name, and startDate as required. location is a Place with a name and a PostalAddress. description, endDate, eventStatus, image, offers, organizer, and performer are recommended. That page does not list eventAttendanceMode or VirtualLocation. This generator also requires an attendance mode. Offline and mixed need a venue name, a street or a city, and a country. Online and mixed need a virtual URL. The script is empty until those fields are valid. An end date, a status, an image, a description, an organizer, and an offer are written only when you fill them in.",
  },
  {
    q: "What is the difference between offline, online, and mixed?",
    a: "schema.org defines three attendance modes. OfflineEventAttendanceMode is a place. OnlineEventAttendanceMode is a VirtualLocation with a URL. MixedEventAttendanceMode is both, written as a list. Google’s current event page says events must take place in a physical location, so an online-only script is schema.org and is not, on that page, eligible for Google’s event experience. Use mixed when the page shows a venue and an online attendance URL. A place is left out of an online script, and a virtual URL is left out of an offline script.",
  },
  {
    q: "Where should the script go, and what do organizer and offers mean?",
    a: "Put it on the event page, in the HTML the server sends, where a person can already see the name, the start, and the place or the attendance URL. Organizer is optional. It is an Organization, and it is included only when you enter a name. A team byline such as CiteScore Team stays an Organization. This generator does not invent a person, a performer, or a previous start date. Offers are included only for the price, currency, URL, and availability you enter. 0 is a free event. Google’s listed availability values are InStock, SoldOut, and PreOrder.",
  },
];

const related = [
  { href: "/llms-txt-generator", label: "llms.txt generator" },
  { href: "/robots-txt-ai-crawler-generator", label: "robots.txt AI crawler generator" },
  { href: "/faq-schema-generator", label: "FAQ schema generator" },
  { href: "/organization-schema-generator", label: "Organization schema generator" },
  { href: "/product-schema-generator", label: "Product schema generator" },
  { href: "/article-schema-generator", label: "Article schema generator" },
  { href: "/local-business-schema-generator", label: "Local business schema generator" },
  { href: "/breadcrumb-schema-generator", label: "Breadcrumb schema generator" },
  { href: "/howto-schema-generator", label: "HowTo schema generator" },
  { href: "/software-application-schema-generator", label: "Software application schema generator" },
  { href: "/person-schema-generator", label: "Person schema generator" },
  { href: "/website-schema-generator", label: "WebSite schema generator" },
  { href: "/video-schema-generator", label: "Video schema generator" },
  { href: "/event-schema-generator", label: "Event schema generator" },
  { href: "/review-schema-generator", label: "Review schema generator" },
  { href: "/service-schema-generator", label: "Service schema generator" },
  { href: "/course-schema-generator", label: "Course schema generator" },
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function EventSchemaGeneratorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }}
      />
      <ArticleShell
        kicker={topic.kicker}
        title={topic.title}
        dek={topic.description}
        publishedAt={topic.publishedAt}
        minutes={topic.minutes}
        author="CiteScore Team"
        ctaId="event-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <EventSchemaGenerator />
        <h2>Why the event is labeled</h2>
        <p>
          Google’s{" "}
          <a href="https://developers.google.com/search/docs/appearance/structured-data/event">event documentation</a>,
          read on 20 October 2026, says an event page can be eligible for an event experience when the markup includes
          the name, the start, and a physical location. The same page says a virtual experience with no real-world
          component is not supported, and that events have to be bookable by the general public. Google does not
          guarantee a placement. Business hours, a coupon, and a trip package are not events on that page.
        </p>
        <p>
          An answer engine that quotes an event page still has to decide which string is the name, when it starts,
          whether it is in a room or on a URL, and what a ticket costs. Event is that decision written down. schema.org
          defines the type with a <code>name</code>, a <code>startDate</code>, an <code>endDate</code>, an{" "}
          <code>eventStatus</code>, an <code>eventAttendanceMode</code>, a <code>location</code>, an <code>image</code>,
          a <code>description</code>, an <code>organizer</code>, and <code>offers</code>. A parser, including the ones
          behind ChatGPT, Perplexity, Claude, DeepSeek, and Google AI Overviews, can read those labels without guessing
          which line is the date. The script does not create a citation, and it does not rank the page.
        </p>
        <p>
          Google lists <code>location</code>, <code>name</code>, and <code>startDate</code> as required. The location
          it documents is a <code>Place</code> with a name and a <code>PostalAddress</code>. <code>description</code>,{" "}
          <code>endDate</code>, <code>eventStatus</code>, <code>image</code>, <code>offers</code>,{" "}
          <code>organizer</code>, and <code>performer</code> are recommended. If <code>eventStatus</code> is omitted,
          Google understands the event to be <code>EventScheduled</code>. The statuses that page lists are scheduled,
          cancelled, postponed, and rescheduled. schema.org also defines <code>EventMovedOnline</code>. Google’s page
          does not list it, and it does not list <code>eventAttendanceMode</code> or <code>VirtualLocation</code>. This
          generator still writes those schema.org properties when you choose them, so an online or mixed event the page
          actually describes is labeled. An online-only script does not meet the Place requirement on Google’s page.
        </p>
        <p>
          <code>startDate</code> and <code>endDate</code> are ISO 8601. Google says to add a timezone offset when the
          event starts at a clock time, and to use a date alone for an all-day event. The same date with no clock time
          can be both the start and the end. An end that falls before the start is left out. A missing timezone is
          kept. Google says that when no timezone is provided, it uses the timezone of the event’s location.
        </p>
        <p>
          The copy block is one <code>script</code> tag. Paste it into the HTML the server sends for the event page.
          Answer engines often skip text that only appears after JavaScript runs. A place is a <code>Place</code>. A
          virtual URL is a <code>VirtualLocation</code>. Mixed attendance writes both in a list. An organizer is an
          Organization, included only when it has a name. A URL without a name is omitted, so the script does not invent
          an organization. An offer is written from the price, currency, URL, and availability you enter, and from
          nothing else. Price <code>0</code> is a free event. Google’s example writes <code>price</code> as a number.
          This generator writes the digits you typed, so <code>39.00</code> is not shortened. Availability is one of{" "}
          <code>InStock</code>, <code>SoldOut</code>, or <code>PreOrder</code>. This generator does not emit{" "}
          <code>performer</code>, <code>previousStartDate</code>, or <code>validFrom</code>. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. The{" "}
          <Link href="/geo-audit">$39 audit</Link> looks for markup that matches the copy. A venue that is a business
          uses the <Link href="/local-business-schema-generator">Local business schema generator</Link>. A ticket that
          is a product uses the <Link href="/product-schema-generator">Product schema generator</Link>. A watch page
          uses the <Link href="/video-schema-generator">Video schema generator</Link>. The longer note on which facts
          to repeat is the <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for the event page, in the head or the body.</li>
          <li>Confirm the same name, start, place or attendance URL, and price are visible on that page.</li>
          <li>Confirm a physical event names the venue, and that a virtual URL opens the attendance page.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A venue, a price, or a short-term discount inside the event name. Those have their own fields.</li>
          <li>Business hours, a coupon, or a package that is not an event someone attends.</li>
          <li>An online-only location when you want Google’s event experience. That page requires a physical place.</li>
          <li>A price, a currency, or an availability the page does not show. Use 0 only when the event is free.</li>
          <li>An organizer the page does not name. Leave the field blank.</li>
          <li>The same Event on every URL. One page per event is enough.</li>
        </ul>
        <h2>Questions about Event schema</h2>
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="font-serif text-xl text-ink">{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
        <ToolNextLinks />
      </ArticleShell>
    </>
  );
}

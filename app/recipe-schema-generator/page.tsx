import Link from "next/link";
import { ArticleShell } from "@/components/ArticleShell";
import { JsonLd } from "@/components/JsonLd";
import { RecipeSchemaGenerator } from "@/components/RecipeSchemaGenerator";
import { ToolNextLinks } from "@/components/ToolNextLinks";
import { getTopic } from "@/lib/content/topics";
import { pageMeta } from "@/lib/content/meta";

const topic = getTopic("/recipe-schema-generator");

const recipeType = "https://schema.org/Recipe";
const recipeDocs = "https://developers.google.com/search/docs/appearance/structured-data/recipe";
const policies = "https://developers.google.com/search/docs/appearance/structured-data/sd-policies";

const faqs = [
  {
    q: "Does Recipe schema guarantee a Google rich result or an AI citation?",
    a: "No. Google’s recipe documentation, read on 21 October 2026, says recipe structured data can make a page eligible for recipe results in Google Search and Google Images. A host carousel also needs ItemList markup on a summary page. Google does not guarantee that any structured-data feature will show. This generator writes one Recipe, not that list. The script does not make ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Meta AI, DeepSeek, Mistral, Brave Search, You.com, DuckDuckGo, or Google AI Overviews cite the page. A time, a calorie count, or a rating that exists only in the script describes a dish the page does not show.",
  },
  {
    q: "Which fields does this form require?",
    a: "schema.org does not list a required property for Recipe. Google’s recipe table lists image and name as required for the rich result. Recommended properties on that page include description, author, prepTime, cookTime, totalTime, recipeYield, recipeIngredient, recipeInstructions, nutrition.calories, and aggregateRating. This generator writes a script once the dish name is present. The image, the description, the author, the times, the yield, the ingredients, the steps, the calories, and the rating are included only when they are valid. prepTime and cookTime are written only as a pair, because Google’s page says to use cookTime together with prepTime. nutrition.calories is written only when the yield is also present, because that page says a calorie count requires a yield. aggregateRating is written only when both a rating value and a rating count are valid.",
  },
  {
    q: "When should this be Recipe, and when should it be HowTo?",
    a: "Recipe is for preparing a particular dish. Google’s content guidelines say a facial scrub or party ideas are not valid names for a dish. A procedure that is not a dish uses the HowTo schema generator. Google stopped showing How-to rich results in September 2023. A recipe page still uses Recipe. A gallery of recipes needs a separate ItemList on the summary page. This form does not write that list.",
  },
  {
    q: "Where should the script go?",
    a: "On the page for that one dish, in the HTML the server sends, where a person can already see the name, the image, the ingredients, the steps, and any time, yield, calories, or rating. Google’s structured data policies say not to mark up content that is not visible to readers of the page. The script is built in the browser. Nothing is sent to CiteScore.",
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
  { href: "/job-posting-schema-generator", label: "Job posting schema generator" },
  { href: "/recipe-schema-generator", label: "Recipe schema generator" },
  { href: "/qa-page-schema-generator", label: "QAPage schema generator" },
  { href: "/speakable-schema-generator", label: "Speakable schema generator" },
  { href: "/image-object-schema-generator", label: "ImageObject schema generator" },
  { href: "/book-schema-generator", label: "Book schema generator" },
  { href: "/podcast-schema-generator", label: "Podcast schema generator" },
  { href: "/movie-schema-generator", label: "Movie schema generator" },
  { href: "/dataset-schema-generator", label: "Dataset schema generator" },
  { href: "/vehicle-schema-generator", label: "Vehicle schema generator" },
  { href: "/hotel-schema-generator", label: "Hotel schema generator" },
  { href: "/restaurant-schema-generator", label: "Restaurant schema generator" },
  { href: "/medical-clinic-schema-generator", label: "Medical clinic schema generator" },
  { href: "/attorney-schema-generator", label: "Attorney schema generator" },
  { href: "/schema-markup-for-ai-search", label: "Schema markup for AI search" },
  { href: "/how-to-get-cited-by-perplexity-comet", label: "How to get cited by Perplexity Comet" },
  { href: "/how-to-get-cited-by-duckduckgo-ai", label: "How to get cited by DuckDuckGo" },
  { href: "/free-check", label: "Free AI visibility check" },
  { href: "/geo-audit", label: "$39 GEO audit" },
];

export const metadata = pageMeta({
  title: topic.title,
  description: topic.description,
  path: topic.path,
});

export default function RecipeSchemaGeneratorPage() {
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
        ctaId="recipe-schema-generator"
        related={related.filter((item) => item.href !== topic.path)}
      >
        <RecipeSchemaGenerator />
        <h2>Why the recipe is labeled</h2>
        <p>
          A recipe page says what the dish is, who wrote it, how long it takes, what goes in it, and how to cook it. An
          answer engine that quotes that page still has to decide which string is the dish, which line is an
          ingredient, and which number is the calories. <a href={recipeType}>schema.org Recipe</a> is that decision
          written down. It defines <code>name</code>, <code>image</code>, <code>description</code>, <code>author</code>
          , <code>prepTime</code>, <code>cookTime</code>, <code>totalTime</code>, <code>recipeYield</code>,{" "}
          <code>recipeIngredient</code>, <code>recipeInstructions</code>, <code>nutrition</code>, and{" "}
          <code>aggregateRating</code>. A parser, including the ones behind ChatGPT, Perplexity, Claude, Gemini, and
          Google AI Overviews, can read those labels without guessing which line is the yield. The script does not
          create a citation, and it does not rank the page. The same point, for Comet’s browser assistant, is on{" "}
          <Link href="/how-to-get-cited-by-perplexity-comet">how to get cited by Perplexity Comet</Link>. DuckDuckGo’s
          Search Assist answers are on{" "}
          <Link href="/how-to-get-cited-by-duckduckgo-ai">how to get cited by DuckDuckGo</Link>.
        </p>
        <p>
          Google’s <a href={recipeDocs}>recipe documentation</a>, read on 21 October 2026, says the markup helps Google
          understand the recipe and present it in Google Search and Google Images. Eligibility is not a placement. The
          required properties on that page are <code>image</code> and <code>name</code>. The image has to be a
          crawlable, indexable picture of the completed dish, in a format Google Images supports. For best results,
          that page recommends several high-resolution images, at least 50,000 pixels when width is multiplied by
          height, at 16:9, 4:3, and 1:1. This form cannot measure the file. It writes the URLs you enter. One URL is a
          string. More than one is an array. The same page says the <code>image</code> property does not choose the
          image used in an ordinary text result. A restaurant menu is a different page. The location and the menu URL are
          on <Link href="/ai-search-visibility-for-restaurants">AI search visibility for restaurants</Link>. Use this
          script on a page that is a recipe, with ingredients and steps. Do not mark the whole menu up as one Recipe.
        </p>
        <p>
          The recommended properties are the ones a rich result can show when they are true. <code>author</code> is a
          Person or an Organization. It is included only when you enter a name. A URL without a name is omitted, so the
          script does not invent a byline. <code>prepTime</code>, <code>cookTime</code>, and <code>totalTime</code> are
          ISO 8601 durations. Forty-five minutes is <code>PT45M</code>. One day and two hours is <code>P1DT2H</code>.
          Google’s page says to use <code>cookTime</code> together with <code>prepTime</code>, and to use{" "}
          <code>totalTime</code> or that pair. The example on that page includes all three. This form writes prep and
          cook only as a pair, and writes <code>totalTime</code> whenever it is valid on its own. It does not add the
          two clocks together. Resting time that the page states belongs in the total you type.
        </p>
        <p>
          <code>recipeYield</code> is the amount the recipe makes. Google’s page says a number of servings can be the
          number alone, and that another unit, such as a count of cookies, can be added. The text you type is kept, so
          “4 servings” is not rewritten as a bare integer. <code>nutrition.calories</code> is the calories in each
          serving. That page says a calorie count requires <code>recipeYield</code>. A number you type as{" "}
          <code>120</code> is written as <code>120 calories</code>, which is the shape of Google’s example.{" "}
          <code>120 kcal</code> is kept when you type the unit. The calories are left out until the yield is present.
        </p>
        <p>
          <code>recipeIngredient</code> is one line per ingredient, the text required to make the dish. Google’s page
          says not to add a definition of the ingredient. <code>recipeInstructions</code> is the steps. That page
          recommends <code>HowToStep</code>, and says a single block of text is harder for Google to split. Each step
          in this form is a <code>HowToStep</code> with <code>text</code>, and <code>name</code> when you enter a short
          label such as “Simmer”. Google’s page says to leave “Step 1”, “Directions”, and “Watch the video” out of the
          instruction text. This form does not write <code>HowToSection</code>. A recipe whose page groups steps under
          headings would need that grouping added by hand. One flat list is the piece this form can honestly carry.
        </p>
        <p>
          <code>aggregateRating</code> is optional. Google’s recipe page says it follows the review snippet guidelines.
          Google’s own recipe example uses <code>ratingValue</code> and <code>ratingCount</code>. This form writes
          those two, and <code>bestRating</code> when you enter it. An empty best rating uses 5 as the ceiling, which
          is the scale Google assumes when the property is absent. A value above that ceiling is left out. The same
          page says a single review needs a real person or organization as the reviewer. This form does not write a{" "}
          <code>Review</code>. It writes the average only. A rating the page does not show should stay blank.
        </p>
        <p>
          Google’s content guidelines limit the type. Use Recipe for a particular dish. “Facial scrub” and “party
          ideas” are the examples that page calls invalid. A procedure that is not a dish uses the{" "}
          <Link href="/howto-schema-generator">HowTo schema generator</Link>. A gallery needs{" "}
          <code>ItemList</code> on a summary page that lists the recipes, with a unique URL for each one. This form
          writes one <code>Recipe</code>. It does not write the carousel. This form also leaves out{" "}
          <code>datePublished</code>, <code>keywords</code>, <code>recipeCategory</code>, <code>recipeCuisine</code>,
          and <code>video</code>. Those properties are on Google’s table. Add them by hand only when the page shows
          them. The publisher on the homepage uses the{" "}
          <Link href="/organization-schema-generator">Organization schema generator</Link>.
        </p>
        <p>
          Google’s <a href={policies}>structured data policies</a>, read on 21 October 2026, say not to mark up content
          that is not visible to readers of the page, and that the structured data must be a true representation of the
          page content. The troubleshooting note on the recipe page says Google does not guarantee that a feature which
          uses structured data will show. The copy block is one <code>script</code> tag. Paste it into the HTML the
          server sends for that recipe. Answer engines often skip text that only appears after JavaScript runs. The{" "}
          <Link href="/free-check">free check</Link> lists the JSON-LD <code>@type</code> values on the homepage. A
          recipe URL at another path is outside that fetch. The <Link href="/geo-audit">$39 audit</Link> looks for
          markup that matches the copy. The longer note on which facts to repeat is the{" "}
          <Link href="/schema-markup-for-ai-search">schema guide</Link>.
        </p>
        <h2>How to install it</h2>
        <ol>
          <li>Copy the script.</li>
          <li>Paste it into the HTML the server sends for that recipe page, in the head or the body.</li>
          <li>Confirm the same name, image, ingredients, steps, time, yield, calories, and rating are visible on that page.</li>
          <li>Confirm a gallery of recipes, if you publish one, is a separate ItemList and not stuffed into this name.</li>
        </ol>
        <h2>What to leave out</h2>
        <ul>
          <li>A time, a calorie count, or a rating the page does not show. Leave the rating blank.</li>
          <li>An author the page does not name. Leave the field blank.</li>
          <li>prepTime without cookTime, or cookTime without prepTime. Use totalTime when that is the only clock the page states.</li>
          <li>Calories without a yield. Google’s page says the yield has to be there.</li>
          <li>A facial scrub, a party plan, or a procedure that is not a dish. Use the HowTo generator for a procedure.</li>
          <li>“Step 1” or “Directions” inside the instruction text. Put the instruction only.</li>
          <li>The same Recipe block on every URL of the site.</li>
        </ul>
        <h2>Questions about Recipe schema</h2>
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

/**
 * Parse the core-offer JSON-LD and reject malformed nodes, ratings, and
 * prices other than the free snapshot (0 USD) and the Fix Pack (49 USD).
 */
import { register } from "node:module";

register(new URL("../lib/alias-hook.mjs", import.meta.url), import.meta.url);

const { assertCoreOfferSchema } = await import("../lib/schema-sanity.ts");

assertCoreOfferSchema();
console.log("schema sanity ok");

import { auth, defineMcp } from "@lovable.dev/mcp-js";
import searchProducts from "./tools/search-products";
import listProperties from "./tools/list-properties";
import listMyQuotes from "./tools/list-my-quotes";
import getQuote from "./tools/get-quote";
import createQuote from "./tools/create-quote";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "clink-global-trade-bridge",
  title: "clink-global-trade-bridge",
  version: "0.1.0",
  instructions:
    "Tools for Clink Global Services, a Turkish export brokerage. Search the product catalog, browse real-estate listings, and manage the signed-in user's quote requests (list, look up by reference, create a new one).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [searchProducts, listProperties, listMyQuotes, getQuote, createQuote],
});

import { supabaseForUser } from "../supabase";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "search_products",
  title: "Search products",
  description: "Search the published Clink Global product catalog by keyword in title or description.",
  inputSchema: {
    query: z.string().min(1).describe("Keyword to search product titles/descriptions."),
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = await supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("products")
      .select("id, slug, title, description, price_min, price_max, currency, moq, cover_image")
      .eq("status", "published")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(limit ?? 10);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { results: data ?? [] },
    };
  },
});

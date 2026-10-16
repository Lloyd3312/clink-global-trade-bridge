import { supabaseForUser } from "../supabase";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_properties",
  title: "List properties",
  description: "List Clink Global real-estate listings, optionally filtered by listing type (sale or rent) or city.",
  inputSchema: {
    listing_type: z.enum(["sale", "rent"]).optional(),
    city: z.string().optional(),
    limit: z.number().int().min(1).max(50).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ listing_type, city, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = await supabaseForUser(ctx);
    let q = supabase
      .from("properties")
      .select("id, slug, title, description, listing_type, city, country, bedrooms, bathrooms, area_sqm, price, currency, cover_image")
      .eq("status", "published")
      .limit(limit ?? 10);
    if (listing_type) q = q.eq("listing_type", listing_type);
    if (city) q = q.ilike("city", `%${city}%`);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { results: data ?? [] },
    };
  },
});

import { createClient } from "@supabase/supabase-js";
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
  handler: async ({ listing_type, city, limit }) => {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
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

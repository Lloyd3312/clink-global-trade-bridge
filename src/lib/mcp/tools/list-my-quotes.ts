import { supabaseForUser } from "../supabase";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_my_quotes",
  title: "List my quotes",
  description: "List quote requests submitted by the signed-in user (matched by their account email).",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const email = ctx.getUserEmail();
    if (!email) {
      return { content: [{ type: "text", text: "No email on token" }], isError: true };
    }
    const supabase = await supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("quotes")
      .select("reference_number, status, products, custom_product, quantity, country, created_at, updated_at")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { quotes: data ?? [] },
    };
  },
});

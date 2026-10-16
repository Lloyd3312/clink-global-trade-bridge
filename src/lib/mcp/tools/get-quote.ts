import { supabaseForUser } from "../supabase";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_quote",
  title: "Get quote by reference",
  description: "Look up a quote by its reference number (e.g. CLK-2026-XXXX) and return its status and history. Only returns quotes belonging to the signed-in user.",
  inputSchema: {
    reference: z.string().min(3).describe("Quote reference number, e.g. CLK-2026-1234."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ reference }, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const email = ctx.getUserEmail();
    if (!email) return { content: [{ type: "text", text: "No email on token" }], isError: true };
    const supabase = await supabaseForUser(ctx);
    const { data: quote, error } = await supabase
      .from("quotes")
      .select("id, reference_number, status, products, custom_product, quantity, country, email, created_at")
      .eq("reference_number", reference.trim())
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!quote) return { content: [{ type: "text", text: "Quote not found" }], isError: true };
    if (quote.email !== email) {
      return { content: [{ type: "text", text: "This quote is not associated with your account." }], isError: true };
    }
    const { data: history, error: historyError } = await supabase
      .from("quote_status_history")
      .select("status, notes, created_at")
      .eq("quote_id", quote.id)
      .order("created_at", { ascending: true });
    if (historyError) return { content: [{ type: "text", text: historyError.message }], isError: true };
    const result = { quote, history: history ?? [] };
    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
      structuredContent: result,
    };
  },
});

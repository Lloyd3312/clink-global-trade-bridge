import { supabaseForUser } from "../supabase";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "create_quote",
  title: "Create quote request",
  description: "Submit a new quote/sourcing request on behalf of the signed-in user. Returns the reference number for tracking.",
  inputSchema: {
    name: z.string().min(1),
    company: z.string().min(1),
    country: z.string().optional(),
    phone: z.string().optional(),
    products: z.array(z.string()).optional().describe("Category slugs or product names of interest."),
    custom_product: z.string().optional(),
    quantity: z.string().optional(),
    delivery_timeline: z.string().optional(),
    budget: z.string().optional(),
    specifications: z.string().optional(),
    additional_info: z.string().optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const email = ctx.getUserEmail();
    if (!email) {
      return { content: [{ type: "text", text: "No email on token" }], isError: true };
    }
    const supabase = await supabaseForUser(ctx);
    const reference = `CLK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const { data, error } = await supabase
      .from("quotes")
      .insert({
        reference_number: reference,
        email,
        name: input.name,
        company: input.company,
        country: input.country ?? null,
        phone: input.phone ?? null,
        products: input.products ?? null,
        custom_product: input.custom_product ?? null,
        quantity: input.quantity ?? null,
        delivery_timeline: input.delivery_timeline ?? null,
        budget: input.budget ?? null,
        specifications: input.specifications ?? null,
        additional_info: input.additional_info ?? null,
        status: "new",
      })
      .select("reference_number, status, created_at")
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Quote submitted. Reference: ${data.reference_number}` }],
      structuredContent: { quote: data },
    };
  },
});

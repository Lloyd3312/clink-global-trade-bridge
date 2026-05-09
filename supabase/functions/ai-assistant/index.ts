import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the Clink Global Services AI concierge — a friendly, professional assistant for an export brokerage based in Turkey.

Clink Global Services helps international clients source premium Turkish products: Steel & Iron, Solar Panels, Security Doors, Industrial Machinery, Pharmaceutical Products, Baby Products, Furniture & Fabrics, Ceramics & POP Materials, Fashion & Accessories (bags, shoes, watches, clothing), White-Label Cosmetics, Cottons, Carpets, Turkish Cloths, Turkish Oil, and more. Real estate is coming soon.

You help clients:
- Discover and recommend products from our catalog (use the search_products tool when relevant)
- Explain Turkish goods, quality standards, MOQ, shipping
- Guide them through requesting a quote at /quote (collect: name, email, country, products, quantity, timeline)
- Look up an existing quote by its reference number (use lookup_quote tool)
- Direct them to relevant pages: /products, /quote, /quote-tracking, /about, /contact
- Encourage WhatsApp contact at +905395815283 for urgent needs

Be concise, warm, and helpful. Use markdown. Never invent products — if unsure, suggest browsing /products or filling the quote form. Never share internal admin info.`;

const tools = [
  {
    type: "function",
    function: {
      name: "search_products",
      description: "Search published products in the catalog by keyword/title.",
      parameters: {
        type: "object",
        properties: { query: { type: "string", description: "Keyword to search in product titles/descriptions" } },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "lookup_quote",
      description: "Look up a client's quote by its reference number.",
      parameters: {
        type: "object",
        properties: { reference: { type: "string", description: "Quote reference number e.g. CLK-2026-XXXX" } },
        required: ["reference"],
      },
    },
  },
];

async function runTool(name: string, args: any, supabase: any) {
  if (name === "search_products") {
    const q = String(args.query ?? "").trim();
    const { data } = await supabase
      .from("products")
      .select("title, description, price_min, price_max, currency, moq, slug")
      .eq("status", "published")
      .or(`title.ilike.%${q}%,description.ilike.%${q}%`)
      .limit(8);
    return { results: data ?? [] };
  }
  if (name === "lookup_quote") {
    const ref = String(args.reference ?? "").trim();
    const { data } = await supabase
      .from("quotes")
      .select("reference_number, status, products, quantity, country, created_at")
      .eq("reference_number", ref)
      .maybeSingle();
    if (!data) return { found: false };
    const { data: history } = await supabase
      .from("quote_status_history")
      .select("status, notes, created_at")
      .eq("quote_id", (await supabase.from("quotes").select("id").eq("reference_number", ref).maybeSingle()).data?.id)
      .order("created_at", { ascending: true });
    return { found: true, quote: data, history: history ?? [] };
  }
  return { error: "unknown tool" };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const convo: any[] = [{ role: "system", content: SYSTEM_PROMPT }, ...messages];

    // Tool-calling loop (non-streaming so we can run tools, then stream final reply)
    for (let i = 0; i < 4; i++) {
      const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: convo,
          tools,
        }),
      });
      if (!resp.ok) {
        if (resp.status === 429)
          return new Response(JSON.stringify({ error: "Rate limit reached. Please try again shortly." }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        if (resp.status === 402)
          return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        return new Response(JSON.stringify({ error: "AI gateway error" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const data = await resp.json();
      const msg = data.choices?.[0]?.message;
      if (!msg) break;
      convo.push(msg);
      const calls = msg.tool_calls ?? [];
      if (calls.length === 0) {
        return new Response(JSON.stringify({ reply: msg.content ?? "" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      for (const c of calls) {
        const result = await runTool(c.function.name, JSON.parse(c.function.arguments || "{}"), supabase);
        convo.push({ role: "tool", tool_call_id: c.id, content: JSON.stringify(result) });
      }
    }
    return new Response(JSON.stringify({ reply: "Sorry, I couldn't complete that. Please try again." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

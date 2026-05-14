import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { invoice_id, origin } = await req.json();
    if (!invoice_id) {
      return new Response(JSON.stringify({ error: 'invoice_id required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      return new Response(JSON.stringify({ error: 'Stripe is not configured (missing STRIPE_SECRET_KEY)' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const sb = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: invoice, error: invErr } = await sb
      .from('quote_invoices')
      .select('id, amount, currency, status, quote_id')
      .eq('id', invoice_id)
      .maybeSingle();

    if (invErr) {
      console.error('Invoice lookup error:', invErr);
      return new Response(JSON.stringify({ error: `Invoice lookup failed: ${invErr.message}` }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!invoice) {
      return new Response(JSON.stringify({ error: 'Invoice not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (invoice.status !== 'pending') {
      return new Response(JSON.stringify({ error: 'Invoice already processed' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: quote } = await sb
      .from('quotes')
      .select('reference_number, email, name')
      .eq('id', invoice.quote_id)
      .maybeSingle();

    const stripe = new Stripe(stripeKey, { apiVersion: '2024-12-18.acacia' as any });
    const ref = quote?.reference_number ?? invoice.quote_id;
    const baseUrl = origin || 'https://example.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: quote?.email ?? undefined,
      line_items: [{
        price_data: {
          currency: (invoice.currency || 'USD').toLowerCase(),
          product_data: { name: `Consultation Invoice — Quote ${ref}` },
          unit_amount: Math.round(Number(invoice.amount) * 100),
        },
        quantity: 1,
      }],
      success_url: `${baseUrl}/quote-tracking?ref=${ref}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/quote-tracking?ref=${ref}&payment=cancelled`,
      metadata: { invoice_id: invoice.id, quote_id: invoice.quote_id, ref: String(ref) },
    });

    await sb.from('quote_invoices').update({ stripe_session_id: session.id }).eq('id', invoice.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Checkout error:', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

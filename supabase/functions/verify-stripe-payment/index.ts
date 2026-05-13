import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return new Response(JSON.stringify({ error: 'session_id required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-12-18.acacia' as any });
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const sb = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    if (session.payment_status === 'paid') {
      const invoiceId = session.metadata?.invoice_id;
      const quoteId = session.metadata?.quote_id;
      if (invoiceId) {
        const { data: existing } = await sb.from('quote_invoices')
          .select('status').eq('id', invoiceId).maybeSingle();
        if (existing && existing.status === 'pending') {
          await sb.from('quote_invoices').update({
            status: 'paid_card',
            payment_method: 'card',
            paid_at: new Date().toISOString(),
          }).eq('id', invoiceId);
          if (quoteId) {
            await sb.from('quote_status_history').insert({
              quote_id: quoteId,
              status: 'requirements',
              notes: `Payment received via card — $${(session.amount_total ?? 0) / 100} ${session.currency?.toUpperCase()}`,
            });
          }
        }
      }
      return new Response(JSON.stringify({ paid: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ paid: false, status: session.payment_status }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

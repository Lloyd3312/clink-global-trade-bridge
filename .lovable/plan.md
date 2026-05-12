# Plan: Visual Refresh + Consultation Payments

## Part 1 — Visual refresh (ecommerce ambiance)

Goal: lift the look without redesigning page-by-page. Done by upgrading the design system tokens — affects every page automatically.

- **Refresh `index.css` palette**: move to a warmer, more premium ecommerce palette
  - Background: soft ivory/cream (instead of near-white)
  - Primary: refined terracotta/burnt-orange (less saturated than current)
  - Accent: deep teal as secondary accent for buttons/highlights
  - Typography accents: serif display font (Playfair / DM Serif) for H1/H2, keep sans for body
- Add subtle grain/gradient to hero sections via existing `--gradient-hero` token
- Tighten card shadows, increase border-radius, add soft hover lift
- Update `Navigation` and `Footer` to use the new palette
- Add Google Fonts link in `index.html`

No structural/page changes — purely tokens + 2-3 component polish passes.

## Part 2 — Consultation invoices & payments

### Database
New table `quote_invoices`:
- `id`, `quote_id` (FK), `amount` (numeric), `currency` (default USD)
- `pdf_url` (existing storage bucket)
- `status` ('pending' | 'paid_card' | 'paid_crypto' | 'cancelled')
- `stripe_session_id`, `crypto_payment_id`, `paid_at`
- RLS: public read, admin write

### Admin side (in `AdminDashboard`)
- New "Invoice" panel per quote: upload PDF + enter amount/currency → creates `quote_invoices` row
- Shows payment status once paid

### Client side (`QuoteTracking`)
- If invoice exists & unpaid → shows invoice card with PDF download + two buttons:
  - **Pay with Card** → calls `create-stripe-checkout` edge function
  - **Pay with Crypto** → calls `create-crypto-invoice` edge function (NOWPayments)
- If paid → shows ✓ Paid badge + method + date

### Payment rails

**Card (Stripe)** — use Lovable's seamless Stripe Payments integration
- `enable_stripe_payments` (no Stripe account needed for the user)
- Edge functions: `create-stripe-checkout`, `stripe-webhook`

**Crypto (NOWPayments)** — requires user's own account
- User creates free account at nowpayments.io, generates API key + IPN secret
- Funds settle to user's chosen wallet (BTC/USDT/etc.) — direct to crypto, not converted from fiat
- Edge functions: `create-crypto-invoice`, `nowpayments-webhook`
- Secrets needed: `NOWPAYMENTS_API_KEY`, `NOWPAYMENTS_IPN_SECRET`

### Notifications
On successful payment (either rail), webhook:
1. Updates `quote_invoices.status` and `paid_at`
2. Inserts row into `quote_status_history` ("Payment received via card/crypto") so it appears in the existing tracking timeline
3. Updates quote status to next step

## Technical notes
- "Pay direct to bank" = Stripe (settles to your bank in your country). Shopify isn't needed since these are services, not goods.
- "Pay in crypto" = NOWPayments pays you directly in crypto. There is no automatic fiat→crypto conversion — Stripe sends fiat to your bank, NOWPayments sends crypto to your wallet. The two rails coexist on the invoice page.
- All RLS preserved. Webhooks use service-role.

## Order of execution
1. Visual refresh (tokens + fonts)
2. DB migration for invoices
3. Enable Stripe payments + edge functions + webhook
4. Crypto edge functions (after you provide NOWPayments keys)
5. Admin invoice uploader UI
6. QuoteTracking invoice + pay buttons UI

## Things I need from you
- Confirm to enable Stripe (one-click, no account setup needed)
- A NOWPayments account + API key + IPN secret (for crypto). I'll prompt you when we get to that step. Free signup at nowpayments.io.

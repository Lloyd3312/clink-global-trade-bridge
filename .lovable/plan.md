# Clink Global Services — Major Upgrade Plan

This is a large scope, so I've broken it into 5 phases you can approve one at a time. Each phase ships something usable on its own. After you approve, I'll build Phase 1 and pause for your feedback before moving on.

---

## Phase 1 — Foundation: Lighter UI + Auth Roles + Dynamic Catalog

**Goal:** Move products from hardcoded files into the database so you (and verified sellers) can upload without a developer. Lighten the visual feel.

- **Visual refresh**: more whitespace, lighter card shadows, softer orange tint, brighter background, larger trust badges, cleaner typography. Keep the brand (orange/white/gray/deep-green).
- **Auth + roles**: add a `user_roles` table (`admin`, `seller`, `user`) with secure server-side checks. Sellers must apply and be approved by admin before they can upload.
- **Categories table**: dynamic categories (Steel, Fashion, Real Estate, etc.) with an automatic "Other" bucket for anything uncategorised. Admin can add/rename/hide categories from `/admin`.
- **Products table**: title, description, specs, price range, MOQ, category, gallery images, seller, status (draft/published).
- **Admin & seller upload UI**: form with image uploads (drag-drop, multiple files) at `/admin/products` and `/seller/products`.
- **Public Products page rebuilt** to read from the database instead of hardcoded arrays. Existing categories migrated.

## Phase 2 — AI Assistant (Full Concierge)

- Floating chat bubble on every page powered by Lovable AI (`google/gemini-3-flash-preview`, no API key needed).
- Streamed responses, markdown rendering, conversation memory per session.
- Capabilities: recommend products, explain Turkish goods, search the live catalog, help fill the quote form, look up a quote by reference number, suggest properties matching budget/location.
- Backend: a single `ai-assistant` edge function with tool-calling so the AI can query the database safely.

## Phase 3 — E-commerce Touches: Related Products + Samples + Quote Replies

- **Related products** carousel on every product detail page (same category, then cross-category).
- **"Request a Sample"** button on product pages → new `sample_requests` table with shipping address; admin sees it in dashboard.
- **Quote reply uploads**: admin can attach a PDF/image quotation to a client's enquiry; client sees it on the tracking page and gets notified.
- **Wishlist/compare** (lightweight, localStorage) so visitors can shortlist items before requesting a quote.

## Phase 4 — Real Estate Phase

- New top-level section `/real-estate` with its own landing page and category filters (Apartments, Villas, Commercial, Land, Off-plan, etc. — categories editable like products).
- **Property listings** with: title, description, location, price, bedrooms/bathrooms, area, amenities, status (for sale / for rent / sold).
- **Media per property**: unlimited photos, video uploads, plus 360° panorama uploads and external VR embed URLs (Matterport/Kuula links).
- Same upload flow: admin and verified sellers (re-used from Phase 1).
- Quote/inquiry form pre-filled with property reference.

## Phase 5 — Virtual Tours (the two approaches you picked)

- **360° panorama viewer**: upload an equirectangular photo (taken with a 360° camera or phone app like Google Street View), viewer renders interactive pan/zoom using `pannellum` or `react-photo-sphere-viewer`.
- **Photo-tour builder**: select 5–20 regular photos, arrange them in order, add captions and "next room" hotspots → renders as an immersive guided slideshow that feels like a walkthrough.
- Both viewers embed inside the property detail page; clients can fullscreen and (on mobile) use gyroscope.

> Note on AI-generated true 3D VR from photos: real photogrammetry needs heavy GPU services (Matterport, Polycam, etc.) and is out of scope for what Lovable can build natively. The two methods above give a very convincing tour experience without paid services. If later you want true 3D VR, we'd integrate Matterport via embed and you'd subscribe to their service.

---

## Technical details

- **Backend**: Lovable Cloud (Supabase). New tables: `categories`, `products`, `product_media`, `properties`, `property_media`, `sample_requests`, `quote_attachments`, `user_roles`, `seller_applications`. All with RLS.
- **Storage**: Lovable Cloud storage buckets `product-media`, `property-media`, `quote-attachments`. Public read, authenticated write with role check.
- **Auth**: Email/password + Google sign-in. Sellers go through application + admin approval.
- **AI**: Lovable AI Gateway (no API key) with tool-calling for catalog queries.
- **VR libs**: `@photo-sphere-viewer/core` for 360° panoramas (lightweight, MIT licensed).
- **Migration**: existing hardcoded categories seeded into the new `categories` table on first deploy so nothing visually disappears.

---

## What I'll do right now if you approve

Build **Phase 1** end-to-end (lighter UI + auth/roles + dynamic categories + admin/seller product upload). After you confirm it looks and works the way you want, I'll proceed to Phase 2.

Reply **"go"** to start Phase 1, or tell me which phase to start with / what to adjust.
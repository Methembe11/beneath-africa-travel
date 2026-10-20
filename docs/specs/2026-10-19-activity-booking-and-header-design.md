# Activity Booking Flow & Header Behaviour — Design

Date: 2026-10-19
Status: implemented (stages A, B and C) — activity copy is drafted, pending client review

## Problem

1. The top bar is `position: fixed` and always painted over content while scrolling.
   The client wants it to hide while scrolling down and return when scrolling up.
2. Clicking an activity (e.g. "Helicopter Flight" on `/destinations/victoria-falls`)
   navigates to a **group overview** page (`/experiences/victoria-falls`), not to a
   page about that activity. Every activity card in `app/lib/content.ts` behaves this
   way (89 cards, 57 distinct titles). There is no per-item page and no way to enquire
   about several items in one go.

## Decisions (from client)

- **Booking model:** request a quote / enquiry. No payment, no live availability.
  Submitting opens the visitor's email app with a pre-written message (existing
  behaviour), now including the selected items.
- **Page content:** drafted by the developer from existing site copy, marked as draft,
  for the client to refine later.
- **Multi-item selection:** an "Add to enquiry" tray. Every card and every item page
  gets an add button; a floating counter remembers selections between pages; the
  enquiry form lists them and allows add/remove.
- **Header:** hide on scroll down, show on scroll up (classic sticky behaviour).

## Aesthetic direction

Continue the existing editorial system: warm cream grounds, near-black sections, single
gold accent, Cormorant Garamond display / EB Garamond body / Raleway caps. Item pages
must look like the rest of the site — no new visual language, no card-heavy generic
templates. Reuse `PageHero`, `InteriorPage` section patterns, `CardGrid`, `PageCta`.

---

## Stage A — Header scroll behaviour

**Behaviour**
- At the top of the page (`scrollY <= 8`), the bar is always visible.
- Scrolling **down** past a small threshold (~120px) hides the bar
  (`translateY(-100%)` + fade).
- Scrolling **up** by more than a few px shows it again immediately.
- The bar is **never** hidden while the menu dialog is open.
- `prefers-reduced-motion: reduce` removes the slide transition (instant show/hide).

**Implementation**
- `SiteHeader.tsx`: track `lastScrollY` in the existing passive scroll listener; set a
  `hidden` state. Add `data-hidden={hidden}` to `<header>`. Reset `hidden` to false when
  `open` is true and on `popstate`.
- `SiteHeader.module.css`: add `transform` + `opacity` to the `.header` transition; add
  `.header[data-hidden="true"]` rule. Keep the existing `data-solid` and `data-open`.
- Do **not** change the fixed-header height token (`--header-h`) — height is unchanged.

**Acceptance**
- Scroll down → bar hides; scroll up → returns; at top → visible.
- Menu opens/closes normally with the bar in either state.
- No layout shift; anchor `scroll-margin-top` still correct.

---

## Stage B — Bookable catalogue & item pages

**Data model** — new `app/lib/catalogue.ts`:

```ts
export type BookableItem = {
  slug: string;           // e.g. "helicopter-flight"
  title: string;          // "Helicopter Flight"
  category: string;       // "Flights"
  group: string;          // "Victoria Falls Activities"
  groupHref: string;      // "/experiences/victoria-falls"
  image: string;
  imageAlt: string;
  summary: string;        // one line for cards / meta
  intro: string[];        // 1–3 drafted paragraphs
  details?: { label: string; value: string }[]; // Duration, Includes, etc.
  highlights?: string[];
  gallery?: { src: string; alt: string }[];
};
```

- Built by de-duplicating the 89 `ActivityCard`s into ~57 canonical items
  (merge near-duplicates such as "Chobe Day Trip" / "Chobe Day Trips").
- Export helpers: `bookableItems`, `findItem(slug)`, `itemCards`.

**Routing** — new `app/activities/[slug]/page.tsx` (the folder already exists, empty).
- `generateStaticParams()` from `bookableItems`; `dynamicParams = false`.
- `generateMetadata()` via `pageMeta` (path `/activities/<slug>`).
- Renders a new `ActivityPage` component.

**`ActivityPage` layout**
1. `PageHero` — eyebrow `<category> · Victoria Falls`, title, summary, image.
2. Intro paragraphs (drafted copy) — flagged in code as draft for client refinement.
3. Details table (duration / what's included) when present.
4. Highlights grid.
5. Gallery.
6. Related items (same group) via `CardGrid`.
7. `<PageCta>` pointing to `/contact?topic=<title>` for single-item enquiry.
8. `SiteFooter`.

**Wiring**
- Every group page's `section.cards` and every `ActivityCard` link to
  `/activities/<slug>` instead of the current group href. Cards that are pure service
  descriptions (e.g. "Operator Liaison, Including Safari 24") get **no** href and are
  not bookable.
- Add the derived item pages to `app/sitemap.xml` output.

**Acceptance**
- "Journeys → Victoria Falls → Helicopter Flight" lands on
  `/activities/helicopter-flight` with real content and a booking action.
- All 32 existing routes keep working; no broken links; build passes;
  exactly one `<h1>` and one `<main>` per page; axe clean.

---

## Stage C — Add-to-enquiry tray & multi-item form

**State** — new `app/components/enquiry/EnquiryProvider.tsx` (React context):
- `items: string[]` (slugs), `add`, `remove`, `toggle`, `clear`.
- Persisted to `localStorage` (`ba-enquiry`), rehydrated on mount (no SSR mismatch —
  render count only after mount).
- Exposed via `useEnquiry()`.

**Tray** — `app/components/enquiry/EnquiryTray.tsx`, mounted once (root layout or via
`SiteFooter` sibling):
- Floating button, bottom-right, shows count; hidden when count is 0.
- Accessible: `<button aria-label="Enquiry, N activities selected">`; opens the
  enquiry page or a small panel listing items with remove buttons.
- Respect reduced motion.

**Add buttons**
- `ActivityPage`: primary "Add to enquiry" (toggles) + "Enquire about this one".
- `InteriorPage` activity cards: a small add button on each card (does not navigate).

**Enquiry form** (`ContactEnquiryForm.tsx`)
- New "Selected activities" block above the fields: lists chosen items with remove
  buttons and a "Clear all" action; empty state explains how to add items.
- Included in the `mailto:` body under a "Selected activities:" heading.
- Keeps `?topic=` behaviour for single-item enquiries.

**States**
- Empty tray → not rendered.
- Empty form selection → helper text, not an error.
- `localStorage` unavailable → silently degrade to in-memory.

**Acceptance**
- Add several items across different pages → tray count persists across navigation and
  reload; form lists them; one email contains all; removing items works.
- Keyboard + screen-reader operable; tap targets ≥24px; axe clean.

---

## Out of scope

- Payments, availability calendars, confirmation emails.
- Search/filter over the catalogue (can be a later phase).

## Notes

- No git repository exists, so this spec is not committed. Recommend `git init`.
- Server-side images: `.jfif` files were already renamed to `.jpg` (Vercel image
  optimizer rejects `.jfif`); new item pages must reference `.jpg`/`.jpeg`/`.png` only.

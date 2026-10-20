# Booking Panel — Request-Based Booking Flow

Date: 2026-10-20
Status: Sections 1–2 approved by client 2026-10-20; Section 3 specified here, pending review
Supersedes: Stage C (enquiry tray) of `2026-10-19-activity-booking-and-header-design.md`. Stages A and B (header behaviour, catalogue/item pages) stand unchanged.

## Problem

1. Three enquiry paths exist: the floating enquiry tray, the homepage's own 8-field
   mailto form (section 11 of 12 — reachable only after a very long scroll), and the
   Contact page form (mailto to a different address, `ranjis@`).
2. No booking CTA exists in the header, the hero, or anywhere a non-scroller would
   find it. The header even hides on scroll-down.
3. The tray only appears after a visitor has already found and pressed an
   "Add to enquiry" button — a visitor who arrives ready to enquire has no path at all.
4. Homepage activity-level booking is impossible: the homepage has no bookable-activity
   cards (its experiences carousel links to category pages).

## Decisions (from client)

- **Booking model:** booking *request*, not a booking engine. No payment, no live
  availability in v1. Submitting never implies a confirmed booking; copy must say
  availability, final pricing and payment are confirmed by the team.
- **Delivery:** Form POST foundation (Formspree or Web3Forms) to
  `reservations@beneathafricatravel.co.zw`, genuine confirmation only after the
  service responds successfully, then an *optional* post-submit WhatsApp step
  (`+263 77 813 0264`) where the guest must press Send themselves.
- **Structure:** Approach 1 — one in-place drawer (`BookingPanel`) with a client
  store; not a set of pages. Selections survive navigation, reload and closing.
- **Dates/participants:** trip-level defaults with optional per-activity overrides.
- **Homepage:** quick-book strip of featured activities directly under the hero.
- **Old paths:** tray and both mailto forms removed; Contact page keeps a light
  general form posting to the same endpoint.

### Approved refinements (Section 1 review)

- Duplicate guard: an already-selected activity renders "Added ✓ · View trip";
  it is never added twice; quantity changes happen intentionally inside the drawer.
- Dates are soft-required: explicit **"My dates are flexible"**, and a guest may
  continue with no dates at all. Flexible and unspecified are displayed distinctly.
- Group size: required *or* the guest explicitly checks **"Group size not
  confirmed"**.
- Persistence: activities, dates, guest counts and overrides persist; contact
  details exist only while a draft is unsubmitted and are cleared after success.
- Submission: draft retained on failure with Retry; duplicate submits blocked
  while in flight; WhatsApp action optional and clearly labelled.
- Drawer top carries a compact summary rail ("2 experiences · 2 adults") with an
  edit affordance; on mobile the primary Next/Submit button is anchored at the
  bottom of the sheet.

## Aesthetic direction

No new visual language. The panel uses the site's existing editorial system: warm
cream grounds, near-black sections, single gold accent, Cormorant Garamond display /
EB Garamond body / Raleway caps. Reuse existing tokens, button styles and spacing.
The drawer should read as part of the site, not as a bolted-on widget. Motion
follows `MotionConfig reducedMotion="user"` conventions already in the app.

---

## Section 1 — The panel

### Shell

- `BookingPanel` mounted once in `app/layout.tsx` (the slot currently held by `EnquiryTray`).
- Desktop: right-side drawer, max-width 480–520px, cream surface, focus trap,
  `role="dialog"` `aria-modal`, Escape closes, focus returns to the trigger.
- Mobile (<768px): full-screen sheet.
- Closing loses nothing: all state is in the store (see Section 3).

### Views (single-step stepper, both directions)

| # | View | Content | Required to advance |
|---|---|---|---|
| 1 | Activities | In-flow browser of all `bookableItems` with category/location filters; each row add/remove; trip summary rail on top | none — zero activities is valid ("tailor-made journey") |
| 2 | Dates & guests | Trip-level arrival/departure + adults/children; "My dates are flexible" checkbox; "Group size not confirmed" checkbox; per-row optional "set dates/guests for this activity only" expand | group size set **or** size-unconfirmed checked |
| 3 | Your details | Name, email, phone/WhatsApp, notes | name + email |
| 4 | Review & request | Full summary; explicit dates lines ("Dates: flexible" / "Dates: not set yet" / range); explicit guests line; the non-guarantee statement; **Explore More** action | — |
| 5 | Request received | Success state (rendered only after a 2xx); optional **Continue on WhatsApp** (prefilled, "opens WhatsApp — press Send"); **Done** (clears draft, closes); **Continue planning** (keeps selections, returns to view 1) | — |

- Stepper at top (`aria-current="step"`), back/next at bottom.
- Mobile: primary button anchored to the sheet bottom.

### CTA routing rules (approved)

| Entry point | Behaviour |
|---|---|
| Book Now / Book This Activity | add activity → open view 2; if already selected, open view 2 **without re-adding** |
| Plan Your Journey | open view 1, empty |
| Explore More (from view 4) | open view 1, selections intact |
| Add to trip | add activity only, no drawer; control shows "Added ✓ · View trip"; *View trip* opens view 1 |

---

## Section 2 — Entry points

| Location | Label | Behaviour | Component change |
|---|---|---|---|
| Homepage quick-book strip (new, directly under hero) | **Book Now** | add → view 2 | new `QuickBookStrip` using `FEATURED_SLUGS` in `catalogue.ts` — initially: `guided-tour-of-the-falls`, `helicopter-flight`, `white-water-rafting`, `game-drives`, `sunset-cruise`, `breakfast-cruise`, `boma-dinner`, `chobe-day-trip` |
| Activity page hero (`/activities/*`) | **Book This Activity** | add → view 2 | replaces `AddToEnquiry` passed as `PageHero` action |
| Activity page closing band | **Book This Activity** (outline) + **Contact Us** | add → view 2 / `/contact?topic=` unchanged | `InteriorPage` inline CTA |
| Interior activity cards (group pages, `InteriorPage` sections) | compact **＋** → **Added ✓ · View trip** | add only → view 1 via *View trip* | replaces compact `AddToEnquiry` |
| Experiences page (new bookable grid under the 6 category cards) | **Book Now** → **Added ✓ · View trip** | add → view 2 / view 1; card still links to its detail page | `CardGrid` gains an optional per-card action slot |
| Nav menu overlay | **Plan Your Journey** | view 1, empty | prominent full-width button at top of overlay |
| Site header (desktop) | **Plan your journey** pill | view 1, empty | beside Menu button in `SiteHeader` |
| Mobile floating pill | **Plan your journey** | view 1, empty | slim bottom pill, reuses the removed tray's slot; hidden while the panel is open |
| Homepage hero | **Plan your journey** pill in "Choose a way in" | view 1, empty | third pill beside Experiences/Stays |
| Homepage old §11 form | **Plan your journey** + WhatsApp link | replaces the 8-field mailto form; `id="book"` anchor preserved | `Enquiry` component deleted, band rebuilt |
| Homepage final CTA (§12) | existing label, new behaviour | opens view 1 | href replaced with trigger |
| `PageCta` (listing pages) | **Start planning** | opens view 1 (was `/contact`) | href replaced with trigger |
| Category cards (destinations, experiences, travel, stays) | unchanged | still navigate; browsing stays browsing | no change |

Shared trigger component: `BookingTrigger` (variants: `pill`, `solid`, `outline`,
`compact`) wraps `openBooking({ slug? })` so every entry point is one import.

### Removals and migrations

- Delete `EnquiryTray.tsx` (+ module CSS) and `lib/enquiry-store.ts`.
  One-time migration: on first load, read the old `ba-enquiry` key and fold it
  into the booking store, then clear the old key.
- Delete `AddToEnquiry.tsx` (+ module CSS), superseded by `BookingTrigger`.
- Delete the homepage `Enquiry` form and its mailto.
- Contact page: `ContactEnquiryForm` becomes a light form — name, email, message
  (keeping the `?topic=` prefill) — posting to the same endpoint as bookings with
  `kind: "general-enquiry"` (booking requests send `kind: "booking-request"`) so
  the team can tell them apart in one inbox.
  The `ranjis@` address disappears from the codebase.
- `PageCta` secondary ("Our story") unchanged.

---

## Section 3 — Data, submission, states

### Store — `app/lib/booking-store.ts`

Same `useSyncExternalStore` + localStorage pattern as the store it replaces.

```ts
type TripOverride = { arrival?: string; departure?: string; adults?: number; children?: number };
type BookingItem = { slug: string; overrides?: TripOverride };
type Trip = {
  arrival?: string; departure?: string;
  flexibleDates: boolean;          // explicit "dates are flexible"
  adults?: number; children?: number;
  sizeUnconfirmed: boolean;        // explicit "group size not confirmed"
};
type Contact = { name: string; email: string; phone?: string; notes?: string };

type BookingState = {
  open: boolean;
  step: 1 | 2 | 3 | 4 | 5;
  items: BookingItem[];            // slug uniqueness enforced; no duplicates
  trip: Trip;
  contact: Contact;
  submitting: boolean;
  error: string | null;
  lastSent?: BookingPayload;       // frozen snapshot for view 5 (WhatsApp summary)
};
```

- **Persisted** (key `ba-booking`): `items`, `trip` — long-lived.
- **Persisted only while unsubmitted**: `contact`. Cleared on success.
- Storage unavailable → in-memory only, silently (existing pattern).
- `flexibleDates` and unset dates are separate states end to end — in the summary
  rail, the review, and the submitted payload.

### Summary rail

Top of every view: "N experiences · N adults" (or "group size not confirmed";
"dates not set" / "flexible dates"), with an edit affordance jumping to the
relevant view.

### Submission — `app/lib/submit-booking.ts`

Single module; the rest of the app never sees the transport.

```ts
export async function submitBooking(payload: BookingPayload): Promise<void>;
```

- Transport constant: `NEXT_PUBLIC_BOOKING_ENDPOINT` (+ access key where the
  service needs one). Default target: Web3Forms; Formspree is a one-constant swap.
  If unset, `submitBooking` fails fast with a clear configuration message —
  never a silent no-op.
- Payload: contact, trip (with explicit date/guest lines), items (slug + title +
  overrides), `sourceUrl`, `submittedAt`. Honeypot field for spam.
- `AbortController` with ~20s timeout.
- **In-flight lock:** `submitting` disables the button and blocks re-entry.
- **Success = 2xx from the service, nothing else.** Only then: store `lastSent`
  snapshot, clear `contact`, advance to view 5.
- **Failure (network, non-2xx, timeout):** keep the entire draft, show an error
  banner with **Retry**, plus fallbacks — Continue on WhatsApp, mailto to
  `reservations@beneathafricatravel.co.zw`, copy summary. Fields are never cleared
  on failure.
- View 5's WhatsApp message is built from the `lastSent` snapshot
  (`wa.me/263778130264?text=…`), labelled "opens WhatsApp — press Send to share".

### Validation

- Inline per-field messages, first invalid field focused, `aria-describedby`,
  live region for form-level status.
- View 2 gate: `adults` set **or** `sizeUnconfirmed`. Dates never block.
- View 3 gate: name + email (`type="email"`, native validation supported).

### State coverage

| Situation | Behaviour |
|---|---|
| First-time visitor, no selections | view 1 empty-state copy explains browsing *and* the tailor-made path |
| Zero activities at review | allowed; payload says "No activities selected — tailor-made request" |
| Storage unavailable | in-memory draft still works for the session |
| Validation failure | inline errors, nothing submitted |
| Slow/failing network | submitting state → timeout → error banner + retry + fallbacks, draft intact |
| Success | confirmation only after 2xx; contact cleared |
| Reopen after closing | step, selections, trip and unsubmitted contact restored |
| Reduced motion | drawer/step transitions instant under `prefers-reduced-motion` |
| Keyboard | focus trap, Escape, focus return (same pattern as `SiteHeader`) |
| Mobile | full-screen sheet, anchored primary button; bottom pill hidden while open |
| Duplicate add attempts | impossible — store enforces unique slugs; controls show added state |

### Copy requirements

- View 4 and the submitted payload both carry: *"This is a booking request.
  Availability, final pricing and payment instructions are confirmed by our team —
  submitting does not guarantee a booking."*
- No prices are displayed anywhere (the catalogue has none); if live prices are
  ever added, they must be labelled estimate vs confirmed at source.

## Setup required before launch

1. Create the form-service account (Web3Forms recommended: free, no expiry;
   Formspree acceptable) delivering to `reservations@beneathafricatravel.co.zw`.
2. Add `NEXT_PUBLIC_BOOKING_ENDPOINT` (+ key) to env.
3. Send one real test request and confirm it lands in the team inbox.
4. Confirm spam protection active on the service side; honeypot is client-side.

## Out of scope (v1)

Payments, live availability/pricing, confirmation emails to the guest, admin UI,
catalogue search, analytics events, language switch (DE).

## Acceptance criteria

1. Each entry-point row in Section 2 behaves exactly as specified.
2. Selections survive navigation, reload and drawer close; duplicates impossible.
3. Success state renders only after a 2xx; failure retains the draft and offers retry.
4. Contact details are cleared after a successful submission, never after a failure.
5. Exactly one transport module; `ranjis@` and all `mailto:` booking paths are gone
   (the light contact form posts to the same endpoint).
6. Old `ba-enquiry` selections migrate into the new store.
7. Build passes; keyboard-operable end to end; axe clean; reduced motion respected.

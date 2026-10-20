# Booking Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the three existing enquiry paths with one booking-request drawer: a five-view side panel (Activities → Dates & guests → Your details → Review & request → Request received) reachable from every entry point in the spec, submitting via a single form-POST transport.

**Architecture:** Approach 1 from the spec — one `BookingPanel` mounted in the root layout, state in a localStorage-backed `useSyncExternalStore` store (`ba-booking`, migrating the old `ba-enquiry` key), submission isolated behind `submitBooking()`. Entry points all render one shared `BookingTrigger` component. Old tray, `AddToEnquiry`, homepage mailto form and the `ranjis@` address are deleted.

**Tech Stack:** Next.js 16 (App Router), React 19, CSS Modules + existing design tokens (cream/ink/gold, Cormorant Garamond/EB Garamond/Raleway), framer-motion, vitest (new dev dependency — the project has no test runner), Web3Forms/Formspree endpoint via `NEXT_PUBLIC_BOOKING_ENDPOINT`.

**Spec:** `docs/specs/2026-10-20-booking-panel-design.md` — every requirement there maps to a task below.

**Note on worktree:** this plan executes directly in the working directory (the session has worked here throughout); no dedicated worktree.

---

## File structure

**Create — logic (with tests):**
- `tests/booking-store.test.ts` — store behaviours
- `tests/submit-booking.test.ts` — transport behaviours
- `tests/summary.test.ts` — summary/WhatsApp/mailto text builders
- `vitest.config.ts`
- `app/lib/booking-store.ts` — state, actions, persistence, legacy migration (replaces `enquiry-store.ts`)
- `app/lib/submit-booking.ts` — `BookingPayload`, `buildPayload`, `submitBooking` (only module that knows the transport)
- `app/lib/booking-summary.ts` — plain-text summary, WhatsApp href, mailto fallback href

**Create — UI (`app/components/booking/`):**
- `BookingTrigger.tsx` + `.module.css` — every entry point (variants: `pill`, `solid`, `outline`, `compact`)
- `BookingPanel.tsx` + `.module.css` — drawer shell, focus trap, stepper, summary rail, footer
- `steps/StepActivities.tsx` — in-flow activity browser
- `steps/StepDates.tsx` — trip-level dates/guests + per-activity overrides
- `steps/StepDetails.tsx` — contact fields
- `steps/StepReview.tsx` — summary + non-guarantee copy + submit
- `steps/StepDone.tsx` — confirmation, WhatsApp, Done / Continue planning
- `steps/Steps.module.css` — shared step styles
- `QuickBookStrip.tsx` + `.module.css` — homepage strip under hero

**Modify:**
- `app/layout.tsx` — mount `BookingPanel`, drop `EnquiryTray`
- `app/components/InteriorPage.tsx` — hero action, card controls, inline CTA → `BookingTrigger`
- `app/components/SiteHeader.tsx` + `.module.css` — header pill + overlay "Plan Your Journey" button
- `app/components/home/Home.tsx` + `.module.css` — hero pill, quick strip, §11 band rebuild, §12 trigger, delete `Enquiry`
- `app/components/CardGrid.tsx` — optional `renderAction` slot (outside the card `<Link>`)
- `app/lib/catalogue.ts` — `FEATURED_SLUGS`, `bookableCards`
- `app/experiences/page.tsx` — bookable grid below category cards
- `app/components/PageCta.tsx` — primary → `BookingTrigger`
- `app/components/ContactEnquiryForm.tsx` + `.module.css` — light form (name, email, message, `?topic=` prefill) posting `kind: "general-enquiry"`
- `app/lib/content.ts` — remove `ranjis@` from `company.emails`
- `package.json` — `test` script
- `.env.local.example` — endpoint vars

**Delete:**
- `app/components/EnquiryTray.tsx` + `.module.css`
- `app/components/AddToEnquiry.tsx` + `.module.css`
- `app/lib/enquiry-store.ts`

---

## Tasks

### Task 1: Commit the uncommitted baseline (Stage A–C)

**Files:** none created — git only

- [ ] Step 1: Inspect `git status` and `git diff --stat`

```bash
git status --short
git diff --stat
```

Expected: modified files under `app/` plus untracked `app/activities/`, `app/components/AddToEnquiry.*`, `app/components/EnquiryTray.*`, `app/lib/catalogue.ts`, `app/lib/enquiry-store.ts`, `docs/` — all belonging to yesterday's Stages A–C (spec `docs/specs/2026-10-19-activity-booking-and-header-design.md`).

- [ ] Step 2: Stage everything and commit as the 2026-10-19 spec baseline

```bash
git add -A
git commit -m "feat: activity catalogue, item pages, enquiry tray, header scroll behaviour (spec 2026-10-19)"
```

Expected: 1 commit; nothing left in `git status` except files created by later tasks.

- [ ] Step 3: Verify clean tree

```bash
git status --short
```

Expected: empty output.

### Task 2: Test runner setup (vitest)

**Files:**
- Create: `tests/smoke.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json`

- [ ] Step 1: Write failing smoke test

Create `tests/smoke.test.ts`:

```ts
import { describe, expect, it } from "vitest";

describe("test runner", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] Step 2: Run it, verify failure (runner missing)

```bash
npm test
```

Expected: FAIL — `npm: command not found` or `vitest: not found` (no `test` script yet).

- [ ] Step 3: Install vitest, add config + `test` script

```bash
npm install -D vitest
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
```

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run"
```

- [ ] Step 4: Run again, verify pass

```bash
npm test
```

Expected: PASS — 1 test, `tests/smoke.test.ts`.

- [ ] Step 5: Commit

```bash
git add package.json package-lock.json vitest.config.ts tests/smoke.test.ts
git commit -m "test: add vitest runner with smoke test"
```

### Task 3: Booking store (TDD)

**Files:**
- Create: `tests/booking-store.test.ts`
- Create: `app/lib/booking-store.ts`

- [ ] Step 1: Write failing store tests (uniqueness, routing, migration, success/failure persistence, reset)

Create `tests/booking-store.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

type Store = typeof import("../app/lib/booking-store");

/** Fresh module + controllable localStorage per test. */
async function makeStore(seed?: Record<string, string>) {
  const mem = new Map<string, string>(Object.entries(seed ?? {}));
  (globalThis as Record<string, unknown>).window = {
    localStorage: {
      getItem: (k: string) => mem.get(k) ?? null,
      setItem: (k: string, v: string) => void mem.set(k, v),
      removeItem: (k: string) => void mem.delete(k),
    },
    location: { href: "" },
  };
  vi.resetModules();
  const store = await import("../app/lib/booking-store");
  return { store, mem };
}

beforeEach(() => {
  delete (globalThis as Record<string, unknown>).window;
});

describe("booking store", () => {
  it("adds an item once — duplicates are impossible", async () => {
    const { store } = await makeStore();
    store.addItem("sunset-cruise");
    store.addItem("sunset-cruise");
    expect(store.readState().items.map((i) => i.slug)).toEqual(["sunset-cruise"]);
  });

  it("openBooking with a slug adds it and lands on step 2", async () => {
    const { store } = await makeStore();
    store.openBooking({ slug: "helicopter-flight" });
    const s = store.readState();
    expect(s.open).toBe(true);
    expect(s.step).toBe(2);
    expect(s.items.map((i) => i.slug)).toEqual(["helicopter-flight"]);
  });

  it("openBooking without a slug opens step 1 empty", async () => {
    const { store } = await makeStore();
    store.openBooking();
    const s = store.readState();
    expect(s.open).toBe(true);
    expect(s.step).toBe(1);
    expect(s.items).toEqual([]);
  });

  it("migrates legacy ba-enquiry selections once", async () => {
    const { store, mem } = await makeStore({
      "ba-enquiry": JSON.stringify(["bungee-jump", "lunch-cruise"]),
    });
    expect(store.readState().items.map((i) => i.slug)).toEqual([
      "bungee-jump",
      "lunch-cruise",
    ]);
    expect(mem.has("ba-enquiry")).toBe(false);
    expect(mem.has("ba-booking")).toBe(true);
  });

  it("persists items and trip to ba-booking", async () => {
    const { store, mem } = await makeStore();
    store.addItem("game-drives");
    store.setTrip({ arrival: "2026-11-03", flexibleDates: false, adults: 2 });
    const saved = JSON.parse(mem.get("ba-booking") ?? "{}");
    expect(saved.items).toHaveLength(1);
    expect(saved.trip.adults).toBe(2);
  });

  it("submitSuccess stores the payload, clears contact, keeps items", async () => {
    const { store, mem } = await makeStore();
    store.addItem("boma-dinner");
    store.setContact({ name: "Sam", email: "sam@example.com" });
    store.submitStart();
    store.submitSuccess({ kind: "booking-request" } as never);
    const s = store.readState();
    expect(s.submitting).toBe(false);
    expect(s.contact.name).toBe("");
    expect(s.items.map((i) => i.slug)).toEqual(["boma-dinner"]);
    expect(s.lastSent).toBeTruthy();
    const saved = JSON.parse(mem.get("ba-booking") ?? "{}");
    expect(saved.contact).toBeFalsy();
  });

  it("submitFailure keeps the draft and records the error", async () => {
    const { store } = await makeStore();
    store.setContact({ name: "Sam", email: "sam@example.com" });
    store.submitStart();
    store.submitFailure("Network error");
    const s = store.readState();
    expect(s.error).toBe("Network error");
    expect(s.submitting).toBe(false);
    expect(s.contact.name).toBe("Sam");
  });

  it("resetDraft clears everything (Done button)", async () => {
    const { store } = await makeStore();
    store.addItem("city-tour");
    store.setContact({ name: "Sam", email: "s@e.com" });
    store.resetDraft();
    const s = store.readState();
    expect(s.items).toEqual([]);
    expect(s.contact.name).toBe("");
    expect(s.lastSent).toBeUndefined();
  });

  it("per-activity overrides do not duplicate rows", async () => {
    const { store } = await makeStore();
    store.addItem("chobe-day-trip");
    store.setOverride("chobe-day-trip", { adults: 4 });
    const s = store.readState();
    expect(s.items).toHaveLength(1);
    expect(s.items[0].overrides?.adults).toBe(4);
  });
});
```

- [ ] Step 2: Run, verify failures

```bash
npm test
```

Expected: FAIL — `tests/booking-store.test.ts` fails with "Cannot find module '../app/lib/booking-store'" (smoke test still passes).

- [ ] Step 3: Write `booking-store.ts` skeleton

Create `app/lib/booking-store.ts`:

```ts
"use client";

import { useSyncExternalStore } from "react";
import type { BookingPayload } from "./submit-booking";

/* Types: TripOverride, BookingItem, Trip, Contact, BookingState — fields per spec §3. */

const STORAGE_KEY = "ba-booking";
const LEGACY_KEY = "ba-enquiry";

const EMPTY_CONTACT: Contact = { name: "", email: "", phone: "", notes: "" };
const DEFAULT_TRIP: Trip = { flexibleDates: false, sizeUnconfirmed: false };

/* module state: state, listeners, loaded flag */

/* ensureLoaded(): read ba-booking; if absent, migrate ba-enquiry slugs */
/* persist(): write { items, trip, contact } — contact omitted when empty-name AND after success */

export type PublicState = ...;
export function readState(): PublicState { /* ensureLoaded + snapshot */ }
export function useBooking<T>(selector: (s: PublicState) => T): T { /* useSyncExternalStore + selector memo */ }
export function openBooking(opts?: { slug?: string; step?: 1 | 2 | 3 | 4 | 5 }): void {}
export function closeBooking(): void {}
export function setStep(step: 1 | 2 | 3 | 4 | 5): void {}
export function addItem(slug: string): void {}
export function removeItem(slug: string): void {}
export function setTrip(patch: Partial<Trip>): void {}
export function setOverride(slug: string, patch: Partial<TripOverride>): void {}
export function setContact(patch: Partial<Contact>): void {}
export function submitStart(): void {}
export function submitSuccess(payload: BookingPayload): void {}
export function submitFailure(message: string): void {}
export function continuePlanning(): void {}
export function resetDraft(): void {}
```

- [ ] Step 4: Implement state + actions + persistence + `ba-enquiry` migration

Replace the skeleton bodies of `app/lib/booking-store.ts` with the implementation. Key rules:

- State shape (spec §3):

```ts
export type TripOverride = {
  arrival?: string;
  departure?: string;
  adults?: number;
  children?: number;
};
export type BookingItem = { slug: string; overrides?: TripOverride };
export type Trip = {
  arrival?: string;
  departure?: string;
  flexibleDates: boolean;
  adults?: number;
  children?: number;
  sizeUnconfirmed: boolean;
};
export type Contact = { name: string; email: string; phone?: string; notes?: string };
export type Step = 1 | 2 | 3 | 4 | 5;

export type BookingState = {
  open: boolean;
  step: Step;
  items: BookingItem[];
  trip: Trip;
  contact: Contact;
  submitting: boolean;
  error: string | null;
  lastSent?: BookingPayload;
};
```

- `ensureLoaded()`: if `ba-booking` exists parse it into `{ items, trip, contact }` (missing parts fall back to defaults). Otherwise, if `ba-enquiry` exists, parse its string array as slugs → `items`, then `localStorage.removeItem(LEGACY_KEY)` and persist. Always `persist()` after a legacy migration. Never throw on bad JSON.
- `persist()`: writes `{ items, trip, contact }` only when `contact.name` or `contact.email` is non-empty; otherwise writes `{ items, trip }` — contact must not outlive a submission.
- Every action mutates a new state object, calls `persist()` where the change should survive a reload (items, trip, contact, step — `open` is **not** persisted; the panel starts closed), then `emit()`.
- `openBooking({ slug, step })`: `addItem(slug)` when slug present (no dupes), sets `open = true`, `step = step ?? (slug ? 2 : 1)`, clears `error`.
- `submitSuccess(payload)`: `submitting = false`, `error = null`, `lastSent = payload`, `contact = EMPTY_CONTACT`, persist (contact gone from storage).
- `submitFailure(msg)`: `submitting = false`, `error = msg`; contact and items untouched.
- `resetDraft()`: items `[]`, trip `DEFAULT_TRIP`, contact `EMPTY_CONTACT`, `lastSent = undefined`, persist, `open = false`, `step = 1`.
- `continuePlanning()`: `lastSent = undefined`, `step = 1`.
- Selector hook — no re-render when the selected slice is unchanged:

```ts
export function useBooking<T>(selector: (s: BookingState) => T): T {
  const getSnapshot = () => selector(readState());
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
```

(`readState` must return a stable reference when nothing changed — keep a single `state` object replaced only on mutation, so `selector` results compare cleanly with `Object.is`.)

- [ ] Step 5: Run tests, verify pass

```bash
npm test
```

Expected: PASS — all 9 store tests + smoke.

- [ ] Step 6: Commit

```bash
git add app/lib/booking-store.ts tests/booking-store.test.ts
git commit -m "feat: booking store with legacy enquiry migration"
```

### Task 4: Payload, summary builders and transport (TDD)

**Files:**
- Create: `tests/submit-booking.test.ts`, `tests/summary.test.ts`
- Create: `app/lib/submit-booking.ts`, `app/lib/booking-summary.ts`

- [ ] Step 1: Write failing transport tests (payload shape, config error, 2xx, non-2xx, timeout, honeypot)

Create `tests/submit-booking.test.ts`:

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildContactPayload, buildPayload, submitBooking } from "../app/lib/submit-booking";

const baseState = {
  items: [
    { slug: "sunset-cruise", overrides: { adults: 4 } },
    { slug: "boma-dinner" },
  ],
  trip: { arrival: "2026-11-03", departure: "2026-11-09", flexibleDates: false, adults: 2, children: 1, sizeUnconfirmed: false },
  contact: { name: "Sam N", email: "sam@example.com", phone: "+263 77 111 2222", notes: "Anniversary trip" },
  sourceUrl: "/activities/sunset-cruise",
};

const titles: Record<string, string> = { "sunset-cruise": "Sunset Cruise", "boma-dinner": "Boma Dinner" };

describe("buildPayload", () => {
  it("marks itself a booking request and carries titles, overrides and source", () => {
    const p = buildPayload(baseState as never, titles);
    expect(p.kind).toBe("booking-request");
    expect(p.items.map((i) => i.title)).toEqual(["Sunset Cruise", "Boma Dinner"]);
    expect(p.items[0].overrides).toEqual({ adults: 4 });
    expect(p.sourceUrl).toBe("/activities/sunset-cruise");
    expect(p.contact.email).toBe("sam@example.com");
    expect(typeof p.submittedAt).toBe("string");
  });

  it("sends a honeypot field", () => {
    const p = buildPayload(baseState as never, titles);
    expect(p.botcheck).toBe("");
  });
});

describe("buildContactPayload", () => {
  it("marks itself a general enquiry with the topic", () => {
    const p = buildContactPayload({ name: "A", email: "a@b.c", message: "Hello", topic: "Educational Trips" });
    expect(p.kind).toBe("general-enquiry");
    expect(p.message).toContain("Educational Trips");
  });
});

describe("submitBooking", () => {
  const endpoint = "https://example.test/form";

  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_BOOKING_ENDPOINT", endpoint);
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("fails fast with a configuration error when no endpoint is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_BOOKING_ENDPOINT", "");
    await expect(submitBooking({} as never)).rejects.toThrow(/not configured/i);
  });

  it("resolves on 2xx", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("ok", { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);
    await submitBooking({ kind: "booking-request" } as never);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(endpoint);
    expect(init.method).toBe("POST");
    expect(init.headers["Content-Type"]).toContain("application/json");
  });

  it("rejects on non-2xx", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("no", { status: 422 })));
    await expect(submitBooking({ kind: "booking-request" } as never)).rejects.toThrow();
  });

  it("rejects on network error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));
    await expect(submitBooking({ kind: "booking-request" } as never)).rejects.toThrow();
  });

  it("aborts after the 20s timeout", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
        }),
      ),
    );
    const attempt = submitBooking({ kind: "booking-request" } as never);
    const assertion = expect(attempt).rejects.toThrow();
    await vi.advanceTimersByTimeAsync(20_000);
    await assertion;
  });
});
```

- [ ] Step 2: Write failing summary tests (flexible vs unset dates, WhatsApp href, mailto href)

Create `tests/summary.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildMailtoHref, buildSummaryLines, buildWhatsAppHref } from "../app/lib/booking-summary";

const payload = {
  kind: "booking-request",
  contact: { name: "Sam N", email: "sam@example.com", phone: "+263 77 111 2222", notes: "" },
  trip: { arrival: "", departure: "", flexibleDates: true, adults: 2, children: 0, sizeUnconfirmed: false },
  items: [{ slug: "sunset-cruise", title: "Sunset Cruise", overrides: undefined }],
  sourceUrl: "/",
  submittedAt: "2026-10-20T10:00:00.000Z",
  botcheck: "",
} as never;

describe("buildSummaryLines", () => {
  it("distinguishes flexible dates from unset dates", () => {
    const flexible = buildSummaryLines(payload).join("\n");
    expect(flexible).toContain("Dates: flexible");

    const unset = buildSummaryLines({ ...payload, trip: { ...payload.trip, flexibleDates: false } } as never).join("\n");
    expect(unset).toContain("Dates: not set yet");
  });

  it("lists guests, activities and contact", () => {
    const text = buildSummaryLines(payload).join("\n");
    expect(text).toContain("Guests: 2 adults");
    expect(text).toContain("- Sunset Cruise");
    expect(text).toContain("Sam N");
  });

  it("says tailor-made when no activities were selected", () => {
    const text = buildSummaryLines({ ...payload, items: [] } as never).join("\n");
    expect(text).toContain("No activities selected");
  });
});

describe("buildWhatsAppHref", () => {
  it("targets the team number with an encoded summary", () => {
    const href = buildWhatsAppHref(payload);
    expect(href).toContain("wa.me/263778130264");
    expect(href).toContain(encodeURIComponent("Sunset Cruise"));
  });
});

describe("buildMailtoHref", () => {
  it("targets reservations@ with a subject and encoded body", () => {
    const href = buildMailtoHref(payload);
    expect(href.startsWith("mailto:reservations@beneathafricatravel.co.zw?")).toBe(true);
    expect(href).toContain("subject=");
    expect(href).toContain("body=");
  });
});
```

- [ ] Step 3: Run, verify failures

```bash
npm test
```

Expected: FAIL — both new test files fail on missing modules; store + smoke tests still pass.

- [ ] Step 4: Implement `submit-booking.ts`

Create `app/lib/submit-booking.ts`:

```ts
import type { BookingItem, Contact, Trip } from "./booking-store";

export type BookingPayload = {
  kind: "booking-request" | "general-enquiry";
  contact: Contact;
  trip?: Trip;
  items?: { slug: string; title: string; overrides?: BookingItem["overrides"] }[];
  message?: string;
  sourceUrl: string;
  submittedAt: string;
  botcheck: string; // honeypot — always ""
};

type Buildable = {
  items: BookingItem[];
  trip: Trip;
  contact: Contact;
  sourceUrl: string;
};

const TIMEOUT_MS = 20_000;

export function buildPayload(state: Buildable, titles: Record<string, string>): BookingPayload {
  return {
    kind: "booking-request",
    contact: state.contact,
    trip: state.trip,
    items: state.items.map((item) => ({
      slug: item.slug,
      title: titles[item.slug] ?? item.slug,
      overrides: item.overrides,
    })),
    sourceUrl: state.sourceUrl,
    submittedAt: new Date().toISOString(),
    botcheck: "",
  };
}

export function buildContactPayload(input: {
  name: string;
  email: string;
  message: string;
  topic?: string;
}): BookingPayload {
  const topicLine = input.topic ? `Topic: ${input.topic}\n` : "";
  return {
    kind: "general-enquiry",
    contact: { name: input.name, email: input.email },
    message: `${topicLine}${input.message}`,
    sourceUrl: typeof window === "undefined" ? "/contact" : window.location.pathname + window.location.search,
    submittedAt: new Date().toISOString(),
    botcheck: "",
  };
}

export async function submitBooking(payload: BookingPayload): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? "";
  if (!endpoint) {
    throw new Error(
      "Booking endpoint is not configured. Set NEXT_PUBLIC_BOOKING_ENDPOINT (.env.local.example).",
    );
  }
  if (payload.botcheck !== "") {
    /* honeypot tripped — pretend success, never send */
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Submission failed (HTTP ${res.status}).`);
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("The request timed out. Please try again.");
    }
    if (error instanceof Error && /not configured/.test(error.message)) throw error;
    throw new Error(error instanceof Error ? error.message : "Network error. Please try again.");
  } finally {
    clearTimeout(timer);
  }
}
```

- [ ] Step 5: Implement `booking-summary.ts`

Create `app/lib/booking-summary.ts`:

```ts
import { company } from "./content";
import type { BookingPayload } from "./submit-booking";

const NON_GUARANTEE =
  "This is a booking request. Availability, final pricing and payment instructions are confirmed by our team — submitting does not guarantee a booking.";

function dateLine(trip?: BookingPayload["trip"]): string {
  if (trip?.arrival || trip?.departure) {
    return `Dates: ${trip.arrival ?? "?"} → ${trip.departure ?? "?"}`;
  }
  return trip?.flexibleDates ? "Dates: flexible" : "Dates: not set yet";
}

function guestLine(trip?: BookingPayload["trip"]): string {
  if (trip?.sizeUnconfirmed || (trip?.adults == null && trip?.children == null)) {
    return "Guests: not confirmed";
  }
  const adults = trip?.adults ?? 0;
  const children = trip?.children ?? 0;
  return `Guests: ${adults} adult${adults === 1 ? "" : "s"}${children ? `, ${children} child${children === 1 ? "" : "ren"}` : ""}`;
}

export function buildSummaryLines(payload: BookingPayload): string[] {
  if (payload.kind === "general-enquiry") {
    return [`Enquiry from ${payload.contact.name} <${payload.contact.email}>`, "", payload.message ?? ""];
  }

  const items = payload.items ?? [];
  const activityLines =
    items.length > 0
      ? ["Selected activities:", ...items.map((item) => {
          const o = item.overrides;
          const detail = o
            ? ` (${[o.arrival && o.arrival !== payload.trip?.arrival ? `${o.arrival}→${o.departure}` : null, o.adults ? `${o.adults} adults` : null, o.children ? `${o.children} children` : null].filter(Boolean).join(", ")})`
            : "";
          return `- ${item.title}${detail}`;
        })]
      : ["No activities selected — tailor-made request."];

  return [
    `Booking request from ${payload.contact.name} <${payload.contact.email}>${payload.contact.phone ? ` · ${payload.contact.phone}` : ""}`,
    dateLine(payload.trip),
    guestLine(payload.trip),
    "",
    ...activityLines,
    "",
    payload.contact.notes ? `Notes: ${payload.contact.notes}` : "",
    NON_GUARANTEE,
    "",
    `Page: ${payload.sourceUrl}`,
  ].filter((line) => line !== "");
}

const digits = (value: string) => value.replace(/\D/g, "");

export function buildWhatsAppHref(payload: BookingPayload): string {
  const number = digits(company.phones[0].label);
  return `https://wa.me/${number}?text=${encodeURIComponent(buildSummaryLines(payload).join("\n"))}`;
}

export function buildMailtoHref(payload: BookingPayload): string {
  const subject = payload.kind === "booking-request" ? "Booking request" : "Enquiry";
  return `mailto:${company.emails.find((e) => e.label.startsWith("reservations@"))?.label ?? "reservations@beneathafricatravel.co.zw"}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildSummaryLines(payload).join("\n"))}`;
}
```

Note: `company.phones[0].label` and `company.emails` come from `app/lib/content.ts` (already exist; `content.ts` exports `company`).

- [ ] Step 6: Run tests, verify pass

```bash
npm test
```

Expected: PASS — 9 store + 6 transport/summary tests + smoke (16 total).

- [ ] Step 7: Commit

```bash
git add app/lib/submit-booking.ts app/lib/booking-summary.ts tests/submit-booking.test.ts tests/summary.test.ts
git commit -m "feat: booking payload, transport and summary builders"
```

### Task 5: BookingTrigger component

**Files:**
- Create: `app/components/booking/BookingTrigger.tsx`
- Create: `app/components/booking/BookingTrigger.module.css`

- [ ] Step 1: Create component (variants, added-state, add-vs-open routing)

Create `app/components/booking/BookingTrigger.tsx`:

```tsx
"use client";

import { HiCheck, HiOutlinePlus } from "react-icons/hi";
import { addItem, openBooking, useBooking } from "../../lib/booking-store";
import styles from "./BookingTrigger.module.css";

type BookingTriggerProps = {
  /** Activity to preselect. Omit for "Plan Your Journey" (opens step 1 empty). */
  slug?: string;
  label?: string;
  variant?: "pill" | "solid" | "outline" | "compact";
  /** For the compact variant's selected state. */
  viewLabel?: string;
};

/**
 * Every booking entry point in the spec routes through this component.
 * - slug + variant pill/solid/outline: add (or not, if already added) then open step 2.
 * - no slug: open step 1 empty.
 * - variant compact: add only; once added, the control becomes "View trip" -> step 1.
 */
export default function BookingTrigger({
  slug,
  label,
  variant = "solid",
  viewLabel = "View trip",
}: BookingTriggerProps) {
  const added = useBooking((s) => (slug ? s.items.some((i) => i.slug === slug) : false));
  const defaultLabel = slug ? "Book this activity" : "Plan your journey";

  const className = [styles.trigger, styles[variant], added ? styles.added : ""]
    .filter(Boolean)
    .join(" ");

  if (variant === "compact" && slug) {
    return (
      <button
        type="button"
        className={className}
        aria-pressed={added}
        aria-label={added ? `Added — ${viewLabel}` : `Add ${label ?? slug} to your trip`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (added) {
            openBooking({ step: 1 });
          } else {
            addItem(slug);
          }
        }}
      >
        {added ? <HiCheck aria-hidden="true" /> : <HiOutlinePlus aria-hidden="true" />}
        <span>{added ? viewLabel : "Add to trip"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        openBooking(slug ? { slug, step: 2 } : { step: 1 });
      }}
    >
      <span>{label ?? defaultLabel}</span>
    </button>
  );
}
```

- [ ] Step 2: Create styles

Create `app/components/booking/BookingTrigger.module.css`:

```css
.trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid var(--t-heading);
  background: transparent;
  color: var(--t-heading);
  font-family: var(--font-raleway);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.95rem 1.7rem;
  cursor: pointer;
  transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease;
}

.trigger:hover {
  background: var(--t-heading);
  color: var(--cream);
}

.trigger:focus-visible {
  outline: 2px solid var(--gold-deep);
  outline-offset: 3px;
}

.solid {
  background: var(--t-heading);
  color: var(--cream);
  border-color: var(--t-heading);
}

.solid:hover {
  background: var(--gold-deep);
  border-color: var(--gold-deep);
  color: var(--ink);
}

.pill {
  border-radius: 999px;
  padding: 0.7rem 1.4rem;
  font-size: 0.72rem;
}

.outline {
  border-color: currentColor;
}

.added {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--ink);
}

.added:hover {
  background: var(--gold-deep);
  border-color: var(--gold-deep);
  color: var(--ink);
}

.compact {
  padding: 0.45rem 0.8rem;
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  gap: 0.35rem;
}

@media (max-width: 767px) {
  .compact {
    min-height: 44px;
  }
}
```

- [ ] Step 3: `npm run lint` passes

```bash
npm run lint
```

Expected: no errors (unused import warnings are failures — fix if any).

- [ ] Step 4: Commit

```bash
git add app/components/booking/
git commit -m "feat: BookingTrigger entry-point component"
```

### Task 6: Step 1 — Activities view

**Files:**
- Create: `app/components/booking/steps/StepActivities.tsx`
- Create: `app/components/booking/steps/Steps.module.css`

> Dependency note: `app/lib/catalogue.ts` already exports `bookableItems: BookableItem[]` (verified — with `slug`, `title`, `category`, `location`, `image`, `imageAlt`, `summary` fields) plus `findItem(slug)`. No pull-forward needed here; only `FEATURED_SLUGS`/`featuredItems` (QuickBookStrip) are added later in Task 17 Step 1.

- [ ] Step 1: Create step component (filters, add/remove rows, empty state, continue)

Create `app/components/booking/steps/StepActivities.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { HiCheck, HiOutlinePlus, HiX } from "react-icons/hi";
import { bookableItems } from "../../../lib/catalogue";
import { addItem, removeItem, setStep, useBooking } from "../../../lib/booking-store";
import styles from "./Steps.module.css";

const CATEGORIES = ["All", ...Array.from(new Set(bookableItems.map((i) => i.category)))];

export default function StepActivities() {
  const selected = useBooking((s) => s.items);
  const [category, setCategory] = useState("All");

  const selectedSlugs = useMemo(() => new Set(selected.map((i) => i.slug)), [selected]);
  const visible = useMemo(
    () => (category === "All" ? bookableItems : bookableItems.filter((i) => i.category === category)),
    [category],
  );

  return (
    <div className={styles.step}>
      <header className={styles.stepHead}>
        <h2 className={styles.stepTitle}>Choose your experiences</h2>
        <p className={styles.stepLead}>
          Add as many as you like — or continue with none and request a tailor-made journey.
        </p>
      </header>

      <div className={styles.filters} role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={styles.filter}
            data-active={category === c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {visible.length === 0 && <p className={styles.empty}>No experiences in this category yet.</p>}

      <ul className={styles.activityList}>
        {visible.map((item) => {
          const isSelected = selectedSlugs.has(item.slug);
          return (
            <li key={item.slug} className={styles.activityRow} data-selected={isSelected}>
              <span className={styles.activityMedia}>
                <Image src={item.image} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
              </span>
              <span className={styles.activityInfo}>
                <span className={styles.activityCategory}>{item.category} · {item.location}</span>
                <span className={styles.activityName}>{item.title}</span>
              </span>
              <button
                type="button"
                className={styles.activityToggle}
                aria-pressed={isSelected}
                onClick={() => (isSelected ? removeItem(item.slug) : addItem(item.slug))}
              >
                {isSelected ? (
                  <><HiCheck aria-hidden="true" /> Added</>
                ) : (
                  <><HiOutlinePlus aria-hidden="true" /> Add</>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p className={styles.emptyCount} role="status">
        {selected.length === 0
          ? "Nothing selected yet."
          : `${selected.length} experience${selected.length === 1 ? "" : "s"} in your trip.`}
      </p>

      <div className={styles.stepFoot}>
        <button type="button" className={styles.next} onClick={() => setStep(2)}>
          {selected.length === 0 ? "Request a tailor-made journey" : "Continue to dates"}
        </button>
      </div>
    </div>
  );
}
```

- [ ] Step 2: Create shared step styles (skeleton then sections)

Create `app/components/booking/steps/Steps.module.css` with these sections (one edit per section if the file grows beyond ~1000 tokens):

Section A — head/filters/list rows:

```css
.step { display: flex; flex-direction: column; gap: 1.4rem; padding: 0 0 1rem; }
.stepHead { display: grid; gap: 0.4rem; }
.stepTitle { font-family: var(--font-cormorant); font-weight: 400; font-size: 1.65rem; color: var(--t-heading); }
.stepLead { font-family: var(--font-ebgaramond); font-size: 0.98rem; line-height: 1.55; color: var(--t-body); }
.filters { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.filter { border: 1px solid color-mix(in srgb, var(--t-heading) 25%, transparent); background: transparent; color: var(--t-body); font-family: var(--font-raleway); font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.45rem 0.75rem; cursor: pointer; }
.filter[data-active="true"] { background: var(--t-heading); border-color: var(--t-heading); color: var(--cream); }
.activityList { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.6rem; }
.activityRow { display: grid; grid-template-columns: 72px 1fr auto; gap: 0.9rem; align-items: center; padding: 0.55rem; border: 1px solid color-mix(in srgb, var(--t-heading) 16%, transparent); background: var(--cream-3); }
.activityRow[data-selected="true"] { border-color: var(--gold-deep); background: color-mix(in srgb, var(--gold) 14%, transparent); }
.activityMedia { position: relative; width: 72px; height: 72px; overflow: hidden; display: block; }
.activityInfo { display: grid; gap: 0.2rem; min-width: 0; }
.activityCategory { font-family: var(--font-raleway); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--t-muted); }
.activityName { font-family: var(--font-cormorant); font-size: 1.1rem; color: var(--t-heading); }
.activityToggle { display: inline-flex; align-items: center; gap: 0.3rem; border: 1px solid var(--t-heading); background: transparent; color: var(--t-heading); font-family: var(--font-raleway); font-size: 0.64rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.55rem 0.75rem; cursor: pointer; min-height: 40px; }
.activityRow[data-selected="true"] .activityToggle { background: var(--gold); border-color: var(--gold); color: var(--ink); }
.empty, .emptyCount { font-family: var(--font-ebgaramond); font-size: 0.9rem; color: var(--t-muted); }
.emptyCount { text-align: center; }
```

Section B — footer buttons (used by every step):

```css
.stepFoot { display: grid; gap: 0.6rem; }
.next { width: 100%; border: none; background: var(--t-heading); color: var(--cream); font-family: var(--font-raleway); font-size: 0.76rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; padding: 1rem; cursor: pointer; transition: background 0.3s ease; }
.next:hover { background: var(--gold-deep); color: var(--ink); }
.next:focus-visible { outline: 2px solid var(--gold-deep); outline-offset: 3px; }
.back { width: 100%; border: 1px solid color-mix(in srgb, var(--t-heading) 30%, transparent); background: transparent; color: var(--t-body); font-family: var(--font-raleway); font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.8rem; cursor: pointer; }
.back:hover { border-color: var(--t-heading); color: var(--t-heading); }
```

Section C — field rows (dates, details, review):

```css
.field { display: grid; gap: 0.35rem; }
.fieldLabel { font-family: var(--font-raleway); font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--t-muted); }
.input, .textarea, .select { width: 100%; border: 1px solid color-mix(in srgb, var(--t-heading) 25%, transparent); background: #fff; color: var(--t-heading); font-family: var(--font-ebgaramond); font-size: 1rem; padding: 0.7rem 0.8rem; }
.input:focus-visible, .textarea:focus-visible { outline: 2px solid var(--gold-deep); outline-offset: 1px; }
.input[aria-invalid="true"], .textarea[aria-invalid="true"] { border-color: #a13b2d; }
.fieldError { font-family: var(--font-raleway); font-size: 0.72rem; color: #a13b2d; }
.fieldRow { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; }
.checkbox { display: flex; align-items: center; gap: 0.55rem; font-family: var(--font-ebgaramond); font-size: 0.95rem; color: var(--t-body); cursor: pointer; }
.checkbox input { width: 18px; height: 18px; accent-color: var(--gold-deep); }
.block { display: grid; gap: 1rem; padding: 1rem 0; border-top: 1px solid color-mix(in srgb, var(--t-heading) 14%, transparent); }
.notice { font-family: var(--font-ebgaramond); font-size: 0.9rem; line-height: 1.5; color: var(--t-body); background: color-mix(in srgb, var(--gold) 16%, transparent); padding: 0.8rem; border-left: 3px solid var(--gold-deep); }
```

- [ ] Step 3: Lint passes

```bash
npm run lint
```

Expected: no errors.

- [ ] Step 4: Commit

```bash
git add app/components/booking/steps/
git commit -m "feat: booking step 1 — activity browser"
```

### Task 7: Step 2 — Dates & guests view

**Files:**
- Create: `app/components/booking/steps/StepDates.tsx`

- [ ] Step 1: Create component (trip fields, flexible checkbox, size-unconfirmed checkbox, per-activity overrides, gate)

Create `app/components/booking/steps/StepDates.tsx`:

```tsx
"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import {
  setOverride,
  setStep,
  setTrip,
  useBooking,
} from "../../../lib/booking-store";
import styles from "./Steps.module.css";

export default function StepDates() {
  const trip = useBooking((s) => s.trip);
  const items = useBooking((s) => s.items);
  const [expanded, setExpanded] = useState<string | null>(null);

  /* Gate per spec: group size required unless explicitly unconfirmed. Dates never block. */
  const sizeGiven = trip.adults != null || trip.children != null;
  const canContinue = trip.sizeUnconfirmed || sizeGiven;

  const num = (value: string) => (value === "" ? undefined : Math.max(0, Number(value)));

  return (
    <div className={styles.step}>
      <header className={styles.stepHead}>
        <h2 className={styles.stepTitle}>When, and who is travelling?</h2>
        <p className={styles.stepLead}>
          One set of dates and guests for the whole trip. Anything not known yet can
          wait — we will sort the details with you.
        </p>
      </header>

      <div className={styles.field}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={trip.flexibleDates}
            onChange={(e) =>
              setTrip({ flexibleDates: e.target.checked, ...(e.target.checked ? { arrival: "", departure: "" } : {}) })
            }
          />
          My dates are flexible
        </label>
      </div>

      {!trip.flexibleDates && (
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="trip-arrival">Arrival date</label>
            <input
              id="trip-arrival"
              className={styles.input}
              type="date"
              value={trip.arrival ?? ""}
              onChange={(e) => setTrip({ arrival: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="trip-departure">Departure date</label>
            <input
              id="trip-departure"
              className={styles.input}
              type="date"
              value={trip.departure ?? ""}
              onChange={(e) => setTrip({ departure: e.target.value })}
            />
          </div>
        </div>
      )}

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="trip-adults">Adults</label>
          <input
            id="trip-adults"
            className={styles.input}
            type="number"
            min={1}
            inputMode="numeric"
            value={trip.adults ?? ""}
            disabled={trip.sizeUnconfirmed}
            onChange={(e) => setTrip({ adults: num(e.target.value) })}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="trip-children">Children</label>
          <input
            id="trip-children"
            className={styles.input}
            type="number"
            min={0}
            inputMode="numeric"
            value={trip.children ?? ""}
            disabled={trip.sizeUnconfirmed}
            onChange={(e) => setTrip({ children: num(e.target.value) })}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={trip.sizeUnconfirmed}
            onChange={(e) => setTrip({ sizeUnconfirmed: e.target.checked })}
          />
          Group size not confirmed
        </label>
      </div>

      {items.length > 0 && (
        <div className={styles.block}>
          <span className={styles.fieldLabel}>Different dates or guests for one activity?</span>
          {items.map((item) => {
            const isOpen = expanded === item.slug;
            return (
              <div key={item.slug}>
                <button
                  type="button"
                  className={styles.back}
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : item.slug)}
                >
                  {item.title}
                  <HiChevronDown aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className={styles.fieldRow} style={{ marginTop: "0.6rem" }}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>Override arrival</label>
                      <input
                        className={styles.input}
                        type="date"
                        value={item.overrides?.arrival ?? ""}
                        onChange={(e) => setOverride(item.slug, { arrival: e.target.value })}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel}>Override adults</label>
                      <input
                        className={styles.input}
                        type="number"
                        min={1}
                        inputMode="numeric"
                        value={item.overrides?.adults ?? ""}
                        onChange={(e) => setOverride(item.slug, { adults: num(e.target.value) })}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!canContinue && (
        <p className={styles.fieldError} role="alert">
          Set the group size, or tick “Group size not confirmed”.
        </p>
      )}

      <div className={styles.stepFoot}>
        <button type="button" className={styles.next} disabled={!canContinue} onClick={() => setStep(3)}>
          Continue to your details
        </button>
        <button type="button" className={styles.back} onClick={() => setStep(1)}>
          Back to activities
        </button>
      </div>
    </div>
  );
}
```

- [ ] Step 2: Lint passes

```bash
npm run lint
```

Expected: no errors.

- [ ] Step 3: Commit

```bash
git add app/components/booking/steps/StepDates.tsx
git commit -m "feat: booking step 2 — dates and guests with flexible/unconfirmed states"
```

### Task 8: Step 3 — Your details view

**Files:**
- Create: `app/components/booking/steps/StepDetails.tsx`

- [ ] Step 1: Create component (name/email required, phone, notes, inline errors)

Create `app/components/booking/steps/StepDetails.tsx`:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { setContact, setStep, useBooking } from "../../../lib/booking-store";
import styles from "./Steps.module.css";

type Errors = { name?: string; email?: string };

export default function StepDetails() {
  const contact = useBooking((s) => s.contact);
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!contact.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    setErrors(next);
    if (Object.keys(next).length === 0) setStep(4);
  }

  return (
    <form className={styles.step} onSubmit={onSubmit} noValidate>
      <header className={styles.stepHead}>
        <h2 className={styles.stepTitle}>How do we reach you?</h2>
        <p className={styles.stepLead}>
          Your details go to our reservations team with this request — nothing else.
        </p>
      </header>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="bk-name">Your name *</label>
        <input
          id="bk-name"
          className={styles.input}
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "bk-name-error" : undefined}
          value={contact.name}
          onChange={(e) => setContact({ name: e.target.value })}
        />
        {errors.name && <span className={styles.fieldError} id="bk-name-error">{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="bk-email">Email *</label>
        <input
          id="bk-email"
          className={styles.input}
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "bk-email-error" : undefined}
          value={contact.email}
          onChange={(e) => setContact({ email: e.target.value })}
        />
        {errors.email && <span className={styles.fieldError} id="bk-email-error">{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="bk-phone">Phone or WhatsApp</label>
        <input
          id="bk-phone"
          className={styles.input}
          type="tel"
          autoComplete="tel"
          value={contact.phone ?? ""}
          onChange={(e) => setContact({ phone: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="bk-notes">Anything we should know?</label>
        <textarea
          id="bk-notes"
          className={styles.textarea}
          rows={3}
          placeholder="Destinations, occasions, mobility needs, budget hints…"
          value={contact.notes ?? ""}
          onChange={(e) => setContact({ notes: e.target.value })}
        />
      </div>

      <div className={styles.stepFoot}>
        <button className={styles.next} type="submit">
          Continue to review
        </button>
        <button className={styles.back} type="button" onClick={() => setStep(2)}>
          Back to dates
        </button>
      </div>
    </form>
  );
}
```

- [ ] Step 2: Lint passes

```bash
npm run lint
```

Expected: no errors.

- [ ] Step 3: Commit

```bash
git add app/components/booking/steps/StepDetails.tsx
git commit -m "feat: booking step 3 — contact details with inline validation"
```

### Task 9: Step 4 — Review & request view

**Files:**
- Create: `app/components/booking/steps/StepReview.tsx`

- [ ] Step 1: Create component (summary, explicit date/guest lines, non-guarantee copy, Explore More, error banner + retry + fallbacks, submit)

Create `app/components/booking/steps/StepReview.tsx`:

```tsx
"use client";

import { useState } from "react";
import { bookableItems } from "../../../lib/catalogue";
import {
  readState,
  setStep,
  submitFailure,
  submitStart,
  submitSuccess,
  useBooking,
} from "../../../lib/booking-store";
import { buildPayload, submitBooking } from "../../../lib/submit-booking";
import { buildMailtoHref, buildWhatsAppHref } from "../../../lib/booking-summary";
import styles from "./Steps.module.css";

const TITLES = new Map(bookableItems.map((i) => [i.slug, i.title]));

export default function StepReview() {
  const state = useBooking((s) => s);
  const [sending, setSending] = useState(false);
  const { trip, items, contact, error } = state;

  const dateText = trip.arrival || trip.departure
    ? `${trip.arrival ?? "?"} → ${trip.departure ?? "?"}`
    : trip.flexibleDates
      ? "Flexible — dates not fixed yet"
      : "Not set yet";
  const sizeText = trip.sizeUnconfirmed
    ? "Not confirmed"
    : `${trip.adults ?? 0} adult${(trip.adults ?? 0) === 1 ? "" : "s"}${(trip.children ?? 0) ? `, ${trip.children} children` : ""}`;

  async function onSubmit() {
    if (sending) return; /* in-flight lock — duplicate submits impossible */
    setSending(true);
    submitStart();
    try {
      /* read the live module state: contact/trip may have just changed */
      const live = readState();
      const payload = buildPayload(
        { items: live.items, trip: live.trip, contact: live.contact, sourceUrl: window.location.pathname },
        Object.fromEntries(TITLES),
      );
      await submitBooking(payload);
      submitSuccess(payload);
      setStep(5);
    } catch (err) {
      submitFailure(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  const fallbackPayload = () =>
    buildPayload(
      { items, trip, contact, sourceUrl: typeof window === "undefined" ? "/" : window.location.pathname },
      Object.fromEntries(TITLES),
    );

  return (
    <div className={styles.step}>
      <header className={styles.stepHead}>
        <h2 className={styles.stepTitle}>Review your request</h2>
      </header>

      <div className={styles.block}>
        <span className={styles.fieldLabel}>Your details</span>
        <p className={styles.stepLead}>
          {contact.name} · {contact.email}
          {contact.phone ? ` · ${contact.phone}` : ""}
        </p>
      </div>

      <div className={styles.block}>
        <span className={styles.fieldLabel}>Dates & guests</span>
        <p className={styles.stepLead}>Dates: {dateText}</p>
        <p className={styles.stepLead}>Guests: {sizeText}</p>
      </div>

      <div className={styles.block}>
        <span className={styles.fieldLabel}>Experiences</span>
        {items.length === 0 ? (
          <p className={styles.stepLead}>
            No activities selected — this will be sent as a tailor-made journey request.
          </p>
        ) : (
          <ul className={styles.activityList}>
            {items.map((item) => (
              <li key={item.slug} className={styles.activityRow} data-selected>
                <span className={styles.activityInfo}>
                  <span className={styles.activityName}>{TITLES.get(item.slug) ?? item.slug}</span>
                  {item.overrides && (item.overrides.arrival || item.overrides.adults) && (
                    <span className={styles.activityCategory}>
                      {item.overrides.arrival ? `from ${item.overrides.arrival}` : ""}
                      {item.overrides.adults ? ` · ${item.overrides.adults} adults` : ""}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
        <button type="button" className={styles.back} onClick={() => setStep(1)}>
          Explore more experiences
        </button>
      </div>

      <p className={styles.notice}>
        This is a booking request. Availability, final pricing and payment instructions
        are confirmed by our team — submitting does not guarantee a booking.
      </p>

      {error && (
        <div className={styles.errorBanner} role="alert">
          <p>{error}</p>
          <p className={styles.errorHelp}>
            Your details are still here. You can also send the request another way:
          </p>
          <div className={styles.errorActions}>
            <a className={styles.back} href={buildWhatsAppHref(fallbackPayload())} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className={styles.back} href={buildMailtoHref(fallbackPayload())}>Email</a>
          </div>
        </div>
      )}

      <div className={styles.stepFoot}>
        <p className={styles.liveStatus} role="status" aria-live="polite">
          {sending ? "Sending your request…" : error ?? ""}
        </p>
        <button type="button" className={styles.next} onClick={onSubmit} disabled={sending}>
          {sending ? "Sending…" : error ? "Try again" : "Request booking"}
        </button>
        <button type="button" className={styles.back} onClick={() => setStep(3)}>
          Back to your details
        </button>
      </div>
    </div>
  );
}
```

Add the styles this step needs — append to `app/components/booking/steps/Steps.module.css`:

```css
.liveStatus { margin: 0; min-height: 1.1em; font-family: var(--font-raleway); font-size: 0.72rem; letter-spacing: 0.06em; color: var(--t-muted); text-align: center; }
.errorBanner { display: grid; gap: 0.5rem; border-left: 3px solid #a13b2d; background: color-mix(in srgb, #a13b2d 8%, transparent); padding: 0.8rem; font-family: var(--font-ebgaramond); font-size: 0.92rem; color: var(--t-heading); }
.errorHelp { margin: 0; font-size: 0.85rem; color: var(--t-body); }
.errorActions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.errorActions .back { width: auto; padding: 0.55rem 0.9rem; }
```

- [ ] Step 2: Lint passes

```bash
npm run lint
```

Expected: no errors.

- [ ] Step 3: Commit

```bash
git add app/components/booking/steps/StepReview.tsx
git commit -m "feat: booking step 4 — review, non-guarantee copy, submit with failure fallbacks"
```

### Task 10: Step 5 — Request received view

**Files:**
- Create: `app/components/booking/steps/StepDone.tsx`

- [ ] Step 1: Create component (snapshot summary, optional WhatsApp with press-Send label, Done, Continue planning)

Create `app/components/booking/steps/StepDone.tsx`:

```tsx
"use client";

import { HiArrowRight } from "react-icons/hi";
import { closeBooking, continuePlanning, resetDraft, useBooking } from "../../../lib/booking-store";
import { buildSummaryLines, buildWhatsAppHref } from "../../../lib/booking-summary";
import styles from "./Steps.module.css";

export default function StepDone() {
  const lastSent = useBooking((s) => s.lastSent);

  if (!lastSent) {
    /* Reached only if the draft was reset while open — fall back to the browser. */
    return (
      <div className={styles.step}>
        <header className={styles.stepHead}>
          <h2 className={styles.stepTitle}>No recent request</h2>
        </header>
        <div className={styles.stepFoot}>
          <button type="button" className={styles.next} onClick={() => continuePlanning()}>
            Start planning
          </button>
        </div>
      </div>
    );
  }

  const summary = buildSummaryLines(lastSent).join("\n");

  return (
    <div className={styles.step}>
      <header className={styles.stepHead}>
        <h2 className={styles.stepTitle}>Your request has been sent</h2>
        <p className={styles.stepLead}>
          Thank you, {lastSent.contact.name.split(" ")[0] || "traveller"}. Our team will
          come back to you personally with availability, pricing and the next steps —
          usually within one working day.
        </p>
      </header>

      <div className={styles.block}>
        <span className={styles.fieldLabel}>What we received</span>
        <pre className={styles.snapshot}>{summary}</pre>
      </div>

      <div className={styles.block}>
        <span className={styles.fieldLabel}>Want a faster reply?</span>
        <a
          className={styles.next}
          href={buildWhatsAppHref(lastSent)}
          target="_blank"
          rel="noreferrer"
          style={{ textAlign: "center", textDecoration: "none" }}
        >
          Continue on WhatsApp
        </a>
        <p className={styles.emptyCount}>
          Opens WhatsApp with your request filled in — press Send to share it. Optional.
        </p>
      </div>

      <div className={styles.stepFoot}>
        <button
          type="button"
          className={styles.back}
          onClick={() => {
            resetDraft();
            closeBooking();
          }}
        >
          Done — start a new trip later
          <HiArrowRight aria-hidden="true" />
        </button>
        <button type="button" className={styles.back} onClick={() => continuePlanning()}>
          Keep my selections and explore more
        </button>
      </div>
    </div>
  );
}
```

Add the one style this step needs — append to `app/components/booking/steps/Steps.module.css` (error-banner styles were already added in Task 9):

```css
.snapshot { font-family: var(--font-ebgaramond); font-size: 0.85rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word; color: var(--t-body); background: var(--cream-3); border: 1px solid color-mix(in srgb, var(--t-heading) 14%, transparent); padding: 0.8rem; margin: 0; max-height: 180px; overflow-y: auto; }
```

- [ ] Step 2: Lint passes

```bash
npm run lint
```

Expected: no errors.

- [ ] Step 3: Commit

```bash
git add app/components/booking/steps/
git commit -m "feat: booking step 5 — confirmation with optional WhatsApp follow-up"
```

### Task 11: BookingPanel shell

**Files:** `app/components/booking/BookingPanel.tsx`, `app/components/booking/BookingPanel.module.css`

- [ ] Step 1: Create panel component (framer-motion drawer, `?booking=1` history sync, summary rail, step switch, focus trap, ESC, focus restore, body scroll lock, anchored mobile CTA)

Create `app/components/booking/BookingPanel.tsx`:

```tsx
"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { bookableItems } from "../../lib/catalogue";
import { closeBooking, setStep, useBooking } from "../../lib/booking-store";
import BookingTrigger from "./BookingTrigger";
import StepActivities from "./steps/StepActivities";
import StepDates from "./steps/StepDates";
import StepDetails from "./steps/StepDetails";
import StepReview from "./steps/StepReview";
import StepDone from "./steps/StepDone";
import styles from "./BookingPanel.module.css";

const TITLES = new Map(bookableItems.map((i) => [i.slug, i.title]));
const STEP_NAMES = ["Activities", "Dates & guests", "Your details", "Review", "Received"];

/* ?booking=1 keeps the panel addressable; back-navigation closes it (spec). */
function pushBookingParam() {
  const url = new URL(window.location.href);
  if (url.searchParams.get("booking") !== "1") {
    url.searchParams.set("booking", "1");
    window.history.pushState({ booking: true }, "", url);
  }
}

function removeBookingParam() {
  const url = new URL(window.location.href);
  if (url.searchParams.has("booking")) {
    url.searchParams.delete("booking");
    window.history.replaceState({}, "", url.pathname + url.search);
  }
}

export default function BookingPanel() {
  const open = useBooking((s) => s.open);
  const step = useBooking((s) => s.step);
  const items = useBooking((s) => s.items);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => closeBooking(), []);

  /* Open lifecycle: history param, scroll lock, initial focus, popstate close. */
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    pushBookingParam();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => closeRef.current?.focus());

    function onPopState() {
      if (useBooking.getState().open) closeBooking();
    }
    window.addEventListener("popstate", onPopState);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("popstate", onPopState);
      removeBookingParam();
      lastFocused.current?.focus?.();
    };
  }, [open]);

  /* Focus trap + Escape. */
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const railTitle = STEP_NAMES[Math.max(0, step - 1)];

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={styles.scrim}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.aside
              ref={panelRef}
              className={styles.panel}
              role="dialog"
              aria-modal="true"
              aria-label="Plan your journey"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            >
              <header className={styles.header}>
                <div className={styles.headerText}>
                  <span className={styles.eyebrow}>Plan your journey</span>
                  <span className={styles.railTitle}>{railTitle}</span>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  className={styles.close}
                  onClick={close}
                  aria-label="Close"
                >
                  <HiX aria-hidden="true" />
                </button>
              </header>

              {step > 1 && step < 5 && (
                <nav className={styles.rail} aria-label="Booking steps">
                  {STEP_NAMES.slice(0, 4).map((name, index) => {
                    const number = index + 1;
                    return (
                      <button
                        key={name}
                        type="button"
                        className={styles.railStep}
                        aria-current={step === number ? "step" : undefined}
                        onClick={() => setStep(number)}
                      >
                        <span className={styles.railNumber}>{number}</span>
                        <span className={styles.railName}>{name}</span>
                      </button>
                    );
                  })}
                </nav>
              )}

              <div className={styles.body}>
                {step === 1 && <StepActivities />}
                {step === 2 && <StepDates />}
                {step === 3 && <StepDetails />}
                {step === 4 && <StepReview />}
                {step === 5 && <StepDone />}
              </div>

              {step !== 5 && (
                <footer className={styles.foot}>
                  <div className={styles.footSummary}>
                    <span className={styles.footCount}>
                      {items.length === 0
                        ? "No experiences selected yet"
                        : `${items.length} experience${items.length === 1 ? "" : "s"} · ${items
                            .map((i) => TITLES.get(i.slug) ?? i.slug)
                            .slice(0, 2)
                            .join(", ")}${items.length > 2 ? "…" : ""}`}
                    </span>
                    <BookingTrigger
                      slug={undefined}
                      variant="compact"
                      label="Add experiences"
                      viewLabel="Add experiences"
                    />
                  </div>
                </footer>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Anchored mobile CTA — hidden while the panel is open (CSS). */}
      <div className={styles.anchor} data-panel-open={open}>
        <BookingTrigger variant="solid" label="Plan your journey" />
      </div>
    </>
  );
}
```

- [ ] Step 2: Create panel styles

Create `app/components/booking/BookingPanel.module.css`:

```css
.scrim { position: fixed; inset: 0; background: rgba(12, 11, 9, 0.55); z-index: 90; }

.panel { position: fixed; top: 0; right: 0; height: 100dvh; width: min(520px, 100vw); background: var(--cream); color: var(--t-heading); z-index: 95; display: flex; flex-direction: column; box-shadow: -24px 0 60px rgba(12, 11, 9, 0.25); }

.header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.1rem 1.3rem; border-bottom: 1px solid color-mix(in srgb, var(--t-heading) 16%, transparent); }
.headerText { display: grid; gap: 0.2rem; min-width: 0; }
.eyebrow { font-family: var(--font-raleway); font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--t-muted); }
.railTitle { font-family: var(--font-cormorant); font-size: 1.35rem; color: var(--t-heading); }
.close { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid color-mix(in srgb, var(--t-heading) 30%, transparent); background: transparent; color: var(--t-heading); font-size: 1.3rem; cursor: pointer; flex-shrink: 0; }
.close:hover { background: var(--t-heading); color: var(--cream); }
.close:focus-visible, .railStep:focus-visible { outline: 2px solid var(--gold-deep); outline-offset: 3px; }

.rail { display: flex; gap: 0.2rem; padding: 0.7rem 1.3rem; border-bottom: 1px solid color-mix(in srgb, var(--t-heading) 12%, transparent); overflow-x: auto; }
.railStep { display: inline-flex; align-items: center; gap: 0.4rem; border: none; background: transparent; color: var(--t-muted); font-family: var(--font-raleway); font-size: 0.64rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.4rem 0.55rem; cursor: pointer; white-space: nowrap; }
.railStep[aria-current="step"] { color: var(--t-heading); background: color-mix(in srgb, var(--gold) 22%, transparent); }
.railNumber { display: grid; place-items: center; width: 20px; height: 20px; border: 1px solid currentColor; font-size: 0.6rem; }
.railName { display: none; }
@media (min-width: 480px) { .railName { display: inline; } }

.body { flex: 1; overflow-y: auto; padding: 1.3rem; }

.foot { border-top: 1px solid color-mix(in srgb, var(--t-heading) 16%, transparent); padding: 0.9rem 1.3rem; background: var(--cream-2); }
.footSummary { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; }
.footCount { font-family: var(--font-ebgaramond); font-size: 0.88rem; color: var(--t-body); min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.anchor { display: none; }

@media (max-width: 767px) {
  .panel { width: 100vw; }
  .anchor { display: block; position: fixed; left: 1rem; right: 1rem; bottom: calc(1rem + env(safe-area-inset-bottom)); z-index: 60; }
  .anchor[data-panel-open="true"] { display: none; }
  .anchor > * { display: flex; width: 100%; }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .panel { width: 480px; }
}
```

- [ ] Step 3: Lint passes

```bash
npm run lint
```

Expected: no errors.

- [ ] Step 4: Commit

```bash
git add app/components/booking/BookingPanel.tsx app/components/booking/BookingPanel.module.css
git commit -m "feat: booking drawer shell with summary rail, focus trap and anchored CTA"
```

### Task 12: Rewire InteriorPage

**Files:** `app/components/InteriorPage.tsx`

- [ ] Step 1: Read the file first; locate the hero action, quick-facts cell controls and the inline enquiry CTA (line numbers shift — re-confirm before editing). Replace every `AddToEnquiry`/enquiry usage with `BookingTrigger` (import `./booking/BookingTrigger`):
  - Hero: pass `action={<BookingTrigger slug={item.slug} variant="solid" label="Book this activity" />}` into `PageHero` (check `PageHero` prop name — it is `action?: ReactNode`).
  - Quick-facts cells: `<BookingTrigger slug={item.slug} variant="compact" />` (add-only, becomes "View trip").
  - Inline "Ready to experience…" block: `variant="solid"` with `label="Book this activity"`.
- [ ] Step 2: Remove now-unused imports (`AddToEnquiry`, enquiry store, mailto helpers). Lint passes:

```bash
npm run lint
```

Expected: no errors.

- [ ] Step 3: Commit

```bash
git add app/components/InteriorPage.tsx
git commit -m "feat: interior pages use booking CTAs (hero, cells, inline)"
```

### Task 13: Mount panel, delete the old system

**Files:** `app/layout.tsx`; delete `EnquiryTray.*`, `AddToEnquiry.*`. Keep `app/lib/enquiry-store.ts` for now — `ContactEnquiryForm.tsx` still imports it until Task 19.

- [ ] Step 1: Grep for remaining importers before deleting (this machine has no `rg` — use PowerShell):

```powershell
Get-ChildItem -Recurse app -Include *.ts,*.tsx | Select-String -Pattern "EnquiryTray|AddToEnquiry|enquiry-store" | ForEach-Object { "$($_.Path):$($_.LineNumber)" }
```

Expected hits: `app/layout.tsx` (swapped below), `ContactEnquiryForm.tsx` + `enquiry-store.ts` themselves (expected until Task 19), `AddToEnquiry.tsx`/`EnquiryTray.tsx` (deleted below). Any **other** component hit must be rewired to `BookingTrigger` before proceeding.

- [ ] Step 2: Swap `EnquiryTray` for `BookingPanel` in `app/layout.tsx` (import `./components/booking/BookingPanel`, render `<BookingPanel />`).

- [ ] Step 3: Delete the enquiry UI files (do **not** delete `enquiry-store.ts` yet):

```bash
git rm app/components/EnquiryTray.tsx app/components/EnquiryTray.module.css app/components/AddToEnquiry.tsx app/components/AddToEnquiry.module.css
```

- [ ] Step 4: Lint + build pass

```bash
npm run lint
npm run build
```

Expected: both pass. `npm run build` is the first full compile of the new panel — fix any type errors it surfaces.

- [ ] Step 5: Commit

```bash
git add -A
git commit -m "feat: mount BookingPanel, remove enquiry tray components"
```

### Task 14: Header CTAs

**Files:** `app/components/SiteHeader.tsx`, `app/components/SiteHeader.module.css`

- [ ] Step 1: Read `SiteHeader.tsx` first (structure: desktop nav pill, mobile overlay menu). Add:
  - Desktop nav CTA: `<BookingTrigger slug={undefined} variant="pill" label="Plan Your Journey" />` as the last item of the nav (import `./booking/BookingTrigger`).
  - Mobile overlay: same trigger rendered as a full-width control in the open overlay, closing behaviour unchanged (trigger opens the panel on top — panel z-index 95 sits above the overlay).
  - Remove any existing enquiry trigger in the header (grep `enquiry` in the file), and replace the overlay's `mailto:reservations@…` link (~line 268) with either the same `BookingTrigger` or a plain `<Link href="/contact">` — no mailto CTAs remain in the header.
- [ ] Step 2: Add styles to `SiteHeader.module.css` for the nav CTA (reserve horizontal space, gold hover, hide below the desktop breakpoint if the overlay shows it instead — follow whatever breakpoint split the existing nav uses):

```css
.navCta { margin-left: 0.6rem; }
@media (max-width: 767px) { .navCta { display: none; } }
```

- [ ] Step 3: Lint passes

```bash
npm run lint
```

Expected: no errors.

- [ ] Step 4: Commit

```bash
git add app/components/SiteHeader.tsx app/components/SiteHeader.module.css
git commit -m "feat: header Plan Your Journey CTA (desktop pill + overlay)"
```

### Task 15: Homepage CTAs (hero pill, §11 band, §12 trigger)

**Files:** `app/components/home/Home.tsx`, `app/components/home/Home.module.css`

- [ ] Step 1: Read `Home.tsx`. Locate: hero pills (hardcoded, near top), the Enquiry form section (~§11, uses a local `Enquiry` component with 8 mailto fields), final CTA section (~§12).

- [ ] Step 2: Hero — add a "Plan your journey" pill as the first/primary pill:

```tsx
<BookingTrigger slug={undefined} variant="pill" label="Plan your journey" />
```

(import `../booking/BookingTrigger`; match the existing pill markup/classes around it — if the hero pills are `<a>` styled with a class, wrap or restyle the trigger with that class instead of the built-in pill look.)

- [ ] Step 3: Delete the local `Enquiry` component definition from `Home.tsx` (the whole 8-field form + its `Enquiry` function) and rebuild §11 as a compact band:

```tsx
<section className={styles.enquiryBand} aria-labelledby="enquiry-band-title">
  <div className={styles.enquiryBandText}>
    <h2 id="enquiry-band-title">Not sure where to start?</h2>
    <p>Send us a quick note — or build a booking request with dates and activities.</p>
  </div>
  <div className={styles.enquiryBandActions}>
    <BookingTrigger slug={undefined} variant="solid" label="Build a booking request" />
    <a className={styles.enquiryBandWa} href="https://wa.me/263778130264" target="_blank" rel="noreferrer">
      Chat on WhatsApp
    </a>
  </div>
</section>
```

- [ ] Step 4: §12 final CTA — replace the primary link (`finalCta.primary` / hardcoded "Plan Your Journey" `<a href="/contact">`) with `<BookingTrigger slug={undefined} variant="solid" label="Plan your journey" />`. Also swap `finalCta.secondary.href` in `app/lib/home.ts` from the `mailto:reservations@…` string to `"/contact"` (keeps "Contact Our Team" but removes the last mailto CTA — Task 19's grep must come back clean).

- [ ] Step 5: Styles — append to `Home.module.css`:

```css
.enquiryBand { display: grid; gap: 1.2rem; padding: clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem); background: var(--cream-3); border-top: 1px solid color-mix(in srgb, var(--t-heading) 14%, transparent); border-bottom: 1px solid color-mix(in srgb, var(--t-heading) 14%, transparent); }
.enquiryBandText { display: grid; gap: 0.5rem; max-width: 46ch; }
.enquiryBandText h2 { font-family: var(--font-cormorant); font-weight: 400; font-size: clamp(1.7rem, 3vw, 2.2rem); color: var(--t-heading); }
.enquiryBandText p { font-family: var(--font-ebgaramond); font-size: 1rem; line-height: 1.55; color: var(--t-body); }
.enquiryBandActions { display: flex; flex-wrap: wrap; gap: 0.8rem; align-items: center; }
.enquiryBandWa { font-family: var(--font-raleway); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--t-heading); text-decoration: underline; text-underline-offset: 4px; padding: 0.95rem 0.4rem; }
@media (min-width: 768px) { .enquiryBand { grid-template-columns: 1fr auto; align-items: center; } }
```

- [ ] Step 6: Lint passes

```bash
npm run lint
```

Expected: no errors; `Enquiry`/mailto strings gone from `Home.tsx` (grep `mailto` in the file → none).

- [ ] Step 7: Commit

```bash
git add app/components/home/Home.tsx app/components/home/Home.module.css
git commit -m "feat: homepage hero, band and final CTA route to booking panel"
```

### Task 16: Quick-book strip

**Files:** `app/components/booking/QuickBookStrip.tsx`, `app/components/booking/QuickBookStrip.module.css`, modify `app/components/home/Home.tsx`

- [ ] Step 1: Create strip component (featured cards + Book Now)

Create `app/components/booking/QuickBookStrip.tsx`:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { featuredItems } from "../../lib/catalogue";
import BookingTrigger from "./BookingTrigger";
import styles from "./QuickBookStrip.module.css";

export default function QuickBookStrip() {
  const items = featuredItems;
  if (items.length === 0) return null;

  return (
    <section className={styles.strip} aria-labelledby="quick-book-title">
      <div className={styles.head}>
        <h2 id="quick-book-title" className={styles.title}>
          Book in a few clicks
        </h2>
        <Link className={styles.all} href="/experiences">
          All experiences
        </Link>
      </div>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.slug} className={styles.card}>
            <Link href={`/activities/${item.slug}`} className={styles.media}>
              <Image src={item.image} alt="" fill sizes="(max-width: 767px) 70vw, 240px" style={{ objectFit: "cover" }} />
            </Link>
            <div className={styles.info}>
              <span className={styles.category}>{item.category}</span>
              <Link href={`/activities/${item.slug}`} className={styles.name}>
                {item.title}
              </Link>
              <div className={styles.action}>
                <BookingTrigger slug={item.slug} variant="solid" label="Book now" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] Step 2: Styles

Create `app/components/booking/QuickBookStrip.module.css`:

```css
.strip { padding: clamp(2rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem); background: var(--cream-2); border-bottom: 1px solid color-mix(in srgb, var(--t-heading) 12%, transparent); }
.head { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; margin-bottom: 1.4rem; }
.title { font-family: var(--font-cormorant); font-weight: 400; font-size: clamp(1.5rem, 2.6vw, 2rem); color: var(--t-heading); }
.all { font-family: var(--font-raleway); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--t-body); text-decoration: underline; text-underline-offset: 4px; }
.grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.card { display: grid; gap: 0.7rem; border: 1px solid color-mix(in srgb, var(--t-heading) 14%, transparent); background: var(--cream); padding: 0.7rem; }
.media { position: relative; display: block; aspect-ratio: 4 / 3; overflow: hidden; }
.info { display: grid; gap: 0.4rem; }
.category { font-family: var(--font-raleway); font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--t-muted); }
.name { font-family: var(--font-cormorant); font-size: 1.2rem; line-height: 1.2; color: var(--t-heading); text-decoration: none; }
.name:hover { text-decoration: underline; text-underline-offset: 3px; }
.action > * { width: 100%; }
@media (max-width: 1199px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 479px) { .grid { grid-template-columns: 1fr; } }
```

- [ ] Step 3: Insert directly under hero in `Home.tsx` (first section after the hero block, before the itinerary/§2 section): `<QuickBookStrip />` with import `../booking/QuickBookStrip`. Lint passes:

```bash
npm run lint
```

Expected: no errors. (`featuredItems` is created in Task 17 Step 1 — if it doesn't exist yet, pull that step forward now and re-run; `bookableItems`/`findItem` already exist in `catalogue.ts`.)

- [ ] Step 4: Commit

```bash
git add app/components/booking/QuickBookStrip.tsx app/components/booking/QuickBookStrip.module.css app/components/home/Home.tsx
git commit -m "feat: quick-book strip under homepage hero"
```

### Task 17: Experiences bookable grid

**Files:** `app/lib/catalogue.ts`, `app/components/CardGrid.tsx`, `app/components/ListingPage.tsx`, `app/experiences/page.tsx`

Verified reality: `/experiences` renders `ListingPage` with `experienceCards` (overview-page `CardLink`s from `content.ts` — not bookable items). The bookable grid is therefore an **additional section** of `/experiences`, not a replacement. `catalogue.ts` already has `bookableItems` and `findItem`.

- [ ] Step 1: Add `FEATURED_SLUGS` + `featuredItems` + `bookableCards` to `app/lib/catalogue.ts` (append near `findItem`):

```ts
export const FEATURED_SLUGS = [
  "guided-tour-of-the-falls",
  "helicopter-flight",
  "white-water-rafting",
  "game-drives",
  "sunset-cruise",
  "breakfast-cruise",
  "boma-dinner",
  "chobe-day-trip",
];

export const featuredItems: BookableItem[] = FEATURED_SLUGS
  .map((slug) => findItem(slug))
  .filter((item): item is BookableItem => Boolean(item));

/** Bookable items as CardLink-shaped cards pointing at /activities/[slug]. */
export const bookableCards: CardLink[] = featuredItems.map((item) => ({
  href: `/activities/${item.slug}`,
  title: item.title,
  description: item.summary,
  image: item.image,
}));
```

(Import `CardLink` from `./content`; adapt field names to the real `CardLink` type — it is `{ href, title, image?, description? }` as used by `CardGrid`.)

- [ ] Step 2: Add `renderAction?: (item: CardLink) => ReactNode` to `app/components/CardGrid.tsx`. Read the file first. Render the slot **after** the `</Link>` but **inside** the `motion.div.cell` (line ~105) — the whole card is one anchor, and `BookingTrigger` is a `<button>`; a button must never nest inside an anchor (invalid HTML + broken a11y):

```tsx
</Link>
{renderAction?.(item)}
</motion.div>
```

Add a `.cardAction { margin-top: 0.6rem; }` style to `CardGrid.module.css` if the slot needs spacing. Default callers pass nothing — behaviour unchanged.

- [ ] Step 3: Forward the slot through `ListingPage` (it renders `<CardGrid items={items} …>`): add the same optional `renderAction` prop and pass it to `CardGrid`.

- [ ] Step 4: On `app/experiences/page.tsx`, render a second `ListingPage`-style section **or** (simpler, recommended) pass `renderAction` only where bookable cards are shown: append to the page a `CardGrid` of `bookableCards` with heading like "Book by experience" and:

```tsx
renderAction={(item) => (
  <BookingTrigger slug={item.href.split("/").pop()} variant="compact" />
)}
```

(Import `BookingTrigger` from `../components/booking/BookingTrigger` and `bookableCards` from `../lib/catalogue`. If instead wiring `experienceCards`, only render the trigger when `findItem(slug)` exists — overview slugs like `victoria-falls` aren't bookable.)

- [ ] Step 5: Lint + build pass

```bash
npm run lint
npm run build
```

Expected: both pass.

- [ ] Step 6: Commit

```bash
git add app/lib/catalogue.ts app/components/CardGrid.tsx app/components/CardGrid.module.css app/components/ListingPage.tsx app/experiences/page.tsx
git commit -m "feat: bookable experiences grid with add-to-trip actions"
```

### Task 18: PageCta trigger

**Files:** `app/components/PageCta.tsx`

- [ ] Step 1: Read the file; replace the primary action `<a>`/button with `<BookingTrigger slug={undefined} variant="solid" label={...existing label unchanged} />`. Secondary/WhatsApp action stays a link. Import `./booking/BookingTrigger`.
- [ ] Step 2: Lint passes

```bash
npm run lint
```

Expected: no errors.

- [ ] Step 3: Commit

```bash
git add app/components/PageCta.tsx
git commit -m "feat: PageCta primary action opens booking panel"
```

### Task 19: Light contact form + ranjis removal

**Files:** `app/components/ContactEnquiryForm.tsx`, `app/components/ContactEnquiryForm.module.css`, `app/lib/content.ts`; delete `app/lib/enquiry-store.ts`

- [ ] Step 1: Read `ContactEnquiryForm.tsx`. Rewrite to the light form:
  - Fields: name, email, message (textarea), topic via `?topic=` query prefill (read with `useSearchParams` inside a `<Suspense>` boundary if the page is a server component — check how the form is mounted).
  - On submit: `submitBooking(buildContactPayload({ name, email, message, topic }))`; success → inline confirmation state ("Thank you — we'll be in touch"); failure → keep values, show error with retry + WhatsApp/mailto fallback links (`https://wa.me/263778130264`, `mailto:reservations@beneathafricatravel.co.zw`).
  - Delete all `mailto:` construction (the `ENQUIRY_EMAIL = "ranjis@…"` constant and its two uses) and the 8-field layout; **drop the enquiry-store import** (`useEnquiryItems`, `clearItems`, `removeItem` — the selected-items display goes away; items now live only in the booking panel). Keep existing field styling classes where sensible (adjust `ContactEnquiryForm.module.css` for 3 fields).
- [ ] Step 2: Remove the `ranjis@…` entry from `company.emails` in `app/lib/content.ts` (delete the entry; keep `reservations@` — other pages read `company.emails`). Do **not** touch the `/about/ranjis` biography pages or nav links — those are the person, not the address.
- [ ] Step 3: Greps confirm the end state; lint passes (no `rg` on this machine — PowerShell):

```powershell
Get-ChildItem -Recurse app -Include *.ts,*.tsx | Select-String -Pattern "ranjis@" | ForEach-Object { "$($_.Path):$($_.LineNumber)" }
Get-ChildItem -Recurse app -Include *.ts,*.tsx | Select-String -Pattern "mailto:" | ForEach-Object { "$($_.Path):$($_.LineNumber)" }
npm run lint
```

Expected: `ranjis@` → no matches. `mailto:` → only these intentional remaining uses: `booking-summary.ts` (failure fallback), `ContactEnquiryForm.tsx` (failure fallback), `SiteFooter.tsx` (mailing-list signup + plain contact link — deliberate, no mailing service exists; out of scope), `content.ts`/`home.ts` data links to `reservations@`. Zero mailto in the booking flow itself.

- [ ] Step 4: Now that nothing imports it, delete the legacy store:

```bash
git rm app/lib/enquiry-store.ts
npm run lint
npm run build
```

Expected: both pass.

- [ ] Step 5: Commit

```bash
git add -A
git commit -m "feat: light contact form via booking transport, remove ranjis address and enquiry store"
```

### Task 20: Endpoint configuration

**Files:** `.env.local.example`

- [ ] Step 1: Create example env file:

```bash
# Form endpoint for booking requests and contact enquiries (Formspree, Web3Forms, etc.)
# Must accept JSON POST { kind: "booking-request" | "general-enquiry", ... } and return 2xx.
NEXT_PUBLIC_BOOKING_ENDPOINT=
```

If `.env.local.example` already exists, append the block. Verify `.gitignore` covers `.env.local` (not the `.example`).

- [ ] Step 2: Commit

```bash
git add .env.local.example
git commit -m "docs: document NEXT_PUBLIC_BOOKING_ENDPOINT"
```

### Task 21: Full verification

**Files:** none

- [ ] Step 1: `npm run lint` and `npm run build` pass

```bash
npm run lint
npm run build
npm test
```

Expected: all pass; test suite shows the full count (store + transport + summary + smoke).

- [ ] Step 2: Dev server + Playwright acceptance pass against spec §Acceptance criteria (all entry points, migration, failure path, success path via test endpoint)

```bash
npm run dev
```

Then verify in Playwright (script under `C:\Users\user\AppData\Local\Temp\opencode`, screenshots saved there):

1. **Entry points open the drawer**: header pill, homepage hero pill, homepage §11 band, homepage §12 primary, quick-book "Book now", `/experiences` add controls, activity hero "Book this activity" (lands on step 2, item pre-added), interior compact control (adds only, no drawer), mobile anchored CTA.
2. **Duplicate guard**: "Book this activity" twice → still one item; compact control flips to "View trip".
3. **Flow**: activities → dates (flexible vs unset; group-size gate blocks Continue until size or "not confirmed") → details (inline errors) → review (non-guarantee copy visible) → submit.
4. **Failure path**: no `NEXT_PUBLIC_BOOKING_ENDPOINT` set → error banner, values retained, retry offered, WhatsApp/mailto fallbacks present.
5. **Success path**: run a local JSON-2xx endpoint (or Formspree test) → step 5 snapshot, optional WhatsApp link labelled "press Send", `ba-booking` contact cleared, draft rules (items/trip retained? per spec: draft retained on failure, reset on Done), legacy `ba-enquiry` key removed after migration.
6. **A11y spot-check**: ESC closes, focus trapped and restored, `role="dialog"`, anchored CTA hidden while open, back navigation closes the panel.
7. **ranjis@ / old enquiry UI**: grep the rendered site + source — zero occurrences.

- [ ] Step 3: Report results (test count, Playwright findings, any deviations from spec with rationale)

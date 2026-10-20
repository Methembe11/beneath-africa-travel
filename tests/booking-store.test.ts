import { beforeEach, describe, expect, it, vi } from "vitest";

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

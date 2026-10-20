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
    expect(p.items?.map((i) => i.title)).toEqual(["Sunset Cruise", "Boma Dinner"]);
    expect(p.items?.[0]?.overrides).toEqual({ adults: 4 });
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

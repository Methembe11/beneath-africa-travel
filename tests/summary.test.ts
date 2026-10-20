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

import type { BookingItem, Contact, Trip } from "./booking-store";

export type BookingPayload = {
  kind: "booking-request" | "general-enquiry";
  contact: Contact;
  trip?: Trip;
  items?: { slug: string; title: string; overrides?: BookingItem["overrides"] }[];
  message?: string;
  sourceUrl: string;
  submittedAt: string;
  botcheck: string; // honeypot — must always be ""
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
  if (payload.botcheck) {
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

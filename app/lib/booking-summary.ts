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
      ? [
          "Selected activities:",
          ...items.map((item) => {
            const o = item.overrides;
            const detail = o
              ? ` (${[
                  o.arrival && o.arrival !== payload.trip?.arrival ? `${o.arrival}→${o.departure ?? "?"}` : null,
                  o.adults ? `${o.adults} adults` : null,
                  o.children ? `${o.children} children` : null,
                ]
                  .filter(Boolean)
                  .join(", ")})`
              : "";
            return `- ${item.title}${detail}`;
          }),
        ]
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
  const reservations =
    company.emails.find((email) => email.label.startsWith("reservations@"))?.label ??
    "reservations@beneathafricatravel.co.zw";
  return `mailto:${reservations}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildSummaryLines(payload).join("\n"))}`;
}

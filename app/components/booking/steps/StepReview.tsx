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

  const dateText =
    trip.arrival || trip.departure
      ? `${trip.arrival ?? "?"} → ${trip.departure ?? "?"}`
      : trip.flexibleDates
        ? "Flexible — dates not fixed yet"
        : "Not set yet";
  const sizeText = trip.sizeUnconfirmed
    ? "Not confirmed"
    : `${trip.adults ?? 0} adult${(trip.adults ?? 0) === 1 ? "" : "s"}${(trip.children ?? 0) ? `, ${trip.children} children` : ""}`;

  const titles = Object.fromEntries(TITLES);

  const payloadFrom = (live: typeof state) =>
    buildPayload(
      {
        items: live.items,
        trip: live.trip,
        contact: live.contact,
        sourceUrl: typeof window === "undefined" ? "/" : window.location.pathname,
      },
      titles,
    );

  async function onSubmit() {
    if (sending) return; /* in-flight lock — duplicate submits impossible */
    setSending(true);
    submitStart();
    try {
      /* read the live module state: contact/trip may have just changed */
      const payload = payloadFrom(readState());
      await submitBooking(payload);
      submitSuccess(payload);
      setStep(5);
    } catch (err) {
      submitFailure(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  const fallbackPayload = () => payloadFrom(state);

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
              <li key={item.slug} className={styles.activityRow} data-selected="true">
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
            <a
              className={styles.back}
              href={buildWhatsAppHref(fallbackPayload())}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a className={styles.back} href={buildMailtoHref(fallbackPayload())}>
              Email
            </a>
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

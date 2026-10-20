"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { bookableItems } from "../../../lib/catalogue";
import { setOverride, setStep, setTrip, useBooking } from "../../../lib/booking-store";
import styles from "./Steps.module.css";

const TITLES = new Map(bookableItems.map((i) => [i.slug, i.title]));

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
              setTrip({
                flexibleDates: e.target.checked,
                ...(e.target.checked ? { arrival: "", departure: "" } : {}),
              })
            }
          />
          My dates are flexible
        </label>
      </div>

      {!trip.flexibleDates && (
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="trip-arrival">
              Arrival date
            </label>
            <input
              id="trip-arrival"
              className={styles.input}
              type="date"
              value={trip.arrival ?? ""}
              onChange={(e) => setTrip({ arrival: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="trip-departure">
              Departure date
            </label>
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
          <label className={styles.fieldLabel} htmlFor="trip-adults">
            Adults
          </label>
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
          <label className={styles.fieldLabel} htmlFor="trip-children">
            Children
          </label>
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
                  className={`${styles.back} ${styles.overrideToggle}`}
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : item.slug)}
                >
                  {TITLES.get(item.slug) ?? item.slug}
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

"use client";

import { HiArrowRight } from "react-icons/hi";
import { closeBooking, continuePlanning, resetDraft, useBooking } from "../../../lib/booking-store";
import { buildSummaryLines, buildWhatsAppHref } from "../../../lib/booking-summary";
import styles from "./Steps.module.css";

export default function StepDone() {
  const lastSent = useBooking((s) => s.lastSent);

  if (!lastSent) {
    /* Reached only if the draft was reset while open — fall back gracefully. */
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
  const firstName = lastSent.contact.name.split(" ")[0] || "traveller";

  return (
    <div className={styles.step}>
      <header className={styles.stepHead}>
        <h2 className={styles.stepTitle}>Your request has been sent</h2>
        <p className={styles.stepLead}>
          Thank you, {firstName}. Our team will come back to you personally with
          availability, pricing and the next steps — usually within one working day.
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

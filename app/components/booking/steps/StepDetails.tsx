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
        <label className={styles.fieldLabel} htmlFor="bk-name">
          Your name *
        </label>
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
        {errors.name && (
          <span className={styles.fieldError} id="bk-name-error">
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="bk-email">
          Email *
        </label>
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
        {errors.email && (
          <span className={styles.fieldError} id="bk-email-error">
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="bk-phone">
          Phone or WhatsApp
        </label>
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
        <label className={styles.fieldLabel} htmlFor="bk-notes">
          Anything we should know?
        </label>
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

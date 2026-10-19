"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { HiArrowRight } from "react-icons/hi";
import styles from "./ContactEnquiryForm.module.css";

const ENQUIRY_EMAIL = "ranjis@beneathafricatravel.co.zw";

function line(label: string, value: string) {
  return value.trim() ? `${label}: ${value.trim()}` : "";
}

export default function ContactEnquiryForm() {
  const [status, setStatus] = useState("");
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  /**
   * Activity and destination pages link here with ?topic=<name>, so the
   * enquiry opens already saying which experience it is about. The value is
   * written straight to the field after mount, which keeps the markup
   * identical between server and client.
   */
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    const field = messageRef.current;
    if (!topic || !field || field.value.trim()) return;

    const clean = topic.replace(/\s+/g, " ").trim().slice(0, 120);
    if (!clean) return;

    field.value = `I am interested in ${clean}.\n\n`;
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      setStatus("Please complete the highlighted fields, then try again.");
      return;
    }

    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();

    const details = [
      line("Name", field("name")),
      line("Email", field("email")),
      line("Phone / WhatsApp", field("phone")),
      line("Travellers", field("travellers")),
      line("Arrival", field("arrival")),
      line("Departure", field("departure")),
      "",
      "What we are planning:",
      field("message"),
    ].join("\n");

    const subject = field("name")
      ? `Travel enquiry from ${field("name")}`
      : "Travel enquiry";

    setStatus("Opening your email app with the enquiry filled in.");

    window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(details)}`;
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="enquiry-name">
            Your name
          </label>
          <input
            className={styles.input}
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="enquiry-email">
            Email
          </label>
          <input
            className={styles.input}
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="enquiry-phone">
            Phone or WhatsApp
          </label>
          <input
            className={styles.input}
            id="enquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="enquiry-travellers">
            Number of travellers
          </label>
          <input
            className={styles.input}
            id="enquiry-travellers"
            name="travellers"
            type="number"
            min={1}
            inputMode="numeric"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="enquiry-arrival">
            Arrival date
          </label>
          <input
            className={styles.input}
            id="enquiry-arrival"
            name="arrival"
            type="date"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="enquiry-departure">
            Departure date
          </label>
          <input
            className={styles.input}
            id="enquiry-departure"
            name="departure"
            type="date"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="enquiry-message">
          What are you planning?
        </label>
        <textarea
          className={styles.textarea}
          id="enquiry-message"
          name="message"
          rows={6}
          required
          ref={messageRef}
          placeholder="Destinations, dates, group size, anything we should know."
        />
      </div>

      <div className={styles.actions}>
        <button
          className={styles.submit}
          type="submit"
          aria-describedby="enquiry-hint"
        >
          Prepare Email Enquiry
          <HiArrowRight size={20} aria-hidden="true" />
        </button>
        <p className={styles.hint} id="enquiry-hint">
          This opens your email app with your details filled in and sends the
          enquiry to {ENQUIRY_EMAIL}. No details are stored on this website.
        </p>
        <p className={styles.status} role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </form>
  );
}

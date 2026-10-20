"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { HiArrowRight } from "react-icons/hi";
import { buildContactPayload, submitBooking } from "../lib/submit-booking";
import styles from "./ContactEnquiryForm.module.css";

const WHATSAPP_HREF = "https://wa.me/263778130264";
const MAILTO_HREF = "mailto:reservations@beneathafricatravel.co.zw";

export default function ContactEnquiryForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      setStatus("Please complete the highlighted fields, then try again.");
      return;
    }

    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const botcheck = String(data.get("botcheck") ?? "");

    setSending(true);
    setFailed(false);
    setStatus("Sending your message…");

    try {
      await submitBooking({
        ...buildContactPayload({
          name: field("name"),
          email: field("email"),
          message: field("message"),
        }),
        botcheck,
      });
      setSent(true);
      setStatus("");
    } catch {
      setFailed(true);
      setStatus(
        "Your message could not be sent. Try again below — or reach us on WhatsApp or by email.",
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className={styles.done} role="status">
        <h3>Thank you — we will be in touch.</h3>
        <p>
          A person from our Victoria Falls office will reply to your email
          address, usually within one working day.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Leave this field empty
          <input name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

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
          disabled={sending}
          aria-describedby="enquiry-hint"
        >
          {sending ? "Sending…" : "Send enquiry"}
          <HiArrowRight size={20} aria-hidden="true" />
        </button>
        <p className={styles.hint} id="enquiry-hint">
          Sent straight to our reservations desk. No details are stored on this
          website.
        </p>
        <p className={styles.status} role="status" aria-live="polite">
          {status}
        </p>
        {failed ? (
          <p className={styles.fallbacks}>
            <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
            <a href={MAILTO_HREF}>Email reservations</a>
          </p>
        ) : null}
      </div>
    </form>
  );
}

"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { bookableItems } from "../../lib/catalogue";
import { closeBooking, setStep, useBooking } from "../../lib/booking-store";
import BookingTrigger from "./BookingTrigger";
import StepActivities from "./steps/StepActivities";
import StepDates from "./steps/StepDates";
import StepDetails from "./steps/StepDetails";
import StepReview from "./steps/StepReview";
import StepDone from "./steps/StepDone";
import styles from "./BookingPanel.module.css";

const TITLES = new Map(bookableItems.map((i) => [i.slug, i.title]));
const STEP_NAMES = ["Activities", "Dates & guests", "Your details", "Review", "Received"];

/* ?booking=1 keeps the panel addressable; back-navigation closes it (spec). */
function pushBookingParam() {
  const url = new URL(window.location.href);
  if (url.searchParams.get("booking") !== "1") {
    url.searchParams.set("booking", "1");
    window.history.pushState({ booking: true }, "", url);
  }
}

function removeBookingParam() {
  const url = new URL(window.location.href);
  if (url.searchParams.has("booking")) {
    url.searchParams.delete("booking");
    window.history.replaceState({}, "", url.pathname + url.search);
  }
}

export default function BookingPanel() {
  const open = useBooking((s) => s.open);
  const step = useBooking((s) => s.step);
  const items = useBooking((s) => s.items);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => closeBooking(), []);

  /* Open lifecycle: history param, scroll lock, initial focus, popstate close. */
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    pushBookingParam();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => closeRef.current?.focus());

    function onPopState() {
      closeBooking();
    }
    window.addEventListener("popstate", onPopState);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("popstate", onPopState);
      removeBookingParam();
      lastFocused.current?.focus?.();
    };
  }, [open]);

  /* Focus trap + Escape. */
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const railTitle = STEP_NAMES[Math.max(0, step - 1)];

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={styles.scrim}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.aside
              ref={panelRef}
              className={styles.panel}
              role="dialog"
              aria-modal="true"
              aria-label="Plan your journey"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            >
              <header className={styles.header}>
                <div className={styles.headerText}>
                  <span className={styles.eyebrow}>Plan your journey</span>
                  <span className={styles.railTitle}>{railTitle}</span>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  className={styles.close}
                  onClick={close}
                  aria-label="Close"
                >
                  <HiX aria-hidden="true" />
                </button>
              </header>

              {step > 1 && step < 5 && (
                <nav className={styles.rail} aria-label="Booking steps">
                  {STEP_NAMES.slice(0, 4).map((name, index) => {
                    const number = index + 1;
                    return (
                      <button
                        key={name}
                        type="button"
                        className={styles.railStep}
                        aria-current={step === number ? "step" : undefined}
                        onClick={() => setStep(number)}
                      >
                        <span className={styles.railNumber}>{number}</span>
                        <span className={styles.railName}>{name}</span>
                      </button>
                    );
                  })}
                </nav>
              )}

              <div className={styles.body}>
                {step === 1 && <StepActivities />}
                {step === 2 && <StepDates />}
                {step === 3 && <StepDetails />}
                {step === 4 && <StepReview />}
                {step === 5 && <StepDone />}
              </div>

              {step !== 5 && (
                <footer className={styles.foot}>
                  <div className={styles.footSummary}>
                    <span className={styles.footCount}>
                      {items.length === 0
                        ? "No experiences selected yet"
                        : `${items.length} experience${items.length === 1 ? "" : "s"} · ${items
                            .map((i) => TITLES.get(i.slug) ?? i.slug)
                            .slice(0, 2)
                            .join(", ")}${items.length > 2 ? "…" : ""}`}
                    </span>
                    <BookingTrigger
                      slug={undefined}
                      variant="compact"
                      label="Add experiences"
                      viewLabel="Add experiences"
                    />
                  </div>
                </footer>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Anchored mobile CTA — hidden while the panel is open (CSS). */}
      <div className={styles.anchor} data-panel-open={open}>
        <BookingTrigger variant="solid" label="Plan your journey" />
      </div>
    </>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import { HiCheck, HiOutlinePlus } from "react-icons/hi";
import { addItem, openBooking, useBooking } from "../../lib/booking-store";
import styles from "./BookingTrigger.module.css";

type BookingTriggerProps = {
  /** Activity to preselect. Omit for "Plan Your Journey" (opens step 1 empty). */
  slug?: string;
  label?: string;
  variant?: "pill" | "solid" | "outline" | "compact";
  /** For the compact variant's selected state. */
  viewLabel?: string;
  /** Called just before the panel opens (e.g. close an open menu). */
  onOpen?: () => void;
};

/**
 * Every booking entry point in the spec routes through this component.
 * - slug + variant pill/solid/outline: add (or not, if already added) then open step 2.
 * - no slug: open step 1 empty.
 * - variant compact: add only; once added, the control becomes "View trip" -> step 1.
 */
export default function BookingTrigger({
  slug,
  label,
  variant = "solid",
  viewLabel = "View trip",
  onOpen,
}: BookingTriggerProps) {
  const items = useBooking((s) => s.items);
  /* The draft is restored from localStorage on the client. useSyncExternalStore
     yields false during SSR and the hydration render, then true afterwards, so
     the first client render matches the server markup. */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const added = mounted && Boolean(slug) && items.some((i) => i.slug === slug);
  const defaultLabel = slug ? "Book this activity" : "Plan your journey";

  const className = [styles.trigger, styles[variant], added ? styles.added : ""]
    .filter(Boolean)
    .join(" ");

  if (variant === "compact" && slug) {
    return (
      <button
        type="button"
        className={className}
        aria-pressed={added}
        aria-label={added ? `Added — ${viewLabel}` : `Add ${label ?? slug} to your trip`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (added) {
            onOpen?.();
            openBooking({ step: 1 });
          } else {
            addItem(slug);
          }
        }}
      >
        {added ? <HiCheck aria-hidden="true" /> : <HiOutlinePlus aria-hidden="true" />}
        <span>{added ? viewLabel : "Add to trip"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onOpen?.();
        openBooking(slug ? { slug, step: 2 } : { step: 1 });
      }}
    >
      <span>{label ?? defaultLabel}</span>
    </button>
  );
}

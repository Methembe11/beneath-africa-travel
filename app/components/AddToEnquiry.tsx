"use client";

import { HiCheck, HiPlus } from "react-icons/hi";
import { toggleItem, useEnquiryItems } from "../lib/enquiry-store";
import styles from "./AddToEnquiry.module.css";

type AddToEnquiryProps = {
  slug: string;
  /** Visible label. Ignored by the compact variant. */
  label?: string;
  variant?: "solid" | "ghost" | "outline" | "compact";
};

export default function AddToEnquiry({
  slug,
  label = "Add to enquiry",
  variant = "solid",
}: AddToEnquiryProps) {
  const items = useEnquiryItems();
  const added = items.includes(slug);

  const className = [
    styles.button,
    styles[variant],
    added ? styles.added : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      aria-pressed={added}
      aria-label={
        variant === "compact"
          ? added
            ? "Remove from enquiry"
            : "Add to enquiry"
          : undefined
      }
      title={variant === "compact" ? (added ? "Remove from enquiry" : "Add to enquiry") : undefined}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleItem(slug);
      }}
    >
      {added ? <HiCheck aria-hidden="true" /> : <HiPlus aria-hidden="true" />}
      {variant !== "compact" && (
        <span>{added ? "Added to enquiry" : label}</span>
      )}
    </button>
  );
}

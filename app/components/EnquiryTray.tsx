"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { HiArrowRight, HiOutlineTrash, HiX } from "react-icons/hi";
import { bookableItems } from "../lib/catalogue";
import { clearItems, removeItem, useEnquiryItems } from "../lib/enquiry-store";
import styles from "./EnquiryTray.module.css";

const TITLES = new Map(bookableItems.map((item) => [item.slug, item.title]));

export default function EnquiryTray() {
  const items = useEnquiryItems();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const count = items.length;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  if (count === 0) return null;

  return (
    <div className={styles.root} ref={rootRef}>
      {open && (
        <div
          className={styles.panel}
          id={panelId}
          role="dialog"
          aria-label="Your enquiry list"
        >
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle}>
              {count} {count === 1 ? "activity" : "activities"} selected
            </h2>
            <button
              type="button"
              className={styles.panelClose}
              onClick={() => setOpen(false)}
              aria-label="Close enquiry list"
            >
              <HiX aria-hidden="true" />
            </button>
          </div>

          <ul className={styles.list}>
            {items.map((slug) => (
              <li key={slug} className={styles.listItem}>
                <span className={styles.itemTitle}>
                  {TITLES.get(slug) ?? slug}
                </span>
                <button
                  type="button"
                  className={styles.itemRemove}
                  onClick={() => removeItem(slug)}
                  aria-label={`Remove ${TITLES.get(slug) ?? slug} from enquiry`}
                >
                  <HiX aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.panelFoot}>
            <button
              type="button"
              className={styles.clear}
              onClick={() => clearItems()}
            >
              <HiOutlineTrash aria-hidden="true" />
              Clear all
            </button>
            <Link href="/contact" className={styles.send}>
              Continue to enquiry
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        className={styles.toggle}
        data-open={open}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.count} aria-hidden="true">
          {count}
        </span>
        <span className={styles.toggleLabel}>
          {count === 1 ? "Activity" : "Activities"}
        </span>
      </button>
    </div>
  );
}

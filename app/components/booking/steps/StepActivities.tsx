"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { HiCheck, HiOutlinePlus } from "react-icons/hi";
import { bookableItems } from "../../../lib/catalogue";
import { addItem, removeItem, setStep, useBooking } from "../../../lib/booking-store";
import styles from "./Steps.module.css";

const CATEGORIES = ["All", ...Array.from(new Set(bookableItems.map((i) => i.category)))];

export default function StepActivities() {
  const selected = useBooking((s) => s.items);
  const [category, setCategory] = useState("All");

  const selectedSlugs = useMemo(() => new Set(selected.map((i) => i.slug)), [selected]);
  const visible = useMemo(
    () => (category === "All" ? bookableItems : bookableItems.filter((i) => i.category === category)),
    [category],
  );

  return (
    <div className={styles.step}>
      <header className={styles.stepHead}>
        <h2 className={styles.stepTitle}>Choose your experiences</h2>
        <p className={styles.stepLead}>
          Add as many as you like — or continue with none and request a tailor-made journey.
        </p>
      </header>

      <div className={styles.filters} role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={styles.filter}
            data-active={category === c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {visible.length === 0 && <p className={styles.empty}>No experiences in this category yet.</p>}

      <ul className={styles.activityList}>
        {visible.map((item) => {
          const isSelected = selectedSlugs.has(item.slug);
          return (
            <li key={item.slug} className={styles.activityRow} data-selected={isSelected}>
              <span className={styles.activityMedia}>
                <Image src={item.image} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
              </span>
              <span className={styles.activityInfo}>
                <span className={styles.activityCategory}>
                  {item.category} · {item.location}
                </span>
                <span className={styles.activityName}>{item.title}</span>
              </span>
              <button
                type="button"
                className={styles.activityToggle}
                aria-pressed={isSelected}
                onClick={() => (isSelected ? removeItem(item.slug) : addItem(item.slug))}
              >
                {isSelected ? (
                  <>
                    <HiCheck aria-hidden="true" /> Added
                  </>
                ) : (
                  <>
                    <HiOutlinePlus aria-hidden="true" /> Add
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p className={styles.emptyCount} role="status">
        {selected.length === 0
          ? "Nothing selected yet."
          : `${selected.length} experience${selected.length === 1 ? "" : "s"} in your trip.`}
      </p>

      <div className={styles.stepFoot}>
        <button type="button" className={styles.next} onClick={() => setStep(2)}>
          {selected.length === 0 ? "Request a tailor-made journey" : "Continue to dates"}
        </button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { featuredItems } from "../../lib/catalogue";
import BookingTrigger from "./BookingTrigger";
import styles from "./QuickBookStrip.module.css";

export default function QuickBookStrip() {
  const items = featuredItems;
  if (items.length === 0) return null;

  return (
    <section className={styles.strip} aria-labelledby="quick-book-title">
      <div className={styles.head}>
        <h2 id="quick-book-title" className={styles.title}>
          Book in a few clicks
        </h2>
        <Link className={styles.all} href="/experiences">
          All experiences
        </Link>
      </div>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.slug} className={styles.card}>
            <Link href={`/activities/${item.slug}`} className={styles.media}>
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 767px) 70vw, 240px"
                style={{ objectFit: "cover" }}
              />
            </Link>
            <div className={styles.info}>
              <span className={styles.category}>{item.category}</span>
              <Link href={`/activities/${item.slug}`} className={styles.name}>
                {item.title}
              </Link>
              <div className={styles.action}>
                <BookingTrigger slug={item.slug} variant="solid" label="Book now" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

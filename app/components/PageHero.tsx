"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./PageHero.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  short?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  short = false,
}: PageHeroProps) {
  return (
    <section className={`${styles.hero} ${short ? styles.heroShort : ""}`}>
      <div className={styles.media}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className={styles.lead}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        >
          {lead}
        </motion.p>
      </div>
    </section>
  );
}
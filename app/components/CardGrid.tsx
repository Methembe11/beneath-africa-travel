"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import type { CardLink } from "../lib/content";
import styles from "./CardGrid.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type CardGridProps = {
  items: CardLink[];
  label: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  tone?: "surface" | "white";
};

export default function CardGrid({
  items,
  label,
  eyebrow,
  heading,
  intro,
  tone = "surface",
}: CardGridProps) {
  return (
    <section
      className={tone === "white" ? styles.bandWhite : styles.bandSurface}
    >
      <div className={styles.container}>
        {(eyebrow || heading || intro) && (
          <div className={styles.head}>
            {eyebrow && (
              <motion.span
                className={styles.eyebrow}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                {eyebrow}
              </motion.span>
            )}
            {heading && (
              <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
              >
                {heading}
              </motion.h2>
            )}
            {intro && (
              <motion.p
                className={styles.lead}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              >
                {intro}
              </motion.p>
            )}
          </div>
        )}

        <nav className={styles.grid} aria-label={label}>
          {items.map((item, i) => (
            <motion.div
              key={item.href}
              className={styles.cell}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.9,
                ease: EASE,
                delay: 0.05 + i * 0.05,
              }}
            >
              <Link href={item.href} className={styles.card}>
                {item.image && (
                  <div className={styles.image}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className={styles.body}>
                  <div>
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <HiArrowRight size={20} />
                </div>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </section>
  );
}
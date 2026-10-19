"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import css from "./EditorialCarousel.module.css";

export type EditorialSlide = {
  eyebrow: string;
  title: string;
  cardTitle: string;
  description: string;
  background: string;
  foreground: string;
  link: string;
  foregroundAlt?: string;
};

export default function EditorialCarousel({ slides }: { slides: EditorialSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];

  const changeSlide = useCallback(
    (direction: number) => {
      setActiveIndex(
        (current) => (current + direction + slides.length) % slides.length
      );
    },
    [slides.length]
  );

  return (
    <section className={css.editorialCarousel} aria-label={slide.title}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.background}
          className={css.carouselBackground}
          style={{ backgroundImage: `url("${slide.background}")` }}
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className={css.carouselShade} />
      <div className={css.carouselCopyright} aria-hidden="true">
        ©
      </div>

      <div className={css.carouselInner}>
        <motion.div
          key={`${slide.eyebrow}-${activeIndex}`}
          className={css.carouselCopy}
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className={css.carouselEyebrow}>{slide.eyebrow}</p>
          <h2 className={css.carouselTitle}>{slide.title}</h2>

          <div className={css.carouselProgress}>
            <span
              style={{
                width: `${((activeIndex + 1) / slides.length) * 100}%`,
              }}
            />
          </div>

          <div className={css.carouselControls}>
            <button
              type="button"
              onClick={() => changeSlide(-1)}
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => changeSlide(1)}
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </motion.div>

        <div className={css.carouselFeature}>
          <motion.div
            key={slide.cardTitle}
            className={css.featureContent}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <div className={css.featureRule} />

            <h3 className={css.featureTitle}>{slide.cardTitle}</h3>

            <p className={css.featureText}>{slide.description}</p>

            <Link href={slide.link} className={css.featureLink}>
              <span>More information</span>
              <span className={css.featureArrow} aria-hidden="true">
                ⟶
              </span>
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.foreground}
              className={css.featureImage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className={css.featureImageInner}>
                <Image
                  src={slide.foreground}
                  alt={slide.foregroundAlt ?? slide.cardTitle}
                  fill
                  sizes="(max-width: 700px) 40vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

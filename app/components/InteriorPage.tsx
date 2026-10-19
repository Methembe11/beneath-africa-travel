"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import type { IconType } from "react-icons";
import {
  LuActivity,
  LuBinoculars,
  LuFootprints,
  LuHouse,
  LuMapPin,
  LuPawPrint,
  LuPlane,
  LuShip,
  LuSparkles,
  LuTent,
  LuTruck,
  LuUtensils,
  LuWaves,
  LuZap,
} from "react-icons/lu";
import CardGrid from "./CardGrid";
import SiteFooter from "./SiteFooter";
import PageHero from "./PageHero";
import type { InteriorPageData } from "../lib/content";
import styles from "./InteriorPage.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const VIEWPORT = { once: true, margin: "-100px" } as const;

const ACTIVITY_ICONS: { match: RegExp; Icon: IconType }[] = [
  { match: /helicopter|flight/i, Icon: LuPlane },
  { match: /cruise/i, Icon: LuShip },
  { match: /rafting/i, Icon: LuWaves },
  { match: /camping/i, Icon: LuTent },
  { match: /lion/i, Icon: LuPawPrint },
  { match: /game drive|safari|wildlife/i, Icon: LuBinoculars },
  { match: /village|cultural|accommodation|hotel|lodge/i, Icon: LuHouse },
  { match: /boma|dinner|meal/i, Icon: LuUtensils },
  { match: /horse/i, Icon: LuFootprints },
  { match: /bungee/i, Icon: LuActivity },
  { match: /flying fox/i, Icon: LuZap },
  { match: /transfer|transport|chobe|day trip/i, Icon: LuTruck },
  { match: /falls|tour|city|guide/i, Icon: LuMapPin },
];

const activityIcon = (label: string): IconType =>
  ACTIVITY_ICONS.find((entry) => entry.match.test(label))?.Icon ?? LuSparkles;

export default function InteriorPage({ page }: { page: InteriorPageData }) {
  return (
    <main>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image={page.image}
        imageAlt={page.imageAlt}
      />

      {page.intro && page.intro.length > 0 && (
        <section className={styles.intro}>
          <div className={styles.narrow}>
            {page.intro.map((paragraph, i) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                className={i === 0 ? styles.introLead : styles.introText}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, ease: EASE, delay: 0.05 * i }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </section>
      )}

      {page.highlights && page.highlights.length > 0 && (
        <section className={styles.highlights}>
          <div className={styles.wide}>
            <div className={styles.highlightGrid}>
              {page.highlights.map((highlight, i) => {
                const Icon = activityIcon(highlight.title);
                return (
                  <motion.div
                    key={highlight.title}
                    className={styles.highlight}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{
                      duration: 0.9,
                      ease: EASE,
                      delay: 0.05 + i * 0.05,
                    }}
                  >
                    <span className={styles.highlightIcon} aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <h2>{highlight.title}</h2>
                    <p>{highlight.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {page.sections &&
        page.sections.map((section, index) => (
          <section
            key={section.heading}
            className={
              index % 2 === 0 ? styles.bandWhite : styles.bandSurface
            }
          >
            <div className={styles.wide}>
              <motion.div
                className={styles.detail}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
                {section.cards && section.cards.length > 0 && (
                  <div className={styles.activityGrid}>
                    {section.cards.map((card, i) => {
                      const cardBody = (
                        <>
                          <div className={styles.activityImage}>
                            <Image
                              src={card.image}
                              alt={card.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className={styles.activityBody}>
                            <span className={styles.activityCategory}>
                              {card.category}
                            </span>
                            <div className={styles.activityTitleRow}>
                              <h3>{card.title}</h3>
                              {card.href && (
                                <HiArrowRight
                                  className={styles.activityArrow}
                                  size={18}
                                />
                              )}
                            </div>
                          </div>
                        </>
                      );
                      return (
                        <motion.div
                          key={card.title}
                          className={styles.activityCell}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={VIEWPORT}
                          transition={{
                            duration: 0.8,
                            ease: EASE,
                            delay: Math.min(i * 0.04, 0.4),
                          }}
                        >
                          {card.href ? (
                            <Link href={card.href} className={styles.activityCard}>
                              {cardBody}
                            </Link>
                          ) : (
                            <div className={styles.activityCard}>
                              {cardBody}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
                {section.bullets && (
                  <ul className={styles.bullets}>
                    {section.bullets.map((bullet, i) => {
                      const Icon = activityIcon(bullet);
                      return (
                        <motion.li
                          key={bullet}
                          className={styles.bulletCard}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={VIEWPORT}
                          transition={{
                            duration: 0.6,
                            ease: EASE,
                            delay: Math.min(i * 0.04, 0.4),
                          }}
                        >
                          <span className={styles.bulletIcon} aria-hidden="true">
                            <Icon size={22} />
                          </span>
                          <span className={styles.bulletLabel}>{bullet}</span>
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </motion.div>
            </div>
          </section>
        ))}

      {page.people && page.people.length > 0 && (
        <section className={styles.extras}>
          <div className={styles.wide}>
            <div className={styles.peopleGrid}>
              {page.people.map((person, i) => (
                <motion.article
                  key={person.name}
                  className={styles.person}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
                >
                  <h3>{person.name}</h3>
                  <span className={styles.personRole}>{person.role}</span>
                  <p>{person.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.timeline && page.timeline.length > 0 && (
        <section className={styles.extras}>
          <div className={styles.narrow}>
            <div className={styles.timeline}>
              {page.timeline.map((entry, i) => (
                <motion.div
                  key={entry.period}
                  className={styles.timelineItem}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
                >
                  <span>{entry.period}</span>
                  <p>{entry.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.quotes && page.quotes.length > 0 && (
        <section className={styles.extras}>
          <div className={styles.narrow}>
            <div className={styles.quotes}>
              {page.quotes.map((quote, i) => (
                <motion.blockquote
                  key={quote.attribution}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
                >
                  <p>{quote.body}</p>
                  <cite>{quote.attribution}</cite>
                </motion.blockquote>
              ))}
            </div>
            {page.note && <p className={styles.note}>{page.note}</p>}
          </div>
        </section>
      )}

      {page.gallery && page.gallery.length > 0 && (
        <section className={styles.bandWhite}>
          <div className={styles.wide}>
            <div className={styles.gallery}>
              {page.gallery.map((image, i) => (
                <motion.div
                  key={image.src}
                  className={styles.galleryItem}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.pills && page.pills.length > 0 && (
        <section className={styles.extras}>
          <div className={styles.wide}>
            <div className={styles.pills}>
              {page.pills.map((pill) => (
                <span key={pill} className={styles.pill}>
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.related && page.related.length > 0 && (
        <CardGrid
          items={page.related}
          label="Related pages"
          eyebrow="Where To Next"
          heading="Related Pages"
          intro="Arranged from the same office, so the connections between them are already in place."
        />
      )}

      <section className={styles.inlineCta}>
        <div className={styles.wide}>
          <div className={styles.inlineCtaInner}>
            <div>
              <h2>Ready to talk it through?</h2>
              <p>
                Send us your dates, group size and what you have in mind. An
                individual offer is prepared on request, with no obligation.
              </p>
            </div>
            <Link
              href={`/contact?topic=${encodeURIComponent(page.navTitle)}`}
              className={styles.button}
            >
              Contact Us
              <HiArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
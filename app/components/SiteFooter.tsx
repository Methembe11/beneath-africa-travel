"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa6";
import { company } from "../lib/content";
import styles from "./SiteFooter.module.css";

/* ============================================================
   Footer — the Aurelia pattern. A brown ground carrying a
   marquee band, a newsletter column, three link columns, a
   giant script wordmark, and a social / back-to-top base bar.
   ============================================================ */

const MARQUEE = [
  "Victoria Falls",
  "Zimbabwe · Zambia · Botswana · Namibia",
  "Established 2013",
  "Road & water transfers",
  "Safaris · Cruises · Houseboats",
];

const COLUMNS: Array<{
  title: string;
  links: Array<{ label: string; href: string }>;
}> = [
  {
    title: "Discover",
    links: [
      { label: "Victoria Falls", href: "/destinations/victoria-falls" },
      { label: "Zimbabwe", href: "/destinations/zimbabwe" },
      { label: "Zambia", href: "/destinations/zambia" },
      { label: "Botswana", href: "/destinations/botswana" },
      { label: "Namibia", href: "/destinations/namibia" },
    ],
  },
  {
    title: "Plan",
    links: [
      { label: "Road transfers", href: "/travel/road-transfers" },
      { label: "Water transfers", href: "/travel/water-transfers" },
      { label: "Cross-border", href: "/travel/cross-border" },
      { label: "Accommodation", href: "/travel/accommodation" },
      { label: "Educational trips", href: "/educational-trips" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/about/story" },
      { label: "Our team", href: "/about/team" },
      { label: "Testimonials", href: "/about/testimonials" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const CLOCK_STATIC = new Date(2026, 0, 1, 8, 0, 0);
let clockCache: Date | null = null;

/**
 * The local-time readout only ticks while the footer is on screen, so the
 * rest of the page is not re-rendered once a second while scrolling.
 */
function subscribeClock(onChange: () => void) {
  clockCache = new Date();

  let timer = 0;

  const start = () => {
    if (timer) return;
    clockCache = new Date();
    onChange();
    timer = window.setInterval(() => {
      clockCache = new Date();
      onChange();
    }, 1000);
  };

  const stop = () => {
    if (!timer) return;
    window.clearInterval(timer);
    timer = 0;
  };

  const target =
    typeof document === "undefined" ? null : document.querySelector("footer");

  if (target && typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) start();
      else stop();
    });
    observer.observe(target);
    return () => {
      stop();
      observer.disconnect();
    };
  }

  start();
  return stop;
}

function getClockSnapshot() {
  return clockCache ?? CLOCK_STATIC;
}

const RESERVATIONS_EMAIL = "reservations@beneathafricatravel.co.zw";

export default function SiteFooter() {
  const [sent, setSent] = useState(false);
  const now = useSyncExternalStore(subscribeClock, getClockSnapshot, () => CLOCK_STATIC);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Africa/Harare",
  }).format(now);

  /**
   * There is no mailing-list service connected to this site, so the form
   * hands the address to a pre-addressed email rather than claiming a
   * subscription that has not happened.
   */
  function onSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const email = String(new FormData(form).get("email") ?? "").trim();
    const subject = encodeURIComponent("Mailing list signup");
    const body = encodeURIComponent(
      `Please add ${email} to the Beneath Africa Travel and Tours mailing list.`,
    );

    window.location.href = `mailto:${RESERVATIONS_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.marqueeBand} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span>{item}</span>
              <span className={styles.marqueeStar}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.lead}>
            <p className={styles.leadEyebrow}>Stay in touch</p>
            <h2 className={styles.leadTitle}>
              Letters from
              <span className={styles.leadScript}>Victoria Falls.</span>
            </h2>
            <p className={styles.leadBody}>
              Journey notes, new experiences and the occasional invitation. Sent rarely, by
              hand.
            </p>

            <form className={styles.subscribe} onSubmit={onSubscribe}>
              <div className={styles.subscribeRow}>
                <label className={styles.uHidden} htmlFor="footer-email">
                  Email address
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className={styles.subscribeInput}
                />
                <button type="submit" className={styles.subscribeBtn}>
                  Subscribe
                </button>
              </div>
              <p className={styles.subscribeNote} role="status" aria-live="polite">
                {sent
                  ? "Your email app should now open with a ready-to-send note."
                  : ""}
              </p>
            </form>

            <div className={styles.info}>
              <div className={styles.infoBlock}>
                <span className={styles.infoTerm}>Local time</span>
                <span className={styles.infoValue}>{time}</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoTerm}>Based in</span>
                <span className={styles.infoValue}>Victoria Falls</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoTerm}>Founded</span>
                <span className={styles.infoValue}>{company.established}</span>
              </div>
            </div>
          </div>

          <div className={styles.columns}>
            {COLUMNS.map((col) => (
              <div key={col.title} className={styles.column}>
                <p className={styles.colTitle}>{col.title}</p>
                <ul className={styles.colList}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.colLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.wordmark} aria-hidden="true">
          <span className={styles.wordmarkScript}>Beneath Africa</span>
        </div>

        <div className={styles.base}>
          <ul className={styles.social} aria-label="Connect">
            <li>
              <a
                href="https://wa.me/263778130264"
                className={styles.socialLink}
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={15} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${RESERVATIONS_EMAIL}`}
                className={styles.socialLink}
                aria-label="Email"
              >
                <FaEnvelope size={14} aria-hidden="true" />
                <span>Email</span>
              </a>
            </li>
          </ul>

          <button
            type="button"
            className={styles.top}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className={styles.topLabel}>Back to top</span>
            <span className={styles.topCircle} aria-hidden="true">
              ↑
            </span>
          </button>
        </div>

        <div className={styles.legal}>
          <p>
            © {company.established}–2026 {company.tradingName}. All rights reserved.
          </p>
          <ul className={styles.legalLinks}>
            <li>
              <Link href="/privacy" className={styles.legalLink}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={styles.legalLink}>
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

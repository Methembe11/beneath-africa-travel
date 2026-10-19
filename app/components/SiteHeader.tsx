"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SiteHeader.module.css";

/* ============================================================
   Header — the nilsamsee pattern, in Beneath Africa's colours.
   A single floating circular badge (home) and a hamburger that
   opens a full-screen menu of grouped links, a phone number and
   a language switcher. No persistent horizontal bar.
   ============================================================ */

type NavLink = { label: string; href: string };

const GROUPS: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Journeys",
    links: [
      { label: "Victoria Falls", href: "/destinations/victoria-falls" },
      { label: "Zimbabwe", href: "/destinations/zimbabwe" },
      { label: "Zambia", href: "/destinations/zambia" },
      { label: "Botswana", href: "/destinations/botswana" },
      { label: "Namibia", href: "/destinations/namibia" },
    ],
  },
  {
    title: "Experiences",
    links: [
      { label: "Victoria Falls", href: "/experiences/victoria-falls" },
      { label: "Safaris & Game Drives", href: "/experiences/safaris" },
      { label: "Cruises & River", href: "/experiences/cruises" },
      { label: "Chobe Day Trips", href: "/experiences/chobe" },
      { label: "Cultural", href: "/experiences/cultural" },
      { label: "Houseboats", href: "/experiences/houseboats" },
    ],
  },
  {
    title: "Travel",
    links: [
      { label: "Road Transfers", href: "/travel/road-transfers" },
      { label: "Water Transfers", href: "/travel/water-transfers" },
      { label: "Cross-Border", href: "/travel/cross-border" },
      { label: "Driver-Guided", href: "/travel/driver-guided" },
      { label: "Accommodation", href: "/travel/accommodation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about/story" },
      { label: "Our Team", href: "/about/team" },
      { label: "Testimonials", href: "/about/testimonials" },
      { label: "Educational Trips", href: "/educational-trips" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function SiteHeader() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPop = () => setOpen(false);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !overlayRef.current) return;

      const nodes = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      overlayRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      body.style.overflow = previousOverflow;
      restoreRef.current?.focus?.();
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className={styles.header} data-solid={solid} data-open={open}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Beneath Africa Travel & Tours, home"
          onClick={close}
        >
          <span className={styles.mark} aria-hidden="true">
            BA
          </span>
          <span className={styles.brandName}>Beneath Africa</span>
        </Link>

        <span className={styles.brandCenter} aria-hidden="true">
          <Image
            src="/image-library/New Beneath Logo.png"
            alt=""
            width={1080}
            height={360}
            sizes="160px"
            className={styles.brandLogo}
            priority
          />
        </span>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={styles.menuLabel}>{open ? "Close" : "Menu"}</span>
          <span className={styles.mark} data-open={open} aria-hidden="true">
            <span className={styles.burger} data-open={open}>
              <span />
              <span />
            </span>
          </span>
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            ref={overlayRef}
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
          >
            <div className={styles.overlayInner}>
              <div className={styles.overlayTop}>
                <span className={styles.overlayBrand}>Beneath Africa</span>
                <button
                  type="button"
                  className={styles.overlayClose}
                  onClick={close}
                  aria-label="Close menu"
                >
                  Close <span aria-hidden="true">✕</span>
                </button>
              </div>

              <div className={styles.groups}>
                {GROUPS.map((group, gi) => (
                  <motion.nav
                    key={group.title}
                    className={styles.group}
                    aria-label={group.title}
                    initial={reduce ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.5, ease: EASE, delay: 0.08 + gi * 0.07 }
                    }
                  >
                    <p className={styles.groupTitle}>{group.title}</p>
                    <ul className={styles.groupList}>
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={styles.groupLink}
                            onClick={close}
                          >
                            <span>{link.label}</span>
                            <HiArrowRight
                              className={styles.groupArrow}
                              size={15}
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.nav>
                ))}
              </div>

              <div className={styles.overlayFoot}>
                <div className={styles.overlayContact}>
                  <span>Talk to us</span>
                  <a href="tel:+263778130264">+263 77 813 0264</a>
                  <a href="mailto:reservations@beneathafricatravel.co.zw">
                    reservations@beneathafricatravel.co.zw
                  </a>
                </div>

                <div className={styles.lang} aria-label="Language">
                  <span className={styles.langOn} aria-current="true">
                    EN
                  </span>
                  <span className={styles.langOff} title="German is not available yet">
                    DE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

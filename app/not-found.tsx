import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found | Beneath Africa Travel & Tours",
  description:
    "The page you were looking for is not here. Continue to destinations, experiences or travel and transfers, or contact Beneath Africa Travel and Tours.",
  robots: { index: false, follow: true },
};

const ROUTES = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Travel & Transfers", href: "/travel" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Error 404</p>
        <h1 className={styles.title}>
          This path
          <span className={styles.titleItalic}>leads nowhere.</span>
        </h1>
        <p className={styles.body}>
          The page you were looking for is not here. It may have moved, or the
          link that brought you here may be out of date.
        </p>

        <span className={styles.rule} aria-hidden="true" />

        <nav className={styles.links} aria-label="Site sections">
          <ul>
            {ROUTES.map((route) => (
              <li key={route.href}>
                <Link href={route.href} className={styles.link}>
                  <span>{route.label}</span>
                  <HiArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}

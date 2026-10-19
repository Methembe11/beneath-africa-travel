import Link from "next/link";
import styles from "./PageCta.module.css";

/* A closing band for interior listing pages. Black, one heading,
   at most two actions — the same discipline as the homepage
   footer, which is why the two read as one site. */
export default function PageCta({
  eyebrow = "Next step",
  heading = "Tell us the dates and who is travelling.",
  body = "We will tell you honestly whether we are the right company for it.",
  primary = { label: "Start planning", href: "/contact" },
  secondary = { label: "Our story", href: "/about/story" },
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className={styles.band} aria-labelledby="page-cta-heading">
      <div className={styles.inner}>
        <span className="meta">{eyebrow}</span>
        <h2 id="page-cta-heading" className={styles.heading}>
          {heading}
        </h2>
        <p className={styles.body}>{body}</p>
        <div className={styles.actions}>
          <Link href={primary.href} className={styles.action}>
            <span>{primary.label}</span>
          </Link>
          <Link
            href={secondary.href}
            className={`${styles.action} ${styles.quiet}`}
          >
            <span>{secondary.label}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import SiteFooter from "./SiteFooter";
import ContactEnquiryForm from "./ContactEnquiryForm";
import PageHero from "./PageHero";
import { company } from "../lib/content";
import styles from "./ContactPage.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const VIEWPORT = { once: true, margin: "-100px" } as const;

const whatsappHref = `https://wa.me/${company.phones[0].label.replace(/\D/g, "")}`;

const nextSteps = [
  {
    title: "Send What You Know",
    body: "Dates, group size and rough ideas are enough to start. You do not need a finished itinerary.",
  },
  {
    title: "We Come Back To You",
    body: "You will hear from a person, not an auto-reply, with a clear view of what is workable.",
  },
  {
    title: "An Individual Offer",
    body: "An offer prepared on request, around your wishes and budget, with no obligation attached.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        short
        eyebrow="Contact"
        title="Talk To Us Directly"
        lead="You need a holiday — please get hold of Beneath Africa Travel and Tours, or send us what you have in mind and we will tell you what is feasible."
        image="/image-library/Beneath africa travel car  image1.jpeg"
        imageAlt="Beneath Africa transfer vehicle"
      />

      <section className={styles.details}>
        <div className={styles.container}>
          <div className={styles.detailGrid}>
            <motion.div
              className={styles.detailCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <h2>Call Or WhatsApp</h2>
              {company.phones.map((phone) => (
                <p key={phone.href} className={styles.detailLine}>
                  <a href={phone.href}>{phone.label}</a>
                  <span>{phone.note}</span>
                </p>
              ))}
              <p className={styles.detailLine}>
                <a href={whatsappHref} rel="noreferrer">
                  Message on WhatsApp
                </a>
                <span>{company.phones[0].label}</span>
              </p>
            </motion.div>

            <motion.div
              className={styles.detailCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
            >
              <h2>Email</h2>
              {company.emails.map((email) => (
                <p key={email.href} className={styles.detailLine}>
                  <a href={email.href}>{email.label}</a>
                  <span>{email.note}</span>
                </p>
              ))}
            </motion.div>

            <motion.div
              className={styles.detailCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              <h2>Office</h2>
              <address className={styles.address}>
                {company.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <p className={styles.legal}>
                {company.registeredName}
                <br />
                Company number {company.registrationNumber}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.formBand}>
        <div className={styles.container}>
          <div className={styles.formIntro}>
            <motion.span
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE }}
            >
              Send An Enquiry
            </motion.span>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
            >
              Practical Advice. Personal Contact. No Obligation.
            </motion.h2>
            <motion.p
              className={styles.lead}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              Tell us your ideas, destinations and plans. Personal contact is
              what you get through the whole arrangement, including while you
              are travelling.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <ContactEnquiryForm />
          </motion.div>
        </div>
      </section>

      <section className={styles.steps}>
        <div className={styles.container}>
          <motion.h2
            className={styles.stepsTitle}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, ease: EASE }}
          >
            What Happens Next
          </motion.h2>
          <ol className={styles.stepGrid}>
            {nextSteps.map((step, i) => (
              <motion.li
                key={step.title}
                className={styles.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
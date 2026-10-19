"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MotionConfig, motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import {
  about,
  awards,
  destinationsSection,
  education,
  experiencesSection,
  finalCta,
  gallery,
  hero,
  images,
  mapDots,
  mapPaths,
  mapViewBox,
  recognition,
  references,
  stays,
  team,
  transfers,
} from "../../lib/home";
import EditorialCarousel, {
  type EditorialSlide,
} from "../EditorialCarousel";
import PolaroidLineCarousel, {
  type Slide as PolaroidSlide,
} from "../ui/polaroid-line-carousel";
import { SwipeCards } from "../ui/image-stack-carousel";
import SiteFooter from "../SiteFooter";
import styles from "./Home.module.css";

/* ============================================================
   Homepage — the full thirteen-section structure, carried in
   the Aurelia visual language (cream / dark / brown, Cormorant
   + Raleway). Every section the brief lists is present.

    1  Hero          (#top)          full-bleed image, script mark
    2  Story         (#story)        cream, two flanking images
    3  Destinations  (#destinations) four country cards
    4  Transfers     (#transfers)    dark service ledger
    5  Experiences   (#experiences)  cream, snap scroller
    6  Education     (#education)    21:9 image + "at a glance"
    7  Stays         (#stay)         dark accommodation carousel
    8  Team          (#team)         cream, member cards
    9  Recognition   (#recognition)  brown split, award + ledger
   10  References    (#references)   cream, quotes + partners
   11  Booking       (#book)         enquiry form
   12  Final CTA     (#final)        four corner images, CTA
    +  Footer        (SiteFooter)
   ============================================================ */

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-80px" } as const;

const HERO_VIDEO_FALLBACK =
  "https://ik.imagekit.io/mkhize/Best_Drone_Video_of_African_Wildlife._Wild_Botswana_4K_0s-3m04s.mp4";

/* --- hero media -------------------------------------------- */

/**
 * The hero shows an optimised still by default. The background video is
 * only loaded on wide screens, when the visitor has not asked for reduced
 * motion and has not enabled a data-saving mode, and it can always be
 * paused (WCAG 2.2.2).
 */
function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [withVideo, setWithVideo] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wideScreen = window.matchMedia("(min-width: 768px)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    const decide = () => {
      const allow =
        !reduceMotion.matches && wideScreen.matches && !connection?.saveData;
      setWithVideo(allow);
      setPlaying(allow);
    };

    decide();
    reduceMotion.addEventListener("change", decide);
    wideScreen.addEventListener("change", decide);
    return () => {
      reduceMotion.removeEventListener("change", decide);
      wideScreen.removeEventListener("change", decide);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <Image
        className={styles.heroPoster}
        src={hero.image}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 45%" }}
      />
      {withVideo && (
        <>
          <video
            ref={videoRef}
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/video/hero.mp4" type="video/mp4" />
            <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />
          </video>
          <button
            type="button"
            className={styles.heroToggle}
            onClick={toggle}
            aria-pressed={!playing}
            aria-label={
              playing ? "Pause background video" : "Play background video"
            }
          >
            <span aria-hidden="true">{playing ? "Pause" : "Play"}</span>
          </button>
        </>
      )}
    </>
  );
}

/* --- accommodation carousel -------------------------------- */

const STAY_IMAGE = [
  "/image-library/Beneath accomodation image1.jpeg",
  "/image-library/Beneath accomodation image2.jpeg",
  "/image-library/Beneath accomodation interior image.jpeg",
  "/image-library/Beneath tent image2.jpeg",
  "/image-library/Beneath Boat Interior.jpeg",
] as const;

const STAY_ALT = [
  "Accommodation arranged by Beneath Africa.",
  "A lodge arranged by Beneath Africa.",
  "A self-catering interior arranged by Beneath Africa.",
  "A camp set up for a Beneath Africa journey.",
  "A houseboat interior arranged by Beneath Africa.",
] as const;

const STAY_TAGS: Record<string, readonly string[]> = {
  Hotels: ["luxury", "value"],
  Lodges: ["luxury", "safari"],
  "Self-Catering": ["family", "value"],
  Camping: ["family", "safari"],
  Houseboats: ["luxury", "safari"],
};

const STAY_FILTERS = [
  { id: "all", label: "All stays" },
  { id: "luxury", label: "Luxury" },
  { id: "family", label: "Family" },
  { id: "safari", label: "Safari" },
  { id: "value", label: "Value" },
  { id: "hotels", label: "Hotels" },
  { id: "lodges", label: "Lodges" },
  { id: "self-catering", label: "Self-Catering" },
  { id: "camping", label: "Camping" },
  { id: "houseboats", label: "Houseboats" },
] as const;

const STAYS = stays.types.map((type, i) => ({
  id: type.title.toLowerCase().replace(/\s+/g, "-"),
  label: type.title,
  title: type.title,
  body: type.body,
  tags: STAY_TAGS[type.title] ?? [],
  image: STAY_IMAGE[i] ?? images.stayHotel,
  alt: STAY_ALT[i] ?? "Southern African scenery.",
}));

/* --- transfers editorial carousel --------------------------- */

const SERVICE_FOREGROUND = [
  images.guided,
  images.expCruise,
  images.expChobe,
  images.expSafari,
] as const;

const TRANSFER_SLIDES: EditorialSlide[] = transfers.services.map((service, i) => ({
  eyebrow: "In the spotlight",
  title: "Transfers & travel services",
  cardTitle: service.title,
  description: service.body,
  background: service.image,
  foreground: SERVICE_FOREGROUND[i] ?? service.image,
  foregroundAlt: service.alt,
  link: service.href,
}));

/* --- experiences polaroid carousel -------------------------- */

const EXPERIENCE_SLIDES: (PolaroidSlide & { href: string })[] = experiencesSection.list.map(
  (exp) => ({
    image: exp.image,
    title: exp.title,
    caption: exp.body,
    alt: exp.alt,
    href: exp.href,
  }),
);

/* --- about section image stack ------------------------------ */

const ABOUT_STACK = [
  {
    id: "accommodation",
    img: "/image-library/Beneath accomodation image3.jpeg",
    alt: "Accommodation arranged by Beneath Africa.",
  },
  {
    id: "lodge",
    img: "/image-library/Beneath accomodation image4.jpeg",
    alt: "A lodge arranged by Beneath Africa.",
  },
  {
    id: "room",
    img: "/image-library/Beneath accomodation image5.jpeg",
    alt: "A room arranged by Beneath Africa.",
  },
  {
    id: "stay",
    img: "/image-library/Beneath accomodation image6.jpeg",
    alt: "A stay arranged by Beneath Africa.",
  },
  {
    id: "camp",
    img: "/image-library/Beneath accomodation image7.jpeg",
    alt: "A camp arranged by Beneath Africa.",
  },
];

/* --- shared bits ------------------------------------------- */

function Heading({
  first,
  second,
  className,
}: {
  first: string;
  second: string;
  className?: string;
}) {
  return (
    <h2 className={className ?? styles.h2}>
      <span className={styles.h2Line}>{first}</span>
      <span className={styles.h2Italic}>{second}</span>
    </h2>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark" | "brown";
}) {
  return (
    <span className={styles.eyebrow} data-tone={tone}>
      <span className={styles.eyebrowDot} aria-hidden="true" />
      {children}
    </span>
  );
}

/* "More information →" — the arrow grows on hover, as on the
   reference site's map and spotlight cards. */
function MoreLink({
  href,
  tone = "light",
  label = "More information",
}: {
  href: string;
  tone?: "light" | "dark";
  label?: string;
}) {
  return (
    <Link href={href} className={styles.moreLink} data-tone={tone}>
      <span className={styles.moreText}>{label}</span>
      <span className={styles.moreArrow} aria-hidden="true">
        <svg viewBox="0 0 52 8" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <path
            d="M49.793 3.182l-2.328-2.328a.5.5 0 0 1 .707-.708l3.182 3.182a.5.5 0 0 1 0 .708l-3.182 3.182a.5.5 0 0 1-.707-.708l2.328-2.328H0v-1h49.793Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </Link>
  );
}

function Enquiry() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Arrival: ${data.get("arrival")}`,
      `Departure: ${data.get("departure")}`,
      `Adults: ${data.get("adults")}`,
      `Children: ${data.get("children")}`,
      `Trip preference: ${data.get("trip")}`,
      "",
      `Requests: ${data.get("requests")}`,
    ];
    const subject = encodeURIComponent("Journey enquiry — Beneath Africa Travel & Tours");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:reservations@beneathafricatravel.co.zw?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={`${styles.field} ${styles.fieldWide}`}>
        <span className={styles.fieldLabel}>Dates</span>
        <span className={styles.dateRow}>
          <input name="arrival" type="date" aria-label="Arrival date" />
          <input name="departure" type="date" aria-label="Departure date" />
        </span>
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Adults</span>
        <input name="adults" type="number" min="1" defaultValue="2" />
      </label>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Children</span>
        <input name="children" type="number" min="0" defaultValue="0" />
      </label>

      <label className={`${styles.field} ${styles.fieldWide}`}>
        <span className={styles.fieldLabel}>Trip preference</span>
        <select name="trip" defaultValue="Victoria Falls">
          <option>Victoria Falls</option>
          <option>Safaris &amp; Game Drives</option>
          <option>Chobe Day Trip</option>
          <option>Cruises &amp; River</option>
          <option>Houseboats</option>
          <option>Educational / School Trip</option>
          <option>Tailor-Made Journey</option>
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Full name</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Email address</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>

      <label className={`${styles.field} ${styles.fieldWide}`}>
        <span className={styles.fieldLabel}>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>

      <label className={`${styles.field} ${styles.fieldWide}`}>
        <span className={styles.fieldLabel}>Special requests</span>
        <textarea name="requests" rows={2} />
      </label>

      <div className={styles.formActions}>
        <button type="submit" className={styles.formButton}>
          Send enquiry
        </button>
        <p className={styles.formNote} role="status" aria-live="polite">
          {sent
            ? "Your email client should now be open. We reply from reservations@beneathafricatravel.co.zw."
            : "We reply from reservations@beneathafricatravel.co.zw."}
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------ */

export default function Home() {
  const router = useRouter();
  const [stayFilter, setStayFilter] = useState<string>("all");
  const visibleStays =
    stayFilter === "all"
      ? STAYS
      : STAYS.some((s) => s.id === stayFilter)
        ? STAYS.filter((s) => s.id === stayFilter)
        : STAYS.filter((s) => s.tags.includes(stayFilter));

  const destCards = destinationsSection.cards;
  const [dest, setDest] = useState(0);
  const activeDest = destCards[dest];

  const cornerImages = [
    "/image-library/Beneath boat image4.jpeg",
    "/image-library/Beneath pool view image.jpeg",
    "/image-library/Beneath elephant image.jpeg",
    "/image-library/Cultural Experience image3.jpg",
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.page}>
        {/* intro curtain (Aurelia) ---------------------------- */}
        <div className={styles.intro} aria-hidden="true">
          <span className={styles.introHalfL} />
          <span className={styles.introHalfR} />
          <span className={styles.introLine} />
        </div>

        {/* §1 — hero ------------------------------------------ */}
        <section id="top" className={styles.hero} aria-label="Introduction">
          <div className={styles.heroMedia}>
            <HeroMedia />
          </div>
          <span className={styles.heroScrim} aria-hidden="true" />
          <span className={styles.heroFrame} aria-hidden="true" />

          <div className={styles.heroInner}>
            <motion.h1
              className={styles.heroScript}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            >
              Beneath Africa
            </motion.h1>

            <motion.div
              className={styles.heroSelect}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
            >
              <span className={styles.heroSelectLabel}>Choose a way in</span>
              <div className={styles.heroPills}>
                <a href="#experiences" className={styles.heroPill}>
                  Experiences
                </a>
                <a href="#stay" className={styles.heroPill}>
                  Stays
                </a>
              </div>
            </motion.div>
          </div>

          <a href="#story" className={styles.heroCue}>
            <span>Explore</span>
            <span className={styles.heroCueLine} aria-hidden="true" />
          </a>
        </section>

        {/* §2 — about (split: swipable image stack + read more) */}
        <section id="story" className={styles.about} aria-label="About Beneath Africa">
          <div className={styles.aboutInner}>
            <div className={styles.aboutStack}>
              <SwipeCards
                cards={ABOUT_STACK}
                settings={{ width: 380, height: 380, radius: 0 }}
              />
            </div>

            <div className={styles.aboutText}>
              <Reveal>
                <Eyebrow>{about.eyebrow}</Eyebrow>
                <Heading
                  first={about.headingLines[0].text}
                  second={about.headingLines[1].text}
                  className={styles.h2Left}
                />
                <p className={`${styles.body} ${styles.bodyLeft}`}>{about.body[0]}</p>
                <Link href="/about" className={styles.aboutMore}>
                  <span>Read more</span>
                  <HiArrowRight size={15} aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* §3 — destinations (cards + sightseeing map) -------- */}
        <section id="destinations" className={styles.mapSection} aria-label="Our destinations">
          <div className={styles.mapWrap}>
            <Reveal>
              <h2 className={styles.mapTitle}>{destinationsSection.title}</h2>
              <p className={styles.mapIntro}>{destinationsSection.body}</p>
            </Reveal>

            <div className={styles.mapLayout}>
              <div className={styles.destFocus}>
                <motion.article
                  key={activeDest.slug}
                  className={styles.destCard}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className={styles.destCardMedia}>
                    <span className={`${styles.destLayer} ${styles.destLayerBack}`}>
                      <Image
                        src={activeDest.image}
                        alt=""
                        fill
                        sizes="(max-width: 900px) 80vw, 34vw"
                        style={{ objectFit: "cover" }}
                      />
                    </span>
                    <span className={`${styles.destLayer} ${styles.destLayerFront}`}>
                      <Image
                        src={activeDest.image}
                        alt={activeDest.alt}
                        fill
                        sizes="(max-width: 900px) 80vw, 34vw"
                        style={{ objectFit: "cover" }}
                      />
                    </span>
                  </div>

                  <div className={styles.destCardBody}>
                    <span className={styles.destCardIndex} aria-hidden="true">
                      {activeDest.index}
                    </span>
                    <h3 className={styles.destCardTitle}>{activeDest.name}</h3>
                    <p className={styles.destCardDesc}>{activeDest.description}</p>
                    <MoreLink href={activeDest.href} label="More information" />
                  </div>
                </motion.article>
              </div>

              <div className={styles.mapStage}>
                <svg
                  className={styles.mapSvg}
                  viewBox={mapViewBox}
                  role="img"
                  aria-label="Map of Zimbabwe, Zambia, Botswana and Namibia"
                >
                  <g>
                    {destCards.map((card, i) => (
                      <path
                        key={card.slug}
                        d={mapPaths[card.slug]}
                        className={styles.mapCountry}
                        data-active={i === dest}
                        onClick={() => setDest(i)}
                        onMouseEnter={() => setDest(i)}
                      />
                    ))}
                  </g>
                  <g aria-hidden="true">
                    {mapDots.map((dot, i) => (
                      <circle
                        key={i}
                        cx={dot.x}
                        cy={dot.y}
                        r={4}
                        className={styles.mapDot}
                      />
                    ))}
                  </g>
                  <g aria-hidden="true">
                    {destCards.map((card) => (
                      <text
                        key={card.slug}
                        x={card.pin.x}
                        y={card.pin.y + 64}
                        textAnchor="middle"
                        className={styles.mapLabel}
                      >
                        {card.name}
                      </text>
                    ))}
                  </g>
                </svg>

                {destCards.map((card, i) => (
                  <button
                    key={card.slug}
                    type="button"
                    className={styles.mapPin}
                    data-active={i === dest}
                    style={{
                      left: `${card.pin.x / 10}%`,
                      top: `${card.pin.y / 10}%`,
                    }}
                    aria-label={`Show ${card.name}`}
                    aria-pressed={i === dest}
                    onMouseEnter={() => setDest(i)}
                    onFocus={() => setDest(i)}
                    onClick={() => setDest(i)}
                  >
                    <span className={styles.mapPinIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path
                          fill="currentColor"
                          d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
                        />
                      </svg>
                    </span>
                  </button>
                ))}

                <span className={styles.mapCompass} aria-hidden="true">
                  <em>Victoria Falls</em> · home
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* §4 — transfers & travel services (editorial carousel) */}
        <div id="transfers">
          <EditorialCarousel slides={TRANSFER_SLIDES} />
        </div>

        {/* §5 — curated experiences --------------------------- */}
        <section id="experiences" className={styles.exp} aria-label="Curated experiences">
          <span className={styles.expGrain} aria-hidden="true" />
          <div className={styles.expHead}>
            <Reveal>
              <Eyebrow>{experiencesSection.eyebrow}</Eyebrow>
              <Heading
                first={experiencesSection.headingLines[0].text}
                second={experiencesSection.headingLines[1].text}
              />
              <p className={styles.body}>{experiencesSection.body}</p>
            </Reveal>
          </div>

          <div className={styles.expCarousel}>
            <PolaroidLineCarousel
              slides={EXPERIENCE_SLIDES}
              height="clamp(680px, 105vh, 1040px)"
              cardWidth={400}
              background="var(--cream)"
              ink="var(--t-heading)"
              onSelect={(i) => router.push(EXPERIENCE_SLIDES[i].href)}
              ariaLabel="Curated experiences carousel"
            />
          </div>
        </section>

        {/* §6 — educational & school trips -------------------- */}
        <section id="education" className={styles.factsBlock} aria-label="Educational and school trips">
          <div className={styles.factsImg}>
            <Image
              src={education.image}
              alt={education.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
            />
          </div>

          <div className={styles.factsText}>
            <Reveal>
              <Eyebrow>{education.eyebrow}</Eyebrow>
              <Heading
                first={education.headingLines[0].text}
                second={education.headingLines[1].text}
              />
              <p className={styles.body}>{education.body}</p>
              <p className={styles.body}>{education.bodySecond}</p>
              <span className={styles.factsDivider} aria-hidden="true" />
              <h3 className={styles.factsGlance}>At a glance</h3>
              <ul className={styles.factsList}>
                {education.itinerary.slice(0, 3).map((item) => (
                  <li key={item.title}>{item.title}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* §7 — stays & accommodation (filterable grid) ------- */}
        <section id="stay" className={styles.stay} aria-label="Stays and accommodation">
          <div className={styles.stayInner}>
            <div className={styles.stayHeadBlock}>
              <Reveal>
                <Eyebrow tone="dark">{stays.eyebrow}</Eyebrow>
                <Heading
                  className={styles.stayTitle}
                  first={stays.headingLines[0].text}
                  second={stays.headingLines[1].text}
                />
                <p className={styles.stayIntro}>{stays.body}</p>
              </Reveal>
            </div>

            <div className={styles.stayFilters} role="group" aria-label="Filter stays">
              {STAY_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={styles.stayFilter}
                  data-active={stayFilter === filter.id}
                  aria-pressed={stayFilter === filter.id}
                  onClick={() => setStayFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <ul className={styles.stayGrid}>
              {visibleStays.map((item, i) => (
                <motion.li
                  key={item.id}
                  className={styles.stayCard}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                >
                  <div className={styles.stayCardMedia}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.stayCardBody}>
                    <h3 className={styles.stayCardTitle}>{item.title}</h3>
                    <p className={styles.stayCardText}>{item.body}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* §8 — meet the team --------------------------------- */}
        <section id="team" className={styles.team} aria-label="Meet the team">
          <div className={styles.sectionHead}>
            <Reveal>
              <Eyebrow>{team.eyebrow}</Eyebrow>
              <Heading first={team.headingLines[0].text} second={team.headingLines[1].text} />
              <p className={styles.body}>{team.body}</p>
            </Reveal>
          </div>

          <ul className={styles.teamGrid}>
            {team.members.map((member, i) => (
              <li key={member.name} className={styles.teamCard}>
                <Reveal delay={i * 0.08}>
                  <span className={styles.teamPhoto}>
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.alt}
                        fill
                        sizes="(max-width: 700px) 100vw, 30vw"
                        style={{ objectFit: "cover", objectPosition: "center 20%" }}
                      />
                    ) : (
                      <span className={styles.teamMonogram} aria-hidden="true">
                        {member.initials}
                      </span>
                    )}
                  </span>
                  <span className={styles.teamName}>{member.name}</span>
                  <span className={styles.teamRole}>{member.role}</span>
                  <span className={styles.teamDetail}>{member.detail}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* §9 — recognition ----------------------------------- */}
        <section id="recognition" className={styles.recogn} aria-label="Our experience and recognition">
          <div className={styles.recognMedia}>
            <Image
              src={recognition.image}
              alt={recognition.alt}
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.recognPanel}>
            <span className={styles.splitEyebrow}>{recognition.eyebrow}</span>
            <Heading
              className={`${styles.h2} ${styles.h2Dark}`}
              first={recognition.headingLines[0].text}
              second={recognition.headingLines[1].text}
            />
            <p className={`${styles.body} ${styles.bodyDark}`}>{recognition.body}</p>

            <dl className={styles.recognLedger}>
              {recognition.ledger.map((row) => (
                <div key={row.term} className={styles.recognRow}>
                  <dt>{row.term}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* §10b — awards ------------------------------------- */}
        <section id="awards" className={styles.awards} aria-label="Awards">
          <div className={styles.awardsInner}>
            <Reveal className={styles.awardsHead}>
              <Eyebrow tone="dark">{awards.eyebrow}</Eyebrow>
              <Heading
                className={`${styles.h2} ${styles.h2Dark}`}
                first={awards.headingLines[0].text}
                second={awards.headingLines[1].text}
              />
              <p className={`${styles.body} ${styles.bodyDark}`}>{awards.body}</p>
            </Reveal>

            <Reveal delay={0.1} className={styles.awardCard}>
              <span className={styles.awardMedal} aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    fill="currentColor"
                    d="M12 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 14.77l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85L12 1.5z"
                  />
                </svg>
                <em>{awards.award.year}</em>
              </span>

              <span className={styles.awardKicker}>Awarded</span>
              <h3 className={styles.awardTitle}>{awards.award.title}</h3>
              <span className={styles.awardEvent}>
                {awards.award.event} · {awards.award.place} · {awards.award.year}
              </span>
              <p className={styles.awardNote}>{awards.note}</p>

              <dl className={styles.awardLedger}>
                {awards.ledger.map((row) => (
                  <div key={row.term} className={styles.awardRow}>
                    <dt>{row.term}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* §11 — client references ---------------------------- */}
        <section id="references" className={styles.refs} aria-label="Client references and partnerships">
          <div className={styles.sectionHead}>
            <Reveal>
              <Eyebrow>{references.eyebrow}</Eyebrow>
              <Heading first={references.headingLines[0].text} second={references.headingLines[1].text} />
              <p className={styles.body}>{references.body}</p>
            </Reveal>
          </div>

          <div className={styles.refsGrid}>
            <ul className={styles.refsQuotes}>
              {references.quotes.map((quote, i) => (
                <li key={i}>
                  <Reveal delay={i * 0.06}>
                    <blockquote className={styles.refQuote}>
                      <p className={styles.refQuoteText}>{quote.body}</p>
                      <cite className={styles.refQuoteBy}>{quote.attribution}</cite>
                    </blockquote>
                  </Reveal>
                </li>
              ))}
            </ul>

            <div className={styles.refsPartners}>
              <Reveal>
                <h3 className={styles.refsPartnersTitle}>Partners &amp; travellers</h3>
                <ul className={styles.refPartnerList}>
                  {references.partners.map((partner, i) => (
                    <li key={partner} className={styles.refPartner}>
                      <span className={styles.refPartnerNum} aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{partner}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* §10c — gallery ----------------------------------- */}
        <section id="gallery" className={styles.gallery} aria-label="Gallery">
          <div className={styles.galleryInner}>
            <Reveal className={styles.galleryHead}>
              <Eyebrow>{gallery.eyebrow}</Eyebrow>
              <Heading
                first={gallery.headingLines[0].text}
                second={gallery.headingLines[1].text}
              />
              <p className={styles.body}>{gallery.body}</p>
            </Reveal>

            <ul className={styles.galleryGrid}>
              {gallery.images.map((img) => (
                <li key={img.src} className={styles.galleryItem} data-span={img.span}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 700px) 50vw, 30vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className={styles.galleryCap} aria-hidden="true">
                    {img.alt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* §11 — booking -------------------------------------- */}
        <section id="book" className={styles.book} aria-label="Plan your journey">
          <div className={styles.bookInner}>
            <div className={styles.bookHead}>
              <Eyebrow>{finalCta.eyebrow}</Eyebrow>
              <Heading first="Plan your journey" second="with Beneath Africa." />
              <p className={styles.body}>{finalCta.body}</p>
            </div>
            <Enquiry />
          </div>
        </section>

        {/* §12 — final call to action ------------------------- */}
        <section id="final" className={styles.closing} aria-label="Start planning">
          <div className={`${styles.closingCorner} ${styles.closingTL}`}>
            <Image src={cornerImages[0]} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
          </div>
          <div className={`${styles.closingCorner} ${styles.closingTR}`}>
            <Image src={cornerImages[1]} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
          </div>
          <div className={`${styles.closingCorner} ${styles.closingBL}`}>
            <Image src={cornerImages[2]} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
          </div>
          <div className={`${styles.closingCorner} ${styles.closingBR}`}>
            <Image src={cornerImages[3]} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
          </div>

          <div className={styles.closingInner}>
            <Reveal>
              <h2 className={styles.closingTitle}>
                <span className={styles.closingLine}>{finalCta.headingLines[0].text}</span>
                <span className={styles.closingItalic}>{finalCta.headingLines[1].text}</span>
              </h2>
              <p className={styles.closingBody}>{finalCta.body}</p>
              <div className={styles.closingActions}>
                <Link href={finalCta.primary.href} className={styles.closingLink}>
                  {finalCta.primary.label}
                  <HiArrowRight size={15} aria-hidden="true" />
                </Link>
                <a href={finalCta.secondary.href} className={styles.closingGhost}>
                  {finalCta.secondary.label}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </MotionConfig>
  );
}

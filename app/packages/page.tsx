import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "../components/PageHero";
import SiteFooter from "../components/SiteFooter";
import { pageMeta } from "../lib/meta";
import styles from "./packages.module.css";

export const metadata: Metadata = pageMeta({
  path: "/packages",
  title: "Tour Packages | Beneath Africa Travel & Tours",
  description:
    "Curated tour packages from Victoria Falls — water and safari experiences, camping journeys, budget self-catering and extended Zimbabwe discovery itineraries. Price available upon inquiry.",
});

const PACKAGES = [
  {
    id: "01",
    title: "Water & Safari Experience",
    duration: "8 nights",
    tag: "Multi-destination Zimbabwe safari & water experience",
    intro:
      "A journey that combines Victoria Falls, Hwange National Park, Lake Kariba and a Botswana Chobe excursion — with houseboat accommodation, game drives, cruises and guided Falls experiences.",
    groupSize: "Minimum 5 people",
    image: "/image-library/Victoria Falls mist image1.jpg",
    itinerary: [
      { place: "Victoria Falls", nights: "3 nights", details: "Bed & breakfast, road transfers, Victoria Falls tour, sunset cruise, vulture feeding, Chobe day trip in Botswana" },
      { place: "Hwange National Park", nights: "2 nights", details: "Accommodation, game drives" },
      { place: "Lake Kariba", nights: "3 nights", details: "Houseboat accommodation, all meals, fishing, game cruise (guests bring own rods)" },
    ],
    included: ["Accommodation", "Road transfers", "Guided tours & cruises", "Game drives", "Houseboat meals & activities"],
    enquiryLabel: "Enquire about Package 01",
    enquirySlug: "package-01-water-safari",
  },
  {
    id: "02",
    title: "Hotel & Camping Experience",
    duration: "5 nights",
    tag: "Hotel stay in Victoria Falls + camping in Botswana",
    intro:
      "A shorter experience that pairs a Victoria Falls hotel stay with a camping experience in Chobe National Park, Botswana — arranged with transport, accommodation and a simple, focused itinerary.",
    groupSize: "Minimum 5 people",
    image: "/image-library/Chobe Day Trip image1.jpg",
    itinerary: [
      { place: "Victoria Falls", nights: "2 nights", details: "Hotel accommodation" },
      { place: "Chobe National Park, Botswana", nights: "3 nights", details: "Camping experience" },
    ],
    included: ["Hotel accommodation (Victoria Falls)", "Camping (Chobe)", "Road transfers"],
    enquiryLabel: "Enquire about Package 02",
    enquirySlug: "package-02-hotel-camping",
  },
  {
    id: "03",
    title: "Budget Self-Catering Apartment",
    duration: "Flexible — ideal for a weekend",
    tag: "Affordable self-catering near Victoria Falls",
    intro:
      "A budget-friendly self-catering accommodation option, ideal for guests wanting to spend a weekend in Victoria Falls. A practical alternative to traditional hotel accommodation for travellers seeking value.",
    groupSize: "Flexible",
    image: "/image-library/Beneath accomodation interior image.jpeg",
    itinerary: [
      { place: "Victoria Falls", nights: "Flexible", details: "Self-catering apartment — budget-friendly stay near the Falls" },
    ],
    included: ["Self-catering apartment", "Flexible stay option"],
    enquiryLabel: "Enquire about Package 03",
    enquirySlug: "package-03-apartment",
  },
  {
    id: "04",
    title: "Around Zimbabwe Tour",
    duration: "12 nights",
    tag: "Extended Zimbabwe discovery journey",
    intro:
      "A comprehensive 12-night itinerary through Zimbabwe's major destinations — from Harare through Great Zimbabwe, Bulawayo, Matopos, Hwange and ending at Victoria Falls.",
    groupSize: "Minimum 5 people",
    image: "/image-library/DISCOVER SOUTHERN AFRICA image1.jpg",
    itinerary: [
      { place: "Harare", nights: "2 nights", details: "Arrival" },
      { place: "Great Zimbabwe", nights: "2 nights", details: "Historic site visit" },
      { place: "Bulawayo", nights: "1 night", details: "City stay" },
      { place: "Matopos", nights: "2 nights", details: "National park & rock art" },
      { place: "Hwange National Park", nights: "2 nights", details: "Safari & game drives" },
      { place: "Victoria Falls", nights: "3 nights", details: "Departure — guided Falls experience" },
    ],
    included: ["Accommodation along route", "Road transfers", "Guided visits", "Safari experiences"],
    enquiryLabel: "Enquire about Package 04",
    enquirySlug: "package-04-around-zimbabwe",
  },
];

export default function PackagesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Tour Packages"
        title="Curated Journeys Around Southern Africa"
        lead="Four carefully arranged packages — from multi-destination safari and water experiences to budget-friendly self-catering stays and an extended Zimbabwe discovery tour. All arranged from our Victoria Falls office. Price available upon inquiry."
        image="/image-library/Helicopter Flights image1.jpg"
        imageAlt="Victoria Falls mist"
      />
      <section className={styles.packagesBand} aria-label="Tour packages">
        <div className={styles.container}>
          <div className={styles.introRow}>
            <h2 className={styles.sectionTitle}>Tour Packages</h2>
            <p className={styles.sectionIntro}>
              Each package includes accommodation, transfers and guided experiences arranged through our office. Minimum group size applies where specified. Pricing is provided upon enquiry.
            </p>
          </div>
          <div className={styles.grid}>
            {PACKAGES.map((p) => (
              <article key={p.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                  <span className={styles.cardDuration}>{p.duration}</span>
                  <span className={styles.cardTag}>{p.tag}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardIntro}>{p.intro}</p>
                  {p.groupSize && (
                    <p className={styles.cardMeta}><strong>{p.groupSize}</strong></p>
                  )}

                  <div className={styles.itinerary}>
                    <h4>Itinerary</h4>
                    <ul>
                      {p.itinerary.map((item) => (
                        <li key={item.place}>
                          <span className={styles.itineraryPlace}>{item.place}</span>
                          <span className={styles.itineraryNights}>{item.nights}</span>
                          <span className={styles.itineraryDetail}>{item.details}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.included}>
                    <h4>Included</h4>
                    <ul>
                      {p.included.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.pricingNote}>
                      Price available upon inquiry.
                    </div>
                    <a
                      href={`/contact?topic=${encodeURIComponent(p.enquiryLabel)}`}
                      className={styles.enquiryBtn}
                    >
                      {p.enquiryLabel}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.noteBand} aria-label="Enquiry notes">
        <div className={styles.container}>
          <h2>Planning & Enquiries</h2>
          <p>
            All packages are arranged through our Victoria Falls office. Send us your dates, group size and preferences — we prepare an individual offer with clear timing, accommodation and inclusions, with no obligation attached.
          </p>
          <p>
            Contact: <a href="mailto:reservations@beneathafricatravel.co.zw">reservations@beneathafricatravel.co.zw</a> or WhatsApp <a href="https://wa.me/263778130264">+263 77 813 0264</a>.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

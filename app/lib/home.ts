import {
  aboutPages,
  clientReferences,
  company,
  destinations,
  educationalTrips,
  experiences,
  travelServices,
  type Quote,
} from "./content";

/* ============================================================
   Homepage content — the thirteen sections of the redesign.

   Every string here is lifted from ./content (which was built
   from the two source PDFs) or written to a fact that appears
   in them. Nothing is invented: no prices, no durations, no
   guarantees, no unverified place names.

   Section order:
     1  Header & navigation      (SiteHeader)
     2  Hero
     3  About Beneath Africa
     4  Discover Our Destinations
     5  Transfers & Travel Services
     6  Curated Experiences
     7  Educational & School Trips
     8  Stays & Accommodation
     9  Meet the Team
     10 Our Experience & Recognition
     11 Client References & Partnerships
     12 Final call to action
     13 Footer                    (SiteFooter)
   ============================================================ */

const IMG = {
  hero: "/image-library/Helicopter Flights image1.jpg",
  about: "/image-library/Beneath Lake site.jpeg",
  aboutDetail: "/image-library/Ranjis Nyakusengwa pouring wine.jpeg",
  zimbabwe: "/image-library/DISCOVER SOUTHERN AFRICA image1.jpg",
  zambia: "/image-library/DISCOVER SOUTHERN AFRICA image2.jpg",
  botswana: "/image-library/DISCOVER SOUTHERN AFRICA image3.jpg",
  namibia: "/image-library/DISCOVER SOUTHERN AFRICA image4.jpg",
  road: "/image-library/Beneath africa travel car  image1.jpeg",
  water: "/image-library/Beneath Boat Interior image 2.jpeg",
  border: "/image-library/Beneath train image.jpeg",
  guided: "/image-library/Beneath people standing near the pool image.jpeg",
  expFalls: "/image-library/Helicopter Flights image1.jpg",
  expSafari: "/image-library/Beneath elephant image.jpeg",
  expCruise: "/image-library/Beneath africa travel cruise.jpeg",
  expChobe: "/image-library/Chobe Day Trip image1.jpg",
  expCulture: "/image-library/Cultural Experience image3.jpg",
  expHouseboat: "/image-library/Beneath tent image.jpeg",
  education: "/image-library/Beneath chilling people image.jpeg",
  stayHotel: "/image-library/Beneath pool view image2.jpeg",
  founder: "/image-library/Ranjis Nyakusengwa image.jpeg",
  recognition: "/image-library/Beneath africa travel office.jpeg",
  references: "/image-library/Beneath person on the pool image.jpeg",
  closing: "/image-library/Beneath pool image.jpeg",
} as const;

export const images = IMG;

/* --- Shared CTA labels ------------------------------------- */

export const cta = {
  plan: { label: "Plan Your Journey", href: "/contact" },
  experiences: { label: "Explore Our Experiences", href: "/experiences" },
  destinations: { label: "Explore All Destinations", href: "/destinations" },
  services: { label: "Explore Our Services", href: "/travel" },
  allExperiences: { label: "Explore All Experiences", href: "/experiences" },
  schoolTrip: { label: "Plan a School Trip", href: "/educational-trips" },
  accommodation: {
    label: "Explore Accommodation",
    href: "/travel/accommodation",
  },
  team: { label: "Meet Our Team", href: "/about/team" },
  workWithUs: { label: "Work With Us", href: "/contact" },
} as const;

/* --- §2 Hero ----------------------------------------------- */

export const hero = {
  eyebrow: `${company.base} · Since ${company.established}`,
  headingLines: [
    { text: "Southern Africa,", variant: "roman" as const },
    { text: "thoughtfully connected.", italicWord: "connected.", variant: "italic" as const },
  ],
  body: `A Victoria Falls travel company arranging road and water transfers, safaris, cruises, houseboats and tailor-made journeys across Zimbabwe, Zambia, Botswana and Namibia.`,
  primary: cta.plan,
  secondary: cta.experiences,
  image: IMG.hero,
  alt: "Mist rising off the Victoria Falls where the Zambezi drops into the Batoka Gorge.",
  strip: [
    { term: "Established", value: String(company.established) },
    { term: "Based", value: company.base },
    { term: "Countries", value: "Zimbabwe · Zambia · Botswana · Namibia" },
    { term: "Recognition", value: `${company.award.year} Sanganai / Hlanganani` },
  ],
} as const;

/* --- §3 About Beneath Africa ------------------------------- */

export const about = {
  eyebrow: "About Beneath Africa",
  headingLines: [
    { text: "A Victoria Falls company,", variant: "roman" as const },
    { text: "built for the journey.", italicWord: "journey.", variant: "italic" as const },
  ],
  body: [
    `${company.tradingName} was established in ${company.established} by Ranjisi Nyakusengwa, Bruce and Naume Ndoro as a tourism company based in ${company.base}, with a vision to grow within Zimbabwe.`,
    "We specialise in road and water transfers, educational school trips, and tours around Botswana, Namibia, Zambia and Zimbabwe — with accommodation in hotels, lodges and camps, camping, houseboats on Lake Kariba, Chobe day trips and other activities in and around Victoria Falls.",
  ],
  stats: [
    { term: "Founded", value: String(company.established) },
    { term: "Home", value: "Victoria Falls" },
    { term: "Countries", value: "Four" },
    { term: "Award", value: company.award.year },
  ],
  cta: { label: "Discover Our Story", href: "/about/story" },
  image: IMG.about,
  alt: "Sunrise over the Zambezi river with wooded banks in silhouette.",
  detailImage: IMG.aboutDetail,
  detailAlt: "Ranjis Nyakusengwa at work, pouring wine during a Beneath Africa journey.",
} as const;

/* --- §4 Discover Our Destinations --------------------------
   Four countries. Each card keeps the destination page's own
   lead so there is a single source of truth per place. */

const DESTINATION_IMAGE: Record<string, string> = {
  zimbabwe: IMG.zimbabwe,
  zambia: IMG.zambia,
  botswana: IMG.botswana,
  namibia: IMG.namibia,
};

/* Pin anchors, projected from the SVG map (viewBox 0 0 1000 1000). */
const DESTINATION_PIN: Record<string, { x: number; y: number }> = {
  zimbabwe: { x: 812, y: 516 },
  zambia: { x: 709, y: 313 },
  botswana: { x: 560, y: 661 },
  namibia: { x: 273, y: 652 },
};

/* Country outlines for the destinations map. Simplified from
   public-domain GeoJSON (Natural Earth, via world.geo.json) and
   projected to a 1000x1000 canvas. */
export const mapViewBox = "0 0 1000 1000";

export const mapPaths: Record<string, string> = {
  zambia:
    "M934.5 74.8L954.7 95L965.6 133.3L958.3 145.6L949.7 182.2L957.9 219.6L944.4 235.4L931.4 277.3L953.9 289L824 326.3L828.1 358.4L795.7 364.6L771.3 382.6L766.1 398.3L750.8 401.8L713.5 439L689.8 468.2L675.4 469.3L661.5 464L613.6 459.1L605.9 455.7L605.6 452L588.7 441.8L561 439.2L525.9 449.5L498 421.2L469.1 384.3L471.1 240.5L560.2 241.1L556.5 225.5L562.9 208.6L555.4 187.4L560.3 165.5L555.7 151.5L570.5 152.6L573 166.6L593 165.5L620.2 169.7L634.5 190.2L668.8 196.5L695 182.3L704.6 205.9L737.4 212.3L753.1 231.5L770.7 256.4L803.5 256.7L799.9 208L788.2 216.2L758.2 198.7L746.7 190.6L752 145.3L759.6 91.8L750 71.9L762.2 43L773.7 37.6L831.2 30L848 34.6L865.9 46.1L883 53.7L910.2 61.3L934.5 74.8Z",
  zimbabwe:
    "M867.3 663.1L844.6 658.6L830.2 664L809.5 656.3L792 655.8L764.7 635.4L731.6 628.5L719.1 599.8L718.9 583.9L700.6 579L652.2 529.4L638.7 503.3L630.1 495.2L613.6 459.1L661.5 464L675.4 469.3L689.8 468.2L713.5 439L750.8 401.8L766.1 398.3L771.3 382.6L795.7 364.6L828.1 358.4L830.9 375.3L866.6 374.4L886.4 383.9L895.6 395.1L916 398.4L938.2 412.9L938.3 470.1L930 501.4L928.2 535.1L935 548.5L930.2 575.1L923.7 579.2L912.4 611.8L867.3 663.1Z",
  botswana:
    "M630.1 495.2L638.7 503.3L652.2 529.4L700.6 579L718.9 583.9L719.1 599.8L731.6 628.5L764.7 635.4L792 655.8L731.5 689.1L693 722.8L678.8 752.9L665.9 769.9L642.6 773.5L635.1 795.1L630.8 809.2L603.4 819.8L568.5 817.5L548.1 804.9L530.1 799.4L509.2 809.8L498.7 831.5L478.4 845.1L457 865.2L426.4 869.8L416.8 854L420.8 826.5L395.4 783.5L383.8 776.7L383.8 644.9L426 643.3L427.3 482.4L459.1 480.9L525.1 465.1L541.5 483.7L568.8 466L581.8 465.9L605.9 455.7L613.6 459.1L630.1 495.2Z",
  namibia:
    "M231.8 948.8L200 914.7L183.3 881.7L173.8 837.7L163.3 805L148.9 735.4L147.9 681.4L142.5 656.7L125.8 638.1L103.7 600.8L81.2 546.6L71.9 518.2L37 474.1L34.4 439.5L55 430.9L80.7 423.2L108.4 424.5L133.9 445L140.4 441.8L313.9 439.8L343.6 461.5L447.2 467.9L525.9 449.5L561 439.2L588.7 441.8L605.6 452L605.9 455.7L581.8 465.9L568.8 466L541.5 483.7L525.1 465.1L459.1 480.9L427.3 482.4L426 643.3L383.8 644.9L383.8 776.7L383.8 943.6L345.6 966.7L322.6 970L295.7 961.5L276.4 958.2L269.2 938.8L252.3 926.5L231.8 948.8Z",
};

/* Decorative place dots for the destinations map (viewBox
   1000x1000), grouped loosely within each country. */
export const mapDots = [
  { x: 812, y: 516 },
  { x: 770, y: 470 },
  { x: 860, y: 560 },
  { x: 742, y: 582 },
  { x: 709, y: 313 },
  { x: 640, y: 380 },
  { x: 782, y: 240 },
  { x: 830, y: 300 },
  { x: 560, y: 661 },
  { x: 620, y: 600 },
  { x: 520, y: 740 },
  { x: 650, y: 700 },
  { x: 273, y: 652 },
  { x: 180, y: 600 },
  { x: 220, y: 762 },
  { x: 330, y: 720 },
] as const;

export const destinationsSection = {
  eyebrow: "Discover Our Destinations",
  title: "Destinations map",
  headingLines: [
    { text: "Four countries,", variant: "roman" as const },
    { text: "one connected journey.", italicWord: "connected journey.", variant: "italic" as const },
  ],
  body: "We work across Zimbabwe, Zambia, Botswana and Namibia, and treat the borders between them as part of the itinerary rather than an interruption to it.",
  cards: destinations
    .filter((d) => d.slug in DESTINATION_IMAGE)
    .map((d, i) => ({
      slug: d.slug,
      index: String(i + 1).padStart(2, "0"),
      name: d.navTitle,
      description: d.navDescription,
      body: d.lead,
      href: `/destinations/${d.slug}`,
      image: DESTINATION_IMAGE[d.slug],
      alt: d.imageAlt,
      pin: DESTINATION_PIN[d.slug],
    })),
  cta: cta.destinations,
} as const;

/* --- §5 Transfers & Travel Services ------------------------ */

const SERVICE_IMAGE: Record<string, string> = {
  "road-transfers": IMG.road,
  "water-transfers": IMG.water,
  "cross-border": IMG.border,
  "driver-guided": IMG.guided,
};

const SERVICE_ORDER = [
  "road-transfers",
  "water-transfers",
  "cross-border",
  "driver-guided",
];

export const transfers = {
  eyebrow: "Transfers & Travel Services",
  headingLines: [
    { text: "The quiet work that", variant: "roman" as const },
    { text: "makes a journey hold.", italicWord: "hold.", variant: "italic" as const },
  ],
  body: "Most of what we do is the part of a journey nobody photographs — a vehicle on time, a border cleared, a boat ready at the jetty. It is also the part that decides whether the rest works.",
  services: SERVICE_ORDER.map((slug, i) => {
    const page = travelServices.find((s) => s.slug === slug);
    return {
      number: String(i + 1).padStart(2, "0"),
      slug,
      title: page?.navTitle ?? slug,
      body: page?.lead ?? "",
      href: `/travel/${slug}`,
      image: SERVICE_IMAGE[slug],
      alt: page?.imageAlt ?? "",
    };
  }),
  cta: cta.services,
} as const;

/* --- §6 Curated Experiences -------------------------------- */

const EXPERIENCE_IMAGE: Record<string, string> = {
  "victoria-falls": IMG.expFalls,
  safaris: IMG.expSafari,
  cruises: IMG.expCruise,
  chobe: IMG.expChobe,
  cultural: IMG.expCulture,
  houseboats: IMG.expHouseboat,
};

const EXPERIENCE_ORDER = [
  "victoria-falls",
  "safaris",
  "cruises",
  "chobe",
  "cultural",
  "houseboats",
];

export const experiencesSection = {
  eyebrow: "Curated Experiences",
  headingLines: [
    { text: "Days worth arranging", variant: "roman" as const },
    { text: "the rest of the trip around.", italicWord: "around.", variant: "italic" as const },
  ],
  body: "Guided Falls tours, river cruises, game drives, Chobe day trips, cultural visits and Lake Kariba houseboats — all arranged through the same office as the transfers.",
  list: EXPERIENCE_ORDER.map((slug, i) => {
    const page = experiences.find((e) => e.slug === slug);
    return {
      number: String(i + 1).padStart(2, "0"),
      slug,
      title: page?.navTitle ?? slug,
      body: page?.lead ?? "",
      href: `/experiences/${slug}`,
      image: EXPERIENCE_IMAGE[slug],
      alt: page?.imageAlt ?? "",
    };
  }),
  cta: cta.allExperiences,
} as const;

/* --- §7 Educational & School Trips ------------------------- */

export const education = {
  eyebrow: "Educational & School Trips",
  headingLines: [
    { text: "School trips that have", variant: "roman" as const },
    { text: "to run to a schedule.", italicWord: "schedule.", variant: "italic" as const },
  ],
  body:
    educationalTrips.intro?.[0] ??
    "We arrange educational school trips out of Victoria Falls.",
  bodySecond:
    educationalTrips.intro?.[1] ??
    "Our objective is to give you the opportunity to focus on your other core activities while your educational trip is fully satisfied.",
  itinerary: (educationalTrips.highlights ?? []).map((h) => ({
    title: h.title,
    body: h.body,
  })),
  cta: cta.schoolTrip,
  image: IMG.education,
  alt: "A school group on an educational trip in Victoria Falls.",
} as const;

/* --- §8 Stays & Accommodation ------------------------------ */

export const stays = {
  eyebrow: "Stays & Accommodation",
  headingLines: [
    { text: "Somewhere right to sleep,", variant: "roman" as const },
    { text: "on the route you're taking.", italicWord: "taking.", variant: "italic" as const },
  ],
  body: "Accommodation is one of our quality products, not an afterthought booked once the rest of the trip is fixed. We arrange it, and we place it so the transfers between stops still make sense.",
  types: [
    { title: "Hotels", body: "City and resort hotels arranged to fit the programme." },
    { title: "Lodges", body: "Lodges placed close to the activities being planned." },
    { title: "Self-Catering", body: "Self-catering options for longer stays and groups." },
    { title: "Camping", body: "Camping arranged as part of the itinerary." },
    { title: "Houseboats", body: "Houseboats on Lake Kariba for time off the road." },
  ],
  cta: cta.accommodation,
  image: IMG.stayHotel,
  alt: "Sunset over bush country in southern Africa.",
} as const;

/* --- §9 Meet the Team --------------------------------------
   Ranjis has a portrait on file. Where no portrait exists the
   card is shown as a monogram tile rather than borrowing an
   image that is not of the person. */

export const team = {
  eyebrow: "Meet the Team",
  headingLines: [
    { text: "The people behind", variant: "roman" as const },
    { text: "the arrangements.", italicWord: "arrangements.", variant: "italic" as const },
  ],
  body: "A small company by design. It means the person you speak to when you ask about a border is the person who arranges them.",
  members: [
    {
      name: "Ranjis Nyakusengwa",
      role: "Managing Director / Secretary",
      detail:
        "Twenty-nine years in the industry, from lodge management to regional operations and cruise operations — including Cruise Director of the Zambezi Queen on the Chobe River. Co-founder of the company in 2013.",
      initials: "RN",
      image: IMG.founder,
      alt: "Ranjis Nyakusengwa, founder and Managing Director of Beneath Africa Travel and Tours.",
    },
    {
      name: "Bruce Nyakusengwa",
      role: "Operations Director",
      detail:
        "Responsible for the operations department and the daily planning of road transfers, including vehicle log books, servicing, repairs, fuelling and all vehicle licensing.",
      initials: "BN",
      image: null,
      alt: "",
    },
    {
      name: "Naume Ndoro",
      role: "Director · Co-founder",
      detail:
        "Co-founder of the company in 2013 and a director of Zeresh Trading Company Private Limited.",
      initials: "NN",
      image: null,
      alt: "",
    },
  ],
  cta: cta.team,
} as const;

/* --- §10 Our Experience & Recognition ---------------------- */

export const recognition = {
  eyebrow: "Our Experience & Recognition",
  headingLines: [
    { text: "Since 2013,", variant: "roman" as const },
    { text: "and a paper trail.", italicWord: "paper trail.", variant: "italic" as const },
  ],
  body: "Beneath Africa is a registered Zimbabwean tourism company that has been trading since 2013. The work we are asked to do most often is the work nobody photographs — which is exactly why the record matters.",
  award: {
    title: company.award.title,
    event: company.award.event,
    year: company.award.year,
  },
  ledger: [
    { term: "Registered name", value: company.registeredName },
    { term: "Company number", value: company.registrationNumber },
    { term: "Established", value: String(company.established) },
    { term: "Based", value: company.base },
    { term: "Countries worked", value: "Zimbabwe, Zambia, Botswana, Namibia" },
  ],
  image: IMG.recognition,
  alt: "The Beneath Africa Travel and Tours office in Victoria Falls.",
} as const;

/* --- §11 Client References & Partnerships ------------------ */

const testimonialsPage = aboutPages.find((p) => p.slug === "testimonials");

export const references = {
  eyebrow: "Client References & Partnerships",
  headingLines: [
    { text: "We find fulfilment in", variant: "roman" as const },
    { text: "a job well done.", italicWord: "well done.", variant: "italic" as const },
  ],
  body: "Ask our clients. These references were supplied to us by our partners and travellers, and are reproduced as written.",
  quotes: (testimonialsPage?.quotes ?? []) as Quote[],
  partners: clientReferences,
  cta: cta.workWithUs,
  image: IMG.references,
  alt: "Beneath Africa guides and drivers with their vehicles on a game reserve road.",
} as const;

/* --- §12 Final call to action ------------------------------ */

export const finalCta = {
  eyebrow: "Plan With Us",
  headingLines: [
    { text: "Your journey", variant: "roman" as const },
    { text: "starts here.", italicWord: "starts here.", variant: "italic" as const },
  ],
  body: "Leisure travellers, families, groups and schools. Tell us the dates and who is travelling, and we will tell you honestly whether we are the right company for it.",
  primary: cta.plan,
  secondary: {
    label: "Contact Our Team",
    href: "mailto:reservations@beneathafricatravel.co.zw",
  },
  image: IMG.closing,
  alt: "Hippos standing in the shallows of the Zambezi at first light.",
} as const;

/* --- §10b Awards -------------------------------------------
   A dedicated showcase for the company's one recorded award
   (company.award), reproduced from the company profile. No
   other awards are claimed. */

export const awards = {
  eyebrow: "Awards",
  headingLines: [
    { text: "Recognised on the", variant: "roman" as const },
    { text: "national stage.", italicWord: "national stage.", variant: "italic" as const },
  ],
  body: `In ${company.award.year}, Beneath Africa Travel and Tours was awarded the ${company.award.title} at the ${company.award.event}.`,
  award: {
    title: company.award.title,
    event: company.award.event,
    year: company.award.year,
    place: "Zimbabwe",
  },
  note: "Presented to a first-time exhibitor at the country's national tourism expo — six years after the company was established in Victoria Falls.",
  ledger: [
    { term: "Award", value: company.award.title },
    { term: "Event", value: company.award.event },
    { term: "Year", value: company.award.year },
  ],
} as const;

/* --- §10c Gallery -------------------------------------------
   A photo band drawn from the working image library. Captions
   describe what each photograph shows; no place is claimed
   that the company does not work in. */

export const gallery = {
  eyebrow: "Gallery",
  headingLines: [
    { text: "A look at", variant: "roman" as const },
    { text: "the journeys.", italicWord: "journeys.", variant: "italic" as const },
  ],
  body: "Transfer vehicles, river cruises, game drives, cultural visits and the offices that arrange them — a short visual record of the work.",
  images: [
    { src: IMG.expFalls, alt: "Mist rising off Victoria Falls.", span: "wide" },
    { src: IMG.road, alt: "A Beneath Africa transfer vehicle on the road.", span: "tall" },
    { src: IMG.water, alt: "Sunset over the water on a river cruise.", span: "normal" },
    { src: IMG.expChobe, alt: "A Chobe day trip in Botswana.", span: "normal" },
    { src: IMG.expSafari, alt: "A game drive in the early morning.", span: "wide" },
    { src: IMG.expCulture, alt: "A cultural visit near Victoria Falls.", span: "normal" },
    { src: IMG.zimbabwe, alt: "The Zimbabwean landscape.", span: "normal" },
    { src: IMG.expHouseboat, alt: "A houseboat on Lake Kariba.", span: "tall" },
  ],
} as const;

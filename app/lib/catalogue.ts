import type {
  CardLink,
  GalleryImage,
  Highlight,
  InteriorPageData,
} from "./content";
import { experiences, findPage } from "./content";

/**
 * The bookable catalogue.
 *
 * These are the experiences a visitor can actually ask us to arrange. They are
 * de-duplicated from the activity cards spread across the group pages: the same
 * experience often appeared on several pages (for example "Sunset Cruise" and
 * "Sunset Cruise on the Zambezi"), and those are merged into one canonical item
 * here.
 *
 * Items that are not bookable experiences — destination links, accommodation
 * types, transfers and coordination notes — deliberately stay on their existing
 * pages and are not listed here.
 *
 * The descriptive copy below is drafted from the published page content. It is
 * written to be honest and general; specifics such as prices, durations and
 * inclusions are set by the operators and confirmed with each enquiry, and the
 * client should review the wording before launch.
 */

export type BookableItem = {
  slug: string;
  title: string;
  category: string;
  /** Where the experience happens, used in the eyebrow. */
  location: string;
  /** Overview page this experience belongs to. */
  groupHref: string;
  image: string;
  imageAlt: string;
  /** One-line description, used on cards and as the hero lead. */
  summary: string;
  intro: string[];
  highlights: Highlight[];
  gallery?: GalleryImage[];
};

export const bookableItems: BookableItem[] = [
  // --- Victoria Falls, at the Falls -------------------------------
  {
    slug: "guided-tour-of-the-falls",
    title: "Guided Tour of the Falls",
    category: "Tours",
    location: "Victoria Falls",
    groupHref: "/experiences/victoria-falls",
    image: "/image-library/Victoria Falls mist image1.jpg",
    imageAlt: "Mist rising from the Victoria Falls",
    summary:
      "A guided walk along the Falls, timed around the rest of your day.",
    intro: [
      "A guided walk along the viewpoints on the Zimbabwe side of the Falls, led by a local guide who reads the river, the spray and the light. We arrange the guide and the transfers so the visit fits rather than competes with the rest of the day.",
      "The walk is usually kept short and moved around the weather and your itinerary. We confirm the timing with you beforehand.",
    ],
    highlights: [
      {
        title: "Guided On The Ground",
        body: "A local guide leads the walk along the viewpoints.",
      },
      {
        title: "Timed To Fit",
        body: "Scheduled around the rest of your day and the conditions.",
      },
      {
        title: "Transfers Included",
        body: "Drop-off and collection arranged from your accommodation.",
      },
    ],
  },
  {
    slug: "helicopter-flight",
    title: "Helicopter Flight",
    category: "Flights",
    location: "Victoria Falls",
    groupHref: "/experiences/victoria-falls",
    image: "/image-library/Helicopter Flights image1.jpg",
    imageAlt: "A helicopter over the Victoria Falls",
    summary: "A helicopter flight over the Falls, arranged around your dates.",
    intro: [
      "The flight lifts off over the Zambezi and circles the Falls, giving the scale of the gorge in a few minutes where the ground walk gives the detail. We arrange the booking and the transfers around it.",
      "Flight times are set by the operator and by the weather. We confirm the slot with you and keep it in step with the rest of your itinerary.",
    ],
    highlights: [
      {
        title: "Over The Falls",
        body: "A high view of the Falls, the gorge and the river.",
      },
      {
        title: "Short And Set Apart",
        body: "A few minutes in the air, easily fitted into a day.",
      },
      {
        title: "Arranged For You",
        body: "Booking, timing and transfers handled from our office.",
      },
    ],
  },
  {
    slug: "white-water-rafting",
    title: "White Water Rafting",
    category: "Adrenaline",
    location: "Victoria Falls",
    groupHref: "/experiences/victoria-falls",
    image: "/image-library/White-Water Rafting image1.jpg",
    imageAlt: "Rafters working through the rapids on the Zambezi",
    summary: "Guided rafting on the Zambezi, below the Falls.",
    intro: [
      "Below Victoria Falls the Zambezi narrows and drops through a long run of rapids, and rafting trips work their way down the gorge. We arrange the trip, the guides and the transfers as one day.",
      "The water level and the exact route are decided by the river and the operators on the day. We confirm the plan with you beforehand, and rearrange it if conditions change.",
    ],
    highlights: [
      {
        title: "Arranged End To End",
        body: "Trip, guides and transfers handled together so the day runs as one.",
      },
      {
        title: "Guided On The River",
        body: "Professional river guides lead the raft and set the pace.",
      },
      {
        title: "Transfers Included",
        body: "Pick-up and drop-off arranged around your itinerary.",
      },
    ],
  },
  {
    slug: "bungee-jump",
    title: "Bungee Jump",
    category: "Adrenaline",
    location: "Victoria Falls",
    groupHref: "/experiences/victoria-falls",
    image: "/image-library/Bungee Jump image1.jpg",
    imageAlt: "The bungee bridge over the Victoria Falls gorge",
    summary: "A bungee jump from the bridge over the Victoria Falls gorge.",
    intro: [
      "The jump is made from the bridge that spans the gorge between Zimbabwe and Zambia, with the Falls and the river below. We arrange the booking and the transfers around it.",
      "Timings and availability are set by the operator on the day. We confirm the slot with you and keep it in step with the rest of your itinerary.",
    ],
    highlights: [
      {
        title: "Bridge Over The Gorge",
        body: "The jump platform sits on the crossing between Zimbabwe and Zambia.",
      },
      {
        title: "Booked And Timed",
        body: "Slots arranged to fit around the rest of your day.",
      },
      {
        title: "Transfers Included",
        body: "We handle the getting there and back.",
      },
    ],
  },
  {
    slug: "flying-fox",
    title: "Flying Fox",
    category: "Adrenaline",
    location: "Victoria Falls",
    groupHref: "/experiences/victoria-falls",
    image: "/image-library/Victoria Falls mist image2.jpg",
    imageAlt: "The gorge below the Victoria Falls",
    summary: "A cable slide across the gorge, run alongside the bungee site.",
    intro: [
      "The flying fox is a seated slide on a cable that carries you across the gorge, often done alongside or instead of the bungee. We arrange the booking and the transfers.",
      "Availability is set by the operator on the day, and we time it so it fits the rest of your itinerary.",
    ],
    highlights: [
      {
        title: "Across The Gorge",
        body: "A seated cable slide with the gorge below and the Falls nearby.",
      },
      {
        title: "Alongside The Bungee",
        body: "Easy to pair with the bungee on the same visit.",
      },
      {
        title: "Arranged For You",
        body: "Booking and transfers handled from our office.",
      },
    ],
  },
  {
    slug: "horse-riding",
    title: "Horse Riding",
    category: "Adrenaline",
    location: "Victoria Falls",
    groupHref: "/experiences/victoria-falls",
    image: "/image-library/Bush sunset.jpg",
    imageAlt: "Golden light over the bush near Victoria Falls",
    summary: "Guided horse riding through the bush around Victoria Falls.",
    intro: [
      "Guided rides set out from Victoria Falls into the surrounding bush, usually timed for the cooler hours of the day. We arrange the ride and the transfers.",
      "The route and the pace are matched to the group by the operator. We confirm the details with you beforehand.",
    ],
    highlights: [
      {
        title: "Out Into The Bush",
        body: "Rides set out from town into the surrounding bush.",
      },
      {
        title: "Guided Throughout",
        body: "The operator leads the ride and sets the pace for the group.",
      },
      {
        title: "Arranged For You",
        body: "Booking and transfers handled from our office.",
      },
    ],
  },
  {
    slug: "city-tour",
    title: "City Tour",
    category: "Tours",
    location: "Victoria Falls",
    groupHref: "/experiences/victoria-falls",
    image: "/image-library/Road journey image2.jpg",
    imageAlt: "A road in Victoria Falls town",
    summary: "A guided look at Victoria Falls town and its surroundings.",
    intro: [
      "A guided tour of the town and its surroundings, useful on a first visit or a short stay. We arrange the guide and the vehicle.",
      "The route can be shaped around what you want to see, and timed around the rest of your itinerary.",
    ],
    highlights: [
      {
        title: "Town And Around",
        body: "A guided look at Victoria Falls town and its surroundings.",
      },
      {
        title: "Shaped Around You",
        body: "The route can follow whatever you want to see.",
      },
      {
        title: "Vehicle And Guide",
        body: "Both arranged from our office.",
      },
    ],
  },

  // --- Wildlife & safari ------------------------------------------
  {
    slug: "game-drives",
    title: "Game Drives",
    category: "Game Viewing",
    location: "Victoria Falls",
    groupHref: "/experiences/safaris",
    image: "/image-library/Game Drives image1.jpg",
    imageAlt: "A game drive vehicle in the bush",
    summary: "Game drives in the bush and parks around Victoria Falls.",
    intro: [
      "Game drives set out from Victoria Falls into the surrounding bush and the nearby parks, usually at the cooler ends of the day when the wildlife is most active. We arrange the drive and the transfers.",
      "The route and the timing are set by the operator and the season. We confirm the plan with you beforehand.",
    ],
    highlights: [
      {
        title: "Out At The Right Hours",
        body: "Drives usually run early or late, when wildlife is active.",
      },
      {
        title: "Guided And Driven",
        body: "The operator leads the drive and reads the bush.",
      },
      {
        title: "Arranged For You",
        body: "Booking and transfers handled from our office.",
      },
    ],
    gallery: [
      {
        src: "/image-library/Game Drives image2.jpg",
        alt: "Wildlife seen on a game drive near Victoria Falls",
      },
    ],
  },
  {
    slug: "lion-walk",
    title: "Lion Walk",
    category: "Wildlife",
    location: "Victoria Falls",
    groupHref: "/experiences/safaris",
    image: "/image-library/WILDLIFE DETAIL LIBRARY Lion image1.jpg",
    imageAlt: "Lions in the bush near Victoria Falls",
    summary: "A guided walk with lions, run by a specialist local operator.",
    intro: [
      "The lion walk runs with a local operator that works with lions in the bush outside town. We arrange the booking and the transfers around it.",
      "Availability and the format of the walk are set by the operator on the day. We confirm the details with you beforehand.",
    ],
    highlights: [
      {
        title: "Guided In The Bush",
        body: "The walk is led by the operator's own guides.",
      },
      {
        title: "Run By Specialists",
        body: "Handled by the specialist operator that runs the experience.",
      },
      {
        title: "Arranged For You",
        body: "Booking and transfers handled from our office.",
      },
    ],
    gallery: [
      {
        src: "/image-library/WILDLIFE DETAIL LIBRARY Lion image2.jpg",
        alt: "Lions resting in the bush near Victoria Falls",
      },
    ],
  },
  {
    slug: "crocodile-farm-visit",
    title: "Crocodile Farm Visit",
    category: "Wildlife",
    location: "Victoria Falls",
    groupHref: "/experiences/victoria-falls",
    image: "/image-library/WILDLIFE DETAIL LIBRARY Crocodiles image1.jpg",
    imageAlt: "Crocodiles at a farm near Victoria Falls",
    summary: "A visit to a crocodile farm near Victoria Falls.",
    intro: [
      "A short visit to a crocodile farm near town, often paired with other stops on the same day. We arrange the booking and the transfers.",
      "Opening times are set by the farm, and we time the visit to fit the rest of your day.",
    ],
    highlights: [
      {
        title: "Close To Town",
        body: "A short trip out from Victoria Falls.",
      },
      {
        title: "Easily Paired",
        body: "Fits alongside other stops on the same day.",
      },
      {
        title: "Arranged For You",
        body: "Booking and transfers handled from our office.",
      },
    ],
    gallery: [
      {
        src: "/image-library/WILDLIFE DETAIL LIBRARY Crocodiles image2.jpg",
        alt: "Crocodiles on the bank at a farm near Victoria Falls",
      },
    ],
  },
  {
    slug: "camping",
    title: "Camping",
    category: "Safari",
    location: "Victoria Falls",
    groupHref: "/experiences/safaris",
    image: "/image-library/Beneath africa camp.jpeg",
    imageAlt: "A camp set up near Victoria Falls",
    summary: "Camping in the bush around Victoria Falls, arranged with the transfers.",
    intro: [
      "Camping is arranged through the same office as the rest of the trip, so the site, the equipment and the transfers are agreed together rather than found on arrival.",
      "What is provided and what you bring along is settled with each booking. We confirm the details with you beforehand.",
    ],
    highlights: [
      {
        title: "Under Canvas",
        body: "Camping in the bush around Victoria Falls.",
      },
      {
        title: "Agreed In Advance",
        body: "Site, equipment and transfers settled before you travel.",
      },
      {
        title: "Arranged For You",
        body: "Handled from our office alongside your itinerary.",
      },
    ],
  },
  {
    slug: "overnight-stay-in-hwange",
    title: "Overnight Stay in Hwange",
    category: "Safari",
    location: "Hwange, Zimbabwe",
    groupHref: "/experiences/safaris",
    image: "/image-library/Beneath africa camp.jpeg",
    imageAlt: "Camp in the bush in Zimbabwe",
    summary:
      "An overnight in Hwange, placed inside a wider Zimbabwe itinerary.",
    intro: [
      "Hwange is Zimbabwe's largest national park, and an overnight there is usually built into a longer Zimbabwe itinerary rather than visited from Victoria Falls in a single day.",
      "Accommodation, the drive and the game viewing are planned together, so the Hwange section sits properly inside the trip. We confirm the details with you beforehand.",
    ],
    highlights: [
      {
        title: "Zimbabwe's Largest Park",
        body: "An overnight in Hwange, rather than a rushed day trip.",
      },
      {
        title: "Built Into The Trip",
        body: "Planned alongside the Falls and the rest of your itinerary.",
      },
      {
        title: "Transfers Arranged",
        body: "The drive to and from Hwange handled from our office.",
      },
    ],
  },

  // --- River cruises ----------------------------------------------
  {
    slug: "breakfast-cruise",
    title: "Breakfast Cruise",
    category: "River Cruises",
    location: "Victoria Falls",
    groupHref: "/experiences/cruises",
    image: "/image-library/Zambezi sunrise image1.jpg",
    imageAlt: "Sunrise over the Zambezi",
    summary: "A morning cruise on the Zambezi, before the day's activities.",
    intro: [
      "A cruise on the Zambezi at the start of the day, while the river is at its quietest. We arrange the booking and the transfers to and from the river.",
      "Departure times are set by the operator and by the season. We confirm the slot with you beforehand, and it fits neatly before a day that has the Falls in it.",
    ],
    highlights: [
      {
        title: "Morning On The River",
        body: "The quietest stretch of the day on the Zambezi.",
      },
      {
        title: "An Early Start",
        body: "On the water before the rest of the day begins.",
      },
      {
        title: "Transfers Included",
        body: "Road transfers arranged to and from the river.",
      },
    ],
  },
  {
    slug: "lunch-cruise",
    title: "Lunch Cruise",
    category: "River Cruises",
    location: "Victoria Falls",
    groupHref: "/experiences/cruises",
    image: "/image-library/Beneath boat image2.jpeg",
    imageAlt: "A cruise boat on the Zambezi",
    summary: "A midday cruise on the Zambezi, arranged as needed.",
    intro: [
      "A cruise on the Zambezi through the middle of the day. We arrange the booking and the transfers to and from the river.",
      "Departure times are set by the operator and by the season. We confirm the slot with you beforehand.",
    ],
    highlights: [
      {
        title: "Midday On The River",
        body: "A calm stretch of river through the middle of the day.",
      },
      {
        title: "Easily Added",
        body: "A straightforward addition to a day that is already moving.",
      },
      {
        title: "Transfers Included",
        body: "Road transfers arranged to and from the river.",
      },
    ],
  },
  {
    slug: "sunset-cruise",
    title: "Sunset Cruise",
    category: "River Cruises",
    location: "Victoria Falls",
    groupHref: "/experiences/cruises",
    image: "/image-library/Zambezi Sunset Cruise image1.jpg",
    imageAlt: "Sunset over the Zambezi",
    summary: "An evening cruise on the Zambezi, timed to the sunset.",
    intro: [
      "The sunset cruise works the Zambezi as the light goes — the best-known of the four, and the easiest to add to a day. We arrange the booking and the transfers.",
      "Departure is timed to the sunset, which moves through the year. We confirm the slot with you beforehand.",
    ],
    highlights: [
      {
        title: "Timed To The Sunset",
        body: "The cruise follows the light as the day closes.",
      },
      {
        title: "The Easiest To Add",
        body: "The best-known of the four, and simple to fit in.",
      },
      {
        title: "Transfers Included",
        body: "Road transfers arranged to and from the river.",
      },
    ],
  },
  {
    slug: "dinner-cruise",
    title: "Dinner Cruise",
    category: "River Cruises",
    location: "Victoria Falls",
    groupHref: "/experiences/cruises",
    image: "/image-library/Beneath africa travel cruise.jpeg",
    imageAlt: "A cruise boat on the Zambezi at dusk",
    summary: "An evening cruise on the Zambezi, arranged as needed.",
    intro: [
      "A cruise on the Zambezi into the evening. We arrange the booking and the transfers to and from the river.",
      "Departure times are set by the operator and by the season. We confirm the slot with you beforehand.",
    ],
    highlights: [
      {
        title: "Into The Evening",
        body: "A later stretch on the river as the day closes.",
      },
      {
        title: "Arranged As Needed",
        body: "One of the four cruises we arrange on the Zambezi.",
      },
      {
        title: "Transfers Included",
        body: "Road transfers arranged to and from the river.",
      },
    ],
  },

  // --- Cultural experiences ---------------------------------------
  {
    slug: "boma-dinner",
    title: "Boma Dinner",
    category: "Culture",
    location: "Victoria Falls",
    groupHref: "/experiences/cultural",
    image: "/image-library/Beneath fire image1.jpeg",
    imageAlt: "A fire at a boma dinner near Victoria Falls",
    summary: "An evening around the fire, arranged as a set piece.",
    intro: [
      "The boma dinner is an evening around the fire, arranged in advance rather than improvised. We handle the booking and the transfers.",
      "It is booked as a set piece, which means the group size, the timing and the transfers are agreed beforehand so the evening works properly.",
    ],
    highlights: [
      {
        title: "Around The Fire",
        body: "An evening arranged around the fire.",
      },
      {
        title: "Booked In Advance",
        body: "Group size, timing and transfers agreed beforehand.",
      },
      {
        title: "Transfers Included",
        body: "Drop-off and collection arranged from your accommodation.",
      },
    ],
  },
  {
    slug: "village-experience",
    title: "Village Experience",
    category: "Culture",
    location: "Victoria Falls",
    groupHref: "/experiences/cultural",
    image: "/image-library/Cultural Experience image1.jpg",
    imageAlt: "A village visit near Victoria Falls",
    summary: "A village visit arranged with local hosts, booked ahead.",
    intro: [
      "A village visit arranged with local hosts who are known to us rather than found on the day. We handle the booking and the transfers.",
      "It is booked in advance rather than improvised — the group size, the timing and the transfers need to be agreed beforehand for the visit to work properly.",
    ],
    highlights: [
      {
        title: "With Local Hosts",
        body: "Arranged through people we already work with.",
      },
      {
        title: "Booked In Advance",
        body: "Group size, timing and transfers agreed beforehand.",
      },
      {
        title: "Transfers Included",
        body: "Drop-off and collection arranged from your accommodation.",
      },
    ],
    gallery: [
      {
        src: "/image-library/Cultural Experience image3.jpg",
        alt: "A cultural experience near Victoria Falls",
      },
    ],
  },
  {
    slug: "dust-road-local-meals",
    title: "Dust Road Local Meals",
    category: "Culture",
    location: "Victoria Falls",
    groupHref: "/experiences/cultural",
    image: "/image-library/Beneath africa travel traditional food cooking.jpeg",
    imageAlt: "Traditional food being prepared",
    summary: "Local food prepared as part of the experience, not a stop.",
    intro: [
      "Local meals are prepared as part of the experience rather than as a quick stop along the way. We arrange the booking and the transfers.",
      "Details are agreed with the hosts beforehand. We confirm them with you before you travel.",
    ],
    highlights: [
      {
        title: "Cooked, Not Catered",
        body: "Local food prepared as part of the experience itself.",
      },
      {
        title: "Agreed With The Hosts",
        body: "Details settled in advance rather than on the day.",
      },
      {
        title: "Transfers Included",
        body: "Drop-off and collection arranged from your accommodation.",
      },
    ],
  },

  // --- Day trips & wider Zimbabwe ---------------------------------
  {
    slug: "chobe-day-trip",
    title: "Chobe Day Trip",
    category: "Day Trips",
    location: "Chobe, Botswana",
    groupHref: "/experiences/chobe",
    image: "/image-library/Chobe Day Trip image1.jpg",
    imageAlt: "A game drive in the Chobe area of Botswana",
    summary:
      "A day trip into Chobe, with the border crossings coordinated for you.",
    intro: [
      "Chobe is across the border in Botswana, close enough to Victoria Falls for a day trip and best known for its elephants and its riverfront. We arrange the game viewing, the river time and the border crossings as one day.",
      "Cross-border coordination is the part that makes the day work. We handle the formalities and the return transfer to Victoria Falls so the trip runs without you having to arrange the border yourself.",
    ],
    highlights: [
      {
        title: "Across The Border",
        body: "A day into Chobe, Botswana, from Victoria Falls.",
      },
      {
        title: "Game Viewing & River",
        body: "The park and the riverfront, arranged together.",
      },
      {
        title: "Border Coordination",
        body: "Cross-border formalities and the return transfer handled for you.",
      },
    ],
    gallery: [
      {
        src: "/image-library/Chobe Day Trip image3.jpg",
        alt: "Wildlife in the Chobe area of Botswana",
      },
    ],
  },
  {
    slug: "houseboat-on-lake-kariba",
    title: "Houseboat on Lake Kariba",
    category: "Houseboats",
    location: "Lake Kariba, Zimbabwe",
    groupHref: "/experiences/houseboats",
    image: "/image-library/Beneath Boat Interior.jpeg",
    imageAlt: "The interior of a houseboat on Lake Kariba",
    summary:
      "Houseboat time on Lake Kariba, placed inside a wider Zimbabwe itinerary.",
    intro: [
      "Lake Kariba is a different waterway and a different kind of trip from the Zambezi cruises, and houseboats there are booked as part of a wider Zimbabwe itinerary rather than as a standalone afternoon.",
      "Transfers, time on board and the rest of the programme are planned together, which is what allows a Kariba section to sit inside a trip that also includes the Falls and Hwange.",
    ],
    highlights: [
      {
        title: "Lake Kariba",
        body: "Houseboat time on the lake, away from the Falls timetable.",
      },
      {
        title: "Combined Itineraries",
        body: "Kariba placed alongside the Falls and Hwange where it fits.",
      },
      {
        title: "Transfers Arranged",
        body: "Road transfers arranged to and from the lake.",
      },
    ],
    gallery: [
      {
        src: "/image-library/Beneath Boat Interior image 2.jpeg",
        alt: "On board a houseboat on Lake Kariba",
      },
    ],
  },
];

export function findItem(slug: string): BookableItem | undefined {
  return bookableItems.find((item) => item.slug === slug);
}

/** Slugs featured in the homepage quick-book strip. */
export const FEATURED_SLUGS = [
  "guided-tour-of-the-falls",
  "helicopter-flight",
  "white-water-rafting",
  "game-drives",
  "sunset-cruise",
  "breakfast-cruise",
  "boma-dinner",
  "chobe-day-trip",
];

export const featuredItems: BookableItem[] = FEATURED_SLUGS.map((slug) =>
  findItem(slug),
).filter((item): item is BookableItem => Boolean(item));

/** Bookable items as CardLink-shaped cards pointing at /activities/[slug]. */
export const bookableCards: CardLink[] = featuredItems.map((item) => ({
  href: `/activities/${item.slug}`,
  title: item.title,
  description: item.summary,
  image: item.image,
}));

/**
 * Activity cards across the site use their own wording for the same
 * experience. These are the titles that differ from the canonical item title.
 */
const CARD_ALIASES: Record<string, string> = {
  Bungee: "bungee-jump",
  "Sunset Cruise on the Zambezi": "sunset-cruise",
  "Village Experiences": "village-experience",
  "Visit to a Crocodile Farm": "crocodile-farm-visit",
  "Chobe Day Trips": "chobe-day-trip",
  "Houseboats On Lake Kariba": "houseboat-on-lake-kariba",
};

/**
 * Resolve an activity card to its dedicated page, or undefined when the card
 * is not a bookable experience (destination, accommodation, transfer, etc.).
 */
export function activitySlug(title: string): string | undefined {
  const clean = title.trim();
  const direct = bookableItems.find(
    (item) => item.title.toLowerCase() === clean.toLowerCase(),
  );
  return CARD_ALIASES[clean] ?? direct?.slug;
}

/**
 * The href for an activity card: its dedicated page when one exists,
 * otherwise the href it already had.
 */
export function activityHref(
  title: string,
  fallback?: string,
): string | undefined {
  const slug = activitySlug(title);
  return slug ? `/activities/${slug}` : fallback;
}

/** The overview page for an item, as a card. */
function groupCard(item: BookableItem): CardLink | null {
  const slug = item.groupHref.split("/").pop() ?? "";
  const page = findPage(experiences, slug);
  if (!page) return null;
  return {
    title: page.navTitle,
    href: item.groupHref,
    description: page.navDescription,
    image: page.image,
  };
}

function itemCard(item: BookableItem): CardLink {
  return {
    title: item.title,
    href: `/activities/${item.slug}`,
    description: item.summary,
    image: item.image,
  };
}

/** Related cards: the overview page first, then siblings from the same group. */
export function relatedItems(item: BookableItem, count = 3): CardLink[] {
  const group = groupCard(item);
  const siblings = bookableItems
    .filter((other) => other.groupHref === item.groupHref && other.slug !== item.slug)
    .slice(0, count)
    .map(itemCard);
  return group ? [group, ...siblings] : siblings;
}

/** Adapt a catalogue item to the shared interior page layout. */
export function itemPageData(item: BookableItem): InteriorPageData {
  return {
    slug: item.slug,
    navTitle: item.title,
    navDescription: item.summary,
    eyebrow: `${item.category} · ${item.location}`,
    title: item.title,
    lead: item.summary,
    image: item.image,
    imageAlt: item.imageAlt,
    metaDescription: item.summary,
    intro: item.intro,
    highlights: item.highlights,
    gallery: item.gallery,
    related: relatedItems(item),
  };
}

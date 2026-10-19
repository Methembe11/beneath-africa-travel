export type CardLink = {
  title: string;
  href: string;
  description: string;
  image?: string;
};

export type Highlight = {
  title: string;
  body: string;
};

export type ActivityCard = {
  title: string;
  category: string;
  image: string;
  href?: string;
};

export type DetailSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  cards?: ActivityCard[];
};

export type Person = {
  name: string;
  role: string;
  detail: string;
};

export type TimelineEntry = {
  period: string;
  role: string;
};

export type Quote = {
  body: string;
  attribution: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type InteriorPageData = {
  slug: string;
  navTitle: string;
  navDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  metaDescription: string;
  intro?: string[];
  highlights?: Highlight[];
  sections?: DetailSection[];
  people?: Person[];
  timeline?: TimelineEntry[];
  quotes?: Quote[];
  gallery?: GalleryImage[];
  pills?: string[];
  note?: string;
  related?: CardLink[];
};

export const company = {
  tradingName: "Beneath Africa Travel and Tours",
  shortName: "Beneath Africa Travel & Tours",
  registeredName: "Zeresh Trading Company Private Limited",
  registrationNumber: "845/2013",
  established: 2013,
  base: "Victoria Falls, Zimbabwe",
  addressLines: [
    "483 Jacaranda Crescent",
    "P.O. Box 262",
    "Victoria Falls",
    "Zimbabwe",
  ],
  phones: [
    {
      label: "+263 77 813 0264",
      href: "tel:+263778130264",
      note: "Calls & WhatsApp",
    },
    {
      label: "+263 71 666 9887",
      href: "tel:+263716669887",
      note: "Mobile",
    },
  ],
  emails: [
    {
      label: "ranjis@beneathafricatravel.co.zw",
      href: "mailto:ranjis@beneathafricatravel.co.zw",
      note: "Ranjis Nyakusengwa, Managing Director",
    },
    {
      label: "reservations@beneathafricatravel.co.zw",
      href: "mailto:reservations@beneathafricatravel.co.zw",
      note: "Reservations",
    },
  ],
  website: "beneathafricatravel.co.zw",
  award: {
    title: "Best First-Time Exhibitor Stand Award",
    event: "Sanganai / Hlanganani World Tourism Expo",
    year: "2019",
  },
};

export const victoriaFallsActivityCards: ActivityCard[] = [
  {
    title: "Camping",
    category: "Safari",
    image: "/image-library/Beneath africa camp.jpeg",
    href: "/experiences/safaris",
  },
  {
    title: "Chobe Day Trip",
    category: "Game Viewing",
    image: "/image-library/Chobe Day Trip image1.jfif",
    href: "/experiences/chobe",
  },
  {
    title: "Helicopter Flight",
    category: "Flights",
    image: "/image-library/Helicopter Flights image1.jfif",
    href: "/experiences/victoria-falls",
  },
  {
    title: "Breakfast Cruise",
    category: "River Cruises",
    image: "/image-library/Zambezi sunrise image1.jfif",
    href: "/experiences/cruises",
  },
  {
    title: "Lunch Cruise",
    category: "River Cruises",
    image: "/image-library/Beneath boat image2.jpeg",
    href: "/experiences/cruises",
  },
  {
    title: "Sunset Cruise",
    category: "River Cruises",
    image: "/image-library/Zambezi Sunset Cruise image1.jfif",
    href: "/experiences/cruises",
  },
  {
    title: "Dinner Cruise",
    category: "River Cruises",
    image: "/image-library/Beneath africa travel cruise.jpeg",
    href: "/experiences/cruises",
  },
  {
    title: "Lion Walk",
    category: "Wildlife",
    image: "/image-library/WILDLIFE DETAIL LIBRARY Lion image1.jfif",
    href: "/experiences/safaris",
  },
  {
    title: "Game Drives",
    category: "Game Viewing",
    image: "/image-library/Game Drives image1.jfif",
    href: "/experiences/safaris",
  },
  {
    title: "Village Experience",
    category: "Culture",
    image: "/image-library/Cultural Experience image1.jfif",
    href: "/experiences/cultural",
  },
  {
    title: "Dust Road Local Meals",
    category: "Culture",
    image: "/image-library/Beneath africa travel traditional food cooking.jpeg",
    href: "/experiences/cultural",
  },
  {
    title: "Boma Dinner",
    category: "Culture",
    image: "/image-library/Beneath fire image1.jpeg",
    href: "/experiences/cultural",
  },
  {
    title: "White Water Rafting",
    category: "Adrenaline",
    image: "/image-library/White-Water Rafting image1.jfif",
    href: "/experiences/victoria-falls",
  },
  {
    title: "Horse Riding",
    category: "Adrenaline",
    image: "/image-library/Bush sunset.jfif",
    href: "/experiences/victoria-falls",
  },
  {
    title: "Guided Tour of the Falls",
    category: "Tours",
    image: "/image-library/Victoria Falls mist image1.jfif",
    href: "/experiences/victoria-falls",
  },
  {
    title: "Bungee",
    category: "Adrenaline",
    image: "/image-library/Bungee Jump image1.jfif",
    href: "/experiences/victoria-falls",
  },
  {
    title: "Flying Fox",
    category: "Adrenaline",
    image: "/image-library/Victoria Falls mist image2.jfif",
    href: "/experiences/victoria-falls",
  },
  {
    title: "City Tour",
    category: "Tours",
    image: "/image-library/Road journey image2.jfif",
    href: "/experiences/victoria-falls",
  },
];

export const clientReferences = [
  "Theron Safaris, South Africa",
  "Flame of Africa, South Africa",
  "Dr. Rebecca Becky Howell, USA",
  "EU Travel Expo, Singapore",
  "Safari 24, Namibia",
  "Lani, South Africa",
  "Isabel Pinero, Spain",
];

export const destinations: InteriorPageData[] = [
  {
    slug: "victoria-falls",
    navTitle: "Victoria Falls",
    navDescription: "Our home in Zimbabwe",
    eyebrow: "Destination · Zimbabwe",
    title: "Victoria Falls",
    lead: "Our home base. Tours, guided Falls experiences, road and water transfers and accommodation arranged from a Victoria Falls office.",
    image: "/image-library/Helicopter Flights image1.jfif",
    imageAlt: "Mist rising from the Victoria Falls",
    metaDescription:
      "Victoria Falls tours, guided Falls experiences, road and water transfers and accommodation arranged by a Victoria Falls-based travel company established in 2013.",
    intro: [
      "Zeresh Trading Company (Pvt) Ltd, trading as Beneath Africa Travel and Tours, was established in 2013 and is based in Victoria Falls, with a vision to grow within Zimbabwe. The company specialises in road and water transfers, accommodation in hotels, lodges and camps, camping, houseboats on Lake Kariba, Chobe day trips and activities in and around Victoria Falls.",
      "Because we operate from here, a Victoria Falls itinerary starts and ends with a company that can be reached the same day — whether the plan is on track or has just changed.",
    ],
    highlights: [
      {
        title: "Guided Tour Of The Falls",
        body: "A guided look at the Falls, timed around the rest of your itinerary rather than against it.",
      },
      {
        title: "Road & Water Transfers",
        body: "Transfers arranged so the journey keeps moving between places and between countries.",
      },
      {
        title: "Accommodation",
        body: "Hotels, lodges, self-catering and camping arranged to fit the route you are travelling.",
      },
      {
        title: "Activities In Town",
        body: "Bungee, white-water rafting, helicopter flights, village experiences and a boma dinner.",
      },
    ],
    sections: [
      {
        heading: "Other Activities",
        cards: victoriaFallsActivityCards,
      },
      {
        heading: "How We Work Here",
        paragraphs: [
          "We pride ourselves on our quality products, including road transfers, boating and accommodation. Our business strategy revolves around providing quality service to our target customers, through a professional team and good quality, customer-designed travel packages.",
          "We seek to differentiate ourselves as the premier adventure travel company in the greater Victoria Falls area — a position earned through clear arrangements and personal contact rather than volume.",
        ],
      },
    ],
    related: [
      {
        title: "Victoria Falls Activities",
        href: "/experiences/victoria-falls",
        description: "Guided tours and the activities in Falls town",
        image: "/image-library/Helicopter Flights image1.jfif",
      },
      {
        title: "Cruises & River Experiences",
        href: "/experiences/cruises",
        description: "Breakfast, lunch, sunset and dinner cruises",
        image: "/image-library/Beneath africa travel cruise.jpeg",
      },
      {
        title: "Road Transfers",
        href: "/travel/road-transfers",
        description: "Daily planning, servicing and licensing",
        image: "/image-library/Beneath africa travel car  image1.jpeg",
      },
      {
        title: "Zambia",
        href: "/destinations/zambia",
        description: "River, wildlife and adventure",
        image: "/image-library/Beneath pool view image.jpeg",
      },
    ],
  },
  {
    slug: "zimbabwe",
    navTitle: "Zimbabwe",
    navDescription: "Wildlife, landscapes & culture",
    eyebrow: "Destination · Zimbabwe",
    title: "Zimbabwe",
    lead: "Discover Zimbabwe's most beautiful places — with tours arranged around the Victoria Falls, Hwange and the Zambezi.",
    image: "/image-library/DISCOVER SOUTHERN AFRICA image1.jfif",
    imageAlt: "Zimbabwean landscape",
    metaDescription:
      "Tours around Zimbabwe arranged from Victoria Falls, including Hwange overnight stays, guided Falls tours, sunset cruises and school trips.",
    intro: [
      "Tours around Zimbabwe sit at the centre of what we do. Alongside the Victoria Falls, we arrange itineraries that reach into Hwange, and we plan educational school trips that include an overnight stay in Hwange before returning to the Falls.",
      "Road transfers connect the different parts of a Zimbabwe itinerary, so a change of plan does not mean starting again.",
    ],
    highlights: [
      {
        title: "Victoria Falls",
        body: "Guided tours, cruises and activities in and around the Falls.",
      },
      {
        title: "Hwange",
        body: "Overnight stays and game time in Hwange, arranged around your programme.",
      },
      {
        title: "The Zambezi",
        body: "Sunset and other cruises on the river that runs through the Falls.",
      },
      {
        title: "Educational Trips",
        body: "School itineraries with overnight stays, tours and visits built in.",
      },
    ],
    sections: [
      {
        heading: "What A Zimbabwe Itinerary Can Include",
        cards: [
          {
            title: "Guided Tour of the Falls",
            category: "Tours",
            image: "/image-library/Victoria Falls mist image1.jfif",
            href: "/experiences/victoria-falls",
          },
          {
            title: "Sunset Cruise on the Zambezi",
            category: "River Cruises",
            image: "/image-library/Zambezi Sunset Cruise image1.jfif",
            href: "/experiences/cruises",
          },
          {
            title: "Overnight Stay in Hwange",
            category: "Safari",
            image: "/image-library/Beneath africa camp.jpeg",
          },
          {
            title: "Visit to a Crocodile Farm",
            category: "Wildlife",
            image: "/image-library/WILDLIFE DETAIL LIBRARY Crocodiles image1.jfif",
            href: "/experiences/safaris",
          },
          {
            title: "Camps, Lodges & Hotel Accommodation",
            category: "Accommodation",
            image: "/image-library/Beneath accomodation image3.jpeg",
            href: "/travel/accommodation",
          },
          {
            title: "Road Transfers Between Destinations",
            category: "Transfers",
            image: "/image-library/transfer vehicle image1.jfif",
            href: "/travel/road-transfers",
          },
        ],
      },
    ],
    related: [
      {
        title: "Victoria Falls",
        href: "/destinations/victoria-falls",
        description: "Our home in Zimbabwe",
        image: "/image-library/Helicopter Flights image1.jfif",
      },
      {
        title: "Educational Trips",
        href: "/educational-trips",
        description: "School trips arranged from Victoria Falls",
        image: "/image-library/Beneath chilling people image.jpeg",
      },
      {
        title: "Safaris & Game Drives",
        href: "/experiences/safaris",
        description: "Wildlife experiences across the region",
        image: "/image-library/Beneath elephant image.jpeg",
      },
      {
        title: "Botswana",
        href: "/destinations/botswana",
        description: "Chobe & wildlife journeys",
        image: "/image-library/Chobe Day Trip image2.jfif",
      },
    ],
  },
  {
    slug: "zambia",
    navTitle: "Zambia",
    navDescription: "River, wildlife & adventure",
    eyebrow: "Destination · Zambia",
    title: "Zambia",
    lead: "Zambia is routed together with Zimbabwe and Botswana, so the borders on the map stay decisions rather than problems.",
    image: "/image-library/DISCOVER SOUTHERN AFRICA image2.jfif",
    imageAlt: "Sunrise over the Zambezi",
    metaDescription:
      "Road transfers, cross-border coordination, accommodation and driver-guide itineraries in Zambia, arranged from a Victoria Falls base.",
    intro: [
      "Zambia is one of the countries we work in regularly, whether a client is passing through on a wider southern African circuit or stopping in its own right. We arrange the road transfers and the accommodation, and we take care of the border formalities that come with the route.",
      "Since 2013 we have provided road transfers for clients travelling in Zambia, Zimbabwe and Botswana, keeping in contact with the hotels and venues along the way so that scattered tours still hold together.",
    ],
    highlights: [
      {
        title: "Road Transfers",
        body: "Planned daily so a multi-country itinerary keeps its timings.",
      },
      {
        title: "Cross-Border Coordination",
        body: "Customs and border patrol handled as part of the arrangement.",
      },
      {
        title: "Accommodation",
        body: "Hotels and lodges arranged to fit the route.",
      },
      {
        title: "Driver-Guided Travel",
        body: "Itineraries with a driver guide through the country.",
      },
    ],
    sections: [
      {
        heading: "Working In Zambia",
        cards: [
          {
            title: "Road Transfers Between Countries",
            category: "Transfers",
            image: "/image-library/transfer vehicle image1.jfif",
            href: "/travel/road-transfers",
          },
          {
            title: "Cross-Border Formalities",
            category: "Transfers",
            image: "/image-library/Road journey image4.jfif",
            href: "/travel/cross-border",
          },
          {
            title: "Hotels & Lodges",
            category: "Accommodation",
            image: "/image-library/Beneath accomodation image1.jpeg",
            href: "/travel/accommodation",
          },
          {
            title: "Driver-Guide Itineraries",
            category: "Tours",
            image: "/image-library/Guides image1.jfif",
            href: "/travel/driver-guided",
          },
          {
            title: "Contact With Hotels & Venues",
            category: "Coordination",
            image: "/image-library/Beneath africa travel office.jpeg",
          },
        ],
      },
    ],
    related: [
      {
        title: "Victoria Falls",
        href: "/destinations/victoria-falls",
        description: "Our home in Zimbabwe",
        image: "/image-library/Helicopter Flights image1.jfif",
      },
      {
        title: "Cross-Border Arrangements",
        href: "/travel/cross-border",
        description: "Customs and border patrol handled",
        image: "/image-library/Beneath boat image3.jpeg",
      },
      {
        title: "Road Transfers",
        href: "/travel/road-transfers",
        description: "Daily planning, servicing and licensing",
        image: "/image-library/Beneath africa travel car  image1.jpeg",
      },
      {
        title: "Botswana",
        href: "/destinations/botswana",
        description: "Chobe & wildlife journeys",
        image: "/image-library/Chobe Day Trip image2.jfif",
      },
    ],
  },
  {
    slug: "botswana",
    navTitle: "Botswana",
    navDescription: "Chobe & wildlife journeys",
    eyebrow: "Destination · Botswana",
    title: "Botswana",
    lead: "Chobe day trips and Chobe River journeys, reached by road from a Victoria Falls base.",
    image: "/image-library/DISCOVER SOUTHERN AFRICA image3.jfif",
    imageAlt: "Chobe River in Botswana",
    metaDescription:
      "Chobe day trips and Chobe River journeys arranged from Victoria Falls, with game drives, river time and cross-border road transfers into Botswana.",
    intro: [
      "Chobe day trips are a signature part of our work, running from Victoria Falls into the Chobe area of Botswana. Clients have also travelled with us on the Zambezi Queen, the five-star floating hotel on the Chobe River between Botswana and Namibia, where Ranjis Nyakusengwa served as Cruise Director from 2009 to 2012.",
      "A Botswana day trip is a long day on the road, so the timing, the border and the time on the water are planned together rather than separately.",
    ],
    highlights: [
      {
        title: "Chobe Day Trips",
        body: "Victoria Falls to Chobe and back, planned as one working day.",
      },
      {
        title: "Chobe River Time",
        body: "Cruising on the Chobe, where the river runs between Botswana and Namibia.",
      },
      {
        title: "Game Drives",
        body: "Wildlife time arranged around the river and the road.",
      },
      {
        title: "Cross-Border Road Transfers",
        body: "The border treated as part of the itinerary rather than an interruption.",
      },
    ],
    sections: [
      {
        heading: "Around Chobe",
        cards: [
          {
            title: "Chobe Day Trips",
            category: "Day Trips",
            image: "/image-library/Chobe Day Trip image1.jfif",
            href: "/experiences/chobe",
          },
          {
            title: "Game Drives",
            category: "Safari",
            image: "/image-library/Game Drives image1.jfif",
            href: "/experiences/safaris",
          },
          {
            title: "River Time On The Chobe",
            category: "River Cruises",
            image: "/image-library/WILDLIFE DETAIL LIBRARY Chobe image1.jfif",
            href: "/experiences/cruises",
          },
          {
            title: "Road Transfers Across The Border",
            category: "Transfers",
            image: "/image-library/transfer vehicle image2.jfif",
            href: "/travel/road-transfers",
          },
          {
            title: "Accommodation In Botswana",
            category: "Accommodation",
            image: "/image-library/Beneath accomodation image2.jpeg",
            href: "/travel/accommodation",
          },
        ],
      },
    ],
    related: [
      {
        title: "Chobe",
        href: "/experiences/chobe",
        description: "Botswana day trips with practical coordination",
        image: "/image-library/Chobe Day Trip image1.jfif",
      },
      {
        title: "Namibia",
        href: "/destinations/namibia",
        description: "Cross-border arrangements",
        image: "/image-library/Beneath pool view image2.jpeg",
      },
      {
        title: "Cross-Border Arrangements",
        href: "/travel/cross-border",
        description: "Customs and border patrol handled",
        image: "/image-library/Beneath boat image3.jpeg",
      },
      {
        title: "Safaris & Game Drives",
        href: "/experiences/safaris",
        description: "Wildlife experiences across the region",
        image: "/image-library/Beneath elephant image.jpeg",
      },
    ],
  },
  {
    slug: "namibia",
    navTitle: "Namibia",
    navDescription: "Cross-border arrangements",
    eyebrow: "Destination · Namibia",
    title: "Namibia",
    lead: "Cross-border arrangements that carry you into Namibia and leave the rest of the itinerary intact.",
    image: "/image-library/DISCOVER SOUTHERN AFRICA image4.jfif",
    imageAlt: "Sunset over bush country",
    metaDescription:
      "Road transfers, cross-border coordination and accommodation arrangements connecting Zimbabwe and Namibia.",
    intro: [
      "Namibia completes the four-country footprint we work across: Zimbabwe, Zambia, Botswana and Namibia. For most clients it is reached by road, so the value we add is in the coordination — the vehicle, the timings, the border formalities, and the accommodation that has to be right on the far side.",
      "We work with Namibian operators including Safari 24, who have used us as their contact on the ground.",
    ],
    highlights: [
      {
        title: "Road Transfers",
        body: "Planned with the distances involved taken seriously.",
      },
      {
        title: "Border Formalities",
        body: "Crossing handled as part of the arrangement.",
      },
      {
        title: "Accommodation",
        body: "Arranged on the Namibian side of the border as well as this one.",
      },
      {
        title: "Operator Coordination",
        body: "Working with Namibian contacts, including Safari 24.",
      },
    ],
    sections: [
      {
        heading: "Connecting Into Namibia",
        cards: [
          {
            title: "Road Transfers From Victoria Falls",
            category: "Transfers",
            image: "/image-library/transfer vehicle image3.jfif",
            href: "/travel/road-transfers",
          },
          {
            title: "Cross-Border Coordination",
            category: "Transfers",
            image: "/image-library/Road journey image5.jfif",
            href: "/travel/cross-border",
          },
          {
            title: "Accommodation In Namibia",
            category: "Accommodation",
            image: "/image-library/Beneath accomodation image4.jpeg",
            href: "/travel/accommodation",
          },
          {
            title: "Operator Liaison, Including Safari 24",
            category: "Coordination",
            image: "/image-library/Guides image2.jfif",
          },
          {
            title: "Wildlife & Landscape Itineraries",
            category: "Safari",
            image: "/image-library/WILDLIFE DETAIL LIBRARY Giraffe image1.jfif",
            href: "/experiences/safaris",
          },
        ],
      },
    ],
    related: [
      {
        title: "Botswana",
        href: "/destinations/botswana",
        description: "Chobe & wildlife journeys",
        image: "/image-library/Chobe Day Trip image2.jfif",
      },
      {
        title: "Cross-Border Arrangements",
        href: "/travel/cross-border",
        description: "Customs and border patrol handled",
        image: "/image-library/Beneath boat image3.jpeg",
      },
      {
        title: "Road Transfers",
        href: "/travel/road-transfers",
        description: "Daily planning, servicing and licensing",
        image: "/image-library/Beneath africa travel car  image1.jpeg",
      },
      {
        title: "Accommodation",
        href: "/travel/accommodation",
        description: "Hotels, lodges, self-catering and camping",
        image: "/image-library/Beneath tent image.jpeg",
      },
    ],
  },
];

export const experiences: InteriorPageData[] = [
  {
    slug: "victoria-falls",
    navTitle: "Victoria Falls",
    navDescription: "Guided tours & activities",
    eyebrow: "Experience · Victoria Falls",
    title: "Victoria Falls Activities",
    lead: "Guided tours of the Falls and the activities around it, arranged from a Victoria Falls base.",
    image: "/image-library/Helicopter Flights image1.jfif",
    imageAlt: "Mist rising from the Victoria Falls",
    metaDescription:
      "Guided tours of the Victoria Falls plus bungee, white-water rafting, helicopter flights, lion walks, village experiences and boma dinners.",
    intro: [
      "The Falls are the reason most visitors are in the area, and the activities around them are arranged so that the day still works. A guided tour of the Falls can sit alongside a cruise, a game drive or an activity in town without the timetable being stretched past what the day allows.",
      "Everything here is booked through the same office, which means one contact for the tour, the transfer and whatever comes after it.",
    ],
    highlights: [
      {
        title: "Guided Tour Of The Falls",
        body: "The essential visit, with a guide and time for the viewpoints.",
      },
      {
        title: "Bungee & Rafting",
        body: "Bungee jumping and white-water rafting on the Zambezi.",
      },
      {
        title: "Helicopter Flight",
        body: "An aerial view of the Falls and the gorge.",
      },
      {
        title: "Lion Walk & Village Experience",
        body: "Wildlife and local encounters, arranged in advance.",
      },
    ],
    sections: [
      {
        heading: "At The Falls",
        cards: [
          {
            title: "Guided Tour of the Falls",
            category: "Tours",
            image: "/image-library/Victoria Falls mist image1.jfif",
          },
          {
            title: "Helicopter Flight",
            category: "Flights",
            image: "/image-library/Helicopter Flights image1.jfif",
          },
          {
            title: "Bungee",
            category: "Adrenaline",
            image: "/image-library/Bungee Jump image1.jfif",
          },
          {
            title: "Flying Fox",
            category: "Adrenaline",
            image: "/image-library/Victoria Falls mist image2.jfif",
          },
          {
            title: "White Water Rafting",
            category: "Adrenaline",
            image: "/image-library/White-Water Rafting image1.jfif",
          },
          {
            title: "City Tour",
            category: "Tours",
            image: "/image-library/Road journey image2.jfif",
          },
        ],
      },
      {
        heading: "In Falls Town",
        cards: [
          {
            title: "Lion Walk",
            category: "Wildlife",
            image: "/image-library/WILDLIFE DETAIL LIBRARY Lion image1.jfif",
            href: "/experiences/safaris",
          },
          {
            title: "Village Experience",
            category: "Culture",
            image: "/image-library/Cultural Experience image1.jfif",
            href: "/experiences/cultural",
          },
          {
            title: "Dust Road Local Meals",
            category: "Culture",
            image: "/image-library/Beneath africa travel traditional food cooking.jpeg",
            href: "/experiences/cultural",
          },
          {
            title: "Boma Dinner",
            category: "Culture",
            image: "/image-library/Beneath fire image1.jpeg",
            href: "/experiences/cultural",
          },
          {
            title: "Crocodile Farm Visit",
            category: "Wildlife",
            image: "/image-library/WILDLIFE DETAIL LIBRARY Crocodiles image1.jfif",
            href: "/experiences/safaris",
          },
          {
            title: "Horse Riding",
            category: "Adrenaline",
            image: "/image-library/Bush sunset.jfif",
          },
        ],
      },
    ],
    related: [
      {
        title: "Victoria Falls",
        href: "/destinations/victoria-falls",
        description: "Our home in Zimbabwe",
        image: "/image-library/Helicopter Flights image1.jfif",
      },
      {
        title: "Cruises & River Experiences",
        href: "/experiences/cruises",
        description: "Breakfast to dinner on the Zambezi",
        image: "/image-library/Beneath africa travel cruise.jpeg",
      },
      {
        title: "Cultural Experiences",
        href: "/experiences/cultural",
        description: "Village experiences and local meals",
        image: "/image-library/Cultural Experience image3.jfif",
      },
      {
        title: "Tailor-Made Journeys",
        href: "/experiences/tailor-made",
        description: "Travel shaped around your plans",
        image: "/image-library/Beneath tent image.jpeg",
      },
    ],
  },
  {
    slug: "safaris",
    navTitle: "Safaris & Game Drives",
    navDescription: "Wildlife experiences",
    eyebrow: "Experience · Wildlife",
    title: "Safaris & Game Drives",
    lead: "Game drives, lion walks and wildlife time, arranged across Zimbabwe, Botswana and Namibia.",
    image: "/image-library/Beneath elephant image.jpeg",
    imageAlt: "Game drive in wildlife country",
    metaDescription:
      "Game drives, lion walks and wildlife experiences arranged across Zimbabwe, Botswana and Namibia, with camps, lodges and transfers in place.",
    intro: [
      "Wildlife time needs vehicles, guides and somewhere to sleep, in that order. We arrange the game drives and the accommodation together, so a day in the field does not depend on a hotel booking you made three months earlier.",
      "Camps and lodges, transfers and the drives themselves are handled by the same team, which is what makes the arrangements workable for travellers arriving from outside the region.",
    ],
    highlights: [
      {
        title: "Game Drives",
        body: "Scheduled around the light and the road, not the other way round.",
      },
      {
        title: "Lion Walk",
        body: "A guided walking experience with handlers and trackers.",
      },
      {
        title: "Camps & Lodges",
        body: "Accommodation arranged close to where the drives happen.",
      },
      {
        title: "Transfers Included",
        body: "Road transfers arranged between the drive and the bed.",
      },
    ],
    sections: [
      {
        heading: "Wildlife Experiences We Arrange",
        cards: [
          {
            title: "Game Drives",
            category: "Safari",
            image: "/image-library/Game Drives image2.jfif",
          },
          {
            title: "Lion Walk",
            category: "Wildlife",
            image: "/image-library/WILDLIFE DETAIL LIBRARY Lion image2.jfif",
          },
          {
            title: "Camping",
            category: "Accommodation",
            image: "/image-library/Beneath africa camp.jpeg",
            href: "/travel/accommodation",
          },
          {
            title: "Chobe Day Trips",
            category: "Day Trips",
            image: "/image-library/Chobe Day Trip image3.jfif",
            href: "/experiences/chobe",
          },
          {
            title: "Village Experiences",
            category: "Culture",
            image: "/image-library/Cultural Experience image2.jfif",
            href: "/experiences/cultural",
          },
        ],
      },
    ],
    related: [
      {
        title: "Botswana",
        href: "/destinations/botswana",
        description: "Chobe & wildlife journeys",
        image: "/image-library/Chobe Day Trip image2.jfif",
      },
      {
        title: "Chobe",
        href: "/experiences/chobe",
        description: "Botswana day trips with practical coordination",
        image: "/image-library/Chobe Day Trip image1.jfif",
      },
      {
        title: "Namibia",
        href: "/destinations/namibia",
        description: "Cross-border arrangements",
        image: "/image-library/Beneath pool view image2.jpeg",
      },
      {
        title: "Accommodation",
        href: "/travel/accommodation",
        description: "Hotels, lodges, self-catering and camping",
        image: "/image-library/Beneath tent image.jpeg",
      },
    ],
  },
  {
    slug: "chobe",
    navTitle: "Chobe",
    navDescription: "Botswana day trips",
    eyebrow: "Experience · Botswana",
    title: "Chobe Day Trips",
    lead: "Chobe day trips from Victoria Falls, with river time and game drives on the Botswana side.",
    image: "/image-library/Chobe Day Trip image1.jfif",
    imageAlt: "Chobe River day trip",
    metaDescription:
      "Chobe day trips from Victoria Falls into Botswana, with game drives, river time, cross-border road transfers and Chobe River cruises.",
    intro: [
      "Chobe day trips take guests from Victoria Falls into Botswana and back, which makes them one of the most ambitious things we organise on a single day. The crossing, the game drive and the time on the water are planned as one sequence.",
      "For guests who want to stay rather than return, the Chobe River has hosted the Zambezi Queen — the five-star floating hotel that ran on the river between Botswana and Namibia.",
    ],
    highlights: [
      {
        title: "Road Transfer",
        body: "The drive to Chobe and the border, planned with the return in mind.",
      },
      {
        title: "Game Drives",
        body: "Wildlife time on the Botswana side.",
      },
      {
        title: "River Time",
        body: "Cruising the Chobe where the river runs between Botswana and Namibia.",
      },
      {
        title: "Zambezi Queen",
        body: "The five-star floating hotel that ran on the Chobe River.",
      },
    ],
    sections: [
      {
        heading: "What A Chobe Day Trip Involves",
        cards: [
          {
            title: "Cross-Border Transfer From Victoria Falls",
            category: "Transfers",
            image: "/image-library/transfer vehicle image4.jfif",
            href: "/travel/road-transfers",
          },
          {
            title: "Game Drives In The Chobe Area",
            category: "Safari",
            image: "/image-library/Game Drives image3.jfif",
            href: "/experiences/safaris",
          },
          {
            title: "Time On The River",
            category: "River Cruises",
            image: "/image-library/BOAT TRANSFERS image1.jfif",
            href: "/experiences/cruises",
          },
          {
            title: "Return Transfer To Victoria Falls",
            category: "Transfers",
            image: "/image-library/Road journey image6.jfif",
            href: "/travel/road-transfers",
          },
        ],
      },
    ],
    related: [
      {
        title: "Botswana",
        href: "/destinations/botswana",
        description: "Chobe & wildlife journeys",
        image: "/image-library/Chobe Day Trip image2.jfif",
      },
      {
        title: "Cross-Border Arrangements",
        href: "/travel/cross-border",
        description: "Customs and border patrol handled",
        image: "/image-library/Beneath boat image3.jpeg",
      },
      {
        title: "Cruises & River Experiences",
        href: "/experiences/cruises",
        description: "Zambezi river experiences",
        image: "/image-library/Beneath africa travel cruise.jpeg",
      },
      {
        title: "Houseboats",
        href: "/experiences/houseboats",
        description: "Lake Kariba",
        image: "/image-library/Beneath Boat Interior image 2.jpeg",
      },
    ],
  },
  {
    slug: "cruises",
    navTitle: "Cruises & River Experiences",
    navDescription: "Zambezi & water experiences",
    eyebrow: "Experience · River",
    title: "Cruises & River Experiences",
    lead: "Breakfast, lunch, sunset and dinner cruises on the Zambezi — the quietest hours of the Falls day.",
    image: "/image-library/Beneath africa travel cruise.jpeg",
    imageAlt: "Sunset cruise on the Zambezi",
    metaDescription:
      "Breakfast, lunch, sunset and dinner cruises on the Zambezi, arranged from Victoria Falls with transfers to and from the river included.",
    intro: [
      "The Zambezi runs through the Falls, and the cruise is the part of the day that slows everything else down. We arrange breakfast, lunch, sunset and dinner cruises, along with the transfers to and from the river.",
      "A sunset cruise is also a common inclusion on school trips, where it fits neatly into an afternoon that has already covered the Falls and the crocodile farm.",
    ],
    highlights: [
      {
        title: "Sunset Cruise",
        body: "The best-known of the four, and the easiest to add to a day.",
      },
      {
        title: "Breakfast Cruise",
        body: "An early start on the water before the day's activities.",
      },
      {
        title: "Lunch & Dinner Cruises",
        body: "Midday and evening options, arranged as needed.",
      },
      {
        title: "Transfers Included",
        body: "Road transfers arranged to and from the river.",
      },
    ],
    sections: [
      {
        heading: "The Four Cruises",
        cards: [
          {
            title: "Breakfast Cruise",
            category: "River Cruises",
            image: "/image-library/Zambezi sunrise image1.jfif",
          },
          {
            title: "Lunch Cruise",
            category: "River Cruises",
            image: "/image-library/Beneath africa travel cruise.jpeg",
          },
          {
            title: "Sunset Cruise",
            category: "River Cruises",
            image: "/image-library/Zambezi Sunset Cruise image1.jfif",
          },
          {
            title: "Dinner Cruise",
            category: "River Cruises",
            image: "/image-library/Zambezi sunset image2.jfif",
          },
        ],
      },
      {
        heading: "River Houseboats",
        paragraphs: [
          "Houseboats on Lake Kariba are arranged separately from the Falls cruises, because the two are different waterways and different kinds of trip.",
        ],
      },
    ],
    related: [
      {
        title: "Victoria Falls",
        href: "/destinations/victoria-falls",
        description: "Our home in Zimbabwe",
        image: "/image-library/Helicopter Flights image1.jfif",
      },
      {
        title: "Houseboats",
        href: "/experiences/houseboats",
        description: "Lake Kariba",
        image: "/image-library/Beneath Boat Interior image 2.jpeg",
      },
      {
        title: "Water Transfers",
        href: "/travel/water-transfers",
        description: "River and lake logistics",
        image: "/image-library/Beneath Lake site.jpeg",
      },
      {
        title: "Educational Trips",
        href: "/educational-trips",
        description: "School trips arranged from Victoria Falls",
        image: "/image-library/Beneath chilling people image.jpeg",
      },
    ],
  },
  {
    slug: "houseboats",
    navTitle: "Houseboats",
    navDescription: "Lake Kariba",
    eyebrow: "Experience · Lake Kariba",
    title: "Houseboats On Lake Kariba",
    lead: "Houseboat time on Lake Kariba, arranged alongside the Zimbabwe itineraries that reach it.",
    image: "/image-library/Beneath Boat Interior image 2.jpeg",
    imageAlt: "Sunset over Lake Kariba",
    metaDescription:
      "Houseboat accommodation and experiences on Lake Kariba, arranged with transfers and Zimbabwe itineraries from a Victoria Falls base.",
    intro: [
      "Lake Kariba is the other water experience we arrange, alongside the Zambezi cruises. Houseboats there are booked as part of a wider Zimbabwe itinerary rather than as a standalone afternoon.",
      "Transfers, time on board and the rest of the programme are planned together, which is what allows a Kariba section to sit inside a trip that also includes the Falls and Hwange.",
    ],
    highlights: [
      {
        title: "Lake Kariba",
        body: "Houseboat time on the lake, away from the Falls timetable.",
      },
      {
        title: "Transfers Arranged",
        body: "Road transfers arranged to and from the lake.",
      },
      {
        title: "Combined Itineraries",
        body: "Kariba placed alongside the Falls and Hwange where it fits.",
      },
      {
        title: "Botswana Comparison",
        body: "Chobe River cruises are the river equivalent, if that suits better.",
      },
    ],
    sections: [
      {
        heading: "Water We Work On",
        cards: [
          {
            title: "Houseboats On Lake Kariba",
            category: "Houseboats",
            image: "/image-library/Beneath Boat Interior image 2.jpeg",
          },
          {
            title: "Cruises On The Zambezi",
            category: "River Cruises",
            image: "/image-library/Zambezi Sunset Cruise image2.jfif",
            href: "/experiences/cruises",
          },
          {
            title: "Chobe River Cruises",
            category: "River Cruises",
            image: "/image-library/BOAT TRANSFERS image2.jfif",
            href: "/experiences/chobe",
          },
        ],
      },
    ],
    related: [
      {
        title: "Chobe",
        href: "/experiences/chobe",
        description: "Botswana day trips with practical coordination",
        image: "/image-library/Chobe Day Trip image1.jfif",
      },
      {
        title: "Zimbabwe",
        href: "/destinations/zimbabwe",
        description: "Wildlife, landscapes & culture",
        image: "/image-library/Beneath boat image3.jpeg",
      },
      {
        title: "Water Transfers",
        href: "/travel/water-transfers",
        description: "River and lake logistics",
        image: "/image-library/Beneath Lake site.jpeg",
      },
      {
        title: "Tailor-Made Journeys",
        href: "/experiences/tailor-made",
        description: "Travel shaped around your plans",
        image: "/image-library/Beneath tent image.jpeg",
      },
    ],
  },
  {
    slug: "cultural",
    navTitle: "Cultural Experiences",
    navDescription: "Authentic local experiences",
    eyebrow: "Experience · Culture",
    title: "Cultural Experiences",
    lead: "Village experiences, local meals and a boma dinner — the parts of a trip that people remember longest.",
    image: "/image-library/Cultural Experience image3.jfif",
    imageAlt: "Cultural experience in Zimbabwe",
    metaDescription:
      "Village experiences, Dust Road local meals, boma dinners and city tours arranged in Victoria Falls and around Zimbabwe.",
    intro: [
      "Cultural experiences are arranged through the same office as the transfers, which means the people hosting you are known to us rather than found on the day.",
      "They are booked in advance rather than improvised — a village visit or a boma dinner needs the group size, the timing and the transfers agreed in advance to work properly.",
    ],
    highlights: [
      {
        title: "Village Experience",
        body: "A visit arranged with local hosts, booked ahead.",
      },
      {
        title: "Dust Road Local Meals",
        body: "Local food prepared as part of the experience rather than a stop.",
      },
      {
        title: "Boma Dinner",
        body: "An evening around the fire, arranged as a set piece.",
      },
      {
        title: "City Tour",
        body: "Victoria Falls town, on foot and at a manageable pace.",
      },
    ],
    sections: [
      {
        heading: "Cultural Experiences We Arrange",
        cards: [
          {
            title: "Village Experience",
            category: "Culture",
            image: "/image-library/Cultural Experience image3.jfif",
          },
          {
            title: "Dust Road Local Meals",
            category: "Culture",
            image: "/image-library/Beneath africa travel traditional food cooking.jpeg",
          },
          {
            title: "Boma Dinner",
            category: "Culture",
            image: "/image-library/Beneath fire image1.jpeg",
          },
          {
            title: "City Tour",
            category: "Tours",
            image: "/image-library/Road journey image3.jfif",
            href: "/experiences/victoria-falls",
          },
          {
            title: "Crocodile Farm Visit",
            category: "Wildlife",
            image: "/image-library/WILDLIFE DETAIL LIBRARY Crocodiles image2.jfif",
            href: "/experiences/victoria-falls",
          },
        ],
      },
    ],
    related: [
      {
        title: "Victoria Falls",
        href: "/destinations/victoria-falls",
        description: "Our home in Zimbabwe",
        image: "/image-library/Helicopter Flights image1.jfif",
      },
      {
        title: "Victoria Falls Activities",
        href: "/experiences/victoria-falls",
        description: "Guided tours and activities",
        image: "/image-library/Helicopter Flights image1.jfif",
      },
      {
        title: "Safaris & Game Drives",
        href: "/experiences/safaris",
        description: "Wildlife experiences across the region",
        image: "/image-library/Beneath elephant image.jpeg",
      },
      {
        title: "Tailor-Made Journeys",
        href: "/experiences/tailor-made",
        description: "Travel shaped around your plans",
        image: "/image-library/Beneath tent image.jpeg",
      },
    ],
  },
  {
    slug: "tailor-made",
    navTitle: "Tailor-Made Journeys",
    navDescription: "Travel shaped around your plans",
    eyebrow: "Experience · Tailor-Made",
    title: "Tailor-Made Journeys",
    lead: "Send us your ideas and wishes. We adapt each programme around them and give you an individual offer.",
    image: "/image-library/Beneath tent image.jpeg",
    imageAlt: "Beneath Africa camp",
    metaDescription:
      "Tailor-made tours, individual travel, VIP arrangements, family tours and reunions, and group trips planned around your wishes and budget.",
    intro: [
      "Our registered tourism company develops creative and innovative itineraries that include your wishes and your budget. Tailor-made group trips, individual and VIP travel arrangements are handled with the same dedicated, professional service.",
      "Take your time with the itineraries we have published. If you have suggestions, we are pleased to make an individual offer on request.",
    ],
    highlights: [
      {
        title: "Custom-Made Offers",
        body: "Each programme built from your ideas rather than a fixed package.",
      },
      {
        title: "Family Tours & Reunions",
        body: "Groups travelling together, with the logistics handled centrally.",
      },
      {
        title: "Driver-Guide Itineraries",
        body: "A guide-driver with the journey rather than only the destination.",
      },
      {
        title: "Individual Offers",
        body: "An individual offer prepared on request, with no obligation.",
      },
    ],
    sections: [
      {
        heading: "How A Tailor-Made Trip Works",
        bullets: [
          "Send us your ideas and wishes",
          "We adapt each programme to match them",
          "An individual offer is prepared on request",
          "Stress-free handling with personal service",
        ],
      },
      {
        heading: "Who We Plan For",
        paragraphs: [
          "We arrange individual and group travel for leisure clients: individuals, families, groups, reunions and VIP arrangements. What matters is that the itinerary reflects your wishes and budget rather than a fixed package.",
        ],
      },
    ],
    related: [
      {
        title: "Victoria Falls",
        href: "/destinations/victoria-falls",
        description: "Our home in Zimbabwe",
        image: "/image-library/Helicopter Flights image1.jfif",
      },
      {
        title: "Group Travel",
        href: "/travel/group-travel",
        description: "Groups and school trips",
        image: "/image-library/Beneath africa travel car  image1.jpeg",
      },
      {
        title: "Driver-Guided Travel",
        href: "/travel/driver-guided",
        description: "Itineraries with a driver guide",
        image: "/image-library/Beneath people standing near the pool image.jpeg",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Tell us what you are planning",
      },
    ],
  },
];

export const travelServices: InteriorPageData[] = [
  {
    slug: "road-transfers",
    navTitle: "Road Transfers",
    navDescription: "Planned daily, serviced and licensed",
    eyebrow: "Travel & Transfers · Road",
    title: "Road Transfers",
    lead: "Road transfers planned daily, with vehicles serviced, fuelled and licensed.",
    image: "/image-library/Beneath africa travel car  image1.jpeg",
    imageAlt: "Beneath Africa transfer vehicle",
    metaDescription:
      "Road transfers across Zimbabwe, Zambia, Botswana and Namibia, with daily planning, vehicle log books, servicing, repairs, fuelling and licensing handled in-house.",
    intro: [
      "Road transfers are the core of what we do, and the part of the job with the least room for improvisation. It is Bruce Nyakusengwa's responsibility as Operations Director to make sure the operations department is looked after, with the daily planning of transfers prepared properly.",
      "Vehicles are logged daily, serviced and repaired on schedule, fuelled, and kept licensed. That maintenance is unglamorous, but it is the reason a departure time means something.",
    ],
    highlights: [
      {
        title: "Daily Planning",
        body: "Transfers planned each day rather than improvised on the morning.",
      },
      {
        title: "Vehicle Log Books",
        body: "Drivers fill in log books daily, as a matter of course.",
      },
      {
        title: "Servicing & Repairs",
        body: "Vehicles serviced and repaired before they are needed, not after.",
      },
      {
        title: "Fuelling & Licensing",
        body: "Fuelling and all vehicle licensing handled in-house.",
      },
    ],
    sections: [
      {
        heading: "Where Road Transfers Take Us",
        cards: [
          {
            title: "Victoria Falls & Surrounding Area",
            category: "Zimbabwe",
            image: "/image-library/Victoria Falls mist image3.jfif",
            href: "/destinations/victoria-falls",
          },
          {
            title: "Hwange",
            category: "Zimbabwe",
            image: "/image-library/Zimbabwe landscapes image2.jfif",
            href: "/destinations/zimbabwe",
          },
          {
            title: "Chobe",
            category: "Botswana",
            image: "/image-library/Chobe Day Trip image4.jfif",
            href: "/destinations/botswana",
          },
          {
            title: "Zambia",
            category: "Zambia",
            image: "/image-library/Zambezi sunrise image3.jfif",
            href: "/destinations/zambia",
          },
          {
            title: "Namibia",
            category: "Namibia",
            image: "/image-library/DISCOVER SOUTHERN AFRICA image4.jfif",
            href: "/destinations/namibia",
          },
        ],
      },
      {
        heading: "Cross-Border Journeys",
        paragraphs: [
          "Road transfers are also how most of our multi-country itineraries begin and end. The customs and border patrol work that sits between the legs is covered under cross-border arrangements, and we plan the two together so the timings survive contact with a real border post.",
        ],
      },
    ],
    related: [
      {
        title: "Cross-Border Arrangements",
        href: "/travel/cross-border",
        description: "Customs and border patrol handled",
        image: "/image-library/Beneath boat image3.jpeg",
      },
      {
        title: "Water Transfers",
        href: "/travel/water-transfers",
        description: "River and lake logistics",
        image: "/image-library/Beneath Lake site.jpeg",
      },
      {
        title: "Driver-Guided Travel",
        href: "/travel/driver-guided",
        description: "Itineraries with a driver guide",
        image: "/image-library/Beneath people standing near the pool image.jpeg",
      },
      {
        title: "Group Travel",
        href: "/travel/group-travel",
        description: "Groups and school trips",
        image: "/image-library/Beneath tent image.jpeg",
      },
    ],
  },
  {
    slug: "water-transfers",
    navTitle: "Water Transfers",
    navDescription: "Zambezi and Lake Kariba logistics",
    eyebrow: "Travel & Transfers · Water",
    title: "Water Transfers",
    lead: "Water transfers, Chobe River cruises and houseboats on Lake Kariba, arranged as one piece of logistics.",
    image: "/image-library/Beneath Lake site.jpeg",
    imageAlt: "Sunrise over the Zambezi",
    metaDescription:
      "Water transfers, Zambezi cruises, Chobe River journeys and Lake Kariba houseboats arranged from a Victoria Falls base.",
    intro: [
      "Where a trip leaves the road, the timing becomes harder to control, and water transfers are where that matters most. The transfers to the river, the boat bookings and the road legs that meet them are arranged together rather than passed between suppliers.",
      "That covers the Zambezi cruises at the Falls, the Chobe River in Botswana, and houseboats on Lake Kariba.",
    ],
    highlights: [
      {
        title: "Zambezi Cruises",
        body: "Transfers arranged for breakfast, lunch, sunset and dinner cruises.",
      },
      {
        title: "Chobe River",
        body: "River time in Botswana coordinated with the road transfer.",
      },
      {
        title: "Lake Kariba",
        body: "Houseboat transfers planned with the rest of the itinerary.",
      },
      {
        title: "One Point Of Contact",
        body: "Road and water legs booked through the same office.",
      },
    ],
    sections: [
      {
        heading: "Water We Arrange",
        cards: [
          {
            title: "Cruises On The Zambezi",
            category: "River Cruises",
            image: "/image-library/Zambezi Sunset Cruise image3.jfif",
            href: "/experiences/cruises",
          },
          {
            title: "Chobe River Cruises",
            category: "River Cruises",
            image: "/image-library/BOAT TRANSFERS image3.jfif",
            href: "/experiences/chobe",
          },
          {
            title: "Houseboats On Lake Kariba",
            category: "Houseboats",
            image: "/image-library/Beneath Boat Interior.jpeg",
            href: "/experiences/houseboats",
          },
        ],
      },
    ],
    related: [
      {
        title: "Cruises & River Experiences",
        href: "/experiences/cruises",
        description: "Zambezi river experiences",
        image: "/image-library/Beneath africa travel cruise.jpeg",
      },
      {
        title: "Houseboats",
        href: "/experiences/houseboats",
        description: "Lake Kariba",
        image: "/image-library/Beneath Boat Interior image 2.jpeg",
      },
      {
        title: "Road Transfers",
        href: "/travel/road-transfers",
        description: "Planned daily, serviced and licensed",
        image: "/image-library/Beneath africa travel car  image1.jpeg",
      },
      {
        title: "Chobe",
        href: "/experiences/chobe",
        description: "Botswana day trips",
        image: "/image-library/Chobe Day Trip image1.jfif",
      },
    ],
  },
  {
    slug: "driver-guided",
    navTitle: "Driver-Guided Travel",
    navDescription: "Itineraries with a driver guide",
    eyebrow: "Travel & Transfers · Guided",
    title: "Driver-Guided Travel",
    lead: "Itineraries with a driver guide, so the journey has someone responsible on the ground for its whole length.",
    image: "/image-library/Beneath people standing near the pool image.jpeg",
    imageAlt: "Guide on a Beneath Africa journey",
    metaDescription:
      "Driver-guide itineraries across Zimbabwe, Zambia, Botswana and Namibia, with personal service throughout the journey.",
    intro: [
      "Itineraries with a driver guide are one of the ways we organise travel, and they suit guests who want the journey to be part of the holiday rather than a gap between transfers.",
      "You have a single contact for the whole route, which is what makes it possible to relax on the road — a position we summarise as relaxed travelling with personal service throughout.",
    ],
    highlights: [
      {
        title: "Guide & Vehicle",
        body: "A driver guide with the itinerary, not just the transfers.",
      },
      {
        title: "Personal Service",
        body: "A named contact for the length of the journey.",
      },
      {
        title: "Tailor-Made Routes",
        body: "The route follows your wishes rather than a standard loop.",
      },
      {
        title: "Relaxed Pacing",
        body: "Timing that can adjust without rebuilding the trip.",
      },
    ],
    sections: [
      {
        heading: "What A Driver-Guided Itinerary Includes",
        cards: [
          {
            title: "A Driver Guide With The Vehicle",
            category: "Driver-Guided",
            image: "/image-library/Guides image3.jfif",
          },
          {
            title: "Road Transfers Between Destinations",
            category: "Transfers",
            image: "/image-library/transfer vehicle image5.jfif",
            href: "/travel/road-transfers",
          },
          {
            title: "Accommodation Along The Route",
            category: "Accommodation",
            image: "/image-library/Beneath accomodation image5.jpeg",
            href: "/travel/accommodation",
          },
          {
            title: "Activities & Cruises As Scheduled",
            category: "Experiences",
            image: "/image-library/Beneath africa cruise sunset.jpeg",
            href: "/experiences/cruises",
          },
        ],
      },
    ],
    related: [
      {
        title: "Road Transfers",
        href: "/travel/road-transfers",
        description: "Planned daily, serviced and licensed",
        image: "/image-library/Beneath africa travel car  image1.jpeg",
      },
      {
        title: "Tailor-Made Journeys",
        href: "/experiences/tailor-made",
        description: "Travel shaped around your plans",
        image: "/image-library/Beneath tent image.jpeg",
      },
      {
        title: "Accommodation",
        href: "/travel/accommodation",
        description: "Hotels, lodges, self-catering and camping",
        image: "/image-library/Beneath pool view image2.jpeg",
      },
      {
        title: "Group Travel",
        href: "/travel/group-travel",
        description: "Groups and school trips",
        image: "/image-library/Beneath boat image3.jpeg",
      },
    ],
  },
  {
    slug: "accommodation",
    navTitle: "Accommodation",
    navDescription: "Hotels, lodges, self-catering & camping",
    eyebrow: "Travel & Transfers · Accommodation",
    title: "Accommodation",
    lead: "Hotels, lodges, self-catering and camping arranged to fit the route you are actually travelling.",
    image: "/image-library/Beneath pool view image2.jpeg",
    imageAlt: "Sunset over bush country",
    metaDescription:
      "Accommodation in hotels, lodges, self-catering and camping arranged across Zimbabwe, Zambia, Botswana and Namibia.",
    intro: [
      "Accommodation is one of our quality products, not an afterthought booked once the rest of the trip is fixed. We arrange hotels, lodges, self-catering and camping, and we place them so the transfers between them still make sense.",
      "It also changes. When a client needs an extra night in Hwange, or a lodge closer to a border, that is a conversation with the same person who arranged the transfer.",
    ],
    highlights: [
      {
        title: "Hotels",
        body: "City and resort hotels arranged to fit the programme.",
      },
      {
        title: "Lodges",
        body: "Lodges placed close to the activities being planned.",
      },
      {
        title: "Self-Catering",
        body: "Self-catering options for longer stays and groups.",
      },
      {
        title: "Camping",
        body: "Camping arranged as part of the itinerary.",
      },
    ],
    sections: [
      {
        heading: "Accommodation Types We Arrange",
        cards: [
          {
            title: "Hotels",
            category: "Accommodation",
            image: "/image-library/Beneath accomodation image6.jpeg",
          },
          {
            title: "Lodges",
            category: "Accommodation",
            image: "/image-library/Beneath accomodation interior image.jpeg",
          },
          {
            title: "Self-Catering",
            category: "Accommodation",
            image: "/image-library/Beneath accomodation image7.jpeg",
          },
          {
            title: "Camping",
            category: "Accommodation",
            image: "/image-library/Beneath tent image.jpeg",
          },
          {
            title: "Houseboats On Lake Kariba",
            category: "Houseboats",
            image: "/image-library/Beneath Boat Interior image 2.jpeg",
            href: "/experiences/houseboats",
          },
        ],
      },
    ],
    related: [
      {
        title: "Victoria Falls",
        href: "/destinations/victoria-falls",
        description: "Our home in Zimbabwe",
        image: "/image-library/Helicopter Flights image1.jfif",
      },
      {
        title: "Safaris & Game Drives",
        href: "/experiences/safaris",
        description: "Wildlife experiences across the region",
        image: "/image-library/Beneath elephant image.jpeg",
      },
      {
        title: "Houseboats",
        href: "/experiences/houseboats",
        description: "Lake Kariba",
        image: "/image-library/Beneath Boat Interior image 2.jpeg",
      },
      {
        title: "Namibia",
        href: "/destinations/namibia",
        description: "Cross-border arrangements",
        image: "/image-library/Beneath pool view image2.jpeg",
      },
    ],
  },
  {
    slug: "cross-border",
    navTitle: "Cross-Border Arrangements",
    navDescription: "Customs and border patrol handled",
    eyebrow: "Travel & Transfers · Borders",
    title: "Cross-Border Arrangements",
    lead: "Customs and border patrol handled as part of the arrangement, not as an interruption to it.",
    image: "/image-library/Beneath boat image3.jpeg",
    imageAlt: "Landscape along a regional route",
    metaDescription:
      "Cross-border arrangements between Zimbabwe, Zambia, Botswana and Namibia, including customs, border patrol and coordination with hotels and venues.",
    intro: [
      "A client travelling through Botswana, Zambia and Zimbabwe on a scattered tour needs more than a vehicle: someone has to deal with the customs and border formalities as the schedule changes, and keep the hotels and venues informed along the way.",
      "That is the work we describe as solving problems and communicating effectively with the various hotels and venues involved, and it is the reason a multi-country itinerary can still run to plan when a flight is late.",
    ],
    highlights: [
      {
        title: "Customs & Border Patrol",
        body: "Handled as part of the arrangement rather than left to guests.",
      },
      {
        title: "Four Countries",
        body: "Zimbabwe, Zambia, Botswana and Namibia.",
      },
      {
        title: "Venue Communication",
        body: "Hotels and venues kept informed as schedules move.",
      },
      {
        title: "Schedule Changes",
        body: "Border timings adjusted when the plan changes.",
      },
    ],
    sections: [
      {
        heading: "Borders We Work Across",
        bullets: [
          "Zimbabwe to Zambia",
          "Zimbabwe to Botswana",
          "Zimbabwe to Namibia",
          "Zambia, Botswana and Namibia within a single itinerary",
        ],
      },
    ],
    related: [
      {
        title: "Road Transfers",
        href: "/travel/road-transfers",
        description: "Planned daily, serviced and licensed",
        image: "/image-library/Beneath africa travel car  image1.jpeg",
      },
      {
        title: "Botswana",
        href: "/destinations/botswana",
        description: "Chobe & wildlife journeys",
        image: "/image-library/Chobe Day Trip image2.jfif",
      },
      {
        title: "Zambia",
        href: "/destinations/zambia",
        description: "River, wildlife and adventure",
        image: "/image-library/Beneath pool view image.jpeg",
      },
      {
        title: "Namibia",
        href: "/destinations/namibia",
        description: "Cross-border arrangements",
        image: "/image-library/Beneath pool view image2.jpeg",
      },
    ],
  },
  {
    slug: "group-travel",
    navTitle: "Group Travel",
    navDescription: "Groups and school trips",
    eyebrow: "Travel & Transfers · Groups",
    title: "Group Travel",
    lead: "Group trips and school trips, planned with a single point of contact from the first enquiry.",
    image: "/image-library/Beneath tent image.jpeg",
    imageAlt: "Beneath Africa camp",
    metaDescription:
      "Group travel, school trips and family reunions arranged from Victoria Falls, with easy booking through one expert and personal service.",
    intro: [
      "Group travel runs on one condition: one person has to be able to answer for everybody. That is why the arrangements go through a single contact — easy booking with the same expert from the first enquiry to the return transfer.",
      "School trips are arranged on the same basis. The goal, in our own words, is to let a school focus on its other core activities while its educational trip is fully satisfied.",
    ],
    highlights: [
      {
        title: "One Point Of Contact",
        body: "A single expert for the group, not a queue of suppliers.",
      },
      {
        title: "School Trips",
        body: "Victoria Falls programmes with overnight stays and activities.",
      },
      {
        title: "Family Reunions",
        body: "Groups of relatives travelling together, often across borders.",
      },
      {
        title: "Tailor-Made Groups",
        body: "Group programmes built to your wishes and budget.",
      },
    ],
    sections: [
      {
        heading: "Group Travel Arrangements",
        bullets: [
          "Tailor-made group trips",
          "Individual and VIP travel arrangements",
          "Family tours and reunions",
          "Educational school trips",
          "Stress-free handling with personal service",
        ],
      },
    ],
    related: [
      {
        title: "Educational Trips",
        href: "/educational-trips",
        description: "School trips arranged from Victoria Falls",
        image: "/image-library/Beneath chilling people image.jpeg",
      },
      {
        title: "Road Transfers",
        href: "/travel/road-transfers",
        description: "Planned daily, serviced and licensed",
        image: "/image-library/Beneath africa travel car  image1.jpeg",
      },
      {
        title: "Accommodation",
        href: "/travel/accommodation",
        description: "Hotels, lodges, self-catering and camping",
        image: "/image-library/Beneath pool view image2.jpeg",
      },
      {
        title: "Tailor-Made Journeys",
        href: "/experiences/tailor-made",
        description: "Travel shaped around your plans",
        image: "/image-library/Beneath tent image.jpeg",
      },
    ],
  },
];

export const aboutPages: InteriorPageData[] = [
  {
    slug: "story",
    navTitle: "Our Story",
    navDescription: "Founded in Victoria Falls in 2013",
    eyebrow: "About · Our Story",
    title: "Our Story",
    lead: "Established in Victoria Falls in 2013, with a vision to grow within Zimbabwe.",
    image: "/image-library/Beneath Lake site.jpeg",
    imageAlt: "Sunrise over the Zambezi",
    metaDescription:
      "Beneath Africa Travel and Tours, trading as Zeresh Trading Company (Pvt) Ltd, was established in 2013 in Victoria Falls and is registered in Zimbabwe.",
    intro: [
      "Zeresh Trading Company, trading as Beneath Africa Travel and Tours, was established in 2013 by Naume Ndoro, Bruce Nyakusengwa and Ranjisi Nyakusengwa as a tourism company based in Victoria Falls. The registered company is Zeresh Trading Company Private Limited, company number 845/2013, registered by the Registrar of Companies Zimbabwe.",
      "The vision was to grow within Zimbabwe while specialising in road and water transfers, educational school trips, and tours around Botswana, Namibia, Zambia and Zimbabwe — with accommodation in hotels, lodges and camps, camping, houseboats on Lake Kariba, Chobe day trips and other activities in and around Victoria Falls.",
    ],
    highlights: [
      {
        title: "Registered Tourism Company",
        body: "Zeresh Trading Company Private Limited, company number 845/2013.",
      },
      {
        title: "Four Countries",
        body: "Zimbabwe, Zambia, Botswana and Namibia.",
      },
      {
        title: "Based In Victoria Falls",
        body: "483 Jacaranda Crescent, P.O. Box 262, Victoria Falls.",
      },
      {
        title: "2019 Award",
        body: "Best First-Time Exhibitor Stand Award, Sanganai / Hlanganani World Tourism Expo.",
      },
    ],
    sections: [
      {
        heading: "What We Set Out To Do",
        paragraphs: [
          "Beneath Africa Travel and Tours provides individual and group travel to leisure clients, and seeks to differentiate itself as the premier adventure travel company in the greater Victoria Falls area.",
          "Our business strategy revolves around the need to provide quality service to our various target customers. That is undertaken through the recruitment of a professional team and the provision of good quality, customer-designed travel packages.",
        ],
      },
      {
        heading: "Where That Has Taken Us",
        paragraphs: [
          "We are happy to say that we are slowly but surely approaching and living that vision, and we were awarded the Best First-Time Exhibitor Stand Award at the 2019 Sanganai / Hlanganani World Tourism Expo.",
          "Since 2013 we have provided road transfers for clients in Botswana, Zambia and Zimbabwe, driven travellers across borders, arranged Chobe day trips, and built school programmes out of the Falls.",
        ],
      },
    ],
    related: [
      {
        title: "Ranjis Nyakusengwa",
        href: "/about/ranjis",
        description: "Founder and Managing Director",
        image: "/image-library/Ranjis Nyakusengwa article image.jpeg",
      },
      {
        title: "Our Team",
        href: "/about/team",
        description: "The people who arrange and run the details",
        image: "/image-library/Beneath people standing near the pool image.jpeg",
      },
      {
        title: "Awards & Recognition",
        href: "/about/awards",
        description: "The 2019 Sanganai / Hlanganani award",
      },
      {
        title: "Testimonials",
        href: "/about/testimonials",
        description: "What clients and partners have told us",
      },
    ],
  },
  {
    slug: "ranjis",
    navTitle: "Ranjis Nyakusengwa",
    navDescription: "Founder and Managing Director",
    eyebrow: "About · Founder",
    title: "Ranjis Nyakusengwa",
    lead: "Managing Director and Secretary — and the person behind most of the arrangements.",
    image: "/image-library/Ranjis Nyakusengwa article image.jpeg",
    imageAlt: "Ranjis Nyakusengwa",
    metaDescription:
      "Ranjis Nyakusengwa is the founder and Managing Director of Beneath Africa Travel and Tours, with a career spanning lodge management, regional operations and cruise operations.",
    intro: [
      "Having worked in the industry for many years, Ranjis brings a certain knowledge to each project he undertakes. He is a talented, friendly, conscientious and flexible worker, and holds a Diploma in Hotel Operation and Management from CPM College in London.",
      "His career has moved through lodge management, regional operations and cruise operations before Beneath Africa was founded in May 2013, and that range is why the company works as well on the water as on the road.",
    ],
    timeline: [
      {
        period: "1995–2004",
        role: "General Manager, Harare Safari Lodge, Lake Chivero",
      },
      {
        period: "2005–2006",
        role: "General Manager, Kuimba Shiri, Lake Chivero",
      },
      {
        period: "2007–2008",
        role: "Regional Operations Manager, Flame of Africa — Botswana, Namibia and Zimbabwe",
      },
      {
        period: "2009–2012",
        role: "Cruise Director, Zambezi Queen — the five-star floating hotel on the Chobe River",
      },
      {
        period: "May 2013–present",
        role: "Director and Secretary, Zeresh Trading Company (Pvt) Ltd, Victoria Falls",
      },
    ],
    sections: [
      {
        heading: "What That Experience Covers",
        bullets: [
          "Lodge and hotel operations",
          "Regional operations across Botswana, Namibia and Zimbabwe",
          "Cruise operations on the Chobe River",
          "Transfer and vehicle planning",
        ],
      },
      {
        heading: "Still The First Point Of Contact",
        paragraphs: [
          "Ranjis remains Managing Director and Secretary, and the role most guests reach first. You will benefit from a dedicated and professional service, with a personal contact person for consultation and the organisation of the trip.",
        ],
      },
    ],
    related: [
      {
        title: "Our Story",
        href: "/about/story",
        description: "Founded in Victoria Falls in 2013",
        image: "/image-library/Beneath Lake site.jpeg",
      },
      {
        title: "Our Team",
        href: "/about/team",
        description: "The people who arrange and run the details",
        image: "/image-library/Beneath people standing near the pool image.jpeg",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Speak to Ranjis directly",
      },
      {
        title: "Testimonials",
        href: "/about/testimonials",
        description: "What clients and partners have told us",
      },
    ],
  },
  {
    slug: "team",
    navTitle: "Our Team",
    navDescription: "Directors, operations and design",
    eyebrow: "About · Team",
    title: "Our Team",
    lead: "Directors, operations and design — the people who arrange the details and keep them running.",
    image: "/image-library/Beneath people standing near the pool image.jpeg",
    imageAlt: "A guide on a Beneath Africa journey",
    metaDescription:
      "The team behind Beneath Africa Travel and Tours: Ranjis Nyakusengwa, Bruce Nyakusengwa, Naume Ndoro and Brian Muvuti.",
    intro: [
      "The directors of Zeresh Trading Company Private Limited are Ranjisi Nyakusengwa, Naume Ndoro and Bruce Nyakusengwa. Between them they cover the commercial side, the operations and the day-to-day running of the transfers.",
      "It is a small company by design. It means the person you speak to when you ask about a border is the person who arranges them.",
    ],
    people: [
      {
        name: "Ranjis Nyakusengwa",
        role: "Managing Director / Secretary · Director",
        detail:
          "Twenty-nine years in the industry across lodge management, regional operations and cruise operations, including Cruise Director of the Zambezi Queen on the Chobe River. Co-founder of the company in 2013.",
      },
      {
        name: "Bruce Nyakusengwa",
        role: "Operations Director · Director",
        detail:
          "Responsible for the operations department and the daily planning of road transfers, including vehicle log books, servicing, repairs, fuelling and all vehicle licensing.",
      },
      {
        name: "Naume Ndoro",
        role: "Director · Co-founder",
        detail:
          "Co-founder of the company in 2013 and a director of Zeresh Trading Company Private Limited.",
      },
      {
        name: "Brian Muvuti",
        role: "Graphic Designer",
        detail:
          "Produces the flyers and brochures, and oversees how they come out, alongside the website and digital material the sales team uses.",
      },
    ],
    sections: [
      {
        heading: "How The Team Is Arranged",
        paragraphs: [
          "Our business strategy revolves around the need to provide quality service to our target customers, undertaken through the recruitment of a professional team and the provision of good quality, customer-designed travel packages.",
        ],
      },
    ],
    related: [
      {
        title: "Our Story",
        href: "/about/story",
        description: "Founded in Victoria Falls in 2013",
        image: "/image-library/Beneath Lake site.jpeg",
      },
      {
        title: "Ranjis Nyakusengwa",
        href: "/about/ranjis",
        description: "Founder and Managing Director",
        image: "/image-library/Ranjis Nyakusengwa article image.jpeg",
      },
      {
        title: "Awards & Recognition",
        href: "/about/awards",
        description: "The 2019 Sanganai / Hlanganani award",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Tell us what you are planning",
      },
    ],
  },
  {
    slug: "testimonials",
    navTitle: "Testimonials",
    navDescription: "What clients and partners have told us",
    eyebrow: "About · Testimonials",
    title: "Testimonials",
    lead: "What our clients and partners have told us, in their own words.",
    image: "/image-library/Beneath africa travel cruise.jpeg",
    imageAlt: "Sunset cruise on the Zambezi",
    metaDescription:
      "References and testimonials from Theron Safaris, Flame of Africa, Dr. Rebecca Becky Howell, EU Travel Expo, Safari 24, Lani and Isabel Pinero.",
    quotes: [
      {
        body: "We worked with Flame of Africa since 2013, providing all road transfers to their clients in Botswana, Zambia and Zimbabwe, getting in to solve problems and communicating effectively and efficiently with various hotels and other venues for their scattered tour.",
        attribution: "Brett McDonald, Flame of Africa, South Africa",
      },
      {
        body: "We worked with Gerry, the hunter in providing all road transfers, camping and meals for all his hunters while in Zimbabwe.",
        attribution: "Gerry, Theron Safaris, South Africa",
      },
      {
        body: "We worked direct with Dr. Rebecca Becky Howell and her friend Linda Nalwalk driving them in different countries in Southern Africa including Botswana, Zambia and Zimbabwe, solving their problems and other venues for their scattered tour, as well as arranging them with accommodation and the activities, and taking care of all the various customs and border patrol as their schedules changed.",
        attribution: "Dr. Rebecca Becky Howell, USA",
      },
      {
        body: "Mimi makes all the road transfer, accommodation and activities reservations with us.",
        attribution: "Mimi Low, EU Travel Expo, Singapore",
      },
    ],
    note: "The statements above were supplied to us by our clients and partners as references, and are reproduced as written.",
    sections: [
      {
        heading: "References We Work With",
        bullets: clientReferences,
      },
    ],
    related: [
      {
        title: "Our Story",
        href: "/about/story",
        description: "Founded in Victoria Falls in 2013",
        image: "/image-library/Beneath Lake site.jpeg",
      },
      {
        title: "Awards & Recognition",
        href: "/about/awards",
        description: "The 2019 Sanganai / Hlanganani award",
      },
      {
        title: "Ranjis Nyakusengwa",
        href: "/about/ranjis",
        description: "Founder and Managing Director",
        image: "/image-library/Ranjis Nyakusengwa article image.jpeg",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Tell us what you are planning",
      },
    ],
  },
  {
    slug: "awards",
    navTitle: "Awards & Recognition",
    navDescription: "The 2019 Sanganai / Hlanganani award",
    eyebrow: "About · Awards",
    title: "Awards & Recognition",
    lead: "Best First-Time Exhibitor Stand Award, Sanganai / Hlanganani World Tourism Expo, 2019.",
    image: "/image-library/Beneath tent image.jpeg",
    imageAlt: "Beneath Africa camp",
    metaDescription:
      "Beneath Africa Travel and Tours was awarded Best First-Time Exhibitor Stand Award at the 2019 Sanganai / Hlanganani World Tourism Expo.",
    intro: [
      "We were awarded the Best First-Time Exhibitor Stand Award at the 2019 Sanganai / Hlanganani World Tourism Expo — the recognition we are most pleased to point at, because it came from an international tourism audience seeing us for the first time.",
      "It sits alongside a longer record of practical work: a company registered in Zimbabwe since 2013, and clients who have used us for road transfers across Botswana, Zambia and Zimbabwe for years.",
    ],
    highlights: [
      {
        title: "Best First-Time Exhibitor Stand Award",
        body: "Sanganai / Hlanganani World Tourism Expo, 2019.",
      },
      {
        title: "Registered In Zimbabwe",
        body: "Zeresh Trading Company Private Limited, company number 845/2013.",
      },
      {
        title: "Established 2013",
        body: "Operating from Victoria Falls since 2013.",
      },
      {
        title: "Four Countries",
        body: "Zimbabwe, Zambia, Botswana and Namibia.",
      },
    ],
    pills: clientReferences,
    sections: [
      {
        heading: "Why The Award Mattered",
        paragraphs: [
          "As an exhibitor appearing for the first time, we were there to introduce a Victoria Falls-based company to an international audience. The award was given for the stand itself — for presenting the company clearly, and for the range of travel we were able to arrange on the day.",
          "We would rather be judged on the next client's journey than on that, but we are proud of it.",
        ],
      },
    ],
    related: [
      {
        title: "Our Story",
        href: "/about/story",
        description: "Founded in Victoria Falls in 2013",
        image: "/image-library/Beneath Lake site.jpeg",
      },
      {
        title: "Testimonials",
        href: "/about/testimonials",
        description: "What clients and partners have told us",
        image: "/image-library/Beneath africa travel cruise.jpeg",
      },
      {
        title: "Our Team",
        href: "/about/team",
        description: "The people who arrange and run the details",
        image: "/image-library/Beneath people standing near the pool image.jpeg",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Tell us what you are planning",
      },
    ],
  },
];

export const educationalTrips: InteriorPageData = {
  slug: "educational-trips",
  navTitle: "Educational Trips",
  navDescription: "School trips from Victoria Falls",
  eyebrow: "Company · Educational Trips",
  title: "Educational School Trips",
  lead: "School trips arranged from Victoria Falls, so your staff can focus on their other core activities while the trip is taken care of.",
  image: "/image-library/Beneath chilling people image.jpeg",
  imageAlt: "Educational trip in Victoria Falls",
  metaDescription:
    "Victoria Falls educational school trips including an overnight stay in Hwange, a guided Falls tour, a sunset cruise and a visit to a crocodile farm.",
  intro: [
    "We arrange educational school trips out of Victoria Falls. A typical programme as we have presented it to schools includes an overnight stay in Hwange, a guided tour of the Falls, a sunset cruise and a visit to a crocodile farm.",
    "Our objective, in our own words, is to give you the opportunity to focus on your other core activities while your educational trip is fully satisfied. Where a school has a particular focus, we adapt the programme rather than offering a fixed package.",
  ],
  highlights: [
    {
      title: "Overnight In Hwange",
      body: "A sleepover in Hwange as part of the programme.",
    },
    {
      title: "Guided Falls Tour",
      body: "A guided tour of the Victoria Falls.",
    },
    {
      title: "Sunset Cruise",
      body: "A cruise on the Zambezi to close the day.",
    },
    {
      title: "Crocodile Farm",
      body: "A visit to a crocodile farm.",
    },
  ],
  sections: [
    {
      heading: "How A School Trip Is Arranged",
      bullets: [
        "Send us your dates, group size and learning focus",
        "We propose a programme around your wishes and budget",
        "Transport, accommodation, cruises and visits are booked together",
        "A single contact handles the trip from enquiry to return",
      ],
    },
    {
      heading: "What Schools Have Asked For",
      paragraphs: [
        "Our business profile has been built around these programmes: we arrange the Falls tour, the Hwange overnight, the sunset cruise and the crocodile farm visit, with road transfers and accommodation handled as part of the same arrangement.",
        "Groups travelling on a school trip are also among the group travellers we handle, and the arrangements follow the same pattern — one expert, easy booking, personal service.",
      ],
    },
  ],
  gallery: [
    {
      src: "/image-library/Beneath chilling people image.jpeg",
      alt: "Educational trip group at the Victoria Falls",
    },
    {
      src: "/image-library/Beneath fire image1.jpeg",
      alt: "Educational trip activity in Victoria Falls",
    },
  ],
  related: [
    {
      title: "Group Travel",
      href: "/travel/group-travel",
      description: "Groups and school trips",
      image: "/image-library/Beneath africa travel car  image1.jpeg",
    },
    {
      title: "Victoria Falls",
      href: "/destinations/victoria-falls",
      description: "Our home in Zimbabwe",
      image: "/image-library/Helicopter Flights image1.jfif",
    },
    {
      title: "Zimbabwe",
      href: "/destinations/zimbabwe",
      description: "Wildlife, landscapes & culture",
      image: "/image-library/Beneath boat image3.jpeg",
    },
    {
      title: "Road Transfers",
      href: "/travel/road-transfers",
      description: "Planned daily, serviced and licensed",
      image: "/image-library/Beneath pool view image2.jpeg",
    },
  ],
};

export function findPage(
  pages: InteriorPageData[],
  slug: string,
): InteriorPageData | undefined {
  return pages.find((page) => page.slug === slug);
}

export function buildCards(
  pages: InteriorPageData[],
  basePath: string,
): CardLink[] {
  return pages.map((page) => ({
    title: page.navTitle,
    href: `${basePath}/${page.slug}`,
    description: page.navDescription,
    image: page.image,
  }));
}

export const destinationCards = buildCards(destinations, "/destinations");
export const experienceCards = buildCards(experiences, "/experiences");
export const travelCards = buildCards(travelServices, "/travel");
export const aboutCards = buildCards(aboutPages, "/about");
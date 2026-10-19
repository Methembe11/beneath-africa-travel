import type { Metadata } from "next";
import ListingPage from "../components/ListingPage";
import { experienceCards } from "../lib/content";
import { pageMeta } from "../lib/meta";

export const metadata: Metadata = pageMeta({
  path: "/experiences",
  title: "Experiences | Beneath Africa Travel & Tours",
  description:
    "Victoria Falls activities, safaris and game drives, Chobe day trips, cruises, Lake Kariba houseboats, cultural experiences and tailor-made journeys.",
});

export default function ExperiencesPage() {
  return (
    <ListingPage
      hero={{
        eyebrow: "Experiences",
        title: "Choose What Matters To You",
        lead: "Experiences arranged with timing, transfers and connections in mind — keeping the whole journey working together.",
        image: "/image-library/Beneath africa travel cruise.jpeg",
        imageAlt: "Sunset cruise on the Zambezi",
      }}
      eyebrow="Experiences"
      heading="Experiences Arranged As Part Of A Coherent Journey"
      intro="From guided tours of the Falls to Chobe day trips, Lake Kariba houseboats and tailor-made programmes — every experience is booked through the same office as the transfers."
      label="Experiences"
      items={experienceCards}
    />
  );
}
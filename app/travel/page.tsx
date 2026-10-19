import type { Metadata } from "next";
import ListingPage from "../components/ListingPage";
import { travelCards } from "../lib/content";
import { pageMeta } from "../lib/meta";

export const metadata: Metadata = pageMeta({
  path: "/travel",
  title: "Travel & Transfers | Beneath Africa Travel & Tours",
  description:
    "Road and water transfers, driver-guided travel, accommodation, cross-border arrangements and group travel across Zimbabwe, Zambia, Botswana and Namibia.",
});

export default function TravelPage() {
  return (
    <ListingPage
      hero={{
        eyebrow: "Travel & Transfers",
        title: "Journeys That Keep Moving When Plans Change",
        lead: "Road transfers, water transfers, accommodation, cross-border arrangements and driver-guided travel — arranged from one office in Victoria Falls.",
        image: "/image-library/Beneath africa travel car  image1.jpeg",
        imageAlt: "Beneath Africa transfer vehicle",
      }}
      eyebrow="Travel & Transfers"
      heading="Built For Routes That Cross Borders Or Change"
      intro="We pride ourselves on our quality products, including road transfers, boating and accommodation. Practical arrangements that account for multi-destination routes, cross-border requirements and changes in timing."
      label="Travel and transfers"
      items={travelCards}
    />
  );
}
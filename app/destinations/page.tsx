import type { Metadata } from "next";
import ListingPage from "../components/ListingPage";
import { destinationCards } from "../lib/content";
import { pageMeta } from "../lib/meta";

export const metadata: Metadata = pageMeta({
  path: "/destinations",
  title: "Destinations | Beneath Africa Travel & Tours",
  description:
    "Victoria Falls, Zimbabwe, Zambia, Botswana and Namibia. Destinations arranged from our Victoria Falls base, with road transfers, accommodation and activities in place.",
});

export default function DestinationsPage() {
  return (
    <ListingPage
      hero={{
        eyebrow: "Destinations",
        title: "Different Destinations, One Point Of Contact",
        lead: "Discover Zimbabwe's most beautiful places, explore the Victoria Falls, and travel through Botswana, Zambia and Namibia with the arrangements handled from one office.",
        image: "/image-library/Beneath boat image3.jpeg",
        imageAlt: "Landscape in Zimbabwe",
      }}
      eyebrow="Start Here"
      heading="Start In Victoria Falls. Go Further Into Southern Africa."
      intro="Based in Victoria Falls, arrangements extend across Zimbabwe, Zambia, Botswana and Namibia — with a practical view of routes and borders."
      label="Destinations"
      items={destinationCards}
    />
  );
}
import type { Metadata } from "next";
import ListingPage from "../components/ListingPage";
import { aboutCards } from "../lib/content";
import { pageMeta } from "../lib/meta";

export const metadata: Metadata = pageMeta({
  path: "/about",
  title: "About | Beneath Africa Travel & Tours",
  description:
    "Our story, the team behind Beneath Africa Travel and Tours, testimonials from clients and partners, and our 2019 Sanganai / Hlanganani award.",
});

export default function AboutPage() {
  return (
    <ListingPage
      hero={{
        eyebrow: "About",
        title: "A Warm Zimbabwean Welcome",
        lead: "A Victoria Falls company established in 2013, drawing on practical tourism experience in lodge management, regional operations and cruise operations.",
        image: "/image-library/Ranjis Nyakusengwa article image.jpeg",
        imageAlt: "Ranjis Nyakusengwa",
      }}
      eyebrow="About Beneath Africa"
      heading="Our Story, Our Team, Our Reputation"
      intro="Zeresh Trading Company Private Limited, trading as Beneath Africa Travel and Tours, was established in 2013 in Victoria Falls. Here is how the company is run and what clients have said about working with us."
      label="About pages"
      items={aboutCards}
    />
  );
}
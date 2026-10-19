import type { Metadata } from "next";
import InteriorPage from "../components/InteriorPage";
import { company, type InteriorPageData } from "../lib/content";
import { pageMeta } from "../lib/meta";

const page: InteriorPageData = {
  slug: "terms",
  navTitle: "Terms",
  navDescription: "How we work with travellers",
  eyebrow: "Legal · Terms",
  title: "Terms",
  lead: "The plain terms on which Beneath Africa Travel and Tours arranges travel.",
  image: "/image-library/Beneath tent image.jpeg",
  imageAlt: "A canvas tent pitched on open ground under a low evening sky.",
  metaDescription:
    "The terms on which Beneath Africa Travel and Tours prepares offers and arranges transfers, accommodation and activities.",
  intro: [
    `These are the terms on which ${company.tradingName} ("Beneath Africa") prepares offers and arranges travel. Every booking is different, so the specific terms that apply to your trip are confirmed in writing in your individual offer.`,
    "Where these terms and your individual offer differ, your individual offer takes precedence.",
  ],
  sections: [
    {
      heading: "Offers & Bookings",
      paragraphs: [
        "We prepare an individual offer based on the dates, group size and wishes you send us. An offer does not reserve anything until it is confirmed with us in writing. Availability of transfers, accommodation and activities is confirmed at the time of booking and may change.",
      ],
    },
    {
      heading: "Payment",
      paragraphs: [
        `Payments are made by bank transfer to the account set out in your offer. The beneficiary is ${company.tradingName}, and the bank details are supplied with your confirmation.`,
      ],
    },
    {
      heading: "Changes & Cancellations",
      paragraphs: [
        "Transfers, accommodation and activities are provided by third-party suppliers, and their own change and cancellation conditions apply. We will always tell you what those conditions are before you confirm, and we will pass on any charges that the suppliers apply.",
      ],
    },
    {
      heading: "Borders & Documentation",
      paragraphs: [
        "Cross-border journeys require valid travel documents, and these remain the responsibility of the traveller. We handle the logistics of the crossing as part of the arrangement, but we cannot accept responsibility for a journey that cannot proceed because a document is missing, expired or refused.",
      ],
    },
    {
      heading: "Responsibility",
      paragraphs: [
        "We arrange the elements of your journey with care and communicate with the hotels, venues and operators involved. We are not the provider of the third-party services themselves, and we are not liable for circumstances outside our reasonable control.",
      ],
    },
  ],
  note: "These terms are a summary. Your individual offer sets out the conditions that apply to your particular booking.",
};

export const metadata: Metadata = pageMeta({
  path: "/terms",
  title: "Terms | Beneath Africa Travel & Tours",
  description:
    "The terms on which Beneath Africa Travel and Tours prepares offers and arranges transfers, accommodation and activities in southern Africa.",
});

export default function TermsPage() {
  return <InteriorPage page={page} />;
}

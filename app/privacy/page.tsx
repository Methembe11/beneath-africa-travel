import type { Metadata } from "next";
import InteriorPage from "../components/InteriorPage";
import { company, type InteriorPageData } from "../lib/content";
import { pageMeta } from "../lib/meta";

const page: InteriorPageData = {
  slug: "privacy",
  navTitle: "Privacy",
  navDescription: "How we handle your details",
  eyebrow: "Legal · Privacy",
  title: "Privacy",
  lead: "How Beneath Africa Travel and Tours collects and uses the details you send us.",
  image: "/image-library/Beneath africa travel office.jpeg",
  imageAlt: "The Beneath Africa Travel and Tours office in Victoria Falls.",
  metaDescription:
    "How Beneath Africa Travel and Tours handles the personal details you send when enquiring or booking travel.",
  intro: [
    `This page is a plain-language summary of how ${company.tradingName} ("Beneath Africa") handles the information you share with us when you enquire about or book travel.`,
    "We keep it short because we do not do anything unusual with your details: we use them to arrange your travel, and for no other purpose.",
  ],
  sections: [
    {
      heading: "What We Collect",
      paragraphs: [
        "We only hold the details you choose to send us. For an enquiry that is usually your name, contact details and the outline of the trip you have in mind. For a booking it will also include the details needed to arrange transfers, accommodation and activities, such as travel dates, group size and any preferences you tell us about.",
      ],
    },
    {
      heading: "How We Use It",
      paragraphs: [
        "Your details are used to prepare an individual offer, to arrange the transfers, accommodation and activities you have asked for, and to stay in contact with you about your journey. We share the details that are necessary with the suppliers we use to deliver your trip — for example a lodge, a transfer operator or an activity provider — and no more than is needed for that purpose.",
      ],
    },
    {
      heading: "What We Do Not Do",
      paragraphs: [
        "We do not sell your details, and we do not pass them to anyone for marketing. We keep them only for as long as we need them to arrange and support your travel.",
      ],
    },
    {
      heading: "Contacting Us",
      paragraphs: [
        `If you would like to ask what we hold about you, or ask us to correct or remove it, contact us at ${company.emails[0].label}.`,
      ],
    },
  ],
  note: "This summary is provided for clarity and is not legal advice. If you need the detail behind it, please contact us directly.",
};

export const metadata: Metadata = pageMeta({
  path: "/privacy",
  title: "Privacy | Beneath Africa Travel & Tours",
  description:
    "How Beneath Africa Travel and Tours collects and uses the details you send when enquiring about or booking travel from Victoria Falls.",
});

export default function PrivacyPage() {
  return <InteriorPage page={page} />;
}

import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Raleway } from "next/font/google";
import "./globals.css";
import MotionShell from "./components/MotionShell";
import SiteHeader from "./components/SiteHeader";
import { company } from "./lib/content";
import {
  DEFAULT_OG_ALT,
  DEFAULT_OG_IMAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "./lib/meta";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-ebgaramond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const DEFAULT_DESCRIPTION =
  "Road and water transfers, safaris, cruises, houseboats and tailor-made journeys across Zimbabwe, Zambia, Botswana and Namibia. A Victoria Falls company established in 2013.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Beneath Africa Travel & Tours | Victoria Falls, Zimbabwe",
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: "Beneath Africa Travel & Tours | Victoria Falls, Zimbabwe",
    description: DEFAULT_DESCRIPTION,
    url: `${SITE_URL}/`,
    images: [{ url: DEFAULT_OG_IMAGE, alt: DEFAULT_OG_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beneath Africa Travel & Tours | Victoria Falls, Zimbabwe",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: company.tradingName,
      alternateName: company.shortName,
      legalName: company.registeredName,
      registrationNumber: company.registrationNumber,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/image-library/New%20Beneath%20Logo.png`,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      telephone: "+263778130264",
      email: company.emails[1].label,
      foundingDate: String(company.established),
      award: `${company.award.title}, ${company.award.event} ${company.award.year}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.addressLines[0],
        addressLocality: company.addressLines[2],
        addressCountry: "ZW",
      },
      areaServed: ["Zimbabwe", "Zambia", "Botswana", "Namibia"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "reservations",
          telephone: "+263778130264",
          email: company.emails[1].label,
          availableLanguage: "English",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: company.shortName,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${ebGaramond.variable} ${raleway.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteHeader />
        <MotionShell>{children}</MotionShell>
      </body>
    </html>
  );
}

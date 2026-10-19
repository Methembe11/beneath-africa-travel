"use client";

import CardGrid from "./CardGrid";
import PageCta from "./PageCta";
import SiteFooter from "./SiteFooter";
import PageHero from "./PageHero";
import type { CardLink } from "../lib/content";

type ListingPageProps = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    image: string;
    imageAlt: string;
  };
  eyebrow: string;
  heading: string;
  intro: string;
  label: string;
  items: CardLink[];
};

export default function ListingPage({
  hero,
  eyebrow,
  heading,
  intro,
  label,
  items,
}: ListingPageProps) {
  return (
    <main>
      <PageHero {...hero} />

      <CardGrid
        items={items}
        label={label}
        eyebrow={eyebrow}
        heading={heading}
        intro={intro}
        tone="surface"
      />

      <PageCta />
      <SiteFooter />
    </main>
  );
}
import type { MetadataRoute } from "next";
import {
  aboutPages,
  destinations,
  experiences,
  travelServices,
} from "./lib/content";

const BASE = "https://beneathafricatravel.co.zw";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

/* The activity pages are the ones most likely to be searched for by
   name ("sunset cruise victoria falls"), so they are listed ahead
   of the broader experience pages rather than after them. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{
    url: string;
    changeFrequency: ChangeFrequency;
    priority: number;
  }> = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/experiences`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/destinations`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/travel`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.7 },
    {
      url: `${BASE}/educational-trips`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const detail = (
    path: string,
    slug: string,
    priority: number,
  ): MetadataRoute.Sitemap[number] => ({
    url: `${BASE}${path}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });

  return [
    ...staticRoutes.map((route) => ({ ...route, lastModified: now })),
    ...experiences.map((page) => detail("/experiences", page.slug, 0.7)),
    ...destinations.map((page) => detail("/destinations", page.slug, 0.7)),
    ...travelServices.map((page) => detail("/travel", page.slug, 0.6)),
    ...aboutPages.map((page) => detail("/about", page.slug, 0.4)),
  ];
}
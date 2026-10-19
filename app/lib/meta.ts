import type { Metadata } from "next";

export const SITE_URL = "https://beneathafricatravel.co.zw";
export const SITE_NAME = "Beneath Africa Travel & Tours";
export const SITE_LOCALE = "en_ZW";

export const DEFAULT_OG_IMAGE = "/brand/og-cover.jpg";
export const DEFAULT_OG_ALT =
  "Golden light over the African bush, with the Beneath Africa Travel & Tours mark.";

type PageMetaInput = {
  /** Route path, e.g. "/" or "/contact" */
  path: string;
  title: string;
  description?: string;
  /** Absolute path to the social share image. Defaults to the site cover image. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

/**
 * Canonical + Open Graph + Twitter metadata for one route.
 * Titles and descriptions must match what is already published on the site.
 */
export function pageMeta({
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_ALT,
  type = "website",
}: PageMetaInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const images = [{ url: image, alt: imageAlt }];

  return {
    title,
    alternates: { canonical: url },
    ...(description ? { description } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

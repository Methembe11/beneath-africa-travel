import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InteriorPage from "../../components/InteriorPage";
import { pageMeta } from "../../lib/meta";
import { findPage, travelServices } from "../../lib/content";

type TravelProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return travelServices.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: TravelProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(travelServices, slug);

  if (!page) {
    return {};
  }

  return pageMeta({
    path: `/travel/${page.slug}`,
    title: `${page.navTitle} | Beneath Africa Travel & Tours`,
    description: page.metaDescription,
    image: page.image,
    imageAlt: page.imageAlt,
    type: "article",
  });
}

export default async function TravelServicePage({ params }: TravelProps) {
  const { slug } = await params;
  const page = findPage(travelServices, slug);

  if (!page) {
    notFound();
  }

  return <InteriorPage page={page} />;
}
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InteriorPage from "../../components/InteriorPage";
import { pageMeta } from "../../lib/meta";
import { destinations, findPage } from "../../lib/content";

type DestinationProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return destinations.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: DestinationProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(destinations, slug);

  if (!page) {
    return {};
  }

  return pageMeta({
    path: `/destinations/${page.slug}`,
    title: `${page.navTitle} | Beneath Africa Travel & Tours`,
    description: page.metaDescription,
    image: page.image,
    imageAlt: page.imageAlt,
    type: "article",
  });
}

export default async function DestinationPage({ params }: DestinationProps) {
  const { slug } = await params;
  const page = findPage(destinations, slug);

  if (!page) {
    notFound();
  }

  return <InteriorPage page={page} />;
}
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InteriorPage from "../../components/InteriorPage";
import { pageMeta } from "../../lib/meta";
import {
  bookableItems,
  findItem,
  itemPageData,
} from "../../lib/catalogue";

type ActivityProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return bookableItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ActivityProps): Promise<Metadata> {
  const { slug } = await params;
  const item = findItem(slug);

  if (!item) {
    return {};
  }

  return pageMeta({
    path: `/activities/${item.slug}`,
    title: `${item.title} | Beneath Africa Travel & Tours`,
    description: item.summary,
    image: item.image,
    imageAlt: item.imageAlt,
    type: "article",
  });
}

export default async function ActivityPage({ params }: ActivityProps) {
  const { slug } = await params;
  const item = findItem(slug);

  if (!item) {
    notFound();
  }

  return <InteriorPage page={itemPageData(item)} enquirySlug={item.slug} />;
}

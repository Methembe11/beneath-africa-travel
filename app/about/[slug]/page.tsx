import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InteriorPage from "../../components/InteriorPage";
import { pageMeta } from "../../lib/meta";
import { aboutPages, findPage } from "../../lib/content";

type AboutProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return aboutPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: AboutProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(aboutPages, slug);

  if (!page) {
    return {};
  }

  return pageMeta({
    path: `/about/${page.slug}`,
    title: `${page.navTitle} | Beneath Africa Travel & Tours`,
    description: page.metaDescription,
    image: page.image,
    imageAlt: page.imageAlt,
    type: "article",
  });
}

export default async function AboutDetailPage({ params }: AboutProps) {
  const { slug } = await params;
  const page = findPage(aboutPages, slug);

  if (!page) {
    notFound();
  }

  return <InteriorPage page={page} />;
}
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InteriorPage from "../../components/InteriorPage";
import { pageMeta } from "../../lib/meta";
import { experiences, findPage } from "../../lib/content";

type ExperienceProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return experiences.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: ExperienceProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(experiences, slug);

  if (!page) {
    return {};
  }

  return pageMeta({
    path: `/experiences/${page.slug}`,
    title: `${page.navTitle} | Beneath Africa Travel & Tours`,
    description: page.metaDescription,
    image: page.image,
    imageAlt: page.imageAlt,
    type: "article",
  });
}

export default async function ExperiencePage({ params }: ExperienceProps) {
  const { slug } = await params;
  const page = findPage(experiences, slug);

  if (!page) {
    notFound();
  }

  return <InteriorPage page={page} />;
}
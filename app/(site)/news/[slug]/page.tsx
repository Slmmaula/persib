import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ShareButtons } from "@/components/sections/share-buttons";
import { NewsCard } from "@/components/ui/news-card";
import { SectionHeader } from "@/components/ui/section-header";
import { newsArticles, newsCategoryLabels } from "@/data/news";
import { formatDate } from "@/lib/format";
import { findArticle, getRelated } from "@/lib/news";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

function ArticleSkeleton() {
  return (
    <div className="container-page pb-16 pt-header md:pb-24" aria-hidden="true">
      <div className="mt-6 h-4 w-40 bg-glass" />
      <div className="mt-6 h-12 max-w-3xl bg-glass" />
      <div className="mt-10 aspect-[8/5] max-w-4xl bg-glass" />
    </div>
  );
}

async function ArticleContent({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const related = getRelated(article);

  return (
    <div className="container-page pb-16 pt-header md:pb-24">
      <article>
        <Link
          href="/news"
          className="inline-flex min-h-11 items-center gap-2 text-label font-bold uppercase tracking-label transition-colors duration-(--duration-fast) hover:text-accent"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Kembali
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="text-label font-bold uppercase tracking-label text-muted">
            {newsCategoryLabels[article.category]} ·{" "}
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
          <h1 className="mt-4 font-heading text-section font-semibold">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">{article.excerpt}</p>
        </header>

        <div className="relative mt-10 aspect-[8/5] max-w-4xl overflow-hidden">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 max-w-3xl space-y-6">
          {article.body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-white/85">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-3 border-t border-glass-border pt-6">
          <p className="text-label font-bold uppercase tracking-label text-muted">
            Bagikan
          </p>
          <ShareButtons title={article.title} />
        </div>
      </article>

      <section
        aria-label="Berita terkait"
        className="mt-16 border-t border-glass-border pt-12"
      >
        <SectionHeader
          title="Berita Terkait"
          action={{ label: "Lihat semua", href: "/news" }}
        />
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <NewsCard key={item.slug} article={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function NewsArticlePage({ params }: PageProps) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

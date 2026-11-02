import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { newsCategoryLabels } from "@/data/news";
import { formatDate } from "@/lib/format";
import type { NewsArticle } from "@/lib/types";

export function NewsHero({ article }: { article: NewsArticle }) {
  return (
    <article className="group relative grid bg-glass lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div className="relative aspect-[8/5] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
        <Image
          src={article.image}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition-transform duration-(--duration-slow) ease-brand group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-end gap-4 p-6 sm:p-8 lg:p-10">
        <Badge className="self-start">Berita utama</Badge>
        <p className="text-label font-bold uppercase tracking-label text-muted">
          {newsCategoryLabels[article.category]} ·{" "}
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
        <h2 className="font-heading text-given font-semibold">
          <Link
            href={`/news/${article.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {article.title}
          </Link>
        </h2>
        <p className="text-base leading-7 text-muted">{article.excerpt}</p>
        <span
          aria-hidden="true"
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-(--duration-fast) group-hover:text-accent"
        >
          Baca selengkapnya
          <ChevronRight className="size-4" />
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-(--duration-base) ease-brand group-focus-within:scale-x-100 group-hover:scale-x-100"
      />
    </article>
  );
}

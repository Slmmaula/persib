import Image from "next/image";
import Link from "next/link";
import { newsCategoryLabels } from "@/data/news";
import { formatDate } from "@/lib/format";
import type { NewsArticle } from "@/lib/types";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group relative pb-5">
      <Link href={`/news/${article.slug}`} className="block">
        <div className="relative aspect-[8/5] overflow-hidden">
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-(--duration-slow) ease-brand group-hover:scale-105"
          />
        </div>
        <div className="pt-5">
          <p className="text-label font-bold uppercase tracking-label text-muted">
            {newsCategoryLabels[article.category]}
          </p>
          <h3 className="mt-3 line-clamp-3 font-heading text-card-title font-semibold">
            {article.title}
          </h3>
          <time
            dateTime={article.date}
            className="mt-3 block text-sm text-muted"
          >
            {formatDate(article.date)}
          </time>
        </div>
      </Link>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-(--duration-base) ease-brand group-focus-within:scale-x-100 group-hover:scale-x-100"
      />
    </article>
  );
}

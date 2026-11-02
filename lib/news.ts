import { newsArticles } from "@/data/news";
import type { NewsArticle } from "@/lib/types";

export const sortedArticles: readonly NewsArticle[] = [...newsArticles].sort(
  (a, b) => b.date.localeCompare(a.date),
);

export function findArticle(slug: string): NewsArticle | undefined {
  return sortedArticles.find((article) => article.slug === slug);
}

export function getHeroArticle(): NewsArticle {
  return (
    sortedArticles.find((article) => article.featured) ?? sortedArticles[0]
  );
}

export function getListArticles(hero: NewsArticle): NewsArticle[] {
  return sortedArticles.filter((article) => article.slug !== hero.slug);
}

export function getRelated(article: NewsArticle, limit = 3): NewsArticle[] {
  const others = sortedArticles.filter((item) => item.slug !== article.slug);
  const sameCategory = others.filter(
    (item) => item.category === article.category,
  );
  const rest = others.filter((item) => item.category !== article.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

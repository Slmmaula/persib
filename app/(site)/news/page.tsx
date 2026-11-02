import { NewsHero } from "@/components/sections/news-hero";
import { NewsView } from "@/components/sections/news-view";
import { getHeroArticle, getListArticles } from "@/lib/news";

export const metadata = { title: "Berita" };

export default function NewsPage() {
  const hero = getHeroArticle();

  return (
    <div className="container-page pb-16 pt-header md:pb-24">
      <h1 className="sr-only">Berita</h1>
      <NewsHero article={hero} />
      <NewsView articles={getListArticles(hero)} />
    </div>
  );
}

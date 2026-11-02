import { NewsCard } from "@/components/ui/news-card";
import { SectionHeader } from "@/components/ui/section-header";
import { newsArticles } from "@/data/news";

export function FeaturedNews() {
  const featured = newsArticles
    .filter((article) => article.featured)
    .slice(0, 3);

  return (
    <section
      aria-label="Berita Pilihan"
      className="container-page py-16 md:py-24"
    >
      <SectionHeader
        title="Berita Terbaru"
        action={{ label: "Lihat semua", href: "/news" }}
      />
      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

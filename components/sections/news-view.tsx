"use client";

import { useRef, useState } from "react";
import { NewsCard } from "@/components/ui/news-card";
import { Pagination } from "@/components/ui/pagination";
import { PillFilter, type PillOption } from "@/components/ui/pill-filter";
import { newsCategoryLabels } from "@/data/news";
import type { NewsArticle, NewsCategory } from "@/lib/types";

type Filter = "all" | NewsCategory;

const PAGE_SIZE = 6;

const filterOptions: readonly PillOption<Filter>[] = [
  { value: "all", label: "Semua" },
  { value: "match-report", label: newsCategoryLabels["match-report"] },
  { value: "club", label: newsCategoryLabels.club },
  { value: "academy", label: newsCategoryLabels.academy },
  { value: "community", label: newsCategoryLabels.community },
];

export function NewsView({ articles }: { articles: readonly NewsArticle[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered =
    filter === "all"
      ? articles
      : articles.filter((article) => article.category === filter);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changeFilter(next: Filter) {
    setFilter(next);
    setPage(1);
  }

  function changePage(next: number) {
    setPage(next);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    sectionRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Daftar berita"
      className="mt-12 scroll-mt-24 md:mt-16"
    >
      <PillFilter
        scrollable
        ariaLabel="Filter kategori berita"
        options={filterOptions}
        value={filter}
        onChange={changeFilter}
      />

      {shown.length === 0 ? (
        <p className="mt-10 text-muted">Belum ada berita di kategori ini.</p>
      ) : (
        <div
          key={`${filter}-${page}`}
          className="mt-8 grid animate-page-enter gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {shown.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        pageCount={pageCount}
        onChange={changePage}
        ariaLabel="Halaman berita"
        className="mt-12"
      />
    </section>
  );
}

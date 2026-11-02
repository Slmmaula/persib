"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  ariaLabel: string;
  className?: string;
}

type Item = number | "gap";

function getItems(page: number, pageCount: number): Item[] {
  const numbers = new Set<number>([1, pageCount]);
  for (let n = page - 1; n <= page + 1; n++) {
    if (n > 1 && n < pageCount) numbers.add(n);
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const items: Item[] = [];
  sorted.forEach((n, index) => {
    if (index > 0) {
      const difference = n - sorted[index - 1];
      if (difference === 2) items.push(n - 1);
      else if (difference > 2) items.push("gap");
    }
    items.push(n);
  });
  return items;
}

const baseClass =
  "inline-flex size-11 items-center justify-center rounded-pill text-sm font-bold transition-colors duration-(--duration-fast)";
const idleClass = "border border-glass-border hover:bg-glass-hover";

export function Pagination({
  page,
  pageCount,
  onChange,
  ariaLabel,
  className,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const items = getItems(page, pageCount);

  return (
    <nav
      aria-label={ariaLabel}
      className={cn("flex items-center justify-center gap-2", className)}
    >
      <button
        type="button"
        aria-label="Halaman sebelumnya"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={cn(
          baseClass,
          idleClass,
          "disabled:opacity-40 disabled:hover:bg-transparent",
        )}
      >
        <ChevronLeft aria-hidden className="size-5" />
      </button>

      <ul className="flex items-center gap-2">
        {items.map((item, index) =>
          item === "gap" ? (
            <li
              key={`gap-${index}`}
              aria-hidden="true"
              className="px-1 text-muted"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                aria-label={`Halaman ${item}`}
                aria-current={item === page ? "page" : undefined}
                onClick={() => onChange(item)}
                className={cn(
                  baseClass,
                  item === page ? "bg-accent text-on-accent" : idleClass,
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        aria-label="Halaman berikutnya"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        className={cn(
          baseClass,
          idleClass,
          "disabled:opacity-40 disabled:hover:bg-transparent",
        )}
      >
        <ChevronRight aria-hidden className="size-5" />
      </button>
    </nav>
  );
}

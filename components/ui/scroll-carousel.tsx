"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface ScrollCarouselProps {
  ariaLabel: string;
  children: ReactNode;
  /** Kelas layout untuk layar lebar, saat carousel berubah jadi grid. */
  desktopClassName?: string;
  /** Tampilkan tombol panah (tablet / desktop kecil). */
  arrows?: boolean;
}

const arrowButton =
  "grid size-9 cursor-pointer place-items-center rounded-full border border-glass-border bg-surface-panel text-white transition duration-(--duration-fast) ease-brand hover:border-white/30 disabled:cursor-default disabled:opacity-40 disabled:hover:border-glass-border";

export function ScrollCarousel({
  ariaLabel,
  children,
  desktopClassName = "xl:grid xl:snap-none xl:grid-cols-5 xl:overflow-visible",
  arrows = true,
}: ScrollCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  function scrollByPage(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={scrollerRef}
        role="group"
        aria-label={ariaLabel}
        onScroll={update}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${desktopClassName}`}
      >
        {children}
      </div>

      {arrows ? (
        <div className="mt-4 hidden justify-end gap-2 md:flex xl:hidden">
          <button
            type="button"
            aria-label="Paket sebelumnya"
            disabled={!canPrev}
            onClick={() => scrollByPage(-1)}
            className={arrowButton}
          >
            <ChevronLeft aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Paket berikutnya"
            disabled={!canNext}
            onClick={() => scrollByPage(1)}
            className={arrowButton}
          >
            <ChevronRight aria-hidden className="size-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { clubs } from "@/data/clubs";
import { matches } from "@/data/matches";
import { formatDate } from "@/lib/format";
import type { Club } from "@/lib/types";

const upcoming = matches
  .filter((match) => match.status === "upcoming")
  .slice(0, 6);

const arrowClass =
  "inline-flex size-11 items-center justify-center text-white transition-opacity duration-(--duration-fast) disabled:opacity-30";

function ClubColumn({ club }: { club: Club }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={club.badge}
        alt=""
        width={52}
        height={62}
        className="h-12 w-auto xl:h-[max(2.5rem,3.2vw)]"
      />
      <p className="text-micro font-semibold leading-tight">{club.name}</p>
    </div>
  );
}

export function SoonMatches() {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const [edges, setEdges] = useState({ start: true, end: false });

  function update() {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      start: track.scrollLeft <= 2,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
    });
  }

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-label font-bold uppercase tracking-label text-muted">
          Pertandingan Selanjutnya
        </p>
        <div className="-my-3 flex">
          <button
            type="button"
            aria-label="Pertandingan sebelumnya"
            disabled={edges.start}
            onClick={() => scrollByCard(-1)}
            className={arrowClass}
          >
            <ChevronLeft aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Pertandingan berikutnya"
            disabled={edges.end}
            onClick={() => scrollByCard(1)}
            className={arrowClass}
          >
            <ChevronRight aria-hidden className="size-4" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={update}
        aria-label="Pertandingan mendatang"
        className="mt-3 flex snap-x snap-mandatory gap-[var(--gap)] overflow-x-auto [--gap:1rem] [scrollbar-width:none] xl:mt-[0.4vw] xl:[--gap:2.24vw] [&::-webkit-scrollbar]:hidden"
      >
        {upcoming.map((match) => (
          <li
            key={match.id}
            className="shrink-0 basis-full snap-start md:basis-[calc((100%-var(--gap))/2)]"
          >
            <GlassPanel
              variant="outline"
              className="flex h-full flex-col items-center px-4 py-5 xl:min-h-[9.8vw] xl:py-[1.5vw]"
            >
              <p className="text-micro font-semibold uppercase tracking-label text-muted">
                {formatDate(match.date, "day-month")}
              </p>
              <div className="mt-4 grid w-full grid-cols-[1fr_auto_1fr] items-start gap-2 text-center">
                <ClubColumn club={clubs[match.homeId]} />
                <div className="pt-2">
                  <p className="font-heading text-2xl font-medium">
                    {match.kickoff}
                  </p>
                  <p className="mt-2 text-micro font-semibold uppercase tracking-label text-muted">
                    {match.competition}
                  </p>
                </div>
                <ClubColumn club={clubs[match.awayId]} />
              </div>
            </GlassPanel>
          </li>
        ))}
      </ul>
    </div>
  );
}

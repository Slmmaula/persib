"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { getClub } from "@/data/clubs";
import { formatDate } from "@/lib/format";
import { getNextMatch } from "@/lib/match-utils";
import type { Club } from "@/lib/types";

const BACKGROUND = "/brand/next-match-bg.jpg";
const WIB_OFFSET = "+07:00";
const units = ["Hari", "Jam", "Menit", "Detik"] as const;

const next = getNextMatch();
const kickoffIso = `${next.date}T${next.kickoff}:00${WIB_OFFSET}`;
const kickoffSeconds = Math.floor(new Date(kickoffIso).getTime() / 1000);

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => null;

function getParts(nowSeconds: number | null): string[] {
  if (nowSeconds === null) return ["--", "--", "--", "--"];
  const total = Math.max(0, kickoffSeconds - nowSeconds);
  const parts = [
    Math.floor(total / 86400),
    Math.floor((total % 86400) / 3600),
    Math.floor((total % 3600) / 60),
    total % 60,
  ];
  return parts.map((value) => String(value).padStart(2, "0"));
}

function ClubBlock({ club }: { club: Club }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-4 text-center">
      <Image
        src={club.badge}
        alt=""
        width={128}
        height={128}
        className="size-20 object-contain sm:size-28 lg:size-32"
      />
      <p className="font-display text-xl uppercase leading-tight sm:text-3xl lg:text-4xl">
        {club.name}
      </p>
    </div>
  );
}

export function NextMatch() {
  const nowSeconds = useSyncExternalStore<number | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const parts = getParts(nowSeconds);

  return (
    <section
      aria-label="Pertandingan berikutnya"
      className="relative isolate overflow-hidden pb-14 pt-[calc(var(--spacing-header)+1rem)] sm:pb-16"
    >
      <Image
        src={BACKGROUND}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-canvas-edge/80"
      />

      <div className="container-page flex flex-col items-center text-center">
        <p className="text-label font-bold uppercase tracking-label text-muted">
          {next.competition}
          {next.round ? ` · ${next.round}` : ""}
        </p>

        <div className="mt-8 grid w-full max-w-4xl grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
          <ClubBlock club={getClub(next.homeId)} />
          <span
            aria-hidden="true"
            className="inline-block -skew-x-12 font-display text-5xl leading-none text-muted sm:text-7xl"
          >
            VS
          </span>
          <ClubBlock club={getClub(next.awayId)} />
        </div>

        <p className="mt-8 rounded-pill border border-glass-border bg-canvas-edge/60 px-5 py-2 text-sm font-semibold">
          <time dateTime={kickoffIso}>
            {formatDate(next.date, "weekday")} · {next.kickoff} WIB
          </time>
        </p>

        <div
          role="timer"
          aria-label="Hitung mundur menuju kick-off"
          className="mt-6 flex gap-3 sm:gap-4"
        >
          {units.map((unit, index) => (
            <div
              key={unit}
              className="w-16 rounded-md border border-glass-border bg-canvas-edge/60 py-3 sm:w-20"
            >
              <p className="font-display text-4xl leading-none sm:text-5xl">
                {parts[index]}
              </p>
              <p className="mt-1 text-micro uppercase tracking-label text-muted">
                {unit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getClub } from "@/data/clubs";
import { formatDate } from "@/lib/format";
import type { Club, Match } from "@/lib/types";

function ClubColumn({ club }: { club: Club }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-3 text-center">
      <div className="grid size-20 place-items-center sm:size-24">
        <Image
          src={club.badge}
          alt=""
          width={64}
          height={64}
          className="size-12 object-contain sm:size-14"
        />
      </div>
      <p className="line-clamp-2 min-h-10 font-heading text-sm font-bold uppercase leading-5">
        {club.name}
      </p>
    </div>
  );
}

export function MatchCard({ match }: { match: Match }) {
  const home = getClub(match.homeId);
  const away = getClub(match.awayId);
  const { score } = match;

  return (
    <article
      aria-label={`${home.name} vs ${away.name}, ${formatDate(match.date)}`}
      className="flex flex-col rounded-panel border border-glass-border bg-surface-panel p-5 transition duration-(--duration-base) ease-brand hover:-translate-y-1 hover:border-white/30 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-label font-bold uppercase tracking-label text-accent">
          <span
            aria-hidden="true"
            className="h-4 w-1.5 shrink-0 rounded-pill bg-accent"
          />
          {match.competition}
          {match.round ? ` · ${match.round}` : ""}
        </p>
        {score ? (
          <p className="shrink-0 text-label font-bold uppercase tracking-label text-muted">
            Full Time
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-start gap-3">
        <ClubColumn club={home} />
        {/* Tinggi kolom tengah = tinggi kotak logo, jadi VS / skor / jam sejajar tengah dengan logo */}
        <div className="flex h-20 flex-col items-center justify-center text-center sm:h-24">
          {score ? (
            <p
              aria-label={`Skor ${score.home} lawan ${score.away}`}
              className="font-display text-5xl leading-none sm:text-6xl"
            >
              {score.home}
              <span className="px-2 text-muted">-</span>
              {score.away}
            </p>
          ) : (
            <>
              <span className="font-display text-2xl leading-none text-muted sm:text-3xl">
                VS
              </span>
              <p className="mt-2 rounded-pill bg-glass-hover px-2.5 py-0.5 text-micro font-semibold">
                {match.kickoff} WIB
              </p>
            </>
          )}
        </div>
        <ClubColumn club={away} />
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        <time dateTime={match.date}>{formatDate(match.date, "weekday")}</time>
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-glass-border pt-4">
        <p className="flex min-w-0 items-center gap-2 text-sm text-muted">
          <MapPin aria-hidden className="size-4 shrink-0" />
          <span>{match.stadium}</span>
        </p>
        {score && match.reportSlug ? (
          <Link
            href={`/news/${match.reportSlug}`}
            className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold transition-colors duration-(--duration-fast) hover:text-accent"
          >
            Match Report
            <ChevronRight aria-hidden className="size-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

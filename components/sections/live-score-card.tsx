import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { clubs } from "@/data/clubs";
import type { Club, LiveMatch } from "@/lib/types";

function ClubColumn({ club }: { club: Club }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Image
        src={club.badge}
        alt=""
        width={52}
        height={62}
        className="h-[3.875rem] w-auto"
      />
      <p className="text-label font-semibold leading-4">{club.name}</p>
    </div>
  );
}

export function LiveScoreCard({ match }: { match: LiveMatch }) {
  const home = clubs[match.homeId];
  const away = clubs[match.awayId];
  const progress = Math.min(100, Math.round((match.minute / 90) * 100));

  return (
    <section
      aria-label="Skor langsung"
      className="relative bg-score-surface px-4 pb-9 pt-8 sm:px-6"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
        <ClubColumn club={home} />
        <div className="flex flex-col items-center">
          <Badge>Live Report</Badge>
          <p
            className="mt-3 font-heading text-2xl font-bold"
            aria-label={`Skor ${home.name} ${match.homeScore}, ${away.name} ${match.awayScore}`}
          >
            {match.homeScore} : {match.awayScore}
          </p>
          <p className="mt-3 text-micro font-semibold uppercase tracking-label text-muted">
            {match.competition}
          </p>
        </div>
        <ClubColumn club={away} />
      </div>

      <div
        role="progressbar"
        aria-label="Menit pertandingan"
        aria-valuemin={0}
        aria-valuemax={90}
        aria-valuenow={match.minute}
        className="absolute inset-x-0 bottom-0 h-0.5 bg-ring-track"
      >
        <div className="h-full bg-white" style={{ width: `${progress}%` }} />
        <span
          className="absolute top-1/2 -translate-x-full -translate-y-1/2 whitespace-nowrap bg-white px-1.5 py-0.5 text-micro font-bold text-on-accent"
          style={{ left: `${progress}%` }}
        >
          {match.minute} menit
        </span>
      </div>
    </section>
  );
}

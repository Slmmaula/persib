import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { clubs } from "@/data/clubs";
import { formatDate } from "@/lib/format";
import { getNextMatch } from "@/lib/match-utils";
import type { Club } from "@/lib/types";

const countdown = [
  { value: "00", unit: "H" },
  { value: "07", unit: "J" },
  { value: "34", unit: "M" },
  { value: "37", unit: "D" },
];

function TeamColumn({ club }: { club: Club }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={club.badge}
        alt=""
        width={52}
        height={62}
        className="h-16 w-auto"
      />
      <p className="text-micro text-muted">{club.name}</p>
    </div>
  );
}

export function PhoneMockup() {
  const next = getNextMatch();

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[23rem] w-[min(21.875rem,80vw)] overflow-hidden rounded-t-[2.75rem] border-[3px] border-b-0 border-white bg-white/10 px-5 pt-5 text-left shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-1 text-sm font-semibold">
        <span>9:41</span>
        <CalendarDays className="size-5" />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <ChevronLeft className="size-4" />
        <div className="text-center">
          <p className="text-label font-bold">{next.competition}</p>
          <p className="text-micro text-muted">{next.stadium}</p>
        </div>
        <ChevronRight className="size-4" />
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
        <TeamColumn club={clubs[next.homeId]} />
        <span className="text-micro font-bold">VS</span>
        <TeamColumn club={clubs[next.awayId]} />
      </div>

      <div className="mt-6 rounded-md border border-white/10 bg-black/20 px-3 py-3 text-center backdrop-blur-sm">
        <p className="text-micro">
          {formatDate(next.date, "weekday")} · {next.kickoff}
        </p>
        <p className="mt-2 flex items-baseline justify-center gap-2 font-heading text-2xl font-bold text-accent">
          {countdown.map((part, index) => (
            <span key={part.unit} className="inline-flex items-baseline gap-1">
              {index > 0 ? <span className="text-white">:</span> : null}
              {part.value}
              <span className="text-micro font-semibold text-white">
                {part.unit}
              </span>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

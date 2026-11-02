import {
  ArrowLeftRight,
  CircleDot,
  RectangleVertical,
  type LucideIcon,
} from "lucide-react";
import type { MatchEvent, MatchEventType } from "@/lib/types";
import { cn } from "@/lib/utils";

const icons: Record<MatchEventType, { Icon: LucideIcon; className?: string }> =
  {
    goal: { Icon: CircleDot },
    "yellow-card": {
      Icon: RectangleVertical,
      className: "fill-accent text-accent",
    },
    "red-card": { Icon: RectangleVertical },
    substitution: { Icon: ArrowLeftRight },
  };

const labels: Record<MatchEventType, string> = {
  goal: "Gol",
  "yellow-card": "Kartu kuning",
  "red-card": "Kartu merah",
  substitution: "Pergantian pemain",
};

interface TimelineEventProps {
  event: MatchEvent;
  active?: boolean;
}

export function TimelineEvent({ event, active = false }: TimelineEventProps) {
  const { Icon, className } = icons[event.type];

  return (
    <li
      className={cn(
        "relative grid grid-cols-[1rem_1.75rem_1fr] items-start gap-x-3 py-3 pl-[2.375rem]",
        active &&
          "before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-white before:content-['']",
      )}
    >
      <Icon aria-hidden className={cn("mt-0.5 size-4", className)} />
      <span className="text-base font-semibold leading-5">
        {event.minute}&apos;
      </span>
      <p className="text-sm font-semibold leading-5">
        <span className="sr-only">{labels[event.type]}: </span>
        {event.text}
      </p>
    </li>
  );
}

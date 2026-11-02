import { TimelineEvent } from "@/components/ui/timeline-event";
import type { MatchEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MatchTimelineProps {
  events: readonly MatchEvent[];
  className?: string;
}

export function MatchTimeline({ events, className }: MatchTimelineProps) {
  return (
    <ol
      aria-label="Peristiwa pertandingan"
      className={cn(
        "relative flex flex-col gap-[1.375rem] overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-glass-border before:content-[''] [mask-image:linear-gradient(to_bottom,var(--color-white)_45%,transparent_100%)]",
        className,
      )}
    >
      {events.map((event, index) => (
        <TimelineEvent key={event.id} event={event} active={index === 0} />
      ))}
    </ol>
  );
}

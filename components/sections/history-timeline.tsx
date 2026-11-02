import { Flag, Trophy } from "lucide-react";
import { TodoChip } from "@/components/ui/todo-chip";
import { milestones } from "@/data/about";

export function HistoryTimeline() {
  return (
    <section aria-labelledby="history-title" className="mt-16 md:mt-24">
      <h2 id="history-title" className="font-semibold text-section">
        Sejarah
      </h2>
      <ol className="mt-10 max-w-3xl">
        {milestones.map((milestone, index) => {
          const Icon = milestone.kind === "founding" ? Flag : Trophy;
          const last = index === milestones.length - 1;

          return (
            <li
              key={milestone.id}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 sm:gap-x-6"
            >
              <div className="flex flex-col items-center">
                <span className="grid size-10 shrink-0 place-items-center rounded-pill bg-blue-number">
                  <Icon aria-hidden className="size-5" />
                </span>
                {last ? null : (
                  <span
                    aria-hidden="true"
                    className="mt-1 w-px flex-1 bg-glass-border"
                  />
                )}
              </div>
              <div className={last ? undefined : "pb-10"}>
                <p className="font-heading text-ring font-semibold leading-10">
                  {milestone.year}
                </p>
                <p className="mt-1 text-base leading-7 text-white/85">
                  {milestone.text}
                </p>
                {milestone.todo ? <TodoChip className="mt-3" /> : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

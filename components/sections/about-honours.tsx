import { Award, Medal, Shield, Trophy, type LucideIcon } from "lucide-react";
import { TodoChip } from "@/components/ui/todo-chip";
import { honours } from "@/data/about";
import type { HonourIcon } from "@/lib/types";

const icons: Record<HonourIcon, LucideIcon> = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
  shield: Shield,
};

export function AboutHonours() {
  return (
    <section aria-labelledby="honours-title" className="mt-16 md:mt-24">
      <h2 id="honours-title" className="font-semibold text-section">
        Gelar Juara
      </h2>
      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
        {honours.map((honour) => {
          const Icon = icons[honour.icon];
          return (
            <li
              key={honour.id}
              className="flex flex-col items-center text-center"
            >
              <div className="relative flex h-36 w-full items-center justify-center border border-glass-border">
                <Icon aria-hidden className="size-12" />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-1/2 grid size-9 -translate-x-1/2 translate-y-1/2 place-items-center rounded-pill border border-glass-border bg-canvas-mid text-sm font-semibold"
                >
                  {honour.count ?? "?"}
                </span>
              </div>
              <p className="mt-8 font-heading text-base font-semibold">
                {honour.title}
              </p>
              <p className="mt-1 text-sm text-muted">
                <span className="sr-only">
                  {honour.count === null
                    ? "Jumlah belum diverifikasi. "
                    : `${honour.count} gelar. `}
                </span>
                {honour.detail}
              </p>
              {honour.todo ? <TodoChip className="mt-3" /> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

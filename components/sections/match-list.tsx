import { MatchCard } from "@/components/ui/match-card";
import type { MonthGroup } from "@/lib/fixtures";

export function MatchList({ groups }: { groups: readonly MonthGroup[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {groups.flatMap((group) =>
        group.matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        )),
      )}
    </div>
  );
}

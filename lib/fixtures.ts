import { matches } from "@/data/matches";
import { formatDate } from "@/lib/format";
import type { Match } from "@/lib/types";

export interface MonthGroup {
  key: string;
  label: string;
  matches: Match[];
}

function groupByMonth(list: Match[]): MonthGroup[] {
  const months = new Map<string, Match[]>();
  for (const match of list) {
    const key = match.date.slice(0, 7);
    months.set(key, [...(months.get(key) ?? []), match]);
  }
  return [...months.entries()].map(([key, items]) => ({
    key,
    label: formatDate(`${key}-01`, "month-year"),
    matches: items,
  }));
}

const byDate = (a: Match, b: Match) =>
  `${a.date}${a.kickoff}`.localeCompare(`${b.date}${b.kickoff}`);

export const upcomingGroups = groupByMonth(
  matches.filter((match) => match.status === "upcoming").sort(byDate),
);

export const resultGroups = groupByMonth(
  matches
    .filter((match) => match.status === "result")
    .sort((a, b) => byDate(b, a)),
);

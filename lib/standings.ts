import type { StandingRow } from "@/lib/types";

export function getPoints(row: StandingRow): number {
  return row.won * 3 + row.drawn - (row.deduction ?? 0);
}

export function getGoalDifference(row: StandingRow): number {
  return row.goalsFor - row.goalsAgainst;
}

export function formatSigned(value: number): string {
  return value > 0 ? `+${value}` : String(value);
}

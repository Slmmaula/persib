import { clubs } from "@/data/clubs";
import { matches } from "@/data/matches";
import type { Club, Match } from "@/lib/types";

function required<T>(value: T | undefined, name: string): T {
  if (value === undefined) {
    throw new Error(`Data contoh tidak lengkap: ${name}`);
  }
  return value;
}

export function getLastResult(): Match {
  const results = matches
    .filter((match) => match.status === "result")
    .sort((a, b) => b.date.localeCompare(a.date));
  return required(results[0], "hasil pertandingan");
}

export function getNextMatch(): Match {
  const upcoming = matches
    .filter((match) => match.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  return required(upcoming[0], "pertandingan mendatang");
}

export function getOpponent(match: Match): Club {
  return clubs[match.homeId === "persib" ? match.awayId : match.homeId];
}

export function matchTitle(match: Match): string {
  return `${clubs[match.homeId].name} - ${clubs[match.awayId].name}`;
}

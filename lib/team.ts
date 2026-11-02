import { staff } from "@/data/management";
import { players } from "@/data/players";
import type { Player, PlayerPosition, StaffMember } from "@/lib/types";

export type TeamMode = "players" | "management";
export type PositionFilter = "all" | PlayerPosition;

export const positionLabels: Record<PlayerPosition, string> = {
  goalkeeper: "Penjaga gawang",
  defender: "Pemain belakang",
  midfielder: "Gelandang",
  forward: "Penyerang",
};

export interface TeamCardItem {
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  badge: string;
  label: string;
  subtitle?: string;
  photo: string;
  ariaLabel: string;
  position?: PlayerPosition;
}

function joinName(firstName: string, lastName: string): string {
  return [firstName, lastName].filter(Boolean).join(" ");
}

function initials(name: string): string {
  const words = name.split(" ").filter(Boolean);
  const letters =
    words.length > 1
      ? words[0][0] + words[words.length - 1][0]
      : name.slice(0, 2);
  return letters.toUpperCase();
}

export const playerItems: readonly TeamCardItem[] = players.map((player) => {
  const fullName = joinName(player.firstName, player.lastName);
  return {
    slug: player.slug,
    firstName: player.firstName,
    lastName: player.lastName,
    fullName,
    badge: String(player.number),
    label: positionLabels[player.position],
    photo: player.photo,
    position: player.position,
    ariaLabel: `${fullName}, nomor ${player.number}, ${positionLabels[player.position]}`,
  };
});

export const staffItems: readonly TeamCardItem[] = staff.map((member) => {
  const fullName = joinName(member.firstName, member.lastName);
  return {
    slug: member.slug,
    firstName: member.firstName,
    lastName: member.lastName,
    fullName,
    badge: initials(fullName),
    label: member.role,
    subtitle: member.tenure,
    photo: member.photo,
    ariaLabel: member.tenure
      ? `${fullName}, ${member.role}, ${member.tenure}`
      : `${fullName}, ${member.role}`,
  };
});

export type TeamEntry =
  | { kind: "player"; item: TeamCardItem; player: Player }
  | { kind: "staff"; item: TeamCardItem; member: StaffMember };

const entries = new Map<string, TeamEntry>();

players.forEach((player, index) => {
  entries.set(player.slug, {
    kind: "player",
    item: playerItems[index],
    player,
  });
});

staff.forEach((member, index) => {
  entries.set(member.slug, { kind: "staff", item: staffItems[index], member });
});

export function findEntry(slug: string | null): TeamEntry | undefined {
  return slug ? entries.get(slug) : undefined;
}

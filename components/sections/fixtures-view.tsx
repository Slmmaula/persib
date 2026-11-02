"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MatchList } from "@/components/sections/match-list";
import { NextMatch } from "@/components/sections/next-match";
import { StandingsTable } from "@/components/sections/standings-table";
import { CompetitionSelect } from "@/components/ui/competition-select";
import { PillFilter, type PillOption } from "@/components/ui/pill-filter";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { type MonthGroup, resultGroups, upcomingGroups } from "@/lib/fixtures";

type View = "fixtures" | "standings";
type Status = "all" | "upcoming" | "results";
type League = "super-league" | "acl-two" | "shopee-cup" | "ileague-cup";

const pageTitle = "Fixtures & Results";
const pageSubtitle =
  "Super League 2026/27 • ACL Two 2026/27 • Shopee Cup 2026/27 • ILeague Cup 2026/27";

const viewOptions: readonly PillOption<View>[] = [
  { value: "fixtures", label: "Fixtures & Results" },
  { value: "standings", label: "Standings" },
];

const statusOptions: readonly PillOption<Status>[] = [
  { value: "all", label: "All Fixtures" },
  { value: "upcoming", label: "Upcoming" },
  { value: "results", label: "Results" },
];

const leagueOptions: readonly PillOption<League>[] = [
  { value: "super-league", label: "BRI Super League 2026/2027" },
  { value: "acl-two", label: "AFC Champions League Two" },
  { value: "shopee-cup", label: "Shopee Cup" },
  { value: "ileague-cup", label: "ILeague Cup" },
];

// Nilai ini dicocokkan (tanpa membedakan huruf besar/kecil) dengan field
// `competition` di data pertandingan. Sesuaikan jika penulisan di datamu berbeda.
const leagueCompetition: Record<League, string> = {
  "super-league": "Super League",
  "acl-two": "ACL Two",
  "shopee-cup": "Shopee Cup",
  "ileague-cup": "ILeague Cup",
};

function filterGroups(
  groups: readonly MonthGroup[],
  league: League | null,
): readonly MonthGroup[] {
  if (!league) return groups;
  const target = leagueCompetition[league].toLowerCase();
  return groups
    .map((group) => ({
      ...group,
      matches: group.matches.filter((match) =>
        match.competition.toLowerCase().includes(target),
      ),
    }))
    .filter((group) => group.matches.length > 0);
}

const groupsByStatus: Record<Status, readonly MonthGroup[]> = {
  all: [...upcomingGroups],
  upcoming: upcomingGroups,
  results: resultGroups,
};

type Params = Pick<URLSearchParams, "get">;

// Link lama (?tab=jadwal | hasil | klasemen) tetap terbaca.
function parseView(params: Params): View {
  return params.get("view") === "standings" || params.get("tab") === "klasemen"
    ? "standings"
    : "fixtures";
}

function parseStatus(params: Params): Status {
  const legacy = params.get("tab");
  if (legacy === "jadwal") return "upcoming";
  if (legacy === "hasil") return "results";
  const status = params.get("status");
  return (
    statusOptions.find((option) => option.value === status)?.value ?? "all"
  );
}

function parseLeague(params: Params): League | null {
  const league = params.get("league");
  return leagueOptions.find((option) => option.value === league)?.value ?? null;
}

function syncUrl(view: View, status: Status, league: League | null) {
  const query = new URLSearchParams();
  if (view === "standings") {
    query.set("view", "standings");
  } else {
    if (status !== "all") query.set("status", status);
    if (league) query.set("league", league);
  }
  const search = query.toString();
  window.history.replaceState(
    null,
    "",
    search ? `/fixtures?${search}` : "/fixtures",
  );
}

export function FixturesView() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<View>(() => parseView(searchParams));
  const [status, setStatus] = useState<Status>(() => parseStatus(searchParams));
  const [league, setLeague] = useState<League | null>(() =>
    parseLeague(searchParams),
  );

  function changeView(next: View) {
    setView(next);
    syncUrl(next, status, league);
  }

  function changeStatus(next: Status) {
    setStatus(next);
    syncUrl(view, next, league);
  }

  function changeLeague(next: League | null) {
    setLeague(next);
    syncUrl(view, status, next);
  }

  const groups = filterGroups(groupsByStatus[status], league);

  return (
    <>
      <NextMatch />

      <div className="container-page pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="flex min-w-0 items-start gap-4">
            <span
              aria-hidden="true"
              className="mt-2 h-8 w-2.5 shrink-0 rounded-pill bg-accent md:mt-3 md:h-11"
            />
            <div className="min-w-0">
              <h1 className="font-display text-[length:clamp(2.25rem,5vw,4.5rem)] uppercase leading-none">
                {pageTitle}
              </h1>
              <p className="mt-2 text-label font-bold uppercase tracking-label text-muted">
                {pageSubtitle}
              </p>
            </div>
          </div>

          <SegmentedToggle
            className="w-full shrink-0 md:w-auto"
            ariaLabel="Pilih tampilan fixtures atau standings"
            options={viewOptions}
            value={view}
            onChange={changeView}
          />
        </div>

        <hr className="mt-8 border-glass-border md:mt-10" />

        {view === "fixtures" ? (
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <PillFilter
              className="shrink-0"
              ariaLabel="Filter pertandingan"
              options={statusOptions}
              value={status}
              onChange={changeStatus}
            />
            <CompetitionSelect
              label="League:"
              allLabel="All Leagues"
              ariaLabel="Filter kompetisi"
              options={leagueOptions}
              value={league}
              onChange={changeLeague}
            />
          </div>
        ) : null}

        <div
          key={`${view}-${status}-${league ?? "all"}`}
          className="mt-10 animate-page-enter md:mt-12"
        >
          {view === "standings" ? <StandingsTable /> : null}

          {view === "fixtures" ? (
            <>
              {groups.length > 0 ? (
                <MatchList groups={groups} />
              ) : (
                <p className="rounded-panel border border-glass-border bg-[#1c2472] px-6 py-12 text-center text-sm text-muted">
                  {league
                    ? "Belum ada pertandingan untuk kompetisi ini."
                    : "Belum ada pertandingan."}
                </p>
              )}
              <p className="mt-12 text-sm text-muted">
                Jadwal dapat berubah sewaktu-waktu.
              </p>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

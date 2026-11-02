"use client";

import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { PlayerDetail } from "@/components/sections/player-detail";
import { TeamCarousel } from "@/components/sections/team-carousel";
import { PillFilter, type PillOption } from "@/components/ui/pill-filter";
import {
  findEntry,
  playerItems,
  positionLabels,
  staffItems,
  type PositionFilter,
  type TeamCardItem,
  type TeamMode,
} from "@/lib/team";

const modeOptions: readonly PillOption<TeamMode>[] = [
  { value: "players", label: "Pemain" },
  { value: "management", label: "Manajemen" },
];

const positionOptions: readonly PillOption<PositionFilter>[] = [
  { value: "all", label: "Semua" },
  { value: "goalkeeper", label: positionLabels.goalkeeper },
  { value: "defender", label: positionLabels.defender },
  { value: "midfielder", label: positionLabels.midfielder },
  { value: "forward", label: positionLabels.forward },
];

function filterPlayers(position: PositionFilter): TeamCardItem[] {
  return playerItems.filter(
    (item) => position === "all" || item.position === position,
  );
}

export function TeamView() {
  const searchParams = useSearchParams();
  const selected = findEntry(searchParams.get("player"));
  const tab = searchParams.get("tab");
  const openedFromList = useRef(false);

  const [activeSlug, setActiveSlug] = useState(
    () =>
      selected?.item.slug ??
      (tab === "management" ? staffItems[0].slug : playerItems[0].slug),
  );
  const [seenTab, setSeenTab] = useState(tab);
  const [position, setPosition] = useState<PositionFilter>("all");

  if (tab !== seenTab) {
    setSeenTab(tab);
    if (tab === "management" && !selected) {
      setActiveSlug(staffItems[0].slug);
    }
  }

  if (selected && selected.item.slug !== activeSlug) {
    setActiveSlug(selected.item.slug);
  }
  if (
    selected?.kind === "player" &&
    position !== "all" &&
    selected.player.position !== position
  ) {
    setPosition("all");
  }

  const mode: TeamMode =
    findEntry(activeSlug)?.kind === "staff" ? "management" : "players";
  const items: readonly TeamCardItem[] =
    mode === "management" ? staffItems : filterPlayers(position);
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.slug === activeSlug),
  );

  function changeMode(next: TeamMode) {
    if (tab) window.history.replaceState(null, "", "/team");
    setPosition("all");
    setActiveSlug((next === "management" ? staffItems : playerItems)[0].slug);
  }

  function changePosition(next: PositionFilter) {
    setPosition(next);
    const list = filterPlayers(next);
    if (!list.some((item) => item.slug === activeSlug)) {
      setActiveSlug(list[0].slug);
    }
  }

  function openItem(item: TeamCardItem) {
    openedFromList.current = true;
    window.history.pushState(null, "", `/team?player=${item.slug}`);
  }

  function closeDetail() {
    if (openedFromList.current) {
      openedFromList.current = false;
      window.history.back();
    } else {
      window.history.replaceState(null, "", "/team");
    }
  }

  function stepDetail(direction: 1 | -1) {
    if (items.length < 2) return;
    const index = items.findIndex((item) => item.slug === activeSlug);
    const next = items[(index + direction + items.length) % items.length];
    window.history.replaceState(null, "", `/team?player=${next.slug}`);
  }

  return (
    <LayoutGroup id="team">
      <section aria-label="Team" className="relative overflow-x-clip">
        <div className="grid">
          <AnimatePresence initial={false}>
            {selected ? (
              <PlayerDetail
                key="detail"
                entry={selected}
                canStep={items.length > 1}
                onBack={closeDetail}
                onStep={stepDetail}
              />
            ) : (
              <div
                key="list"
                className="col-start-1 row-start-1 min-h-dvh pb-12 pt-[calc(var(--spacing-header)+1.625rem)]"
              >
                <h1 className="sr-only">Team</h1>

                <div className="container-page relative z-30 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <PillFilter
                    size="sm"
                    ariaLabel="Pilih daftar"
                    options={modeOptions}
                    value={mode}
                    onChange={changeMode}
                  />
                  {mode === "players" ? (
                    <PillFilter
                      size="sm"
                      scrollable
                      ariaLabel="Filter posisi"
                      options={positionOptions}
                      value={position}
                      onChange={changePosition}
                    />
                  ) : null}
                </div>

                <TeamCarousel
                  items={items}
                  activeIndex={activeIndex}
                  onSelect={(index) => setActiveSlug(items[index].slug)}
                  onOpen={openItem}
                  ariaLabel={
                    mode === "players" ? "Daftar pemain" : "Daftar manajemen"
                  }
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </LayoutGroup>
  );
}

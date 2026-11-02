"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PlayerPanel, StaffPanel } from "@/components/sections/player-panel";
import { Badge } from "@/components/ui/badge";
import { PHOTO_CLIP, PHOTO_CLIP_OPEN } from "@/components/ui/player-card";
import { StatRing } from "@/components/ui/stat-ring";
import { countries } from "@/lib/countries";
import { duration, ease } from "@/lib/motion";
import { positionMetrics } from "@/lib/position-metrics";
import { positionLabels, type TeamEntry } from "@/lib/team";

interface PlayerDetailProps {
  entry: TeamEntry;
  canStep: boolean;
  onBack: () => void;
  onStep: (direction: 1 | -1) => void;
}

const arrowClass =
  "inline-flex size-11 items-center justify-center rounded-pill bg-glass-hover transition-colors duration-(--duration-fast) hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-glass-hover xl:size-[max(2.75rem,2.6vw)]";

function enter(delay: number) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, transition: { duration: duration.fast, ease } },
    transition: { duration: duration.base, ease, delay },
  };
}

export function PlayerDetail({
  entry,
  canStep,
  onBack,
  onStep,
}: PlayerDetailProps) {
  const { item } = entry;
  const fullName = item.fullName;
  const isPlayer = entry.kind === "player";
  const label = isPlayer
    ? positionLabels[entry.player.position]
    : entry.member.role;
  const country =
    countries[isPlayer ? entry.player.nationality : entry.member.nationality];

  const [state, setState] = useState({ slug: item.slug, switched: false });
  if (state.slug !== item.slug) {
    setState({ slug: item.slug, switched: true });
  }
  const switched = state.switched;
  const base = switched ? 0.05 : 0.4;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }
      if (
        document.querySelector('[role="dialog"], [role="menu"], #mobile-menu')
      ) {
        return;
      }
      if (event.key === "Escape") {
        onBack();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onStep(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onStep(-1);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onBack, onStep]);

  return (
    <div
      role="region"
      aria-label={`Detail ${fullName}`}
      className="relative col-start-1 row-start-1 pb-16 pt-[calc(var(--spacing-header)+1rem)] xl:min-h-[max(100dvh,56.25vw)] xl:pb-0 xl:pt-0"
    >
      <div className="container-page flex items-center justify-between xl:contents">
        <motion.button
          type="button"
          onClick={onBack}
          {...enter(base)}
          className="inline-flex min-h-11 items-center gap-2 text-label font-bold uppercase tracking-label transition-colors duration-(--duration-fast) hover:text-accent xl:absolute xl:left-[4.79vw] xl:top-[7.3vw]"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Kembali
        </motion.button>

        <motion.div
          role="group"
          aria-label="Pindah pemain"
          {...enter(base)}
          className="flex gap-3 xl:absolute xl:right-[7.14vw] xl:top-[12.66vw] xl:flex-col xl:gap-[1.93vw]"
        >
          <button
            type="button"
            aria-label="Sebelumnya"
            disabled={!canStep}
            onClick={() => onStep(-1)}
            className={arrowClass}
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Berikutnya"
            disabled={!canStep}
            onClick={() => onStep(1)}
            className={arrowClass}
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </motion.div>
      </div>

      <div className="container-page mt-8 xl:absolute xl:inset-x-0 xl:top-[10.68vw] xl:mt-0">
        <motion.div
          {...enter(base * 0.6)}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 xl:gap-x-[2.1vw]"
        >
          <Badge variant="blue" wrap>
            {label}
          </Badge>
          <span className="inline-flex items-center gap-3 text-base xl:text-[clamp(1rem,0.94vw,1.125rem)]">
            <Image
              src={country.flag}
              alt=""
              width={30}
              height={20}
              className="h-5 w-[1.875rem]"
            />
            {country.name}
          </span>
        </motion.div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4 xl:mt-[0.6vw] xl:flex-nowrap xl:gap-x-[2.5vw]">
          <motion.h1
            {...enter(base * 0.8)}
            className="min-w-0 font-bold leading-[1.05]"
            style={{
              fontSize: `clamp(2rem, calc(82vw / ${fullName.length}), var(--text-display))`,
            }}
          >
            {fullName}
          </motion.h1>

          <motion.div
            {...enter(base)}
            className="relative grid size-24 shrink-0 place-items-center rounded-pill bg-glass-circle xl:size-[7.3vw]"
          >
            {isPlayer ? (
              <>
                <Image
                  src="/brand/jersey.svg"
                  alt=""
                  width={120}
                  height={110}
                  className="h-auto w-[52%]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center pt-[8%] font-heading text-xl font-bold xl:text-[1.6vw]"
                >
                  {entry.player.number}
                </span>
                <span className="sr-only">
                  Nomor punggung {entry.player.number}
                </span>
              </>
            ) : (
              <span
                aria-hidden="true"
                className="font-heading text-2xl font-bold xl:text-[2vw]"
              >
                {item.badge}
              </span>
            )}
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto mt-8 aspect-[3/5] w-[min(80vw,22rem)] xl:absolute xl:left-[54.69vw] xl:top-[4.17vw] xl:mx-0 xl:mt-0 xl:aspect-auto xl:h-[52.08vw] xl:w-[31.25vw]">
        <AnimatePresence>
          <motion.div
            key={item.slug}
            layoutId={`photo-${item.slug}`}
            transition={{ layout: { duration: duration.slow, ease } }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0"
              initial={
                switched
                  ? { opacity: 0, x: 48, clipPath: PHOTO_CLIP_OPEN }
                  : { clipPath: PHOTO_CLIP }
              }
              animate={{ opacity: 1, x: 0, clipPath: PHOTO_CLIP_OPEN }}
              exit={{
                opacity: 0,
                x: -48,
                transition: { duration: duration.fast, ease },
              }}
              transition={{ duration: duration.slow, ease }}
            >
              <Image
                src={item.photo}
                alt={fullName}
                fill
                priority
                draggable={false}
                sizes="(min-width: 1280px) 32vw, 80vw"
                className="object-cover object-bottom"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 px-page xl:absolute xl:bottom-0 xl:left-[4.64vw] xl:top-[21.2vw] xl:mt-0 xl:w-[49vw] xl:px-0">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: -32,
            transition: { duration: duration.fast, ease },
          }}
          transition={{ duration: duration.base, ease, delay: base }}
          className="bg-glass p-5 sm:p-8 xl:h-full xl:pb-[1.5vw] xl:pl-[1.5vw] xl:pr-[2.6vw] xl:pt-[2.5vw]"
        >
          {entry.kind === "player" ? (
            <PlayerPanel player={entry.player} delay={base + 0.1} />
          ) : (
            <StaffPanel member={entry.member} delay={base + 0.1} />
          )}
        </motion.div>
      </div>

      {entry.kind === "player" ? (
        <motion.div
          {...enter(base + 0.2)}
          className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-8 px-page xl:absolute xl:left-[85.8vw] xl:top-[28.9vw] xl:mt-0 xl:w-[11.5vw] xl:flex-col xl:flex-nowrap xl:items-center xl:gap-y-[3.4vw] xl:px-0"
        >
          <StatRing
            value={entry.player.rings[0]}
            label={positionMetrics[entry.player.position].ringLabels[0]}
            delay={base + 0.5}
          />
          <StatRing
            value={entry.player.rings[1]}
            label={positionMetrics[entry.player.position].ringLabels[1]}
            delay={base + 0.6}
          />
        </motion.div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {fullName}
      </p>
    </div>
  );
}

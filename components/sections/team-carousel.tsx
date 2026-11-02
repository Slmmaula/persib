"use client";

import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { PlayerCard } from "@/components/ui/player-card";
import { duration, ease } from "@/lib/motion";
import {
  HEADROOM,
  HEADROOM_OVERLAP,
  STAGE_HEIGHT,
  getOffset,
  getScale,
  isCyclic,
} from "@/lib/team-geometry";
import type { TeamCardItem } from "@/lib/team";
import { useElementWidth } from "@/lib/use-element-width";
import { useViewportHeight } from "@/lib/use-viewport-height";

interface TeamCarouselProps {
  items: readonly TeamCardItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onOpen: (item: TeamCardItem) => void;
  ariaLabel: string;
}

const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 500;
const OVERLAP_MIN_WIDTH = 1536;
const STACKED_GAP = 12;

export function TeamCarousel({
  items,
  activeIndex,
  onSelect,
  onOpen,
  ariaLabel,
}: TeamCarouselProps) {
  const { ref: rootRef, width } = useElementWidth<HTMLDivElement>();
  const dragX = useMotionValue(0);
  const panned = useRef(false);
  const focusActive = useRef(false);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const [motionState, setMotionState] = useState({
    active: activeIndex,
    prev: activeIndex,
  });

  if (motionState.active !== activeIndex) {
    setMotionState({ active: activeIndex, prev: motionState.active });
  }

  const count = items.length;
  const active = items[activeIndex];
  const activeSlug = active?.slug;
  const viewportHeight = useViewportHeight();
  const heightScale =
    width >= 1024 ? Math.max(0.5, (viewportHeight - 230) / 775) : Infinity;
  const scale = Math.min(getScale(width), heightScale);

  useEffect(() => {
    if (!focusActive.current || !activeSlug) return;
    focusActive.current = false;
    cardRefs.current.get(activeSlug)?.focus({ preventScroll: true });
  }, [activeSlug]);

  function go(direction: 1 | -1) {
    if (count < 2) return;
    const raw = activeIndex + direction;
    const next = isCyclic(count)
      ? (raw + count) % count
      : Math.min(count - 1, Math.max(0, raw));
    if (next !== activeIndex) onSelect(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusActive.current = true;
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusActive.current = true;
      go(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusActive.current = true;
      onSelect(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusActive.current = true;
      onSelect(count - 1);
    }
  }

  function handlePan(_event: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > 6) panned.current = true;
    dragX.set(info.offset.x * 0.6);
  }

  function handlePanEnd(_event: unknown, info: PanInfo) {
    const forward =
      info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY;
    const backward =
      info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY;

    if (forward) go(1);
    else if (backward) go(-1);

    animate(dragX, 0, { duration: duration.base, ease });
  }

  function handleCardClick(index: number) {
    if (panned.current) return;
    if (index === activeIndex) {
      onOpen(items[index]);
    } else {
      onSelect(index);
    }
  }

  const surnameSize = active
    ? Math.min(
        100 * scale,
        Math.min(760 * scale, width - 32) / (0.62 * active.lastName.length),
      )
    : 0;

  return (
    <motion.div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      onPointerDown={() => {
        panned.current = false;
      }}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      className="relative min-h-[28rem] touch-pan-y select-none overflow-x-clip"
      style={{
        height: width ? STAGE_HEIGHT * scale : undefined,
        marginTop:
          width >= OVERLAP_MIN_WIDTH
            ? -HEADROOM * HEADROOM_OVERLAP * scale
            : STACKED_GAP,
      }}
    >
      {width > 0 ? (
        <motion.div className="absolute inset-0" style={{ x: dragX }}>
          {items.map((item, index) => {
            const offset = getOffset(index, activeIndex, count);
            const previous = getOffset(index, motionState.prev, count);
            return (
              <PlayerCard
                key={item.slug}
                ref={(element) => {
                  if (element) cardRefs.current.set(item.slug, element);
                  else cardRefs.current.delete(item.slug);
                }}
                item={item}
                offset={offset}
                scale={scale}
                stageWidth={width}
                instant={Math.abs(offset - previous) > 3}
                onClick={() => handleCardClick(index)}
              />
            );
          })}
        </motion.div>
      ) : null}

      {active && width > 0 ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-center"
            style={{ top: 657 * scale, maxWidth: width }}
          >
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                transition: { duration: duration.fast, ease },
              }}
              transition={{ duration: duration.fast, ease }}
            >
              <p
                aria-hidden="true"
                className="font-heading font-semibold leading-[1.1]"
                style={{ fontSize: Math.max(22, 48 * scale) }}
              >
                {active.firstName || "\u00A0"}
              </p>
              <p
                className="font-heading font-bold leading-none"
                style={{ fontSize: surnameSize, marginTop: -11 * scale }}
              >
                {active.lastName}
              </p>
              {active.subtitle ? (
                <p className="mt-4 text-sm font-semibold text-muted">
                  {active.subtitle}
                </p>
              ) : null}
              <p className="mt-3 text-label font-bold uppercase tracking-label text-muted lg:hidden">
                {active.label}
              </p>
            </motion.div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 rotate-180 lg:block"
            style={{
              left: `calc(50% + ${316 * scale}px)`,
              top: 461 * scale,
            }}
          >
            <motion.p
              key={active.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: duration.fast, ease },
              }}
              transition={{ duration: duration.fast, ease }}
              className="text-center font-heading font-bold uppercase tracking-label"
              style={{
                writingMode: "vertical-rl",
                fontSize: Math.max(13, 18 * scale),
                maxHeight: 470 * scale,
              }}
            >
              {active.label}
            </motion.p>
          </div>
        </>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {active ? `${active.ariaLabel}. ${activeIndex + 1} dari ${count}.` : ""}
      </p>
    </motion.div>
  );
}

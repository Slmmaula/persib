"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Ref } from "react";
import { duration, ease } from "@/lib/motion";
import { getSlot } from "@/lib/team-geometry";
import type { TeamCardItem } from "@/lib/team";

const SHIELD =
  "polygon(15% 0, 85% 0, 85% 5%, 100% 11%, 100% 82%, 50% 100%, 0 82%, 0 11%, 15% 5%)";

export const PHOTO_CLIP = "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)";
export const PHOTO_CLIP_OPEN =
  "polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 100%)";

interface PlayerCardProps {
  item: TeamCardItem;
  offset: number;
  scale: number;
  stageWidth: number;
  instant: boolean;
  onClick: () => void;
  ref?: Ref<HTMLButtonElement>;
}

export function PlayerCard({
  item,
  offset,
  scale,
  stageWidth,
  instant,
  onClick,
  ref,
}: PlayerCardProps) {
  const reduceMotion = useReducedMotion();
  const slot = getSlot(offset);
  const isFocus = offset === 0;
  const hidden = Math.abs(offset) > 2;
  const side = offset < 0 ? -1 : 1;

  const width = slot.w * scale;
  const height = slot.h * scale;
  const x = stageWidth / 2 + slot.dx * scale - width / 2;
  const y = slot.top * scale;

  const move =
    reduceMotion || instant
      ? { duration: 0 }
      : { duration: duration.slow, ease };
  const fade = reduceMotion
    ? { duration: 0 }
    : { duration: duration.fast, ease };
  const fadeOut = { opacity: 0, transition: fade };

  const focusCircle = 170 * scale;
  const sideCircle = Math.max(34, 52 * scale);

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={item.ariaLabel}
      aria-current={isFocus ? "true" : undefined}
      aria-hidden={hidden ? true : undefined}
      tabIndex={isFocus ? 0 : -1}
      onClick={onClick}
      initial={{
        x: isFocus ? x : x + side * 140 * scale,
        y,
        width,
        height,
        opacity: isFocus ? 1 : 0,
      }}
      animate={{ x, y, width, height, opacity: hidden ? 0 : 1 }}
      exit={
        isFocus
          ? undefined
          : {
              x: x + side * 260 * scale,
              opacity: 0,
              transition: { duration: duration.base, ease },
            }
      }
      transition={move}
      style={{ zIndex: 10 - Math.min(Math.abs(offset), 5) }}
      className={`absolute left-0 top-0 block text-white [-webkit-tap-highlight-color:transparent] ${
        hidden ? "pointer-events-none" : "cursor-pointer"
      }`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 block bg-glass-hover"
        style={{ clipPath: SHIELD }}
        initial={{ opacity: 0 }}
        animate={{ opacity: slot.opacity }}
        exit={fadeOut}
        transition={move}
      />

      <motion.span
        aria-hidden="true"
        className="absolute block rounded-pill bg-blue-number"
        style={{
          left: 303 * scale,
          top: 71 * scale,
          width: focusCircle,
          height: focusCircle,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocus ? 1 : 0 }}
        exit={fadeOut}
        transition={move}
      />

      <motion.span
        layoutId={`photo-${item.slug}`}
        transition={{ layout: { duration: duration.slow, ease } }}
        className="absolute inset-x-0 bottom-0 block"
        style={{ height: "120%" }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 block"
          initial={{
            opacity: slot.opacity,
            clipPath: isFocus ? PHOTO_CLIP_OPEN : PHOTO_CLIP,
          }}
          animate={{ opacity: slot.opacity, clipPath: PHOTO_CLIP }}
          transition={move}
        >
          <Image
            src={item.photo}
            alt=""
            fill
            draggable={false}
            sizes="(min-width: 1280px) 30vw, 70vw"
            className="object-cover object-bottom"
          />
        </motion.span>
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="absolute grid place-items-center font-heading font-bold leading-none"
        style={{
          left: 303 * scale,
          top: 71 * scale,
          width: focusCircle,
          height: focusCircle,
          fontSize: 88 * scale,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocus ? 1 : 0 }}
        exit={fadeOut}
        transition={move}
      >
        {item.badge}
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="absolute inset-0 block"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocus ? 0 : 1 }}
        exit={fadeOut}
        transition={move}
      >
        <span
          className="absolute left-1/2 grid -translate-x-1/2 place-items-center rounded-pill bg-blue-number font-heading font-bold leading-none"
          style={{
            bottom: "19%",
            width: sideCircle,
            height: sideCircle,
            fontSize: Math.max(14, 24 * scale),
          }}
        >
          {item.badge}
        </span>
        <span
          className="absolute inset-x-2 block truncate text-center font-heading font-semibold"
          style={{ bottom: "10%", fontSize: Math.max(12, 20 * scale) }}
        >
          {item.fullName}
        </span>
      </motion.span>
    </motion.button>
  );
}

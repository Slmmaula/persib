"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface SparklinePoint {
  label: string;
  value: number;
}

interface SparklineProps {
  data: readonly SparklinePoint[];
  ariaLabel: string;
  highlightIndex?: number;
  caption?: string;
  delay?: number;
  className?: string;
}

interface Coordinate {
  x: number;
  y: number;
}

const WIDTH = 360;
const HEIGHT = 64;
const PADDING = 8;

function toCoordinates(data: readonly SparklinePoint[]): Coordinate[] {
  const values = data.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const step = data.length > 1 ? (WIDTH - PADDING * 2) / (data.length - 1) : 0;

  return values.map((value, index) => ({
    x: PADDING + index * step,
    y:
      range === 0
        ? HEIGHT / 2
        : HEIGHT - PADDING - ((value - min) / range) * (HEIGHT - PADDING * 2),
  }));
}

function toSmoothPath(points: readonly Coordinate[]): string {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return path;
}

export function Sparkline({
  data,
  ariaLabel,
  highlightIndex,
  caption,
  delay = 0,
  className,
}: SparklineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  const points = toCoordinates(data);
  const highlight = points[highlightIndex ?? points.length - 1];
  const visible = reduceMotion || inView;
  const lateTransition = {
    duration: duration.fast,
    ease,
    delay: reduceMotion ? 0 : delay + duration.slow,
  };

  return (
    <div ref={ref} className={cn("w-full max-w-[22.5rem]", className)}>
      {caption ? (
        <motion.p
          aria-hidden="true"
          className="text-right text-label font-semibold"
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={lateTransition}
        >
          {caption}
        </motion.p>
      ) : null}
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={ariaLabel}
        className="mt-3 block h-auto w-full overflow-visible"
      >
        <motion.path
          d={toSmoothPath(points)}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-white"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: visible ? 1 : 0 }}
          transition={{ duration: duration.slow, ease, delay }}
        />
        <motion.circle
          cx={highlight.x}
          cy={highlight.y}
          r="5"
          className="fill-accent"
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={lateTransition}
        />
      </svg>
    </div>
  );
}

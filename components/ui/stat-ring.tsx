"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/ui/count-up";
import { duration, ease } from "@/lib/motion";

interface StatRingProps {
  value: number | null;
  label: string;
  delay?: number;
}

export function StatRing({ value, label, delay = 0 }: StatRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const target = value === null ? 0 : Math.min(Math.max(value, 0), 100) / 100;

  return (
    <figure className="flex flex-col items-center gap-4 text-center sm:gap-5">
      <div ref={ref} className="relative size-[clamp(6.5rem,7.5vw,9rem)]">
        <svg
          viewBox="0 0 144 144"
          className="size-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="72"
            cy="72"
            r="70"
            fill="none"
            strokeWidth="4"
            className="stroke-ring-track"
          />
          <motion.circle
            cx="72"
            cy="72"
            r="70"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            className="stroke-ring-arc"
            initial={{ pathLength: reduceMotion ? target : 0 }}
            animate={{ pathLength: reduceMotion || inView ? target : 0 }}
            transition={{ duration: duration.slow, ease, delay }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-heading text-ring font-semibold">
          {value === null ? (
            <>
              <span aria-hidden="true">–</span>
              <span className="sr-only">Belum tersedia</span>
            </>
          ) : (
            <CountUp value={value} suffix="%" delay={delay} />
          )}
        </div>
      </div>
      <figcaption className="text-base font-semibold sm:text-lg">
        {label}
      </figcaption>
    </figure>
  );
}

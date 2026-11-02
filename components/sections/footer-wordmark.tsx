"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const phrases = [
  "LIVE INSIDE US",
  "MANAH JEUNG GETIH",
  "EDANKEUN DI ASIA",
] as const;

const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a));

const TYPE_MS = 95;
const DELETE_MS = 45;
const HOLD_MS = 3000;
const GAP_MS = 400;
const MAX_SIZE = 360;

type Phase = "typing" | "deleting";

function Caret({ side, blink }: { side: "left" | "right"; blink: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "visible absolute top-[5%] block h-[78%] w-[0.06em] bg-accent",
        side === "left" ? "-left-[0.05em]" : "-right-[0.05em]",
        blink && "animate-caret",
      )}
    />
  );
}

interface LineProps {
  text: string;
  count: number;
  caret?: boolean;
  blink?: boolean;
  className?: string;
}

function Line({
  text,
  count,
  caret = false,
  blink = false,
  className,
}: LineProps) {
  return (
    <span className={cn("inline-flex whitespace-nowrap", className)}>
      {[...text].map((char, index) => {
        const isSpace = char === " ";
        const side =
          count === 0 && index === 0
            ? "left"
            : index === count - 1
              ? "right"
              : null;

        return (
          <span
            key={index}
            className={cn(
              "relative inline-block",
              isSpace && "w-[0.22em]",
              index >= count && "invisible",
            )}
          >
            {isSpace ? null : char}
            {caret && side ? <Caret side={side} blink={blink} /> : null}
          </span>
        );
      })}
    </span>
  );
}

export function FooterWordmark() {
  const boxRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(boxRef, { amount: 0.3 });
  const reduce = useReducedMotion() ?? false;

  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const text = phrases[index];
  const running = inView && !reduce;

  useEffect(() => {
    if (!running) return;

    let timer: number;
    if (phase === "typing") {
      timer =
        count < text.length
          ? window.setTimeout(() => setCount(count + 1), TYPE_MS)
          : window.setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else if (count > 0) {
      timer = window.setTimeout(() => setCount(count - 1), DELETE_MS);
    } else {
      timer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % phrases.length);
        setPhase("typing");
      }, GAP_MS);
    }

    return () => window.clearTimeout(timer);
  }, [running, phase, count, text.length]);

  useEffect(() => {
    const box = boxRef.current;
    const line = lineRef.current;
    const measure = measureRef.current;
    if (!box || !line || !measure) return;

    function fit() {
      const natural = measure!.offsetWidth;
      if (!natural) return;
      const current = parseFloat(getComputedStyle(line!).fontSize);
      const next = Math.min(
        MAX_SIZE,
        Math.floor((current * box!.clientWidth) / natural),
      );
      if (Math.abs(next - current) > 0.5) {
        line!.style.fontSize = `${next}px`;
      }
    }

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    observer.observe(measure);
    return () => observer.disconnect();
  }, []);

  const shown = reduce ? phrases[0] : text;
  const shownCount = reduce ? phrases[0].length : count;
  const idle = count === 0 || count === text.length;

  return (
    <div className="container-page pb-6 pt-4 md:pb-10">
      <div
        ref={boxRef}
        role="img"
        aria-label="Live inside us. Manah jeung getih. Edankeun di Asia."
        className="overflow-x-clip"
      >
        <p
          ref={lineRef}
          aria-hidden="true"
          className="relative flex justify-center whitespace-nowrap font-display text-[length:clamp(2.5rem,12vw,16rem)] font-normal uppercase leading-[0.9]"
        >
          <Line text={shown} count={shownCount} caret={!reduce} blink={idle} />
          <span ref={measureRef} className="invisible absolute left-0 top-0">
            <Line text={longest} count={longest.length} />
          </span>
        </p>
      </div>
    </div>
  );
}

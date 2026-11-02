"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { duration as motionDuration, ease } from "@/lib/motion";

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  delay?: number;
  className?: string;
}

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const latest = useRef(0);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(latest.current, value, {
      duration: motionDuration.slow,
      ease,
      delay,
      onUpdate: (current) => {
        latest.current = current;
        setDisplay(current);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, delay]);

  const shown = reduceMotion ? value : display;

  return (
    <span ref={ref} className={className}>
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

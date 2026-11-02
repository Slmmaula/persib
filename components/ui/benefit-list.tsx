"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { useId, useState } from "react";
import { benefits } from "@/data/membership";
import { duration, ease } from "@/lib/motion";
import type { BenefitValue } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BenefitListProps {
  values: Record<string, BenefitValue>;
  visibleCount: number;
}

function BenefitItem({ label, value }: { label: string; value: BenefitValue }) {
  return (
    <li className="flex items-start gap-3 py-1.5">
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-pill",
          value.active
            ? "bg-accent text-on-accent"
            : "border border-glass-border text-muted",
        )}
      >
        {value.active ? (
          <Check className="size-3" strokeWidth={3} />
        ) : (
          <X className="size-3" strokeWidth={3} />
        )}
      </span>
      <span
        className={cn(
          "min-w-0 text-sm leading-5",
          value.active ? "text-white" : "text-muted",
        )}
      >
        <span className="sr-only">
          {value.active ? "Termasuk: " : "Tidak termasuk: "}
        </span>
        <span className="font-semibold">{label}</span>
        {value.detail ? (
          <span className="block text-xs leading-4 text-muted">
            {value.detail}
          </span>
        ) : null}
      </span>
    </li>
  );
}

export function BenefitList({ values, visibleCount }: BenefitListProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const first = benefits.slice(0, visibleCount);
  const rest = benefits.slice(visibleCount);

  return (
    <div>
      <ul aria-label="Benefit utama">
        {first.map((benefit) => (
          <BenefitItem
            key={benefit.id}
            label={benefit.label}
            value={values[benefit.id]}
          />
        ))}
      </ul>

      <motion.ul
        id={panelId}
        aria-label="Benefit lainnya"
        inert={!expanded}
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: duration.base, ease }}
        className="overflow-hidden"
      >
        {rest.map((benefit) => (
          <BenefitItem
            key={benefit.id}
            label={benefit.label}
            value={values[benefit.id]}
          />
        ))}
      </motion.ul>

      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((current) => !current)}
        className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold transition-colors duration-(--duration-fast) hover:text-accent"
      >
        {expanded ? "Sembunyikan benefit" : "Lihat semua benefit"}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 transition-transform duration-(--duration-base) ease-brand",
            expanded && "rotate-180",
          )}
        />
      </button>
    </div>
  );
}

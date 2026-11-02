"use client";

import type { PillOption } from "@/components/ui/pill-filter";
import { cn } from "@/lib/utils";

interface SegmentedToggleProps<T extends string> {
  options: readonly PillOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: SegmentedToggleProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex gap-1 rounded-pill border border-glass-border bg-glass-hover p-1",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "h-9 flex-1 cursor-pointer whitespace-nowrap rounded-pill px-5 text-label font-bold uppercase tracking-label transition-colors duration-(--duration-fast) ease-brand sm:px-6",
              active
                ? "bg-white text-on-accent"
                : "text-pill-idle-text hover:text-white",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

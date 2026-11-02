"use client";

import { cn } from "@/lib/utils";

export interface PillOption<T extends string> {
  value: T;
  label: string;
}

interface PillFilterProps<T extends string> {
  options: readonly PillOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  scrollable?: boolean;
  size?: "md" | "sm";
  className?: string;
}

const sizes = {
  md: {
    group: "gap-2 sm:gap-3",
    pill: "h-9 px-5 text-label tracking-label",
  },
  sm: {
    group: "gap-2",
    pill: "h-10 px-4 text-label tracking-nav md:h-8 md:text-micro",
  },
};

export function PillFilter<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  scrollable = false,
  size = "md",
  className,
}: PillFilterProps<T>) {
  const styles = sizes[size];

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "flex",
        styles.group,
        scrollable
          ? "-mx-page flex-nowrap overflow-x-auto px-page [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
          : "flex-wrap",
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
              "shrink-0 cursor-pointer rounded-pill font-bold uppercase transition-colors duration-(--duration-fast) ease-brand",
              styles.pill,
              active
                ? "bg-white text-on-accent"
                : "bg-pill-idle text-pill-idle-text hover:bg-white/40 hover:text-white",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

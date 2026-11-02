"use client";

import { Check, ChevronDown, Filter } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { PillOption } from "@/components/ui/pill-filter";
import { cn } from "@/lib/utils";

interface CompetitionSelectProps<T extends string> {
  label: string;
  allLabel: string;
  ariaLabel: string;
  options: readonly PillOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  className?: string;
}

export function CompetitionSelect<T extends string>({
  label,
  allLabel,
  ariaLabel,
  options,
  value,
  onChange,
  className,
}: CompetitionSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function select(next: T | null) {
    onChange(next);
    setOpen(false);
    triggerRef.current?.focus();
  }

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? allLabel;

  const itemClass =
    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-label font-bold uppercase tracking-nav transition-colors duration-(--duration-fast) ease-brand";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-full cursor-pointer items-center gap-2 rounded-pill border border-field-border bg-surface-panel px-5 text-label font-bold uppercase tracking-label text-pill-idle-text transition duration-(--duration-fast) ease-brand hover:border-white/30 hover:text-white aria-expanded:border-white/30 sm:w-[22rem]"
      >
        <Filter aria-hidden className="size-3.5 shrink-0 text-accent" />
        <span className="shrink-0 text-muted">{label}</span>
        <span className="min-w-0 flex-1 truncate text-left text-white">
          {selectedLabel}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 shrink-0 transition-transform duration-(--duration-fast) ease-brand",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 right-0 z-30 mt-2 rounded-panel border border-field-border bg-surface-panel p-2 shadow-xl sm:left-auto sm:w-[22rem]"
        >
          {[{ value: null, label: allLabel }, ...options].map((option) => {
            const active = option.value === value;
            return (
              <button
                key={option.value ?? "all"}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => select(option.value)}
                className={cn(
                  itemClass,
                  active
                    ? "bg-white/10 text-white"
                    : "text-pill-idle-text hover:bg-white/10 hover:text-white",
                )}
              >
                <span className="min-w-0 truncate">{option.label}</span>
                {active ? (
                  <Check aria-hidden className="size-4 shrink-0 text-accent" />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

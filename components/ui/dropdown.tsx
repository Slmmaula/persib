"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface DropdownItem {
  label: string;
  href?: string;
  active?: boolean;
  onSelect?: () => void;
}

interface DropdownProps {
  label: ReactNode;
  items: readonly DropdownItem[];
  ariaLabel?: string;
  align?: "start" | "end";
  triggerClassName?: string;
  className?: string;
}

const itemClass =
  "block w-full px-5 py-3 text-left text-sm font-semibold transition-colors duration-(--duration-fast) hover:bg-glass-hover focus-visible:bg-glass-hover focus-visible:outline-offset-[-2px]";

export function Dropdown({
  label,
  items,
  ariaLabel,
  align = "start",
  triggerClassName,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const menuId = useId();

  useEffect(() => {
    if (open && focusIndex !== null) {
      itemRefs.current[focusIndex]?.focus();
    }
  }, [open, focusIndex]);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setFocusIndex(null);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  function close(returnFocus: boolean) {
    setOpen(false);
    setFocusIndex(null);
    if (returnFocus) triggerRef.current?.focus();
  }

  function focusItem(index: number) {
    setOpen(true);
    setFocusIndex(index);
    itemRefs.current[index]?.focus();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(items.length - 1);
    } else if (event.key === "Escape" && open) {
      close(false);
    }
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const last = items.length - 1;
    const current = itemRefs.current.findIndex(
      (element) => element === document.activeElement,
    );

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(current >= last ? 0 : current + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItem(current <= 0 ? last : current - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(0);
        break;
      case "End":
        event.preventDefault();
        focusItem(last);
        break;
      case "Escape":
        event.preventDefault();
        close(true);
        break;
      case "Tab":
        close(false);
        break;
    }
  }

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={ariaLabel}
        onClick={() => (open ? close(false) : setOpen(true))}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 text-nav font-bold uppercase tracking-nav transition-colors duration-(--duration-fast) hover:text-accent",
          triggerClassName,
        )}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-3.5 transition-transform duration-(--duration-fast)",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.fast, ease }}
            onKeyDown={handleMenuKeyDown}
            className={cn(
              "absolute top-full z-40 mt-2 min-w-52 border border-glass-border bg-surface-deep py-2",
              align === "end" ? "right-0" : "left-0",
            )}
          >
            {items.map((item, index) => {
              const className = cn(itemClass, item.active && "text-accent");
              const handleSelect = () => {
                item.onSelect?.();
                close(false);
              };

              return (
                <li key={item.label} role="none">
                  {item.href ? (
                    <Link
                      ref={(element) => {
                        itemRefs.current[index] = element;
                      }}
                      href={item.href}
                      role="menuitem"
                      tabIndex={-1}
                      aria-current={item.active ? "true" : undefined}
                      onClick={handleSelect}
                      className={className}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      ref={(element) => {
                        itemRefs.current[index] = element;
                      }}
                      type="button"
                      role="menuitem"
                      tabIndex={-1}
                      aria-current={item.active ? "true" : undefined}
                      onClick={handleSelect}
                      className={className}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

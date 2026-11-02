import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "accent" | "blue";

const variants: Record<BadgeVariant, string> = {
  accent: "bg-accent text-on-accent",
  blue: "bg-blue-badge text-white",
};

interface BadgeProps {
  variant?: BadgeVariant;
  wrap?: boolean;
  className?: string;
  children: ReactNode;
}

export function Badge({
  variant = "accent",
  wrap = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center justify-center rounded-sm px-3.5 text-label font-bold uppercase tracking-label",
        wrap
          ? "max-w-full whitespace-normal py-1 text-left"
          : "whitespace-nowrap",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

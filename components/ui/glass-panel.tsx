import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GlassVariant = "fill" | "outline" | "card";

const variants: Record<GlassVariant, string> = {
  fill: "bg-glass",
  outline: "border border-glass-border",
  card: "border border-glass-border bg-glass",
};

interface GlassPanelProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: GlassVariant;
}

export function GlassPanel({
  as: Tag = "div",
  variant = "card",
  className,
  ...props
}: GlassPanelProps) {
  return <Tag className={cn(variants[variant], className)} {...props} />;
}

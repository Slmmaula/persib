import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  action?: { label: string; href: string };
  as?: "h1" | "h2";
  align?: "start" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  eyebrow,
  description,
  action,
  as: Heading = "h2",
  align = "start",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        centered &&
          "items-center text-center md:flex-col md:items-center md:justify-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", centered && "mx-auto")}>
        {eyebrow ? (
          <p className="mb-3 text-label font-bold uppercase tracking-label text-muted">
            {eyebrow}
          </p>
        ) : null}
        <Heading className="font-semibold text-section">{title}</Heading>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-white transition-colors duration-(--duration-fast) hover:text-accent"
        >
          {action.label}
          <ChevronRight aria-hidden className="size-4" />
        </Link>
      ) : null}
    </header>
  );
}

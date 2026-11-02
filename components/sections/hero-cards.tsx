import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { whatsNew } from "@/data/home";
import { formatDate } from "@/lib/format";
import {
  getLastResult,
  getNextMatch,
  getOpponent,
  matchTitle,
} from "@/lib/match-utils";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light" | "deep";

const tones: Record<
  Tone,
  { card: string; label: string; subtitle: string; link: string }
> = {
  dark: {
    card: "bg-surface-card text-white",
    label: "text-muted",
    subtitle: "text-muted",
    link: "text-white hover:text-accent",
  },
  light: {
    card: "bg-white text-ink",
    label: "text-ink-muted",
    subtitle: "text-ink-muted",
    link: "text-link-on-light hover:text-ink",
  },
  deep: {
    card: "bg-surface-deep text-white",
    label: "text-muted",
    subtitle: "text-muted",
    link: "text-white hover:text-accent",
  },
};

interface HeroCardProps {
  tone: Tone;
  label: string;
  title: string;
  subtitle: string;
  link: { label: string; href: string };
  watermark: { src: string; width: number; height: number; className: string };
}

function HeroCard({
  tone,
  label,
  title,
  subtitle,
  link,
  watermark,
}: HeroCardProps) {
  const styles = tones[tone];

  return (
    <article
      className={cn(
        "relative flex flex-col justify-center overflow-hidden px-card-pad py-8 lg:py-3",
        styles.card,
      )}
    >
      <Image
        src={watermark.src}
        alt=""
        aria-hidden="true"
        width={watermark.width}
        height={watermark.height}
        className={cn(
          "pointer-events-none absolute w-auto select-none",
          watermark.className,
        )}
      />
      <div className="relative z-10 flex flex-col gap-1.5 lg:gap-1">
        <p
          className={cn(
            "text-label font-bold uppercase tracking-label",
            styles.label,
          )}
        >
          {label}
        </p>
        <h2 className="font-heading text-card-title font-semibold lg:text-[length:clamp(0.875rem,1.05vw,1.25rem)] lg:leading-tight">
          {title}
        </h2>
        <p
          className={cn(
            "text-base lg:text-[length:clamp(0.8125rem,0.85vw,1rem)]",
            styles.subtitle,
          )}
        >
          {subtitle}
        </p>
        <Link
          href={link.href}
          className={cn(
            "-my-2.5 inline-flex items-center gap-1 self-start py-2.5 text-sm font-semibold transition-colors duration-(--duration-fast)",
            styles.link,
          )}
        >
          {link.label}
          <ChevronRight aria-hidden className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export function HeroCards() {
  const last = getLastResult();
  const next = getNextMatch();
  const lastScore = last.score ? `${last.score.home}:${last.score.away}` : "-";

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:h-hero-cards">
      <HeroCard
        tone="dark"
        label="Laga Terakhir"
        title={matchTitle(last)}
        subtitle={`Full Time: ${lastScore}`}
        link={{
          label: "Match Report",
          href: last.reportSlug ? `/news/${last.reportSlug}` : "/fixtures",
        }}
        watermark={{
          src: getOpponent(last).badge,
          width: 200,
          height: 240,
          className: "-right-8 top-1/2 h-[150%] -translate-y-1/2 opacity-20",
        }}
      />
      <HeroCard
        tone="light"
        label="Laga Selanjutnya"
        title={matchTitle(next)}
        subtitle={`${formatDate(next.date, "day-month")} · ${next.kickoff} WIB`}
        link={{ label: "Detail Laga", href: "/fixtures" }}
        watermark={{
          src: getOpponent(next).badge,
          width: 200,
          height: 240,
          className: "-right-8 top-1/2 h-[150%] -translate-y-1/2 opacity-15",
        }}
      />
      <HeroCard
        tone="deep"
        label="Terbaru"
        title={whatsNew.title}
        subtitle={whatsNew.subtitle}
        link={whatsNew.link}
        watermark={{
          src: "/brand/jersey.svg",
          width: 120,
          height: 110,
          className: "-bottom-6 -right-6 h-[135%] opacity-70",
        }}
      />
    </div>
  );
}

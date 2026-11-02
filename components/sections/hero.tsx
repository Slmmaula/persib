import { ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { HeroCards } from "@/components/sections/hero-cards";
import { LiveScoreCard } from "@/components/sections/live-score-card";
import { MatchTimeline } from "@/components/sections/match-timeline";
import { VideoModalButton } from "@/components/sections/video-modal-button";
import { Badge } from "@/components/ui/badge";
import { hero } from "@/data/home";
import { liveMatch } from "@/data/matches";

const photoVars = {
  "--photo-w":
    "min(calc((100dvh, 36rem) - var(--spacing-hero-cards) * 0.8), 52vw)",
} as CSSProperties;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative lg:flex lg:h-dvh lg:min-h-[36rem]"
    >
      <div
        style={photoVars}
        className="relative min-w-0 flex-1 overflow-hidden lg:flex lg:flex-col"
      >
        <div className="relative z-10 flex flex-col px-page pt-[calc(var(--spacing-header)+2rem)] lg:min-h-0 lg:flex-1 lg:justify-center lg:pb-[calc(var(--spacing-hero-cards)+6dvh)] lg:pt-(--spacing-header)">
          <div className="lg:max-w-[calc(100%-var(--photo-w)*0.8)]">
            <Badge>{hero.badge}</Badge>
            <h1
              id="hero-title"
              className="mt-5 max-w-[48rem] text-balance font-semibold text-hero"
            >
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-[30rem] text-base leading-7 text-muted">
              {hero.description}
            </p>
            <VideoModalButton
              title={hero.videoLabel}
              className="group mt-12 inline-flex min-h-14 items-center gap-4 lg:mt-[min(3rem,5dvh)]"
            >
              <span className="inline-flex size-14 items-center justify-center rounded-pill bg-white text-on-accent transition-colors duration-(--duration-fast) group-hover:bg-accent">
                <Play aria-hidden className="ml-0.5 size-5 fill-current" />
              </span>
              <span className="text-sm font-bold uppercase tracking-nav">
                {hero.videoLabel}
              </span>
            </VideoModalButton>
          </div>
        </div>

        <div className="relative mx-auto mt-10 aspect-[4/5] h-[min(80vw,30rem)] lg:absolute lg:right-0 lg:top-0 lg:mx-0 lg:mt-0 lg:aspect-auto lg:h-[calc(100%-var(--spacing-hero-cards))] lg:w-(--photo-w)">
          <Image
            src={hero.photo}
            alt={hero.photoAlt}
            width={1080}
            height={1350}
            sizes="(min-width: 1024px) 40vw, 80vw"
            priority
            className="size-full object-contain object-bottom"
          />
        </div>

        <HeroCards />
      </div>

      <aside
        aria-label="Pertandingan langsung"
        className="bg-surface-flat px-page py-10 lg:flex lg:w-panel lg:shrink-0 lg:flex-col lg:px-panel-pad lg:pb-[max(1.25rem,3.15dvh)] lg:pt-[max(calc(var(--spacing-header)_-_0.875rem),13dvh)]"
      >
        <div className="mx-auto flex w-full max-w-xl flex-col lg:min-h-0 lg:max-w-none lg:flex-1">
          <LiveScoreCard match={liveMatch} />
          <MatchTimeline
            events={liveMatch.events}
            className="mt-12 max-h-[30rem] lg:mt-[min(3rem,5dvh)] lg:max-h-none lg:min-h-0 lg:flex-1"
          />
          <VideoModalButton
            title="Tonton Live"
            className="mt-8 flex h-14 w-full shrink-0 overflow-hidden text-left lg:mt-[min(2rem,3.5dvh)]"
          >
            <Image
              src="/news/news-01.jpg"
              alt=""
              width={105}
              height={56}
              className="h-14 w-[6.5625rem] shrink-0 object-cover"
            />
            <span className="flex flex-1 cursor-pointer items-center justify-between gap-2 bg-white px-4 text-label font-bold uppercase tracking-nav text-link-on-light">
              Tonton live di PERSIB TV
              <ChevronRight aria-hidden className="size-4 shrink-0" />
            </span>
          </VideoModalButton>
        </div>
      </aside>
    </section>
  );
}

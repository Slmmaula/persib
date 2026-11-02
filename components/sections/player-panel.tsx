"use client";

import { motion } from "framer-motion";
import { Award, Medal, Shield, Trophy, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { SoonMatches } from "@/components/sections/soon-matches";
import { CountUp } from "@/components/ui/count-up";
import { Sparkline } from "@/components/ui/sparkline";
import { duration, ease } from "@/lib/motion";
import { positionMetrics } from "@/lib/position-metrics";
import type { HonourIcon, Player, StaffMember } from "@/lib/types";

const honourIcons: Record<HonourIcon, LucideIcon> = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
  shield: Shield,
};

interface SectionProps {
  index: number;
  delay: number;
  className?: string;
  children: ReactNode;
}

function Section({ index, delay, className, children }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.base,
        ease,
        delay: delay + index * 0.08,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-label font-bold uppercase tracking-label text-muted">
      {children}
    </p>
  );
}

function EmptyNote({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted">{children}</p>;
}

interface StatProps {
  value: number | null;
  label: string;
  delay: number;
  decimals?: number;
  unit?: string;
}

function Stat({ value, label, delay, decimals = 0, unit }: StatProps) {
  return (
    <div className="min-w-0">
      <p className="font-heading text-stat font-medium leading-none">
        {value === null ? (
          <>
            <span aria-hidden="true">–</span>
            <span className="sr-only">Belum tersedia</span>
          </>
        ) : (
          <>
            <CountUp value={value} decimals={decimals} delay={delay} />
            {unit ? (
              <span className="ml-0.5 text-[0.55em] font-medium">{unit}</span>
            ) : null}
          </>
        )}
      </p>
      <p className="mt-3 text-sm font-semibold text-muted xl:text-[clamp(0.75rem,0.83vw,1rem)]">
        {label}
      </p>
    </div>
  );
}

const statGrid = "grid grid-cols-3 gap-x-4 xl:grid-cols-[1.1fr_1fr_1fr]";

export function PlayerPanel({
  player,
  delay,
}: {
  player: Player;
  delay: number;
}) {
  const { stats } = player;
  const metrics = positionMetrics[player.position];
  const seasons = player.seasonSeries.map((entry) => ({
    label: entry.season,
    value: entry.value,
  }));
  const latest = seasons[seasons.length - 1];
  const count = delay + 0.3;

  let caption = "";
  if (latest) {
    const unit = metrics.seriesUnit[latest.value === 1 ? 0 : 1];
    caption = `${latest.value} ${unit} in ${latest.label}`;
  }

  return (
    <div className="grid gap-y-8 xl:h-full xl:grid-cols-[minmax(0,390fr)_minmax(0,379fr)] xl:grid-rows-[10.8vw_8.8vw_minmax(0,1fr)] xl:gap-x-[2.76vw] xl:gap-y-0">
      <Section index={0} delay={delay} className="max-xl:order-1">
        <Label>Honours</Label>
        {player.honours.length > 0 ? (
          <ul className="mt-4 flex h-24 items-stretch justify-around border border-glass-border xl:mt-[1vw] xl:h-[5.83vw]">
            {player.honours.map((honour) => {
              const Icon = honourIcons[honour.icon];
              return (
                <li
                  key={honour.id}
                  title={honour.title}
                  className="relative flex flex-1 items-center justify-center"
                >
                  <Icon
                    aria-hidden
                    className="size-8 xl:size-[max(1.75rem,2.6vw)]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 grid size-7 -translate-x-1/2 translate-y-1/2 place-items-center rounded-pill border border-glass-border bg-canvas-mid text-xs font-semibold"
                  >
                    {honour.count}
                  </span>
                  <span className="sr-only">
                    {honour.title}: {honour.count}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-4 flex h-24 items-center justify-center border border-glass-border xl:mt-[1vw] xl:h-[5.83vw]">
            <EmptyNote>Belum ada data</EmptyNote>
          </div>
        )}
      </Section>

      <Section
        index={1}
        delay={delay}
        className="max-xl:order-2 xl:pt-[2.34vw]"
      >
        <div className={statGrid}>
          <Stat
            value={stats.minutesPlayed}
            label="Minutes Played"
            delay={count}
          />
          <Stat value={stats.appearances} label="Appearances" delay={count} />
          <Stat
            value={stats.highlight}
            label={metrics.highlightLabel}
            delay={count}
          />
        </div>
      </Section>

      <Section index={2} delay={delay} className="max-xl:order-4">
        <Label>{metrics.seriesTitle}</Label>
        {seasons.length > 1 ? (
          <Sparkline
            key={player.slug}
            data={seasons}
            ariaLabel={`${metrics.seriesTitle}, ${player.firstName} ${player.lastName}: ${caption}`}
            caption={caption}
            delay={delay + 0.25}
            className="mt-4 xl:mt-[1.1vw]"
          />
        ) : (
          <div className="mt-4 xl:mt-[1.1vw]">
            <EmptyNote>Belum ada data</EmptyNote>
          </div>
        )}
      </Section>

      <Section
        index={3}
        delay={delay}
        className="max-xl:order-3 xl:pt-[1.25vw]"
      >
        <div className={statGrid}>
          <Stat
            value={stats.heightCm === null ? null : stats.heightCm / 100}
            decimals={2}
            unit="m"
            label="Height"
            delay={count}
          />
          <Stat value={stats.weightKg} unit="kg" label="Weight" delay={count} />
          <Stat value={stats.age} label="Age" delay={count} />
        </div>
      </Section>

      <Section index={4} delay={delay} className="max-xl:order-5 xl:col-span-2">
        <SoonMatches />
      </Section>
    </div>
  );
}

export function StaffPanel({
  member,
  delay,
}: {
  member: StaffMember;
  delay: number;
}) {
  return (
    <div className="grid content-start gap-y-8 xl:grid-cols-2 xl:gap-x-[2.76vw]">
      <Section index={0} delay={delay}>
        <Label>Jabatan</Label>
        <p className="mt-3 font-heading text-ring font-semibold">
          {member.role}
        </p>
      </Section>
      {member.tenure ? (
        <Section index={1} delay={delay}>
          <Label>Masa jabatan</Label>
          <p className="mt-3 font-heading text-ring font-semibold">
            {member.tenure}
          </p>
        </Section>
      ) : null}
      <Section index={2} delay={delay} className="xl:col-span-2">
        <Label>Profil</Label>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted">
          TODO: tambahkan profil resmi.
        </p>
      </Section>
    </div>
  );
}

import Image from "next/image";
import { SubscribeButton } from "@/components/sections/subscribe-button";
import { Badge } from "@/components/ui/badge";
import { BenefitList } from "@/components/ui/benefit-list";
import { formatRupiah } from "@/lib/format";
import type { MembershipPlan } from "@/lib/types";
import { cn } from "@/lib/utils";

const buttonBase =
  "mt-5 inline-flex h-11 w-full items-center justify-center rounded-md text-label font-bold uppercase tracking-label";

export function MembershipCard({ plan }: { plan: MembershipPlan }) {
  const compact = plan.variant === "compact";
  const saving = plan.originalPrice ? plan.originalPrice - plan.price : 0;
  const free = plan.price === 0;
  const badge = saving > 0 ? <Badge>Hemat {formatRupiah(saving)}</Badge> : null;

  return (
    <article
      id={plan.id}
      aria-labelledby={`${plan.id}-name`}
      className={cn(
        "flex scroll-mt-28 flex-col overflow-hidden rounded-sm border bg-surface-panel transition duration-(--duration-base) ease-brand hover:-translate-y-1",
        plan.featured
          ? "border-accent"
          : "border-glass-border hover:border-white/30",
      )}
    >
      {plan.image ? (
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={plan.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          {badge ? <div className="absolute left-4 top-4">{badge}</div> : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {!plan.image && badge ? <div className="mb-4">{badge}</div> : null}

        <h3
          id={`${plan.id}-name`}
          className="font-heading text-card-title font-semibold"
        >
          {plan.name}
        </h3>
        <p className="mt-2 min-h-10 text-sm leading-5 text-muted">
          {plan.tagline}
        </p>

        <div className="mt-5">
          <p className="h-5 text-sm text-muted">
            {plan.originalPrice ? (
              <>
                <span className="sr-only">Harga normal </span>
                <s>{formatRupiah(plan.originalPrice)}</s>
              </>
            ) : null}
          </p>
          <p
            className={cn(
              "font-heading font-bold",
              compact ? "text-2xl" : "text-3xl",
            )}
          >
            {formatRupiah(plan.price)}
          </p>
        </div>

        {free ? (
          <p
            className={cn(buttonBase, "border border-glass-border text-muted")}
          >
            Gratis
          </p>
        ) : (
          <SubscribeButton
            planName={plan.name}
            className={cn(
              buttonBase,
              "transition-colors duration-(--duration-fast) cursor-pointer",
              plan.featured
                ? "bg-accent text-on-accent hover:opacity-90"
                : "border border-white/40 hover:border-accent hover:text-accent",
            )}
          >
            Berlangganan
          </SubscribeButton>
        )}

        <div className="mt-6">
          <BenefitList values={plan.benefits} visibleCount={compact ? 3 : 5} />
        </div>
      </div>
    </article>
  );
}

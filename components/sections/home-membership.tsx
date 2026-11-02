import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlendedBackground } from "@/components/ui/blended-background";
import { MembershipCard } from "@/components/ui/membership-card";
import { ScrollCarousel } from "@/components/ui/scroll-carousel";
import { membershipOffer, plans } from "@/data/membership";

const previewIds = ["passport-persib", "membersib-plus", "membersib-jersey"];
const previewPlans = previewIds.flatMap(
  (id) => plans.find((plan) => plan.id === id) ?? [],
);

export function HomeMembership() {
  return (
    <section
      aria-labelledby="home-membership-title"
      className="relative isolate py-16 md:py-24"
    >
      <BlendedBackground src={membershipOffer.background} />

      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="home-membership-title"
            className="text-balance text-[length:clamp(1.75rem,4vw,3.25rem)] font-bold uppercase leading-[1.05]"
          >
            {membershipOffer.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7">
            {membershipOffer.description}
          </p>
        </div>

        <div className="mt-10 md:mt-12">
          <ScrollCarousel
            ariaLabel="Pilihan paket membership"
            arrows={false}
            desktopClassName="md:grid md:snap-none md:grid-cols-3 md:overflow-visible"
          >
            {previewPlans.map((plan) => (
              <div
                key={plan.id}
                className="flex shrink-0 basis-[85%] snap-start sm:basis-[46%] md:min-w-0 md:basis-auto [&>article]:min-w-0 [&>article]:flex-1"
              >
                <MembershipCard plan={plan} />
              </div>
            ))}
          </ScrollCarousel>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/member"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/40 px-6 text-label font-bold uppercase tracking-label transition-colors duration-(--duration-fast) hover:border-accent hover:text-accent"
          >
            Lihat semua plans
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

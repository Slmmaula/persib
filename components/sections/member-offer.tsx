import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MembershipPlans } from "@/components/sections/membership-plans";
import { BlendedBackground } from "@/components/ui/blended-background";
import { membershipOffer } from "@/data/membership";

export function MemberOffer() {
  return (
    <section
      aria-labelledby="member-offer-title"
      className="relative isolate py-20 md:py-28"
    >
      <BlendedBackground src={membershipOffer.background} />

      <div className="container-page">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2
            id="member-offer-title"
            className="text-balance font-bold uppercase text-section"
          >
            {membershipOffer.title}
          </h2>
          <p className="mt-4 text-base leading-7">
            {membershipOffer.description}
          </p>
          <Link
            href="/member"
            className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm font-semibold transition-colors duration-(--duration-fast) hover:text-accent"
          >
            Pelajari lebih lanjut
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <div className="mt-12 md:mt-16">
          <MembershipPlans />
        </div>
      </div>
    </section>
  );
}

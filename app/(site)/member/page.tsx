import { FaqSection } from "@/components/sections/faq-section";
import { LoyaltyBanner } from "@/components/sections/loyalty-banner";
import { MemberHero } from "@/components/sections/member-hero";
import { MembershipPlans } from "@/components/sections/membership-plans";
import { TierComparison } from "@/components/sections/tier-comparison";

export const metadata = { title: "Member" };

export default function MemberPage() {
  return (
    <>
      <MemberHero />

      <section
        aria-labelledby="plans-title"
        className="container-page py-12 md:py-16"
      >
        <h2 id="plans-title" className="font-semibold text-section">
          Temukan opsi yang tepat untuk Anda
        </h2>
        <div className="mt-10">
          <MembershipPlans />
        </div>
      </section>

      <LoyaltyBanner />
      <TierComparison />
      <FaqSection />
    </>
  );
}

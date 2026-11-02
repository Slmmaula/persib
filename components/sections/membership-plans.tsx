import { MembershipCard } from "@/components/ui/membership-card";
import { ScrollCarousel } from "@/components/ui/scroll-carousel";
import { plans } from "@/data/membership";

export function MembershipPlans() {
  return (
    <ScrollCarousel ariaLabel="Pilihan paket membership">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="flex shrink-0 basis-[85%] snap-start sm:basis-[46%] lg:basis-[31%] xl:min-w-0 xl:basis-auto [&>article]:min-w-0 [&>article]:flex-1"
        >
          <MembershipCard plan={plan} />
        </div>
      ))}
    </ScrollCarousel>
  );
}

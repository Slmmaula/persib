import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { partners } from "@/data/partners";
import { cn } from "@/lib/utils";

export function Partners() {
  return (
    <section
      id="partners"
      aria-label="Partner"
      className="container-page scroll-mt-24 py-16 md:py-24"
    >
      <SectionHeader title="Partner" />
      <ul className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-12 2xl:grid-cols-6">
        {partners.map((partner) => (
          <li key={partner.id} className="relative h-16 sm:h-20">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              sizes="(min-width: 1536px) 15vw, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
              className={cn(
                "object-contain",
                partner.invert && "brightness-0 invert",
              )}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

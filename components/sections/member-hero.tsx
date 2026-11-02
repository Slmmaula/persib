import Image from "next/image";
import { membershipOffer } from "@/data/membership";

export function MemberHero() {
  return (
    <section
      aria-labelledby="member-hero-title"
      className="relative isolate flex min-h-[26rem] items-end sm:min-h-[32rem] lg:min-h-[38rem]"
    >
      <div aria-hidden="true" className="mask-fade-b absolute inset-0 -z-10">
        <Image
          src={membershipOffer.background}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-canvas-edge/70 via-transparent to-canvas-edge/40" />
      </div>

      <div className="container-page pb-10 pt-header md:pb-14">
        <h1
          id="member-hero-title"
          className="max-w-3xl text-balance text-[length:clamp(1.75rem,4.4vw,4rem)] font-bold uppercase leading-[1.05]"
        >
          {membershipOffer.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7">
          {membershipOffer.description}
        </p>
      </div>
    </section>
  );
}

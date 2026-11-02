import { BlendedBackground } from "@/components/ui/blended-background";
import { PhoneMockup } from "@/components/sections/phone-mockup";
import { StoreButtons } from "@/components/ui/store-buttons";
import { appCta } from "@/data/home";

export function AppCta() {
  return (
    <section
      aria-labelledby="app-cta-title"
      className="relative isolate overflow-hidden"
    >
      <BlendedBackground src="/brand/cta-bg-gbla.jpg" />
      <div className="container-page flex flex-col items-center pt-16 text-center md:pt-20">
        <h2
          id="app-cta-title"
          className="max-w-3xl font-bold uppercase text-section"
        >
          {appCta.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7">
          {appCta.description}
        </p>

        <StoreButtons className="mt-8 flex-wrap justify-center" />

        <div className="mt-12 w-full">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

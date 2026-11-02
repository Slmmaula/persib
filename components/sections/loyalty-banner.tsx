import { SubscribeButton } from "@/components/sections/subscribe-button";

export function LoyaltyBanner() {
  return (
    <section aria-labelledby="loyalty-title" className="bg-surface-panel">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-14">
        <div className="max-w-2xl">
          <h2
            id="loyalty-title"
            className="font-heading text-given font-semibold"
          >
            PERSIB Loyalty
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Subscribe here to be part of PERSIB family, please read our FAQs
            below.
          </p>
        </div>
        <SubscribeButton className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-accent px-8 text-label cursor-pointer font-bold uppercase tracking-label text-on-accent transition-opacity duration-(--duration-fast) hover:opacity-90">
          Subscribe
        </SubscribeButton>
      </div>
    </section>
  );
}

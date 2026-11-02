import { ExternalLink, MapPin } from "lucide-react";
import { mapAddress, mapEmbedUrl, mapLinkUrl } from "@/data/contact";

export function ContactMap() {
  return (
    <section aria-label="Peta lokasi" className="mt-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-glass-border bg-surface-panel sm:aspect-[16/9] lg:aspect-[21/9]">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <MapPin aria-hidden className="size-8" />
          <p className="max-w-sm text-sm leading-6 text-muted">{mapAddress}</p>
        </div>
        <iframe
          title="Peta lokasi Graha PERSIB"
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">{mapAddress}</p>
        <a
          href={mapLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-6 text-label font-bold uppercase tracking-label text-on-accent transition-opacity duration-(--duration-fast) hover:opacity-90"
        >
          <ExternalLink aria-hidden className="size-4" />
          Buka di Google Maps
        </a>
      </div>
    </section>
  );
}

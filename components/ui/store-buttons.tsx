import Image from "next/image";
import { appCta, type StoreId } from "@/data/home";
import { cn } from "@/lib/utils";

const storeIcons: Record<StoreId, string> = {
  "google-play": "/brand/googleplay.svg",
  "app-store": "/brand/appstore.svg",
};

export function StoreButtons({ className }: { className?: string }) {
  return (
    <ul className={cn("flex gap-4", className)}>
      {appCta.stores.map((store) => (
        <li key={store.id}>
          <a
            href={store.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${store.eyebrow} ${store.name}`}
            className="inline-flex h-14 min-w-44 items-center gap-3 rounded-md border border-white/60 bg-ink px-5 text-left transition-colors duration-(--duration-fast) hover:border-accent"
          >
            <Image
              src={storeIcons[store.id]}
              alt=""
              width={24}
              height={24}
              className="size-6 shrink-0"
            />
            <span className="flex flex-col justify-center gap-1">
              <span className="text-micro uppercase leading-none">
                {store.eyebrow}
              </span>
              <span className="text-base font-semibold leading-none">
                {store.name}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

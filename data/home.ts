export interface HeroContent {
  badge: string;
  headline: string;
  description: string;
  videoLabel: string;
  photo: string;
  photoAlt: string;
}

export const hero: HeroContent = {
  badge: "Sedang Populer",
  headline: "Peralta Sparks PERSIB's Comeback Against Port FC",
  description:
    "Mariano Peralta sparked PERSIB's remarkable comeback with a late equalizer before Berguinho and Luka Menalo sealed a dramatic 3-1 victory over Port FC in the Shopee Cup 2026/27 opener.",
  videoLabel: "Tonton Video",
  photo: "/players/peralta3.png",
  photoAlt: "Foto contoh Satria Aditama",
};

export const whatsNew = {
  title: "Jersey Musim 2026/2027",
  subtitle: "Pre-Order",
  link: {
    label: "Selengkapnya",
    href: "/news/jersey-khusus-shopee-cup-2026-27",
  },
};

export type StoreId = "google-play" | "app-store";

export interface StoreLink {
  id: StoreId;
  eyebrow: string;
  name: string;
  href: string;
}

export const appCta = {
  title: "Akses Lebih Mudah, Semakin Seru!",
  description:
    "Download aplikasi Persib untuk beli tiket, update berita, dan konten spesial hanya dari genggaman Anda.",
  stores: [
    {
      id: "google-play",
      eyebrow: "Get it on",
      name: "Google Play",
      href: "https://play.google.com/store/apps/details?id=com.persib.persibpass&hl=en&gl=US",
    },
    {
      id: "app-store",
      eyebrow: "Download on the",
      name: "App Store",
      href: "https://apps.apple.com/id/app/persib/id1240095475?l=id",
    },
  ] satisfies StoreLink[],
};

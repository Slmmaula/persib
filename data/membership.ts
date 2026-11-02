import type {
  BenefitValue,
  MembershipBenefit,
  MembershipPlan,
} from "@/lib/types";

export const membershipOffer = {
  title: "Jadi lebih dekat, karena lebih banyak manfaat",
  description:
    "Berlangganan dan dapatkan akses ke konten eksklusif, diskon, ekstra poin, dan manfaat menarik lainnya.",
  background: "/membership/membership-offer-bg.jpg",
};

export const benefits: readonly MembershipBenefit[] = [
  { id: "merch-discount", label: "Diskon Merchandise" },
  { id: "points", label: "Poin PERSIB" },
  { id: "exclusive-content", label: "Akses Konten Eksklusif" },
  { id: "partner-voucher", label: "Voucher Belanja di Partner Pilihan" },
  {
    id: "points-discount",
    label: "Potongan dengan PERSIB poin",
    hint: "Berlaku untuk Tiket & Merchandise di PERSIB App",
  },
  { id: "missions", label: "Misi Berhadiah" },
  { id: "jersey", label: "Jersey" },
  { id: "match-ticket", label: "Match Tiket" },
  { id: "vbu-priority", label: "Kursi Prioritas Tiket VBU" },
  { id: "nobar-priority", label: "Kursi Prioritas saat Nobar" },
  { id: "coaching-clinic", label: "Kuota Prioritas Coaching Clinic" },
  { id: "meet-greet", label: "Kuota Prioritas Sesi Meet & Greet" },
  { id: "early-collab", label: "Early Access Collaboration Merchandise" },
  { id: "lucky-draw", label: "Lucky Draw Eksklusif" },
  { id: "welcome-box", label: "Welcome Box" },
  { id: "anniversary-gift", label: "Spesial Hadiah Anniversary" },
  { id: "birthday-gift", label: "Special Birthday Gift" },
  { id: "exclusive-events", label: "Akses ke Acara Eksklusif" },
  { id: "legacy-wall", label: "Legacy Wall" },
  { id: "share-priority", label: "Prioritas Pembelian Saham PERSIB" },
  { id: "manage-membership", label: "Manage Membership" },
];

const ids = benefits.map((benefit) => benefit.id);
const manage = "manage-membership";

function benefitsFor(
  active: readonly string[],
  details: Record<string, string> = {},
): Record<string, BenefitValue> {
  return Object.fromEntries(
    ids.map((id) => [id, { active: active.includes(id), detail: details[id] }]),
  );
}

export const plans: readonly MembershipPlan[] = [
  {
    id: "passport-persib",
    name: "Passport PERSIB",
    image: "/membership/passport-persib.PNG",
    tagline: "Seluruh benefit dalam satu paket.",
    price: 5_500_000,
    originalPrice: 7_500_000,
    featured: true,
    variant: "main",
    benefits: benefitsFor(ids, {
      "merch-discount": "20%",
      points: "2.5x",
      "points-discount": "Hingga 20%",
      missions: "Passport book & PERSIB Mission",
      jersey: "Player Issue 2026/2027",
      "match-ticket": "2x Match Tiket VBU",
    }),
  },
  {
    id: "membersib-plus",
    name: "Membersib Plus",
    image: "/membership/membersib-plus.PNG",
    tagline: "Jersey Replika dan 2x Match Tiket Timur.",
    price: 1_500_000,
    variant: "main",
    benefits: benefitsFor(
      [...ids.slice(0, 14).filter((id) => id !== "vbu-priority"), manage],
      {
        "merch-discount": "15%",
        points: "2x",
        "points-discount": "Hingga 10%",
        missions: "PERSIB Mission",
        jersey: "Replika 2026/2027",
        "match-ticket": "2x Match Tiket Timur",
      },
    ),
  },
  {
    id: "membersib-jersey",
    name: "Membersib Jersey",
    image: "/membership/membersib-jersey.PNG",
    tagline: "Jersey Lite Version dan diskon merchandise.",
    price: 200_000,
    variant: "main",
    benefits: benefitsFor([...ids.slice(0, 7), manage], {
      "merch-discount": "10%",
      points: "1.5x",
      "points-discount": "Hingga 10%",
      jersey: "Lite Version 2026/2027",
    }),
  },
  {
    id: "membersib",
    name: "Membersib",
    image: "/membership/membersib.PNG",
    tagline: "Diskon merchandise dan poin PERSIB.",
    price: 120_000,
    variant: "main",
    benefits: benefitsFor([...ids.slice(0, 6), manage], {
      "merch-discount": "5%",
      points: "1x",
      "points-discount": "Hingga 10%",
      jersey: "2026/2027",
    }),
  },
  {
    id: "gratis",
    name: "Gratis",
    image: "/membership/reguler.PNG",
    tagline: "Tanpa biaya.",
    price: 0,
    variant: "compact",
    benefits: benefitsFor([]),
  },
];

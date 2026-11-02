import type { Partner } from "@/lib/types";
import { slugify } from "@/lib/utils";

// Cara mengganti logo partner:
// 1. Taruh file logo di public/partners/ (svg, png, atau webp).
// 2. Isi satu baris per partner: nama dan nama file.
// 3. Tambahkan onDark: true hanya untuk logo berwarna putih (kotaknya jadi gelap).

interface PartnerSource {
  name: string;
  logo: string;
  invert?: boolean;
}

const source: readonly PartnerSource[] = [
  { name: "Indofood", logo: "indofood.png", invert: true },
  { name: "Kopi ABC", logo: "kopi.png", invert: true },
  { name: "Bank BJB", logo: "bjb.png", invert: true },
  { name: "Combiphar", logo: "combiphar.png", invert: true },
  { name: "Kelme", logo: "kelme.png", invert: true },
  { name: "Greenfields", logo: "greenfields.png", invert: true },
  { name: "TrimaX", logo: "trima.png", invert: true },
  { name: "Foom Unity", logo: "foom.png", invert: true },
  { name: "Semen Kujang", logo: "semen.png" },
  { name: "NEX AI", logo: "nexai.png", invert: true },
  { name: "Le Minerale", logo: "leminerale.png" },
  { name: "Teh Pucuk Harum", logo: "pucuk.png" },
  { name: "Se'Indonesia", logo: "seindonesia.webp" },
  { name: "Rinso", logo: "rinso.png" },
  { name: "Sunlight", logo: "sunlight.png" },
  { name: "Madurasa", logo: "madurasa.png" },
  { name: "Herbafit", logo: "herbafit.png" },
  { name: "Canon", logo: "canon.png" },
  { name: "CBN Fiber", logo: "cbn.png", invert: true },
];

export const partners: Partner[] = source.map(({ name, logo, invert }) => ({
  id: slugify(name),
  name,
  logo: `/partners/${logo}`,
  invert,
}));

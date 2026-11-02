import type { AboutFact, AboutHonour, HistoryMilestone } from "@/lib/types";

// Ringkasan dari media dan Wikipedia (diperiksa 28 Oktober 2026). Item todo wajib diverifikasi dengan klub.
// Sumber berbeda soal tanggal berdiri: 14 Maret 1933 (Persib) dan 5 Januari 1919 (BIVB).
// TODO: pastikan tahun berdiri, tahun gelar Perserikatan, dan gelar era Liga 1 dan Super League.

export const about = {
  title: "Tentang PERSIB",
  heroImage: "/about/about-img.jpg",
  intro: [
    "PERSIB Bandung adalah klub sepak bola profesional yang berbasis di Kota Bandung, Jawa Barat. Klub ini dikenal dengan julukan Maung Bandung dan Pangeran Biru, dan memiliki pendukung setia yang disebut Bobotoh.",
    "Berdiri sebelum kemerdekaan Indonesia, PERSIB telah menjuarai kompetisi pada era Perserikatan, Liga Indonesia, dan Indonesia Super League, serta tampil sebagai juara bertahan menjelang musim Super League 2026/27.",
  ],
};

export const facts: AboutFact[] = [
  { id: "founded", label: "Tahun berdiri", value: "1933" },
  { id: "nickname", label: "Julukan", value: "Maung Bandung, Pangeran Biru" },
  { id: "stadium", label: "Stadion", value: "Gelora Bandung Lautan Api" },
];

export const milestones: HistoryMilestone[] = [
  {
    id: "founding",
    year: "1933",
    kind: "founding",
    text: "PERSIB lahir dari penyatuan dua perkumpulan sepak bola nasionalis di Bandung, PSIB dan NVB.",
  },
  {
    id: "perserikatan-1937",
    year: "1937",
    kind: "title",
    text: "Juara Perserikatan pertama, setelah mengalahkan Persis Solo di final.",
  },
  {
    id: "perserikatan-1961",
    year: "1961",
    kind: "title",
    text: "Kembali menjuarai Perserikatan setelah mengalahkan PSM di final.",
  },
  {
    id: "perserikatan-1990",
    year: "1990",
    kind: "title",
    text: "Juara Perserikatan setelah mengalahkan Persebaya 2-0 di final.",
  },
  {
    id: "perserikatan-1994",
    year: "1993/94",
    kind: "title",
    text: "Juara musim terakhir Perserikatan dengan mengalahkan PSM 2-0, sehingga Piala Presiden menjadi milik PERSIB selamanya.",
  },
  {
    id: "liga-indonesia",
    year: "1994/95",
    kind: "title",
    text: "Juara Liga Indonesia edisi perdana setelah mengalahkan Petrokimia Putra 1-0 di final.",
  },
  {
    id: "isl-2014",
    year: "2014",
    kind: "title",
    text: "Juara Indonesia Super League setelah mengalahkan Persipura Jayapura di final lewat adu penalti.",
  },
  {
    id: "piala-presiden-2015",
    year: "2015",
    kind: "title",
    text: "Juara Piala Presiden edisi pertama, setelah mengalahkan Sriwijaya FC 2-0 di stadion Gelora Bung Karno, Jakarta.",
  },
  {
    id: "Liga-2023",
    year: "2023/24",
    kind: "title",
    text: "Juara BRI Liga 1 setelah penantian 10 tahun lamanya.",
  },
  {
    id: "Liga-2024",
    year: "2024/25",
    kind: "title",
    text: "Sejarah tercipta. Back-to-back Champions berhasil di raih PERSIB.",
  },
  {
    id: "Liga-2025",
    year: "2025/26",
    kind: "title",
    text: "Sejarah kembali tercipta. Three-in-a-row melengkapi Pancatakhta PERSIB.",
  },
];

export const honours: AboutHonour[] = [
  {
    id: "perserikatan",
    title: "Perserikatan",
    detail: "1937, 1961, 1986, 1990, 1994",
    count: 5,
    icon: "trophy",
  },
  {
    id: "liga-indonesia",
    title: "Liga Indonesia",
    detail: "1994/95",
    count: 1,
    icon: "medal",
  },
  {
    id: "isl",
    title: "Indonesia Super League",
    detail: "2014",
    count: 1,
    icon: "award",
  },
  {
    id: "era-terkini",
    title: "Era Liga 1 dan Super League",
    detail: "2023/24, 2024/25, 2025/26",
    count: null,
    icon: "shield",
  },
];

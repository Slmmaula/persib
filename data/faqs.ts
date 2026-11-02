import type { FaqItem } from "@/lib/types";

// TODO: verifikasi jawaban dengan tim membership sebelum rilis.

export const faqs: FaqItem[] = [
  {
    id: "cara-menjadi-member",
    question: "Bagaimana cara menjadi member PERSIB?",
    answer:
      "Pilih salah satu paket di halaman ini, lalu tekan tombol Berlangganan. Pendaftaran diselesaikan melalui aplikasi PERSIB.",
  },
  {
    id: "perbedaan-paket",
    question:
      "Apa perbedaan Passport PERSIB, Membersib Plus, Membersib Jersey, dan Membersib?",
    answer:
      "Passport PERSIB mencakup seluruh benefit, termasuk Jersey Player Issue, 2x Match Tiket VBU, dan kursi prioritas. Membersib Plus mencakup benefit dari diskon merchandise sampai Lucky Draw Eksklusif, tanpa Kursi Prioritas Tiket VBU. Membersib Jersey berisi benefit dasar ditambah Jersey Lite Version. Membersib berisi diskon merchandise, poin, akses konten eksklusif, voucher belanja, potongan dengan poin, dan misi berhadiah. Rincian lengkap ada di tabel Tier Comparison.",
  },
  {
    id: "paket-gratis",
    question: "Apakah ada paket gratis?",
    answer:
      "Ada. Paket Gratis berharga Rp0 dan tidak mencakup benefit pada tabel perbandingan. Untuk mendapatkan diskon, poin, dan akses konten eksklusif, pilih salah satu paket berbayar.",
  },
  {
    id: "poin-persib",
    question: "Berapa pengali Poin PERSIB di tiap paket?",
    answer:
      "Passport PERSIB 2.5x, Membersib Plus 2x, Membersib Jersey 1.5x, dan Membersib 1x. Poin dapat dipakai untuk potongan hingga 20% (Passport PERSIB) atau hingga 10% (paket lainnya) pada Tiket dan Merchandise di PERSIB App.",
  },
  {
    id: "jersey",
    question: "Jersey apa yang saya dapatkan dari tiap paket?",
    answer:
      "Passport PERSIB mendapat Jersey Player Issue 2026/2027, Membersib Plus mendapat Jersey Replika 2026/2027, dan Membersib Jersey mendapat Jersey Lite Version 2026/2027. Membersib dan paket Gratis tidak termasuk jersey.",
  },
  {
    id: "match-tiket",
    question: "Apakah paket sudah termasuk tiket pertandingan?",
    answer:
      "Passport PERSIB mencakup 2x Match Tiket VBU, dan Membersib Plus mencakup 2x Match Tiket Timur. Paket lainnya tidak mencakup tiket pertandingan.",
  },
  {
    id: "kelola-keanggotaan",
    question: "Bagaimana mengelola keanggotaan saya?",
    answer:
      "Fitur Manage Membership tersedia untuk paket Passport PERSIB, Membersib Plus, Membersib Jersey, dan Membersib.",
  },
];

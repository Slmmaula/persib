import type { NewsArticle, NewsCategory } from "@/lib/types";

// TODO: ganti isi dan gambar sebelum rilis.

export const newsCategoryLabels: Record<NewsCategory, string> = {
  "match-report": "Match Report",
  club: "Klub",
  academy: "Akademi",
  community: "Komunitas",
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "nobar-biru-persib-vs-melbourne-victory",
    title: "Nobar Biru dibuka untuk laga PERSIB kontra Melbourne Victory",
    category: "community",
    date: "2026-10-27",
    excerpt:
      "Bobotoh yang tidak bisa ke stadion tetap bisa mendukung lewat nonton bareng di Graha PERSIB dan beberapa bioskop CGV.",
    image: "/news/news-01.jpg",
    featured: false,
    sourceUrl:
      "https://persib.co.id/article-details/bobotoh-dukung-spirit-edankeun-di-asia-lewat-nobar-biru-persib-vs-melbourne-victory",
    body: [
      "PERSIB menjamu Melbourne Victory pada matchday ketiga Grup E AFC Champions League Two 2026/27 di Stadion Si Jalak Harupat, Rabu, 28 Oktober 2026. Kick-off dijadwalkan pukul 19.15 WIB.",
      "Bagi Bobotoh yang tidak bisa datang langsung, klub menyiapkan Nobar Biru di lantai 1 Graha PERSIB. Acara serupa juga tersedia di CGV Paris Van Java, CGV 23 Paskal, dan CGV Festive Walk Karawang.",
    ],
  },
  {
    slug: "persib-u15-juara-piala-soeratin-2026",
    title: "PERSIB U15 pulang membawa gelar juara Piala Soeratin 2026",
    category: "academy",
    date: "2026-10-26",
    excerpt:
      "Tim Maung Ngora disambut manajemen di Bandara Husein Sastranegara setelah menjuarai putaran nasional.",
    image: "/news/news-02.jpg",
    featured: true,
    sourceUrl:
      "https://persib.co.id/article-details/sambut-juara-piala-soeratin-u15-persib-bangga-perjuangan-maung-ngora",
    body: [
      "Skuad PERSIB U15 tiba di Bandung pada Senin, 26 Oktober 2026. Mereka disambut manajemen PT PERSIB Bandung Bermartabat, staf pelatih Youth Development Program, dan orang tua pemain.",
      "Deputy CEO Adhitia Putra Herawan menyebut klub kembali meraih gelar Piala Soeratin setelah cukup lama, kali ini di kategori U15. Ia menilainya sebagai pijakan bagi pembinaan kelompok usia U16, U18, dan U20 yang masih perlu terus dikembangkan.",
      "Direktur Youth Development Program, Zaenal Arif, berharap bibit pemain dari Jawa Barat bisa terus dibina dan para pemain tidak cepat berpuas diri.",
    ],
  },
  {
    slug: "tolic-berterima-kasih-kepada-bobotoh",
    title: "Tolic: dukungan Bobotoh ikut membawa PERSIB menang di Pakansari",
    category: "community",
    date: "2026-10-26",
    excerpt:
      "Pelatih Igor Tolic berterima kasih kepada suporter yang memadati stadion saat PERSIB mengalahkan Garudayaksa 2-1.",
    image: "/news/news-03.jpg",
    featured: false,
    sourceUrl:
      "https://persib.co.id/article-details/dari-pakansari-ke-sjh-tolic-berharap-dukungan-hebat-bobotoh-berlanjut",
    body: [
      "Seusai kemenangan 2-1 atas Garudayaksa FC di Stadion Pakansari, Cibinong, Minggu, 25 Oktober 2026, Igor Tolic menyebut kehadiran Bobotoh memberi energi tambahan sampai akhir laga.",
      "Gol kemenangan dicetak Adam Alis pada menit 90+1, setelah Garudayaksa sempat menyamakan kedudukan.",
      "Tolic berharap stadion kembali penuh saat PERSIB menjamu Melbourne Victory di ACL Two, Rabu, 28 Oktober 2026.",
    ],
  },
  {
    slug: "dado-fokus-hadapi-melbourne-victory",
    title: "Dado: tiga poin penting, fokus langsung ke Melbourne Victory",
    category: "match-report",
    date: "2026-10-26",
    excerpt:
      "Gelandang Dedi Kusnandar menegaskan PERSIB menjalani jadwal padat satu laga demi satu laga.",
    image: "/news/news-04.jpg",
    featured: false,
    sourceUrl:
      "https://persib.co.id/article-details/dado-langsung-fokus-hadapi-melbourne-victory",
    body: [
      "Dedi Kusnandar mengaku bersyukur atas kemenangan dramatis di kandang Garudayaksa FC pada pekan ketujuh Super League 2026/27.",
      "Menurutnya, jadwal yang padat membuat tim harus fokus pada satu pertandingan dalam satu waktu. Perhatian kini beralih ke laga ACL Two melawan Melbourne Victory di Stadion Si Jalak Harupat.",
    ],
  },
  {
    slug: "kemenangan-dramatis-atas-garudayaksa",
    title: "Kemenangan dramatis 2-1 atas Garudayaksa, Tolic puji mental pemain",
    category: "match-report",
    date: "2026-10-25",
    excerpt:
      "Gol Adam Alis di menit 90+1 memastikan tiga poin PERSIB pada pekan ketujuh Super League 2026/27.",
    image: "/news/news-05.jpg",
    featured: true,
    sourceUrl:
      "https://persib.co.id/article-details/igor-tolic-syukuri-kemenangan-persib-atas-garudayaksa",
    body: [
      "PERSIB menang 2-1 atas Garudayaksa FC di Stadion Pakansari, Cibinong, Minggu, 25 Oktober 2026. Gol penentu lahir dari Adam Alis di menit 90+1.",
      "Igor Tolic memuji pemain yang tetap disiplin dan berjuang sampai akhir. Ia juga mengakui Garudayaksa bermain rapi dan memberi perlawanan sengit.",
      "Tolic meminta tim tidak larut dalam euforia, karena laga berikutnya digelar Rabu, 28 Oktober 2026.",
    ],
  },
  {
    slug: "preview-persib-vs-cong-viettel",
    title: "Preview PERSIB vs Cong Viettel: menjaga start mulus di Asia",
    category: "match-report",
    date: "2026-10-13",
    excerpt:
      "PERSIB menjamu Cong Viettel FC di matchday kedua Grup E ACL Two 2026/27, Rabu, 14 Oktober 2026.",
    image: "/news/news-06.jpg",
    featured: false,
    sourceUrl:
      "https://persib.co.id/article-details/preview-persib-vs-cong-viettel-lanjutkan-kemenangan-di-asia",
    body: [
      "Setelah menang 1-0 atas Seoul FC di ACL Two dan 3-1 atas Port FC di Shopee Cup, PERSIB mencoba melanjutkan awal positif di Asia saat menjamu Cong Viettel FC di Stadion Si Jalak Harupat pukul 19.15 WIB.",
      "Marc Klok menyoroti beratnya menjaga performa dengan jadwal yang rapat. Igor Tolic menyebut beberapa pemain yang sempat cedera menunjukkan pemulihan positif, tetapi belum memutuskan susunan pemain.",
    ],
  },
  {
    slug: "peralta-siap-hadapi-shopee-cup",
    title: "Peralta: grup Shopee Cup sulit, PERSIB siap bertanggung jawab",
    category: "club",
    date: "2026-09-30",
    excerpt:
      "PERSIB berada di Grup B ASEAN Club Championship Shopee Cup 2026/27 bersama Port FC, Johor Darul Ta'zim, dan empat klub lain.",
    image: "/news/news-07.jpg",
    featured: false,
    sourceUrl:
      "https://persib.co.id/article-details/peralta-siap-berjuang-di-asean-club-championship-2026-27",
    body: [
      "Hasil drawing menempatkan PERSIB di Grup B bersama Port FC (Thailand), Johor Darul Ta'zim (Malaysia), Lion City Sailors (Singapura), Cong An Ha Noi (Vietnam), PKR Svay Rieng (Kamboja), dan Shan United (Myanmar).",
      "Mariano Peralta menilai grup ini sangat berat karena diisi klub-klub terbaik dari tiap negara, tetapi menyebutnya tantangan yang akan dihadapi dengan persiapan matang.",
      "Shopee Cup menjadi kompetisi keempat PERSIB di musim 2026/27. Peralta menilai jadwal padat sudah menjadi hal biasa bagi tim, dan klub mengandalkan kedalaman skuad.",
    ],
  },
  {
    slug: "persib-pinjamkan-dua-pemain-ke-psgc",
    title: "PERSIB pinjamkan Athaya Zahran dan Kevin Pasha ke PSGC Ciamis",
    category: "academy",
    date: "2026-09-25",
    excerpt:
      "Dua pemain muda berusia 20 tahun itu dipinjamkan ke klub satelit agar mendapat menit bermain.",
    image: "/news/news-08.png",
    featured: false,
    sourceUrl:
      "https://persib.co.id/article-details/persib-pinjamkan-dua-pemain-muda-ke-psgc",
    body: [
      "PERSIB meminjamkan Athaya Zahran dan Kevin Muhammad Islami Pasha ke PSGC Ciamis, klub satelit PERSIB. Keduanya berusia 20 tahun dan belum pernah tampil di laga resmi bersama tim utama.",
      "Deputy CEO Adhitia Putra Herawan menjelaskan bahwa peminjaman bertujuan memberi menit bermain dan pengalaman bertanding, sekaligus mendukung kebutuhan PSGC. Perkembangan keduanya tetap dipantau klub.",
    ],
  },
  {
    slug: "nazriel-alfaro-dipanggil-timnas-u20",
    title:
      "Nazriel Alfaro dipanggil Timnas U20 untuk persiapan Piala Asia U20 2027",
    category: "academy",
    date: "2026-09-25",
    excerpt:
      "Gelandang muda PERSIB menyatakan tekad memberikan kemampuan terbaik bagi Garuda Muda.",
    image: "/news/news-09.jpg",
    featured: false,
    sourceUrl:
      "https://persib.co.id/article-details/tekad-nazriel-bersama-timnas-u20",
    body: [
      "Nazriel Alfaro Syahdan, gelandang muda PERSIB kelahiran 2007, mendapat panggilan memperkuat Timnas Indonesia U20 yang bersiap menghadapi AFC U20 Asian Cup 2027.",
      "Ia mengaku senang dan berharap bisa berkembang serta membantu tim. Nazriel juga menyadari pentingnya menjaga kebugaran di tengah jadwal padat bersama PERSIB sebelum bergabung dengan timnas.",
    ],
  },
  {
    slug: "jersey-khusus-shopee-cup-2026-27",
    title: "PERSIB luncurkan jersey khusus Shopee Cup 2026/27",
    category: "club",
    date: "2026-09-24",
    excerpt:
      "Tersedia desain Home dan Away untuk pemain dan penjaga gawang, dalam versi Player Issue dan Supporter Edition.",
    image: "/news/news-10.jpg",
    featured: true,
    sourceUrl:
      "https://persib.co.id/article-details/persib-luncurkan-jersey-khusus-shopee-cup-202627",
    body: [
      "PERSIB memperkenalkan jersey khusus ASEAN Club Championship Shopee Cup 2026/27 dengan semangat Edankeun di Asia. Ada dua desain, Home dan Away, masing-masing untuk pemain dan penjaga gawang.",
      "Jersey Home berwarna biru dengan pola gelombang suara, sedangkan Away memadukan biru dan putih dalam pola kotak. Bahan utamanya diproduksi dengan teknologi rajut komputer.",
      "Jersey dijual di PERSIB Store Jalan Sulanjana No. 17 Bandung dan kanal resmi lainnya, seharga Rp999.000 untuk Player Issue dan Rp249.000 untuk Supporter Edition. Jadwal ketersediaan akan diumumkan klub.",
    ],
  },
];

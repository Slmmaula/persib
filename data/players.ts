import type { CountryCode, Player, PlayerPosition } from "@/lib/types";
import { slugify } from "@/lib/utils";

// Nama, nomor, kebangsaan, dan usia berasal dari klub.
// TODO: isi statistik, honours, dan grafik musiman saat data resmi tersedia.
// Untuk memakai foto asli: tambahkan slug => path di photoOverrides.

const photoOverrides: Record<string, string> = {
  "teja-paku-alam": "/players/Teja.png",
  "fitrah-maulana": "/players/fitrah.png",
  "rhaka-syafaka": "/players/rakha.png",
  "eliano-reijnders": "/players/reijnders.png",
  "gabriel-mutombo": "/players/mutombo.png",
  "julio-cesar": "/players/julio.png",
  "kakang-rudianto": "/players/kakang.png",
  "sandy-walsh": "/players/walsh.png",
  "danijel-loncar": "/players/loncar.png",
  "ikhwan-tanamal": "/players/tanamal.png",
  "patricio-matricardi": "/players/matricardi.png",

  "luciano-guaycochea": "/players/luciano.png",
  "dedi-kusnandar": "/players/dedi.png",
  "gakuto-notsuda": "/players/notsuda.png",
  "adam-alis": "/players/adam.png",
  "nazriel-alfaro": "/players/nazriel.png",
  "marc-klok": "/players/klok.png",
  "thom-haye": "/players/Thom-haye.png",

  "beckham-putra": "/players/beckham.png",
  "luka-menalo": "/players/menalo.png",
  "mariano-peralta": "/players/peralta.png",
  "febri-hariyadi": "/players/febri.png",
  "rafi-rasyiq": "/players/rafi.png",
  "ragnar-oratmangoen": "/players/ragnar.png",
  "uilliam-barros": "/players/barros.png",
  berguinho: "/players/berg.png",
  "balsa-sekulic": "/players/balsa.png",
};

function player(
  position: PlayerPosition,
  number: number,
  firstName: string,
  lastName: string,
  nationality: CountryCode,
  age: number,
): Player {
  const slug = slugify([firstName, lastName].filter(Boolean).join(" "));
  return {
    slug,
    firstName,
    lastName,
    number,
    position,
    nationality,
    photo: photoOverrides[slug] ?? `/players/${slug}.svg`,
    stats: {
      minutesPlayed: null,
      appearances: null,
      highlight: null,
      heightCm: null,
      weightKg: null,
      age,
    },
    rings: [null, null],
    honours: [],
    seasonSeries: [],
  };
}

export const players: Player[] = [
  player("goalkeeper", 14, "Teja", "Paku Alam", "ID", 32),
  player("goalkeeper", 81, "Fitrah", "Maulana", "ID", 20),
  player("goalkeeper", 60, "Rhaka", "Syafaka", "ID", 18),

  player("defender", 2, "Eliano", "Reijnders", "ID", 26),
  player("defender", 3, "Gabriel", "Mutombo", "FR", 30),
  player("defender", 4, "Júlio", "César", "BR", 31),
  player("defender", 5, "Kakang", "Rudianto", "ID", 23),
  player("defender", 6, "Sandy", "Walsh", "ID", 31),
  player("defender", 22, "Danijel", "Loncar", "HR", 29),
  player("defender", 40, "Ikhwan", "Tanamal", "ID", 22),
  player("defender", 48, "Patricio", "Matricardi", "AR", 32),

  player("midfielder", 8, "Luciano", "Guaycochea", "AR", 34),
  player("midfielder", 11, "Dedi", "Kusnandar", "ID", 35),
  player("midfielder", 17, "Gakuto", "Notsuda", "JP", 32),
  player("midfielder", 18, "Adam", "Alis", "ID", 32),
  player("midfielder", 19, "Nazriel", "Alfaro", "ID", 18),
  player("midfielder", 23, "Marc", "Klok", "ID", 33),
  player("midfielder", 33, "Thom", "Haye", "ID", 31),

  player("forward", 7, "Beckham", "Putra", "ID", 24),
  player("forward", 9, "Luka", "Menalo", "BA", 30),
  player("forward", 10, "Mariano", "Peralta", "AR", 28),
  player("forward", 13, "Febri", "Hariyadi", "ID", 30),
  player("forward", 30, "Rafi", "Rasyiq", "ID", 17),
  player("forward", 77, "Ragnar", "Oratmangoen", "ID", 28),
  player("forward", 94, "Uilliam", "Barros", "BR", 32),
  player("forward", 97, "", "Berguinho", "BR", 29),
  player("forward", 99, "Balsa", "Sekulic", "ME", 28),
];

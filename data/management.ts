import type { CountryCode, StaffMember } from "@/lib/types";
import { slugify } from "@/lib/utils";

const photoOverrides: Record<string, string> = {
  "igor-tolic": "/players/igor.png",
  "zlatko-runje": "/players/zlatko.png",
  "achmad-jufriyanto": "/players/jupe.png",
  "h-umuh-muchtar": "/players/umuh.png",
  "irfan-suryadireja": "/players/irfan.png",
  "mario-jozic": "/players/mario.png",
  "i-made-wirawan": "/players/made.png",
  "bojan-hodak": "/players/bojan.png",
  "stanley-bernard": "/players/stanley.png",
  "ahmed-el-wardani": "/players/ahmed.png",
  "atreeyu-andrey": "/players/atreeyu.png",
  gunawan: "/players/gunawan.png",
  "wira-prasetya": "/players/wira.png",
  "yaya-sunarya": "/players/yaya.png",
  "karlo-reinholz": "/players/karlo.png",
  "geraldo-santos": "/players/geraldo.png",
  benidektus: "/players/beni.png",
  "iyang-mulyana": "/players/iyang.png",
  "tatang-sutisna": "/players/tatang.png",
};

function member(
  firstName: string,
  lastName: string,
  role: string,
  nationality: CountryCode,
): StaffMember {
  const slug = slugify([firstName, lastName].filter(Boolean).join(" "));
  return {
    slug,
    firstName,
    lastName,
    role,
    nationality,
    photo: photoOverrides[slug] ?? `/players/${slug}.svg`,
  };
}

export const staff: StaffMember[] = [
  member("Igor", "Tolic", "Head Coach", "HR"),
  member("Zlatko", "Runje", "Asst Coach", "HR"),
  member("Achmad", "Jufriyanto", "Asst Coach", "ID"),
  member("H. Umuh", "Muchtar", "Manager Tim", "ID"),
  member("Irfan", "Suryadireja", "Sekretaris Tim", "ID"),
  member("Mario", "Jozic", "GK Coach", "HR"),
  member("I Made", "Wirawan", "GK Coach", "ID"),
  member("Bojan", "Hodak", "Strategic Advisor", "HR"),
  member("Stanley", "Bernard", "Sporting Director", "MY"),
  member("Ahmed", "El Wardani", "Head of Scouting & Observer Analis", "EG"),
  member("Atreeyu", "Andrey", "Video Analis", "ID"),
  member("", "Gunawan", "Video Analis", "ID"),
  member("Wira", "Prasetya", "Doctor Team", "ID"),
  member("Yaya", "Sunarya", "Pelatih Fisik", "ID"),
  member("Karlo", "Reinholz", "Pelatih Fisik", "HR"),
  member("Geraldo", "Santos", "Physioterapi", "BR"),
  member("", "Benidektus", "Physioterapi", "ID"),
  member("Iyang", "Mulyana", "Masseur", "ID"),
  member("Tatang", "Sutisna", "Masseur", "ID"),
];

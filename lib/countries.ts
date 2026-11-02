import type { CountryCode } from "@/lib/types";

export const countries: Record<CountryCode, { name: string; flag: string }> = {
  ID: { name: "Indonesia", flag: "/flags/id.svg" },
  FR: { name: "Prancis", flag: "/flags/fr.svg" },
  BR: { name: "Brasil", flag: "/flags/br.svg" },
  HR: { name: "Kroasia", flag: "/flags/hr.svg" },
  AR: { name: "Argentina", flag: "/flags/ar.svg" },
  JP: { name: "Jepang", flag: "/flags/jp.svg" },
  BA: { name: "Bosnia-Herzegovina", flag: "/flags/ba.svg" },
  ME: { name: "Montenegro", flag: "/flags/me.svg" },
  MY: { name: "Malaysia", flag: "/flags/my.svg" },
  EG: { name: "Mesir", flag: "/flags/eg.svg" },
};

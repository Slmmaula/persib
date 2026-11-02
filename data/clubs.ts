import type { Club } from "@/lib/types";

type ClubSource = readonly [
  id: string,
  name: string,
  shortName: string,
  logo: string,
];

const source: readonly ClubSource[] = [
  ["persib", "PERSIB", "SIB", "persib-5.png"],
  ["arema", "Arema FC", "ARE", "Arema.png"],
  ["bali", "Bali United", "BAL", "Bali.png"],
  ["bhayangkara", "Bhayangkara FC", "BHY", "Bhayangkara.png"],
  ["borneo", "Borneo FC", "BOR", "Borneo.png"],
  ["dewa", "Dewa United FC", "DEW", "dewa.png"],
  ["garudayaksa", "Garudayaksa FC", "GRD", "Garudayaksa.png"],
  ["isenmulang", "Isenmulang Kalteng", "ISK", "isenmulang.png"],
  ["java", "Java United", "JAV", "java.png"],
  ["madura", "Madura United", "MAD", "Madura.png"],
  ["persebaya", "Persebaya", "SBY", "Persebaya.png"],
  ["persija", "Persija", "PSJ", "Persija.png"],
  ["persijap", "Persijap", "JPR", "Persijap.png"],
  ["persik", "Persik", "KDR", "Persik.png"],
  ["persita", "Persita", "TNG", "Persita.png"],
  ["psim", "PSIM", "SIM", "PSIM.png"],
  ["psm", "PSM Makassar", "MKS", "PSM.png"],
  ["pss", "PSS Sleman", "SLM", "pss.png"],
  ["melbourne", "Melbourne Victory", "MEL", "melbourne.png"],
  ["shan", "Shan United", "SHN", "shan.png"],
  ["seoul", "FC Seoul", "SEO", "seoul.png"],
  ["viettel", "Viettel FC", "VIE", "viettel.png"],
  ["lioncity", "Lion City Sailors", "LCS", "lioncity.png"],
  ["johor", "Johor Darul Takzim", "JDT", "johor.png"],
  ["port", "Port FC", "POR", "port.png"],
];

export const clubs: Record<string, Club> = Object.fromEntries(
  source.map(([id, name, shortName, logo]) => [
    id,
    { id, name, shortName, badge: `/clubs/${logo}` },
  ]),
);

export function getClub(id: string): Club {
  const club = clubs[id];
  if (!club) {
    throw new Error(`Klub dengan id "${id}" tidak ada di data/clubs.ts`);
  }
  return club;
}

export const persib: Club = getClub("persib");

import Image from "next/image";
import { FormDots } from "@/components/ui/form-dots";
import { getClub } from "@/data/clubs";
import { standings, standingsInfo } from "@/data/standings";
import { formatDate } from "@/lib/format";
import { formatSigned, getGoalDifference, getPoints } from "@/lib/standings";
import { cn } from "@/lib/utils";

const headCell =
  "px-2 py-4 text-center text-label font-bold uppercase tracking-label text-muted";
const cell = "px-2 py-3.5 text-center tabular-nums";
const wide = "hidden md:table-cell";

export function StandingsTable() {
  return (
    <section aria-labelledby="standings-title">
      <div className="mt-6 overflow-x-auto rounded-panel border border-glass-border bg-surface-panel">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            Klasemen {standingsInfo.competition}
          </caption>
          <thead>
            <tr>
              <th scope="col" className={cn(headCell, "w-14 pl-5")}>
                #
              </th>
              <th scope="col" className={cn(headCell, "text-left")}>
                Klub
              </th>
              <th scope="col" title="Main" className={headCell}>
                P
              </th>
              <th scope="col" title="Menang" className={cn(headCell, wide)}>
                W
              </th>
              <th scope="col" title="Seri" className={cn(headCell, wide)}>
                D
              </th>
              <th scope="col" title="Kalah" className={cn(headCell, wide)}>
                L
              </th>
              <th
                scope="col"
                title="Gol memasukkan"
                className={cn(headCell, wide)}
              >
                GF
              </th>
              <th
                scope="col"
                title="Gol kemasukan"
                className={cn(headCell, wide)}
              >
                GA
              </th>
              <th scope="col" title="Selisih gol" className={headCell}>
                GD
              </th>
              <th scope="col" title="Poin" className={cn(headCell, "pr-5")}>
                Pts
              </th>
              <th
                scope="col"
                title="Hasil 5 laga terakhir"
                className={cn(headCell, "hidden pr-5 lg:table-cell")}
              >
                Form
              </th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, index) => {
              const club = getClub(row.clubId);
              const isPersib = row.clubId === "persib";
              return (
                <tr
                  key={row.clubId}
                  className={cn(
                    "border-t border-glass-border",
                    isPersib && "bg-accent/10 font-bold",
                  )}
                >
                  <td
                    className={cn(
                      cell,
                      "pl-5",
                      isPersib &&
                        "relative before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-accent before:content-['']",
                    )}
                  >
                    {index + 1}
                  </td>
                  <th
                    scope="row"
                    className="px-2 py-3.5 text-left font-[inherit]"
                  >
                    <span className="flex items-center gap-3">
                      <Image
                        src={club.badge}
                        alt=""
                        width={28}
                        height={28}
                        className="size-7 shrink-0 object-contain"
                      />
                      <span>{club.name}</span>
                    </span>
                  </th>
                  <td className={cell}>{row.played}</td>
                  <td className={cn(cell, wide)}>{row.won}</td>
                  <td className={cn(cell, wide)}>{row.drawn}</td>
                  <td className={cn(cell, wide)}>{row.lost}</td>
                  <td className={cn(cell, wide)}>{row.goalsFor}</td>
                  <td className={cn(cell, wide)}>{row.goalsAgainst}</td>
                  <td className={cell}>
                    {formatSigned(getGoalDifference(row))}
                  </td>
                  <td className={cn(cell, "pr-5 font-bold")}>
                    {getPoints(row)}
                  </td>
                  <td className="hidden px-2 py-3.5 pr-5 lg:table-cell">
                    <FormDots form={row.form} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import type { FormResult } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<FormResult, string> = {
  W: "bg-result-win",
  D: "bg-result-draw",
  L: "bg-result-loss",
};

const labels: Record<FormResult, string> = {
  W: "Menang",
  D: "Seri",
  L: "Kalah",
};

export function FormDots({ form }: { form?: readonly FormResult[] }) {
  if (!form || form.length === 0) {
    return (
      <>
        <span aria-hidden="true" className="text-muted">
          –
        </span>
        <span className="sr-only">Belum ada data</span>
      </>
    );
  }

  return (
    <ul
      aria-label="Hasil 5 laga terakhir, dari yang terbaru"
      className="flex justify-center gap-1.5"
    >
      {form.map((result, index) => (
        <li key={index}>
          <span
            aria-hidden="true"
            className={cn(
              "grid size-6 place-items-center rounded-md text-micro font-bold text-white",
              styles[result],
            )}
          >
            {result}
          </span>
          <span className="sr-only">{labels[result]}</span>
        </li>
      ))}
    </ul>
  );
}

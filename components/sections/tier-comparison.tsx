import { Check, X } from "lucide-react";
import { benefits, plans } from "@/data/membership";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

export function TierComparison() {
  return (
    <section
      aria-labelledby="tier-title"
      className="container-page py-12 md:py-16"
    >
      <h2 id="tier-title" className="font-semibold text-section">
        Tier Comparison
      </h2>

      <div className="mt-8 overflow-x-auto rounded-panel border border-glass-border bg-surface-panel">
        <table className="w-full min-w-[46rem] border-collapse text-sm">
          <caption className="sr-only">
            Perbandingan benefit semua paket Member
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 w-64 bg-surface-panel p-4 text-left text-label font-bold uppercase tracking-label text-muted"
              >
                Benefit
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn(
                    "px-3 py-4 text-center",
                    plan.featured && "bg-accent/10",
                  )}
                >
                  <span className="block font-heading text-base font-semibold">
                    {plan.name}
                  </span>
                  <span className="mt-1 block text-sm font-normal text-muted">
                    {formatRupiah(plan.price)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {benefits.map((benefit) => (
              <tr key={benefit.id} className="border-t border-glass-border">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-surface-panel p-4 text-left font-semibold"
                >
                  {benefit.label}
                  {benefit.hint ? (
                    <span className="mt-1 block text-xs font-normal text-muted">
                      {benefit.hint}
                    </span>
                  ) : null}
                </th>
                {plans.map((plan) => {
                  const value = plan.benefits[benefit.id];
                  return (
                    <td
                      key={plan.id}
                      className={cn(
                        "px-3 py-3.5 text-center align-middle",
                        plan.featured && "bg-accent/10",
                      )}
                    >
                      <span className="flex flex-col items-center gap-1">
                        {value.active ? (
                          <Check
                            aria-hidden
                            className="size-5 text-accent"
                            strokeWidth={3}
                          />
                        ) : (
                          <X aria-hidden className="size-5 text-muted" />
                        )}
                        <span className="sr-only">
                          {value.active ? "Termasuk" : "Tidak termasuk"}
                        </span>
                        {value.detail ? (
                          <span
                            className={cn(
                              "text-xs leading-4",
                              value.active ? "text-white" : "text-muted",
                            )}
                          >
                            {value.detail}
                          </span>
                        ) : null}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

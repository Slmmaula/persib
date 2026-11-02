export type DateVariant = "long" | "day-month" | "weekday" | "month-year";

const options: Record<DateVariant, Intl.DateTimeFormatOptions> = {
  long: { day: "numeric", month: "long", year: "numeric" },
  "day-month": { day: "numeric", month: "long" },
  weekday: { weekday: "long", day: "numeric", month: "short", year: "numeric" },
  "month-year": { month: "long", year: "numeric" },
};

const formatters = Object.fromEntries(
  Object.entries(options).map(([variant, config]) => [
    variant,
    new Intl.DateTimeFormat("id-ID", { ...config, timeZone: "UTC" }),
  ]),
) as Record<DateVariant, Intl.DateTimeFormat>;

export function formatDate(iso: string, variant: DateVariant = "long"): string {
  return formatters[variant].format(new Date(`${iso}T00:00:00Z`));
}

export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}

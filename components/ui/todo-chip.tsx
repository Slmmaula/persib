import { cn } from "@/lib/utils";

export function TodoChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm border border-accent px-2 py-0.5 text-micro font-bold uppercase tracking-label text-accent",
        className,
      )}
    >
      TODO: verifikasi
    </span>
  );
}

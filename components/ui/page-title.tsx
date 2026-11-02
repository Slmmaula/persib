import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageTitle({ title, subtitle, className }: PageTitleProps) {
  return (
    <div className={cn("flex items-start gap-4", className)}>
      <span
        aria-hidden="true"
        className="mt-2 h-8 w-2.5 shrink-0 rounded-pill bg-accent md:mt-3 md:h-11"
      />
      <div>
        <h1 className="font-display text-[length:clamp(2.5rem,6vw,5rem)] uppercase leading-none">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-label font-bold uppercase tracking-label text-muted">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

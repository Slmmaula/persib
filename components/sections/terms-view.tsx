"use client";

import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { termsSections } from "@/data/terms";
import type { TermsBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

const emailPattern = /([A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+)/g;

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(emailPattern).map((part, index) =>
        index % 2 === 1 ? (
          <a
            key={index}
            href={`mailto:${part}`}
            className="font-semibold text-accent underline underline-offset-4 transition-opacity duration-(--duration-fast) hover:opacity-80"
          >
            {part}
          </a>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function Blocks({ blocks }: { blocks: TermsBlock[] }) {
  return (
    <div className="mt-3 max-w-3xl space-y-4 text-base leading-7 text-white/85">
      {blocks.map((block, index) =>
        typeof block === "string" ? (
          <p key={index}>
            <RichText text={block} />
          </p>
        ) : (
          <h4
            key={index}
            className="pt-2 font-heading text-base font-semibold text-white"
          >
            {block.subheading}
          </h4>
        ),
      )}
    </div>
  );
}

export function TermsView() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("section");
  const active =
    termsSections.find((section) => section.id === requested) ??
    termsSections[0];

  function select(id: string) {
    window.history.replaceState(null, "", `/terms?section=${id}`);
  }

  function markerFor(index: number): string {
    return active.marker === "letter"
      ? String.fromCharCode(65 + index)
      : String(index + 1);
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
      <nav
        aria-label="Bagian ketentuan"
        className="lg:sticky lg:top-28 lg:self-start"
      >
        <ul className="-mx-page flex gap-6 overflow-x-auto px-page [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {termsSections.map((section) => {
            const isActive = section.id === active.id;
            return (
              <li key={section.id} className="shrink-0">
                <button
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => select(section.id)}
                  className={cn(
                    "block w-full border-b-2 py-3 text-left text-sm font-semibold transition-colors duration-(--duration-fast) lg:border-b-0 lg:border-l-2 lg:px-5 lg:py-4",
                    isActive
                      ? "border-accent text-white"
                      : "border-transparent text-muted hover:text-white lg:border-glass-border",
                  )}
                >
                  {section.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <article
        key={active.id}
        aria-labelledby="terms-heading"
        className="min-w-0 animate-page-enter"
      >
        <h2
          id="terms-heading"
          className="font-heading text-section font-semibold"
        >
          {active.heading ?? active.title}
        </h2>

        {active.download ? (
          <a
            href={active.download.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-6 text-label font-bold uppercase tracking-label text-on-accent transition-opacity duration-(--duration-fast) hover:opacity-90"
          >
            <Download aria-hidden className="size-4" />
            {active.download.label}
          </a>
        ) : null}

        {active.clauses ? (
          <ol className="mt-8 space-y-10">
            {active.clauses.map((clause, index) => (
              <li key={clause.heading}>
                <h3 className="flex gap-3 font-heading text-lg font-semibold">
                  <span className="text-accent">{markerFor(index)}.</span>
                  {clause.heading}
                </h3>
                <Blocks blocks={clause.body} />
              </li>
            ))}
          </ol>
        ) : null}

        {active.items ? (
          <ul className="mt-8 max-w-3xl list-disc space-y-4 pl-5 text-base leading-7 text-white/85 marker:text-accent">
            {active.items.map((item, index) => (
              <li key={index}>
                <RichText text={item.text} />
                {item.subItems ? (
                  <ul className="mt-3 list-[circle] space-y-2 pl-5 marker:text-accent">
                    {item.subItems.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <RichText text={sub} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {active.note ? (
          <p className="mt-8 max-w-3xl border-l-2 border-accent bg-accent/10 px-4 py-3 text-sm font-semibold leading-6">
            <RichText text={active.note} />
          </p>
        ) : null}
      </article>
    </div>
  );
}

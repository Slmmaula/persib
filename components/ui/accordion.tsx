"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { duration, ease } from "@/lib/motion";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AccordionRowProps {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}

function AccordionRow({ item, open, onToggle }: AccordionRowProps) {
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <li>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-5 text-left font-heading text-base font-semibold transition-colors duration-(--duration-fast) hover:text-accent sm:text-lg"
        >
          {item.question}
          <Plus
            aria-hidden
            className={cn(
              "size-5 shrink-0 transition-transform duration-(--duration-base) ease-brand",
              open && "rotate-45",
            )}
          />
        </button>
      </h3>
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: duration.base, ease }}
        className="overflow-hidden"
      >
        <p className="max-w-4xl pb-5 pr-10 text-base leading-7 text-white/85">
          {item.answer}
        </p>
      </motion.div>
    </li>
  );
}

export function Accordion({ items }: { items: readonly FaqItem[] }) {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <ul className="divide-y divide-glass-border border-y border-glass-border">
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          open={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </ul>
  );
}

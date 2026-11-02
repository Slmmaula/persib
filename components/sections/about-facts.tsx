import { TodoChip } from "@/components/ui/todo-chip";
import { facts } from "@/data/about";

export function AboutFacts() {
  return (
    <dl className="mt-12 grid gap-6 sm:grid-cols-3">
      {facts.map((fact) => (
        <div
          key={fact.id}
          id={fact.id}
          className="scroll-mt-28 border-t border-glass-border pt-5"
        >
          <dt className="text-label font-bold uppercase tracking-label text-muted">
            {fact.label}
          </dt>
          <dd className="mt-3 font-heading text-ring font-semibold">
            {fact.value}
          </dd>
          {fact.todo ? <TodoChip className="mt-3" /> : null}
        </div>
      ))}
    </dl>
  );
}

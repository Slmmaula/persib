import { Accordion } from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-title"
      className="container-page py-12 md:py-16"
    >
      <h2 id="faq-title" className="font-semibold text-section">
        FAQs
      </h2>
      <div className="mt-8">
        <Accordion items={faqs} />
      </div>
    </section>
  );
}

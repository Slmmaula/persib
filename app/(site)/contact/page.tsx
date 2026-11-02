import { ContactInfo } from "@/components/sections/contact-info";
import { ContactMap } from "@/components/sections/contact-map";
import { PageTitle } from "@/components/ui/page-title";

export const metadata = { title: "Kontak Kami" };

export default function ContactPage() {
  return (
    <div className="container-page pb-16 pt-[calc(var(--spacing-header)+1.625rem)] md:pb-24">
      <PageTitle title="Kontak Kami" />
      <ContactInfo />
      <ContactMap />
    </div>
  );
}

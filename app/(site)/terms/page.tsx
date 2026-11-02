import { Suspense } from "react";
import { TermsView } from "@/components/sections/terms-view";
import { PageTitle } from "@/components/ui/page-title";

export const metadata = { title: "Syarat dan Ketentuan" };

export default function TermsPage() {
  return (
    <div className="container-page pb-16 pt-[calc(var(--spacing-header)+1.625rem)] md:pb-24">
      <PageTitle title="Syarat dan Ketentuan" />
      <Suspense>
        <TermsView />
      </Suspense>
    </div>
  );
}

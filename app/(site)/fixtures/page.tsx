import { Suspense } from "react";
import { FixturesView } from "@/components/sections/fixtures-view";

export const metadata = { title: "Jadwal" };

export default function FixturesPage() {
  return (
    <Suspense>
      <FixturesView />
    </Suspense>
  );
}

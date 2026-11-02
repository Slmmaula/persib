import { Suspense } from "react";
import { TeamView } from "@/components/sections/team-view";

export const metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <Suspense>
      <TeamView />
    </Suspense>
  );
}

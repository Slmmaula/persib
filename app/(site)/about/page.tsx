import { AboutFacts } from "@/components/sections/about-facts";
import { AboutHonours } from "@/components/sections/about-honours";
import { HistoryTimeline } from "@/components/sections/history-timeline";
import { PageTitle } from "@/components/ui/page-title";
import { PhotoHero } from "@/components/ui/photo-hero";
import { about } from "@/data/about";

export const metadata = { title: "Tentang" };

export default function AboutPage() {
  return (
    <>
      <PhotoHero src={about.heroImage} />
      <div className="container-page relative -mt-8 pb-16 md:-mt-12 md:pb-24">
        <PageTitle title={about.title} />
        <div className="mt-8 max-w-3xl space-y-5">
          {about.intro.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-white/85">
              {paragraph}
            </p>
          ))}
        </div>
        <AboutFacts />
        <HistoryTimeline />
        <AboutHonours />
      </div>
    </>
  );
}

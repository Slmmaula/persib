import { AppCta } from "@/components/sections/app-cta";
import { FeaturedNews } from "@/components/sections/featured-news";
import { Hero } from "@/components/sections/hero";
import { HomeMembership } from "@/components/sections/home-membership";
import { Partners } from "@/components/sections/partners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeMembership />
      <FeaturedNews />
      <AppCta />
      <Partners />
    </>
  );
}

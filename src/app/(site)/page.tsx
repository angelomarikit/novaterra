import { HeroBanner } from "@/components/home/HeroBanner";
import {
  WhyExistsSection,
  WasteChallengeSection,
} from "@/components/home/ChallengeSections";
import {
  NovaterraCycleSection,
  ValueChainSection,
} from "@/components/home/CycleSections";
import { HomeCta } from "@/components/home/HomeCta";
import { getHomeHero, getWhyExists } from "@/lib/content/fetch";

export default async function HomePage() {
  const [hero, whyExists] = await Promise.all([getHomeHero(), getWhyExists()]);

  return (
    <>
      <HeroBanner content={hero} />
      <WhyExistsSection content={whyExists} />
      <WasteChallengeSection />
      <NovaterraCycleSection />
      <ValueChainSection />
      <HomeCta />
    </>
  );
}

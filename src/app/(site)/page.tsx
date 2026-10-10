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
import { NewsSection } from "@/components/home/NewsSection";
import {
  getHomeHero,
  getNewsSectionHeader,
  getPublishedBlogPosts,
  getValueChainSection,
  getWhyExists,
} from "@/lib/content/fetch";

export default async function HomePage() {
  const [hero, whyExists, valueChain, newsHeader, posts] = await Promise.all([
    getHomeHero(),
    getWhyExists(),
    getValueChainSection(),
    getNewsSectionHeader(),
    getPublishedBlogPosts(3),
  ]);

  return (
    <>
      <HeroBanner content={hero} />
      <WhyExistsSection content={whyExists} />
      <WasteChallengeSection />
      <NovaterraCycleSection />
      <ValueChainSection content={valueChain} />
      <NewsSection header={newsHeader} posts={posts} />
      <HomeCta />
    </>
  );
}

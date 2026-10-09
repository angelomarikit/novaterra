import type { Metadata } from "next";
import Image from "next/image";
import {
  SUSTAINABILITY_PILLARS,
  SUSTAINABILITY_BY_DESIGN,
  LONG_TERM_VISION,
  FUTURE_OF_CIRCULAR_ECONOMY,
  CORE_PRINCIPLES,
  SECTION_IMAGES,
} from "@/lib/content/defaults";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";
import { getSectionImage } from "@/lib/content/fetch";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Sustainability by design — environmental, social, economic, and governance outcomes.",
};

const PILLARS = [
  {
    key: "environmental",
    title: "Environmental",
    items: SUSTAINABILITY_PILLARS.environmental,
  },
  { key: "social", title: "Social", items: SUSTAINABILITY_PILLARS.social },
  {
    key: "economic",
    title: "Economic",
    items: SUSTAINABILITY_PILLARS.economic,
  },
  {
    key: "governance",
    title: "Governance",
    items: SUSTAINABILITY_PILLARS.governance,
  },
] as const;

export default async function SustainabilityPage() {
  const esgImage = await getSectionImage(
    "sustainability",
    "by_design",
    SECTION_IMAGES.sustainability_esg,
  );

  return (
    <>
      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <FadeIn>
            <h1 className="font-display text-4xl font-bold tracking-tight text-forest-deep sm:text-5xl">
              {SUSTAINABILITY_BY_DESIGN.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {SUSTAINABILITY_BY_DESIGN.body}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {PILLARS.map((pillar, i) => (
                <article
                  key={pillar.key}
                  className="rounded-[1.5rem] border border-stroke bg-sand/60 p-5"
                >
                  <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-forest">
                    {pillar.title}
                  </h2>
                  <div className="mt-2.5 h-1 w-8 rounded-full brand-gradient" />
                  <ul className="mt-4 space-y-2">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Image
              src={esgImage}
              alt="Stewardship, recovery, and waste circularity around Novaterra infrastructure"
              width={592}
              height={558}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 45vw"
              quality={100}
              priority
            />
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden section-pad bg-forest-deep text-white">
        <div className="pointer-events-none absolute inset-0 leaf-pattern opacity-25" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-[40%] earth-stripes opacity-25" />
        <div className="container-page relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">
              {CORE_PRINCIPLES.title}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {CORE_PRINCIPLES.subtitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75">
              {CORE_PRINCIPLES.body}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Image
              src={CORE_PRINCIPLES.imageUrl}
              alt="Use, Recover, Recycle, Reuse, Reintroduce — waste is not the end of the cycle"
              width={1024}
              height={224}
              className="h-auto w-full rounded-2xl bg-white p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={100}
            />
          </FadeIn>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <FadeIn>
            <SectionHeading
              eyebrow={LONG_TERM_VISION.title}
              title={LONG_TERM_VISION.subtitle}
              subtitle={LONG_TERM_VISION.body}
            />
          </FadeIn>
          <div className="mt-8 overflow-x-auto pb-2">
            <div className="flex min-w-max items-center gap-3">
              {LONG_TERM_VISION.network.map((node, i) => (
                <div key={node} className="flex items-center gap-3">
                  <div className="rounded-2xl border border-stroke bg-sand px-5 py-4 text-sm font-semibold text-forest">
                    {node}
                  </div>
                  {i < LONG_TERM_VISION.network.length - 1 ? (
                    <span className="text-teal">→</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-muted">{LONG_TERM_VISION.closing}</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
              {FUTURE_OF_CIRCULAR_ECONOMY.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-forest-deep sm:text-4xl">
              {FUTURE_OF_CIRCULAR_ECONOMY.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {FUTURE_OF_CIRCULAR_ECONOMY.body}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Image
              src={FUTURE_OF_CIRCULAR_ECONOMY.imageUrl}
              alt="Future of circular economy — innovation, stewardship, and regenerative systems"
              width={507}
              height={481}
              className="mx-auto h-auto w-full max-w-[380px]"
              sizes="(max-width: 1024px) 70vw, 380px"
              quality={100}
            />
          </FadeIn>
        </div>
      </section>
    </>
  );
}

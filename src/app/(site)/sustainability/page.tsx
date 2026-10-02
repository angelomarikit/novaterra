import type { Metadata } from "next";
import {
  SUSTAINABILITY_PILLARS,
  LONG_TERM_VISION,
  FUTURE_STATEMENT,
  CORE_PRINCIPLES,
  SECTION_IMAGES,
} from "@/lib/content/defaults";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";
import { SectionImage } from "@/components/shared/SectionImage";
import { getSectionImage } from "@/lib/content/fetch";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Sustainability by design — environmental, economic, social, and governance outcomes.",
};

const PILLARS = [
  {
    key: "environmental",
    title: "Environmental",
    items: SUSTAINABILITY_PILLARS.environmental,
  },
  {
    key: "economic",
    title: "Economic",
    items: SUSTAINABILITY_PILLARS.economic,
  },
  { key: "social", title: "Social", items: SUSTAINABILITY_PILLARS.social },
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
      <section className="relative overflow-hidden border-b border-stroke bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(140,198,63,0.16),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 earth-stripes opacity-[0.16]" />
        <div className="container-page relative section-pad">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
              Sustainability by Design
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-forest-deep sm:text-5xl">
              Measuring impact across the full circular system
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Diversion, recovery, and waste circularity — designed into
              infrastructure, markets, and governance from day one.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-stretch">
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar, i) => (
              <FadeIn key={pillar.key} delay={i * 0.05}>
                <article className="h-full rounded-[1.5rem] border border-stroke bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display text-xl font-semibold text-forest">
                      {pillar.title}
                    </h2>
                    <span className="rounded-full bg-sand px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted">
                      ESG+
                    </span>
                  </div>
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
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.1}>
            <SectionImage
              src={esgImage}
              alt="Sustainability outcomes across environment and community"
              className="h-full min-h-[320px] w-full"
              sizes="(max-width: 1024px) 100vw, 38vw"
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "Diversion", tone: "bg-leaf" },
                { label: "Recovery", tone: "bg-teal" },
                { label: "Circularity", tone: "bg-ocean" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-3xl ${item.tone} px-4 py-8 text-center font-display text-sm font-semibold uppercase tracking-[0.12em]`}
                >
                  {item.label}
                </div>
              ))}
              {CORE_PRINCIPLES.stages.map((stage) => (
                <div
                  key={stage}
                  className="rounded-3xl border border-white/15 bg-white/5 px-4 py-6 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/85"
                >
                  {stage}
                </div>
              ))}
            </div>
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
        <div className="container-page">
          <FadeIn>
            <article className="relative overflow-hidden rounded-[2rem] border border-stroke bg-white p-8 sm:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full brand-gradient opacity-20 blur-2xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-32 earth-stripes opacity-15" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                Future of Circular Economy
              </p>
              <p className="relative mt-5 max-w-4xl text-lg leading-relaxed text-forest-deep sm:text-xl">
                {FUTURE_STATEMENT}
              </p>
            </article>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

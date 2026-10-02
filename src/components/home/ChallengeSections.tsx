"use client";

import { useState } from "react";
import { WHY_EXISTS, WASTE_CHALLENGES, SECTION_IMAGES } from "@/lib/content/defaults";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";
import { SectionImage } from "@/components/shared/SectionImage";
import { cn } from "@/lib/utils";

type WhyContent = typeof WHY_EXISTS & { imageUrl?: string };

export function WhyExistsSection({
  content = { ...WHY_EXISTS, imageUrl: SECTION_IMAGES.home_why_exists },
}: {
  content?: WhyContent;
}) {
  const imageUrl = content.imageUrl || SECTION_IMAGES.home_why_exists;

  return (
    <section className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[22%] earth-stripes opacity-[0.22] lg:block" />
      <div className="pointer-events-none absolute bottom-10 left-[18%] hidden h-20 w-20 rounded-full border-[8px] border-leaf/25 lg:block" />
      <div className="pointer-events-none absolute right-8 top-12 h-28 w-28 dot-grid opacity-40" />

      <div className="container-page relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <FadeIn>
          <SectionHeading
            eyebrow="Purpose"
            title={content.title}
            subtitle={content.body}
          />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {content.mission}
          </p>
          <div className="mt-8 inline-flex rounded-full bg-forest px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(47,74,40,0.25)]">
            {content.highlight}
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="relative overflow-hidden rounded-[2rem] border border-stroke bg-white p-6 shadow-[0_24px_60px_rgba(21,32,24,0.06)] sm:p-8">
            <div className="absolute -left-2 top-10 h-16 w-2 rounded-full bg-leaf/50" />
            <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr] sm:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                  From disposal to recovery
                </p>
                <p className="mt-4 font-display text-xl font-semibold leading-snug text-forest-deep sm:text-2xl">
                  Technology creates the possibility. Integration creates the
                  business. Sustainability creates the long-term value.
                </p>
              </div>
              <SectionImage
                src={imageUrl}
                alt="From waste disposal to resource recovery"
                className="aspect-[4/3] w-full"
                sizes="(max-width: 640px) 100vw, 280px"
              />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {["Divert", "Recover", "Circulate"].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl bg-sand px-3 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-forest ring-1 ring-leaf/10"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function WasteChallengeSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden section-pad bg-white">
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-40 earth-stripes opacity-[0.12]" />
      <div className="pointer-events-none absolute right-10 top-16 h-24 w-24 rounded-full border border-dashed border-teal/25" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading
            eyebrow="The Waste Challenge"
            title="From waste management to resource management"
            subtitle="Five structural pressures shaping the need for circular infrastructure."
          />
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <ul className="space-y-2">
              {WASTE_CHALLENGES.map((item, i) => (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "w-full rounded-2xl border px-5 py-4 text-left transition-all",
                      active === i
                        ? "border-forest bg-forest text-white shadow-lg"
                        : "border-stroke bg-sand/60 text-forest hover:border-forest/30 hover:bg-white",
                    )}
                  >
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] opacity-70">
                      0{i + 1}
                    </span>
                    <span className="mt-1 block text-sm font-semibold sm:text-base">
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative flex h-full min-h-[280px] flex-col justify-center overflow-hidden rounded-[2rem] border border-stroke bg-sand p-8 lg:p-10">
              <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full brand-gradient opacity-20 blur-2xl" />
              <div className="pointer-events-none absolute right-0 top-0 h-20 w-24 earth-stripes opacity-15" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                Challenge detail
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-forest-deep sm:text-3xl">
                {WASTE_CHALLENGES[active].title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {WASTE_CHALLENGES[active].body}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

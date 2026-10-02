"use client";

import { useState } from "react";
import {
  PYROLYSIS,
  PYROLYSIS_MODEL,
  CORE_PRINCIPLES,
  CYCLE_STEPS,
  PHILOSOPHY,
  SECTION_IMAGES,
} from "@/lib/content/defaults";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";
import { SectionImage } from "@/components/shared/SectionImage";
import { cn } from "@/lib/utils";

export default function TechnologyView({
  imageUrl = SECTION_IMAGES.technology_pyrolysis,
}: {
  imageUrl?: string;
}) {
  const [step, setStep] = useState(0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-stroke bg-white">
        <div className="absolute right-0 top-0 h-full w-1/3 earth-stripes opacity-[0.1]" />
        <div className="pointer-events-none absolute left-8 bottom-8 h-24 w-24 leaf-pattern opacity-50" />
        <div className="container-page relative section-pad">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                Technology
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-forest-deep sm:text-5xl">
                {PYROLYSIS.title}
              </h1>
              <p className="mt-3 text-lg font-medium text-forest">
                {PYROLYSIS.subtitle}
              </p>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
                {PYROLYSIS.body}
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <SectionImage
                src={imageUrl}
                alt="Pyrolysis by-products — oil, syngas, and carbon materials"
                className="aspect-[16/10] w-full"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </FadeIn>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PYROLYSIS.products.map((product, i) => (
              <FadeIn key={product.title} delay={i * 0.06}>
                <article className="relative h-full overflow-hidden rounded-3xl bg-forest px-6 py-7 text-white">
                  <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-20 earth-stripes opacity-20" />
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-lime">
                    By-product 0{i + 1}
                  </p>
                  <h2 className="mt-3 font-display text-xl font-semibold">
                    {product.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    {product.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <FadeIn>
            <SectionHeading
              eyebrow="Novaterra Pyrolysis Model"
              title="Identify → transform → recover → apply"
              subtitle="A six-stage circular resource flow from feedstock characterization to end-use markets."
            />
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PYROLYSIS_MODEL.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.04}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className={cn(
                    "h-full w-full rounded-3xl border p-6 text-left transition",
                    step === i
                      ? "border-teal bg-white shadow-lg ring-1 ring-teal/20"
                      : "border-stroke bg-white/70 hover:border-forest/25",
                  )}
                >
                  <p className="font-display text-3xl font-bold text-lime">
                    {item.step}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-forest-deep">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <FadeIn>
            <SectionHeading
              eyebrow={CORE_PRINCIPLES.title}
              title={CORE_PRINCIPLES.subtitle}
              subtitle={CORE_PRINCIPLES.body}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {CORE_PRINCIPLES.stages.map((stage) => (
                <span
                  key={stage}
                  className="rounded-full border border-forest/15 bg-sand px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest"
                >
                  {stage}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] bg-forest-deep p-8 text-white">
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-28 earth-stripes opacity-25" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
                Cycle overview
              </p>
              <ol className="mt-6 space-y-3">
                {CYCLE_STEPS.map((s, i) => (
                  <li key={s.label} className="flex gap-3 text-sm">
                    <span className="font-semibold text-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/85">{s.label}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 border-t border-white/10 pt-6 text-sm italic text-white/70">
                {PHILOSOPHY}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

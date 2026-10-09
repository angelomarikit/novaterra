"use client";

import Image from "next/image";
import { CYCLE_STEPS, VALUE_CHAIN } from "@/lib/content/defaults";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";

export function NovaterraCycleSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-36 earth-stripes opacity-[0.12]" />
      <div className="pointer-events-none absolute right-12 top-20 h-32 w-32 rounded-full border border-leaf/20" />
      <div className="container-page relative">
        <FadeIn>
          <SectionHeading
            eyebrow="The Novaterra Cycle"
            title="From waste stream to recovered value — and back again"
            subtitle="The objective is to transform a disposal-oriented system into a resource-oriented system."
          />
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mx-auto mt-12 max-w-4xl">
            <Image
              src="/sections/circular-value.png"
              alt="Novaterra Circular Value — waste stream through resource returns to the economy"
              width={872}
              height={687}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 896px"
              quality={100}
              priority
            />
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CYCLE_STEPS.map((step, i) => (
            <FadeIn key={step.label} delay={0.04 * i}>
              <article className="h-full rounded-2xl border border-stroke bg-white/80 p-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-teal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-sm font-semibold text-forest-deep">
                  {step.label}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {step.detail}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ValueChainSection() {
  return (
    <section className="relative overflow-hidden section-pad bg-white">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 earth-stripes opacity-[0.1]" />
      <div className="container-page relative">
        <FadeIn>
          <SectionHeading
            title="More Than a Pyrolysis Plant"
            subtitle="Novaterra's strength lies in connecting the complete value chain."
          />
        </FadeIn>

        <FadeIn delay={0.06}>
          <figure className="mx-auto mt-10 w-full max-w-[640px]">
            <Image
              src="/sections/value-chain-board-2x.png"
              alt="Value chain: Waste, Technology, Infrastructure, Recovery, Market, and Sustainability"
              width={1540}
              height={1232}
              className="h-auto w-full"
              sizes="(max-width: 640px) 100vw, 640px"
              quality={100}
              priority
            />
          </figure>
        </FadeIn>

        <ul className="sr-only">
          {VALUE_CHAIN.map((item) => (
            <li key={item.title}>
              {item.title} — {item.body}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

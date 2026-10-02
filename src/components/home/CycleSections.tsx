"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CYCLE_STEPS, VALUE_CHAIN } from "@/lib/content/defaults";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";
import { cn } from "@/lib/utils";

export function NovaterraCycleSection() {
  const [active, setActive] = useState(0);
  const radius = 160;

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

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <FadeIn className="relative mx-auto aspect-square w-full max-w-[420px]">
            <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-lime/10 via-teal/10 to-ocean/10" />
            <div className="absolute inset-[12%] rounded-full border border-dashed border-forest/20" />
            <div className="absolute inset-[28%] flex items-center justify-center rounded-full bg-forest-deep text-center text-white shadow-2xl ring-4 ring-leaf/15">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-lime">
                  Circular Value
                </p>
                <p className="mt-2 px-4 font-display text-lg font-semibold">
                  Novaterra
                </p>
              </div>
            </div>

            {CYCLE_STEPS.map((step, i) => {
              const angle = (i / CYCLE_STEPS.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-bold transition-all",
                    active === i
                      ? "scale-110 bg-teal text-white shadow-lg"
                      : "bg-white text-forest ring-1 ring-stroke hover:ring-teal/40",
                  )}
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  aria-label={step.label}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              );
            })}
          </FadeIn>

          <FadeIn delay={0.1}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[2rem] border border-stroke bg-white p-8 shadow-[0_20px_50px_rgba(21,32,24,0.05)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                Step {String(active + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-forest-deep">
                {CYCLE_STEPS[active].label}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {CYCLE_STEPS[active].detail}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {CYCLE_STEPS.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition",
                      active === i
                        ? "bg-forest text-white"
                        : "bg-sand text-muted hover:text-forest",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function ValueChainSection() {
  return (
    <section className="relative overflow-hidden section-pad bg-forest-deep text-white">
      <div className="pointer-events-none absolute inset-0 leaf-pattern opacity-20" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-[42%] earth-stripes opacity-25" />
      <div className="pointer-events-none absolute left-10 top-10 h-24 w-24 rounded-full border border-lime/20" />

      <div className="container-page relative">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">
            More than a pyrolysis plant
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Novaterra&apos;s strength lies in connecting the complete value
            chain.
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE_CHAIN.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <article className="group h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10">
                <div className="mb-3 h-1 w-8 rounded-full bg-lime/70" />
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-teal">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

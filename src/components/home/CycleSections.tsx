"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  CYCLE_STEPS,
  VALUE_CHAIN,
  VALUE_CHAIN_SECTION,
} from "@/lib/content/defaults";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";

type ValueChainContent = typeof VALUE_CHAIN_SECTION;

export function NovaterraCycleSection() {
  const reduce = useReducedMotion();

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
          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="pointer-events-none absolute left-1/2 top-[42%] h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,169,157,0.28)_0%,rgba(140,198,63,0.12)_45%,transparent_70%)] blur-2xl" />
            {!reduce ? (
              <>
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-[42%] h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/25"
                  animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.15, 0.35] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-[42%] h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-leaf/20"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.08, 0.25] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                />
              </>
            ) : null}

            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Image
                src="/sections/circular-value.png"
                alt="Novaterra Circular Value — waste stream through resource returns to the economy"
                width={746}
                height={599}
                className="relative h-auto w-full drop-shadow-[0_18px_40px_rgba(30,50,28,0.12)]"
                sizes="(max-width: 1024px) 100vw, 896px"
                quality={100}
                priority
              />
            </motion.div>
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

export function ValueChainSection({
  content = VALUE_CHAIN_SECTION,
}: {
  content?: ValueChainContent;
}) {
  const items = content.items?.length ? content.items : VALUE_CHAIN;

  return (
    <section className="relative overflow-hidden section-pad bg-sand">
      <div className="pointer-events-none absolute inset-0 leaf-pattern opacity-[0.28]" />
      <div className="pointer-events-none absolute -left-24 top-16 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(140,198,63,0.18)_0%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(0,169,157,0.16)_0%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-44 earth-stripes opacity-[0.12]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-[48%] earth-stripes opacity-[0.1]" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading title={content.title} subtitle={content.subtitle} />
        </FadeIn>

        <FadeIn delay={0.06}>
          <figure className="relative mx-auto mt-10 w-full max-w-[1100px]">
            <Image
              src={content.imageUrl}
              alt="Value chain: Waste, Technology, Infrastructure, Recovery, Market, and Sustainability"
              width={2048}
              height={1152}
              className="relative h-auto w-full"
              sizes="(max-width: 1100px) 100vw, 1100px"
              quality={100}
              unoptimized
              priority
            />
          </figure>
        </FadeIn>

        <ul className="sr-only">
          {items.map((item) => (
            <li key={item.title}>
              {item.title} — {item.body}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

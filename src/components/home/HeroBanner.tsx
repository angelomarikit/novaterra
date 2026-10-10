"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { HERO, SECTION_IMAGES } from "@/lib/content/defaults";
import { Button } from "@/components/ui/Button";

export type HeroContent = typeof HERO;

export function HeroBanner({ content = HERO }: { content?: HeroContent }) {
  const reduce = useReducedMotion();
  const hero = content;
  const imageUrl = hero.imageUrl || SECTION_IMAGES.home_hero;
  const paragraphs = hero.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="relative isolate min-h-[min(92vh,920px)] overflow-hidden">
      <div className="absolute inset-0 earth-mesh" />
      <div className="absolute inset-0 leaf-pattern opacity-[0.35]" />
      <div className="pointer-events-none absolute -right-24 top-24 h-[520px] w-[520px] rounded-full brand-gradient opacity-20 blur-3xl animate-drift" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-[55%] earth-stripes opacity-[0.14]" />
      <div className="pointer-events-none absolute left-0 top-0 h-36 w-36 stripe-panel opacity-[0.18]" />
      <div className="pointer-events-none absolute bottom-16 left-[18%] h-3 w-28 rounded-full bg-leaf/25" />

      <div className="container-page relative grid min-h-[min(92vh,920px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-forest backdrop-blur"
          >
            <Leaf size={14} className="text-leaf" />
            {hero.eyebrow}
          </motion.p>

          <div className="space-y-2">
            {hero.lines.map((line, i) => (
              <motion.h1
                key={`${line}-${i}`}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.08 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-display font-bold tracking-tight ${
                  i === 0
                    ? "brand-text text-4xl sm:text-5xl lg:text-6xl"
                    : "text-3xl text-ink sm:text-4xl lg:text-5xl"
                }`}
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-lg"
          >
            {paragraphs.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href={hero.primaryCta.href}>
              <Button size="lg">
                {hero.primaryCta.label}
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href={hero.secondaryCta.href}>
              <Button size="lg" variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            </Link>
          </motion.div>

          <motion.ul
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {hero.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-forest/10 bg-white/70 px-3 py-1 text-xs font-medium text-forest"
              >
                {tag}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full"
        >
          <Image
            src={imageUrl}
            alt="Novaterra Circular Value — from waste stream to recovered value and back again"
            width={876}
            height={701}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 640px"
            quality={100}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

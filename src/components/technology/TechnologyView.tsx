"use client";

import Image from "next/image";
import {
  PYROLYSIS,
  PYROLYSIS_MODEL,
  CORE_PRINCIPLES,
  SECTION_IMAGES,
} from "@/lib/content/defaults";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";
import { SectionImage } from "@/components/shared/SectionImage";

export default function TechnologyView({
  imageUrl = SECTION_IMAGES.technology_pyrolysis,
}: {
  imageUrl?: string;
}) {
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
              title="Circular Resource Flow"
              subtitle="Identify → transform → recover → apply"
            />
          </FadeIn>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PYROLYSIS_MODEL.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.04}>
                <figure className="m-0">
                  <Image
                    src={item.image_url}
                    alt={`${item.step} ${item.title} — ${item.body}`}
                    width={780}
                    height={514}
                    className="h-auto w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={100}
                    priority={i < 3}
                  />
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <FadeIn>
            <SectionHeading
              eyebrow={CORE_PRINCIPLES.title}
              title={CORE_PRINCIPLES.subtitle}
              subtitle={CORE_PRINCIPLES.body}
            />
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-10">
              <Image
                src={CORE_PRINCIPLES.imageUrl}
                alt="Use, Recover, Recycle, Reuse, Reintroduce — waste is not the end of the cycle"
                width={1024}
                height={224}
                className="h-auto w-full"
                sizes="(max-width: 1400px) 100vw, 1400px"
                quality={100}
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

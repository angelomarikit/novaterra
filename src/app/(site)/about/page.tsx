import type { Metadata } from "next";
import {
  VISION,
  MISSION,
  VALUES,
  COMMITMENTS,
  TEAM,
  WHY_EXISTS,
} from "@/lib/content/defaults";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";
import { SectionImage } from "@/components/shared/SectionImage";
import { getLongTermVision } from "@/lib/content/fetch";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vision, mission, leadership team, and corporate values of Novaterra Circular Economy Inc.",
};

export default async function AboutPage() {
  const vision = await getLongTermVision();

  return (
    <>
      <section className="relative overflow-hidden border-b border-stroke bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,169,157,0.12),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 earth-stripes opacity-[0.18]" />
        <div className="pointer-events-none absolute right-10 top-10 h-28 w-28 leaf-pattern opacity-60" />
        <div className="container-page relative section-pad">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
              About Novaterra
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-forest-deep sm:text-5xl">
              Building circular infrastructure for a better tomorrow
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {WHY_EXISTS.mission}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <article className="h-full rounded-[2rem] border border-stroke bg-white p-8 shadow-sm">
              <div className="mb-4 h-1.5 w-10 rounded-full brand-gradient" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                Our Vision
              </p>
              <p className="mt-4 text-lg leading-relaxed text-forest-deep">
                {VISION}
              </p>
            </article>
          </FadeIn>
          <FadeIn delay={0.08}>
            <article className="relative h-full overflow-hidden rounded-[2rem] bg-forest-deep p-8 text-white shadow-sm">
              <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-36 earth-stripes opacity-25" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-lime">
                Our Mission
              </p>
              <p className="relative mt-4 text-lg leading-relaxed text-white/85">
                {MISSION}
              </p>
            </article>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <FadeIn>
            <SectionHeading
              eyebrow="Corporate Values"
              title="Principles that guide every project"
            />
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.04}>
                <article className="h-full rounded-3xl border border-stroke bg-sand/50 p-6 transition hover:border-leaf/25 hover:bg-white hover:shadow-md">
                  <div className="mb-3 h-1.5 w-8 rounded-full brand-gradient" />
                  <h3 className="font-display text-xl font-semibold text-forest">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {value.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden section-pad">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 leaf-pattern opacity-40" />
        <div className="container-page relative">
          <FadeIn>
            <SectionHeading
              eyebrow="Our Commitment"
              title="Responsible development, end to end"
              subtitle="Six commitments that keep projects technically sound, commercially credible, and environmentally accountable."
            />
          </FadeIn>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.04}>
                <article className="rounded-3xl border border-stroke bg-white p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-teal">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-forest-deep">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <FadeIn>
            <SectionHeading
              eyebrow="The Novaterra Team"
              title="The people building circular infrastructure"
              subtitle="Leadership spanning technology, operations, management, and governance."
            />
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.04}>
                <article className="flex items-center gap-4 rounded-3xl border border-stroke bg-sand/40 p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl brand-gradient text-sm font-bold text-white">
                    {member.name
                      .split(" ")
                      .filter((p) => !p.toLowerCase().startsWith("engr"))
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-forest-deep">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-teal">{member.title}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2rem] border border-stroke bg-white p-6 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <SectionHeading
                    eyebrow={vision.title}
                    title={vision.subtitle}
                    subtitle={vision.body}
                  />
                  <div className="mt-8 flex flex-wrap gap-3">
                    {vision.network.map((node, i) => (
                      <div key={node} className="flex items-center gap-3">
                        <span className="rounded-full bg-forest px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                          {node}
                        </span>
                        {i < vision.network.length - 1 ? (
                          <span className="hidden text-teal sm:inline">→</span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted">
                    {vision.closing}
                  </p>
                </div>
                <SectionImage
                  src={vision.imageUrl}
                  alt="Network of circular infrastructure"
                  className="aspect-[4/3] min-h-[240px] w-full lg:min-h-[320px]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

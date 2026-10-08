import Image from "next/image";
import type { TeamMember } from "@/types/content";
import { FadeIn } from "@/components/shared/Motion";
import { cn } from "@/lib/utils";

function formatTitle(title: string) {
  return title.replace(/\s*\/\s*/g, " / ").toUpperCase();
}

export function TeamSection({ members }: { members: TeamMember[] }) {
  const published = members.filter((m) => m.is_published);

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <FadeIn>
          <div className="flex flex-col gap-4 border-b border-stroke pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm text-muted">
                The people building circular infrastructure for a better
                tomorrow.
              </p>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-[#1a6bb5]">
                Leadership Team
              </p>
            </div>
            <div className="lg:text-right">
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-forest-deep sm:text-4xl">
                The Novaterra Team
              </h2>
              <div className="mt-2 h-px w-full bg-stroke lg:ml-auto lg:w-48" />
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {published.map((member, i) => {
            // First 4 (top half): photo left + forest text; last 4: photo right + blue text
            const topHalf = i < 4;
            const photoLeft = topHalf;
            const textGreen = topHalf;

            return (
              <FadeIn key={`${member.name}-${member.sort_order}`} delay={i * 0.03}>
                <article
                  className={cn(
                    "flex h-full min-h-[148px] items-center gap-3 rounded-2xl bg-[#f3f5f7] p-3",
                    photoLeft ? "flex-row" : "flex-row-reverse",
                  )}
                >
                  <div className="relative h-[120px] w-[96px] shrink-0 overflow-hidden rounded-xl bg-white">
                    {member.photo_url ? (
                      <Image
                        src={member.photo_url}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-forest/10 font-display text-lg font-bold text-forest">
                        {member.name
                          .split(" ")
                          .filter((p) => !p.toLowerCase().startsWith("engr"))
                          .slice(0, 2)
                          .map((p) => p[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <div
                    className={cn(
                      "min-w-0 flex-1",
                      photoLeft ? "text-left" : "text-right",
                    )}
                  >
                    <h3
                      className={cn(
                        "font-display text-[0.78rem] font-bold uppercase leading-snug tracking-wide sm:text-[0.82rem]",
                        textGreen ? "text-forest" : "text-[#1a6bb5]",
                      )}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-1.5 text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.04em]",
                        textGreen ? "text-forest/75" : "text-[#0f3d6e]",
                      )}
                    >
                      {formatTitle(member.title)}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

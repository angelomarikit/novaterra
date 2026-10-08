import Image from "next/image";
import type { TeamMember } from "@/types/content";
import { FadeIn } from "@/components/shared/Motion";
import { cn } from "@/lib/utils";

/** Match company-profile title style: CHIEF-TECHNOLOGY-OFFICER */
function formatTitle(title: string) {
  return title
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+/g, "-")
    .replace(/-\/-/g, " / ")
    .toUpperCase();
}

function initials(name: string) {
  return name
    .split(" ")
    .filter((p) => !p.toLowerCase().startsWith("engr"))
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

/** Default company-profile board — exact visual from the brand deck */
function usesDefaultBoard(members: TeamMember[]) {
  if (members.length < 8) return false;
  return members.every(
    (m) =>
      !m.photo_url ||
      m.photo_url.startsWith("/team/") ||
      m.photo_url.includes("leadership"),
  );
}

export function TeamSection({ members }: { members: TeamMember[] }) {
  const published = members
    .filter((m) => m.is_published)
    .sort((a, b) => a.sort_order - b.sort_order);

  const showBoard = usesDefaultBoard(published);

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <FadeIn>
          <div className="flex flex-col gap-3 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm text-muted">
                The people building circular infrastructure for a better
                tomorrow.
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-[#1a6bb5]">
                Leadership Team
              </p>
            </div>
            <div className="lg:text-right">
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-forest-deep sm:text-4xl">
                The Novaterra Team
              </h2>
              <div className="mt-2 h-px w-full bg-stroke lg:ml-auto lg:w-52" />
            </div>
          </div>
        </FadeIn>

        {showBoard ? (
          <FadeIn delay={0.06}>
            <div className="relative w-full overflow-hidden">
              <Image
                src="/team/leadership-exact-2x.png"
                alt="Novaterra leadership team"
                width={2400}
                height={715}
                className="h-auto w-full"
                sizes="(max-width: 1200px) 100vw, 1100px"
                quality={95}
                priority
              />
            </div>
            <ul className="sr-only">
              {published.map((m) => (
                <li key={m.name}>
                  {m.name} — {m.title}
                </li>
              ))}
            </ul>
          </FadeIn>
        ) : (
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {published.map((member, i) => {
              const topRow = i < 4;
              return (
                <FadeIn key={`${member.name}-${member.sort_order}`} delay={i * 0.03}>
                  <article
                    className={cn(
                      "relative flex h-[140px] items-end overflow-visible rounded-2xl bg-[#eef1f4]",
                      topRow ? "flex-row" : "flex-row-reverse",
                    )}
                  >
                    <div
                      className={cn(
                        "relative z-10 h-[148px] w-[42%] shrink-0",
                        topRow ? "-ml-0" : "-mr-0",
                      )}
                    >
                      {member.photo_url ? (
                        <Image
                          src={member.photo_url}
                          alt={member.name}
                          fill
                          className="object-contain object-bottom"
                          sizes="160px"
                          quality={95}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-forest">
                          {initials(member.name)}
                        </div>
                      )}
                    </div>
                    <div
                      className={cn(
                        "relative z-0 flex min-w-0 flex-1 flex-col justify-center px-3 pb-5 pt-4",
                        topRow ? "items-start text-left" : "items-start text-left",
                      )}
                    >
                      <h3
                        className={cn(
                          "font-sans text-[0.7rem] font-bold uppercase leading-[1.15] tracking-wide sm:text-[0.72rem]",
                          topRow ? "text-[#2f4a28]" : "text-[#1a6bb5]",
                        )}
                      >
                        {member.name}
                      </h3>
                      <p
                        className={cn(
                          "mt-1 text-[0.58rem] font-semibold uppercase leading-snug tracking-[0.02em] sm:text-[0.62rem]",
                          topRow ? "text-[#2f4a28]/80" : "text-[#0f3d6e]",
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
        )}
      </div>
    </section>
  );
}

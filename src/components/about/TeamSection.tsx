import Image from "next/image";
import type { TeamMember } from "@/types/content";
import { FadeIn } from "@/components/shared/Motion";
import { TEAM } from "@/lib/content/defaults";

const LEADERSHIP = TEAM.filter((m) => m.is_published).sort(
  (a, b) => a.sort_order - b.sort_order,
);

export function TeamSection({ members }: { members: TeamMember[] }) {
  const fromCms = members
    .filter((m) => m.is_published)
    .sort((a, b) => a.sort_order - b.sort_order);

  const roster =
    fromCms.length >= 8
      ? fromCms.slice(0, 8)
      : LEADERSHIP.map((fallback) => {
          const match = fromCms.find(
            (m) =>
              m.name.trim().toLowerCase() === fallback.name.trim().toLowerCase(),
          );
          return match ?? fallback;
        });

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <FadeIn>
          <Image
            src="/team/leadership-exact-2x.png"
            alt="The Novaterra Team — leadership team"
            width={2048}
            height={1142}
            className="h-auto w-full"
            sizes="(max-width: 1200px) 100vw, 1100px"
            quality={100}
            priority
          />
        </FadeIn>

        <ul className="sr-only">
          {roster.map((m) => (
            <li key={m.name}>
              {m.name} — {m.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

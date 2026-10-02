import Link from "next/link";
import type { BlogPost, NewsSectionHeader } from "@/types/content";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";
import { SectionImage } from "@/components/shared/SectionImage";
import { NEWS_SECTION } from "@/lib/content/defaults";

const CATEGORY_LABEL: Record<BlogPost["category"], string> = {
  news: "News",
  article: "Article",
  blog: "Blog",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsSection({
  header = NEWS_SECTION,
  posts,
}: {
  header?: NewsSectionHeader;
  posts: BlogPost[];
}) {
  if (posts.length === 0) return null;

  return (
    <section className="relative overflow-hidden section-pad bg-sand/60">
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-leaf/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 dot-grid opacity-30" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading
            eyebrow={header.eyebrow}
            title={header.title}
            subtitle={header.subtitle}
          />
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={0.06 * i}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stroke bg-white shadow-[0_20px_50px_rgba(21,32,24,0.06)] transition hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-[0_28px_60px_rgba(21,32,24,0.1)]">
                {post.image_url ? (
                  <Link href={`/news/${post.slug}`} className="block">
                    <SectionImage
                      src={post.image_url}
                      alt=""
                      className="aspect-[16/10] w-full rounded-none border-0"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </Link>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-forest/10 px-2.5 py-1 font-semibold uppercase tracking-[0.14em] text-forest">
                      {CATEGORY_LABEL[post.category]}
                    </span>
                    <time
                      dateTime={post.published_at}
                      className="text-muted"
                    >
                      {formatDate(post.published_at)}
                    </time>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-forest-deep group-hover:text-teal">
                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                  </h3>
                  {post.excerpt ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={`/news/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal hover:text-forest"
                  >
                    Read more
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

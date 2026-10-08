import type { Metadata } from "next";
import Link from "next/link";
import {
  getNewsSectionHeader,
  getPublishedBlogPosts,
} from "@/lib/content/fetch";
import { FadeIn, SectionHeading } from "@/components/shared/Motion";
import { SectionImage } from "@/components/shared/SectionImage";
import type { BlogPost } from "@/types/content";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "News, articles, and insights from Novaterra Circular Economy Inc.",
};

const CATEGORY_LABEL: Record<BlogPost["category"], string> = {
  news: "News",
  article: "Article",
  blog: "Blog",
};

export default async function NewsIndexPage() {
  const [header, posts] = await Promise.all([
    getNewsSectionHeader(),
    getPublishedBlogPosts(24),
  ]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-stroke bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,169,157,0.12),transparent_40%)]" />
        <div className="container-page relative section-pad">
          <FadeIn>
            <SectionHeading
              eyebrow={header.eyebrow}
              title="News & Updates"
              subtitle={header.subtitle}
            />
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={0.04 * i}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stroke bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-md">
                {post.image_url ? (
                  <Link href={`/news/${post.slug}`}>
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
                    <time dateTime={post.published_at} className="text-muted">
                      {new Date(post.published_at).toLocaleDateString("en-PH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-forest-deep group-hover:text-teal">
                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={`/news/${post.slug}`}
                    className="mt-5 text-sm font-semibold text-teal hover:text-forest"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}

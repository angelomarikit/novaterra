import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionImage } from "@/components/shared/SectionImage";
import { getBlogPostBySlug } from "@/lib/content/fetch";
import type { BlogPost } from "@/types/content";

const CATEGORY_LABEL: Record<BlogPost["category"], string> = {
  news: "News",
  article: "Article",
  blog: "Blog",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} | Novaterra`,
    description: post.excerpt ?? undefined,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.body.split(/\n\n+/).filter(Boolean);

  return (
    <article className="section-pad">
      <div className="container-page max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-teal hover:text-forest"
        >
          ← Back to home
        </Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          {CATEGORY_LABEL[post.category]}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-forest-deep sm:text-4xl">
          {post.title}
        </h1>
        <time
          dateTime={post.published_at}
          className="mt-4 block text-sm text-muted"
        >
          {new Date(post.published_at).toLocaleDateString("en-PH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {post.image_url ? (
          <SectionImage
            src={post.image_url}
            alt=""
            className="mt-8 aspect-[16/9] w-full"
            sizes="720px"
            priority
          />
        ) : null}
        <div className="prose prose-neutral mt-10 max-w-none space-y-5 text-base leading-relaxed text-muted">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

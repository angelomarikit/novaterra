import { createClient } from "@/lib/supabase/server";
import type { BlogPost, ContentSection, NewsSectionHeader } from "@/types/content";
import {
  HERO,
  WHY_EXISTS,
  SITE,
  SECTION_IMAGES,
  LONG_TERM_VISION,
  NEWS_SECTION,
  DEFAULT_BLOG_POSTS,
} from "@/lib/content/defaults";

export async function getSection(
  pageKey: string,
  sectionKey: string,
): Promise<ContentSection | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("content_sections")
    .select("*")
    .eq("page_key", pageKey)
    .eq("section_key", sectionKey)
    .eq("is_published", true)
    .maybeSingle();

  return (data as ContentSection) || null;
}

export async function getSiteSettings() {
  const supabase = await createClient();
  if (!supabase) return SITE;

  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (!data) return SITE;

  return {
    company_name: data.company_name || SITE.company_name,
    tagline: data.tagline || SITE.tagline,
    phone: data.phone || SITE.phone,
    email: data.email || SITE.email,
    address: data.address || SITE.address,
    website: data.website || SITE.website,
  };
}

export async function getHomeHero() {
  const section = await getSection("home", "hero_banner");
  if (!section) return HERO;

  const tags =
    (section.content_json?.tags as string[] | undefined) || HERO.tags;

  const subtitleParts = section.subtitle
    ? section.subtitle.split(/(?<=\.)\s+/).filter(Boolean)
    : [];

  const lines = [
    section.title || HERO.lines[0],
    subtitleParts[0] || HERO.lines[1],
    subtitleParts[1] || HERO.lines[2],
  ];

  return {
    ...HERO,
    lines,
    description: section.body || HERO.description,
    tags,
  };
}

export async function getWhyExists() {
  const section = await getSection("home", "why_exists");
  if (!section) {
    return {
      ...WHY_EXISTS,
      imageUrl: SECTION_IMAGES.home_why_exists,
    };
  }

  return {
    title: section.title || WHY_EXISTS.title,
    body: section.body || WHY_EXISTS.body,
    mission:
      (section.content_json?.mission as string | undefined) ||
      WHY_EXISTS.mission,
    highlight:
      (section.content_json?.highlight as string | undefined) ||
      WHY_EXISTS.highlight,
    imageUrl: section.image_url || SECTION_IMAGES.home_why_exists,
  };
}

export async function getSectionImage(
  pageKey: string,
  sectionKey: string,
  fallback: string,
) {
  const section = await getSection(pageKey, sectionKey);
  return section?.image_url || fallback;
}

export async function getNewsSectionHeader(): Promise<NewsSectionHeader> {
  const section = await getSection("home", "news_highlights");
  if (!section) return NEWS_SECTION;

  return {
    eyebrow: NEWS_SECTION.eyebrow,
    title: section.title || NEWS_SECTION.title,
    subtitle:
      section.subtitle ||
      section.body?.slice(0, 200) ||
      NEWS_SECTION.subtitle,
  };
}

export async function getPublishedBlogPosts(limit = 6): Promise<BlogPost[]> {
  const supabase = await createClient();
  if (!supabase) return DEFAULT_BLOG_POSTS.slice(0, limit);

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false })
    .limit(limit);

  if (!data?.length) return DEFAULT_BLOG_POSTS.slice(0, limit);
  return data as BlogPost[];
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const supabase = await createClient();
  if (!supabase) {
    return DEFAULT_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  }

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (data) return data as BlogPost;
  return DEFAULT_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getLongTermVision() {
  const section = await getSection("about", "long_term_vision");
  if (!section) {
    return {
      ...LONG_TERM_VISION,
      imageUrl: SECTION_IMAGES.about_long_term_vision,
    };
  }

  return {
    title: section.title || LONG_TERM_VISION.title,
    subtitle: section.subtitle || LONG_TERM_VISION.subtitle,
    body: section.body || LONG_TERM_VISION.body,
    network:
      (section.content_json?.network as string[] | undefined) ||
      LONG_TERM_VISION.network,
    closing:
      (section.content_json?.closing as string | undefined) ||
      LONG_TERM_VISION.closing,
    imageUrl: section.image_url || SECTION_IMAGES.about_long_term_vision,
  };
}

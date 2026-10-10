import { createClient } from "@/lib/supabase/server";
import type {
  BlogPost,
  ContentSection,
  NewsSectionHeader,
  TeamMember,
} from "@/types/content";
import {
  HERO,
  WHY_EXISTS,
  SITE,
  SECTION_IMAGES,
  LONG_TERM_VISION,
  NEWS_SECTION,
  DEFAULT_BLOG_POSTS,
  TEAM,
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

export async function getHomeHero(): Promise<typeof HERO> {
  const section = await getSection("home", "hero_banner");
  if (!section) return HERO;

  const tags =
    (section.content_json?.tags as string[] | undefined) || HERO.tags;

  // Prefer new brand defaults when CMS still has the previous hero copy
  const isLegacyHero =
    !!section.body?.includes(
      "We develop, build and operate responsible circular-economy infrastructure",
    ) || section.title === "Transforming Waste.";

  if (isLegacyHero) {
    return { ...HERO, tags };
  }

  const subtitleParts = section.subtitle
    ? section.subtitle.split(/(?<=\.)\s+/).filter(Boolean)
    : [];

  const lines = [
    section.title || HERO.lines[0],
    ...(subtitleParts.length ? subtitleParts : HERO.lines.slice(1)),
  ].filter(Boolean);

  return {
    ...HERO,
    lines,
    description: section.body || HERO.description,
    imageUrl: section.image_url || HERO.imageUrl,
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

function publishedDefaultTeam(): TeamMember[] {
  return TEAM.filter((m) => m.is_published).sort(
    (a, b) => a.sort_order - b.sort_order,
  );
}

/** Merge CMS rows with the full 8-person leadership roster (adds Jared & Henry if missing). */
function mergeTeamWithDefaults(rows: TeamMember[]): TeamMember[] {
  const byName = new Map(
    rows.map((m) => [m.name.trim().toLowerCase(), m] as const),
  );

  return publishedDefaultTeam().map((fallback) => {
    const existing = byName.get(fallback.name.trim().toLowerCase());
    if (!existing) return fallback;
    return {
      ...fallback,
      ...existing,
      photo_url: existing.photo_url || fallback.photo_url,
      title: existing.title || fallback.title,
      sort_order: existing.sort_order || fallback.sort_order,
      is_published: true,
    };
  });
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const supabase = await createClient();
  if (!supabase) return publishedDefaultTeam();

  const { data } = await supabase
    .from("team_members")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (!data?.length) return publishedDefaultTeam();

  return mergeTeamWithDefaults(data as TeamMember[]);
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

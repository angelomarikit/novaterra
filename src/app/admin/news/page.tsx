"use client";

import { useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { CmsImageField } from "@/components/admin/CmsImageField";
import { Button } from "@/components/ui/Button";
import type { BlogPost, NewsCategory } from "@/types/content";
import { DEFAULT_BLOG_POSTS, NEWS_IMAGES } from "@/lib/content/defaults";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_BLOG_POSTS);
  const [activeIdx, setActiveIdx] = useState(0);
  const [email, setEmail] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState("");
  const configured = isSupabaseConfigured();

  const active = posts[activeIdx];

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      if (!supabase) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setEmail(user?.email ?? null);

      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .order("sort_order")
        .order("published_at", { ascending: false });

      if (data?.length) setPosts(data as BlogPost[]);
    }
    load();
  }, []);

  function update(patch: Partial<BlogPost>) {
    setPosts((prev) =>
      prev.map((p, i) => (i === activeIdx ? { ...p, ...patch } : p)),
    );
  }

  function addPost() {
    const stamp = Date.now();
    setPosts((prev) => {
      const next: BlogPost = {
        slug: `new-post-${stamp}`,
        title: "New post title",
        excerpt: "",
        body: "",
        category: "news",
        image_url: NEWS_IMAGES.circular,
        published_at: new Date().toISOString(),
        sort_order: prev.length + 1,
        is_published: false,
      };
      setActiveIdx(prev.length);
      return [...prev, next];
    });
  }

  async function save() {
    setSaving(true);
    setNote("");
    const supabase = createClient();

    if (!supabase) {
      setNote("Local preview only — connect Supabase to persist posts.");
      setSaving(false);
      return;
    }

    const payload = {
      slug: active.slug,
      title: active.title,
      excerpt: active.excerpt,
      body: active.body,
      category: active.category,
      image_url: active.image_url,
      published_at: active.published_at,
      sort_order: active.sort_order,
      is_published: active.is_published,
    };

    const { data, error } = active.id
      ? await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", active.id)
          .select("*")
          .single()
      : await supabase.from("blog_posts").insert(payload).select("*").single();

    setSaving(false);
    if (error) {
      setNote(error.message);
      return;
    }
    if (data) {
      setPosts((prev) =>
        prev.map((p, i) => (i === activeIdx ? (data as BlogPost) : p)),
      );
    }
    setNote("Saved successfully.");
  }

  async function removePost() {
    if (!active.id) {
      setPosts((prev) => prev.filter((_, i) => i !== activeIdx));
      setActiveIdx(0);
      return;
    }
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", active.id);
    if (error) {
      setNote(error.message);
      return;
    }
    setPosts((prev) => prev.filter((_, i) => i !== activeIdx));
    setActiveIdx(0);
    setNote("Post deleted.");
  }

  return (
    <AdminShell email={email}>
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-stroke bg-white p-4">
          <div className="flex items-center justify-between gap-2 px-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Posts
            </p>
            <button
              type="button"
              onClick={addPost}
              className="rounded-lg bg-forest px-2 py-1 text-xs font-medium text-white"
            >
              + New
            </button>
          </div>
          <ul className="mt-3 max-h-[420px] space-y-1 overflow-y-auto">
            {posts.map((post, idx) => (
              <li key={post.id ?? post.slug}>
                <button
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                    activeIdx === idx
                      ? "bg-forest text-white"
                      : "text-forest hover:bg-sand"
                  }`}
                >
                  <span className="line-clamp-2">{post.title}</span>
                  {!post.is_published ? (
                    <span className="text-[0.65rem] opacity-70"> · draft</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="rounded-2xl border border-stroke bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                News & articles
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-forest-deep">
                Edit post
              </h2>
              {!configured ? (
                <p className="mt-1 text-xs text-amber-700">
                  Local preview — connect Supabase to sync with the live site.
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={removePost}>
                Delete
              </Button>
              <Button onClick={save} disabled={saving}>
                {saving ? "Saving…" : "Save post"}
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-forest">Title</span>
              <input
                value={active.title}
                onChange={(e) => {
                  const title = e.target.value;
                  update({
                    title,
                    slug: active.id ? active.slug : slugify(title) || active.slug,
                  });
                }}
                className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-forest">Slug</span>
              <input
                value={active.slug}
                onChange={(e) => update({ slug: slugify(e.target.value) })}
                className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 font-mono text-sm outline-none focus:border-teal"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-forest">
                  Category
                </span>
                <select
                  value={active.category}
                  onChange={(e) =>
                    update({ category: e.target.value as NewsCategory })
                  }
                  className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
                >
                  <option value="news">News</option>
                  <option value="article">Article</option>
                  <option value="blog">Blog</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-forest">
                  Sort order
                </span>
                <input
                  type="number"
                  value={active.sort_order}
                  onChange={(e) =>
                    update({ sort_order: Number(e.target.value) || 0 })
                  }
                  className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-forest">
                Excerpt
              </span>
              <textarea
                rows={2}
                value={active.excerpt ?? ""}
                onChange={(e) => update({ excerpt: e.target.value || null })}
                className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-forest">Body</span>
              <textarea
                rows={10}
                value={active.body}
                onChange={(e) => update({ body: e.target.value })}
                className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
              />
            </label>

            <CmsImageField
              label="Cover image"
              folder="news"
              value={active.image_url}
              onChange={(url) => update({ image_url: url })}
              quickPick={Object.values(NEWS_IMAGES)}
            />

            <label className="inline-flex items-center gap-2 text-sm text-forest">
              <input
                type="checkbox"
                checked={active.is_published}
                onChange={(e) => update({ is_published: e.target.checked })}
              />
              Published on website
            </label>
            {note ? <p className="text-sm font-medium text-teal">{note}</p> : null}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

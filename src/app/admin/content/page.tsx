"use client";

import { useEffect, useMemo, useState } from "react";
import { CmsImageField } from "@/components/admin/CmsImageField";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import type { ContentSection } from "@/types/content";
import {
  HERO,
  WHY_EXISTS,
  PYROLYSIS,
  FUTURE_STATEMENT,
  LONG_TERM_VISION,
  NEWS_SECTION,
  SECTION_IMAGES,
  VALUE_CHAIN_SECTION,
} from "@/lib/content/defaults";

const FALLBACK: ContentSection[] = [
  {
    page_key: "home",
    section_key: "hero_banner",
    title: HERO.lines[0],
    subtitle: HERO.lines.slice(1).join(" "),
    body: HERO.description,
    image_url: HERO.imageUrl,
    content_json: { tags: HERO.tags },
    sort_order: 1,
    is_published: true,
  },
  {
    page_key: "home",
    section_key: "why_exists",
    title: WHY_EXISTS.title,
    subtitle: null,
    body: WHY_EXISTS.body,
    image_url: SECTION_IMAGES.home_why_exists,
    content_json: {
      highlight: WHY_EXISTS.highlight,
      mission: WHY_EXISTS.mission,
    },
    sort_order: 2,
    is_published: true,
  },
  {
    page_key: "home",
    section_key: "value_chain",
    title: VALUE_CHAIN_SECTION.title,
    subtitle: VALUE_CHAIN_SECTION.subtitle,
    body: VALUE_CHAIN_SECTION.subtitle,
    image_url: VALUE_CHAIN_SECTION.imageUrl,
    content_json: {
      items: VALUE_CHAIN_SECTION.items.map((item) => ({
        title: item.title,
        body: item.body,
      })),
    },
    sort_order: 3,
    is_published: true,
  },
  {
    page_key: "about",
    section_key: "long_term_vision",
    title: LONG_TERM_VISION.title,
    subtitle: LONG_TERM_VISION.subtitle,
    body: LONG_TERM_VISION.body,
    image_url: SECTION_IMAGES.about_long_term_vision,
    content_json: {
      network: LONG_TERM_VISION.network,
      closing: LONG_TERM_VISION.closing,
    },
    sort_order: 1,
    is_published: true,
  },
  {
    page_key: "technology",
    section_key: "pyrolysis",
    title: PYROLYSIS.title,
    subtitle: PYROLYSIS.subtitle,
    body: PYROLYSIS.body,
    image_url: SECTION_IMAGES.technology_pyrolysis,
    content_json: {
      products: PYROLYSIS.products.map((p) => p.title),
    },
    sort_order: 1,
    is_published: true,
  },
  {
    page_key: "sustainability",
    section_key: "by_design",
    title: "Sustainability by Design",
    subtitle: null,
    body: "We measure impact across environmental, economic, social, and governance dimensions.",
    image_url: SECTION_IMAGES.sustainability_esg,
    content_json: {},
    sort_order: 1,
    is_published: true,
  },
  {
    page_key: "sustainability",
    section_key: "future_statement",
    title: "Future of Circular Economy",
    subtitle: null,
    body: FUTURE_STATEMENT,
    image_url: null,
    content_json: {},
    sort_order: 2,
    is_published: true,
  },
  {
    page_key: "home",
    section_key: "news_highlights",
    title: NEWS_SECTION.title,
    subtitle: NEWS_SECTION.subtitle,
    body: NEWS_SECTION.subtitle,
    image_url: null,
    content_json: {},
    sort_order: 5,
    is_published: true,
  },
  {
    page_key: "contact",
    section_key: "intro",
    title: "Let's build circular infrastructure together",
    subtitle: null,
    body: "Reach the Novaterra team for partnerships, feedstock discussions, project inquiries, and investment conversations.",
    image_url: null,
    content_json: {},
    sort_order: 1,
    is_published: true,
  },
];

export default function AdminContentPage() {
  const [sections, setSections] = useState<ContentSection[]>(FALLBACK);
  const [activeId, setActiveId] = useState(0);
  const [email, setEmail] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState("");
  const configured = isSupabaseConfigured();

  const active = sections[activeId];

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      if (supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setEmail(user?.email ?? null);
      }

      try {
        const res = await fetch("/api/admin/content");
        if (res.ok) {
          const json = (await res.json()) as { sections?: ContentSection[] };
          const rows = json.sections ?? [];
          if (rows.length > 0) {
            const keys = new Set(
              rows.map((r) => `${r.page_key}::${r.section_key}`),
            );
            const missing = FALLBACK.filter(
              (f) => !keys.has(`${f.page_key}::${f.section_key}`),
            );
            setSections([...rows, ...missing]);
            return;
          }
        }
      } catch {
        // fall through to browser client / fallbacks
      }

      if (!supabase) return;

      const { data } = await supabase
        .from("content_sections")
        .select("*")
        .order("page_key")
        .order("sort_order");

      if (data && data.length > 0) {
        const rows = data as ContentSection[];
        const keys = new Set(rows.map((r) => `${r.page_key}::${r.section_key}`));
        const missing = FALLBACK.filter(
          (f) => !keys.has(`${f.page_key}::${f.section_key}`),
        );
        setSections([...rows, ...missing]);
      }
    }
    load();
  }, []);

  const grouped = useMemo(() => {
    return sections.reduce<Record<string, number[]>>((acc, section, idx) => {
      acc[section.page_key] = acc[section.page_key] || [];
      acc[section.page_key].push(idx);
      return acc;
    }, {});
  }, [sections]);

  function updateActive(patch: Partial<ContentSection>) {
    setSections((prev) =>
      prev.map((s, i) => (i === activeId ? { ...s, ...patch } : s)),
    );
  }

  async function save() {
    setSaving(true);
    setNote("");

    const payload = {
      page_key: active.page_key,
      section_key: active.section_key,
      title: active.title,
      subtitle: active.subtitle,
      body: active.body,
      image_url: active.image_url,
      content_json: active.content_json,
      sort_order: active.sort_order,
      is_published: active.is_published,
    };

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        error?: string;
        section?: ContentSection;
      };

      if (!res.ok) {
        setNote(
          json.error ||
            "Save failed. Ensure SUPABASE_SERVICE_ROLE_KEY is set in .env.local.",
        );
        setSaving(false);
        return;
      }

      if (json.section) {
        setSections((prev) =>
          prev.map((s, i) => (i === activeId ? { ...s, ...json.section! } : s)),
        );
      }
      setNote("Saved successfully.");
    } catch {
      setNote("Save failed — network or server error.");
    }

    setSaving(false);
  }

  return (
    <AdminShell email={email}>
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-stroke bg-white p-4">
          <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Sections by page
          </p>
          <div className="mt-3 space-y-4">
            {Object.entries(grouped).map(([page, indexes]) => (
              <div key={page}>
                <p className="px-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-teal">
                  {page}
                </p>
                <ul className="mt-1 space-y-1">
                  {indexes.map((idx) => (
                    <li key={sections[idx].section_key}>
                      <button
                        type="button"
                        onClick={() => setActiveId(idx)}
                        className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                          activeId === idx
                            ? "bg-forest text-white"
                            : "text-forest hover:bg-sand"
                        }`}
                      >
                        {sections[idx].section_key.replaceAll("_", " ")}
                        {sections[idx].image_url ? (
                          <span className="ml-1 text-[0.65rem] opacity-70">· img</span>
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <div className="rounded-2xl border border-stroke bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                Editing
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold capitalize text-forest-deep">
                {active.page_key} · {active.section_key.replaceAll("_", " ")}
              </h2>
              {!configured ? (
                <p className="mt-1 text-xs text-amber-700">
                  Local preview — connect Supabase to persist CMS changes.
                </p>
              ) : null}
            </div>
            <Button onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save section"}
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-forest">Title</span>
              <input
                value={active.title ?? ""}
                onChange={(e) => updateActive({ title: e.target.value })}
                className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-forest">Subtitle</span>
              <input
                value={active.subtitle ?? ""}
                onChange={(e) => updateActive({ subtitle: e.target.value })}
                className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-forest">Body</span>
              <textarea
                rows={6}
                value={active.body ?? ""}
                onChange={(e) => updateActive({ body: e.target.value })}
                className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
              />
            </label>

            <CmsImageField
              label="Section image"
              folder="sections"
              value={active.image_url}
              onChange={(url) => updateActive({ image_url: url })}
              quickPick={Object.values(SECTION_IMAGES)}
            />

            <label className="inline-flex items-center gap-2 text-sm text-forest">
              <input
                type="checkbox"
                checked={active.is_published}
                onChange={(e) => updateActive({ is_published: e.target.checked })}
              />
              Published
            </label>
            {note ? <p className="text-sm font-medium text-teal">{note}</p> : null}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

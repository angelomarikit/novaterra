"use client";

import { useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { CmsImageField } from "@/components/admin/CmsImageField";
import { Button } from "@/components/ui/Button";
import type { TeamMember } from "@/types/content";
import { TEAM } from "@/lib/content/defaults";

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(TEAM);
  const [activeIdx, setActiveIdx] = useState(0);
  const [email, setEmail] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState("");
  const configured = isSupabaseConfigured();

  const active = members[activeIdx];

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      if (!supabase) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setEmail(user?.email ?? null);

      const { data } = await supabase
        .from("team_members")
        .select("*")
        .order("sort_order");

      if (!data?.length) return;

      const rows = data as TeamMember[];
      const names = new Set(rows.map((m) => m.name.trim().toLowerCase()));
      const missing = TEAM.filter(
        (m) => m.is_published && !names.has(m.name.trim().toLowerCase()),
      );
      setMembers(
        [...rows, ...missing].sort((a, b) => a.sort_order - b.sort_order),
      );
    }
    load();
  }, []);

  function update(patch: Partial<TeamMember>) {
    setMembers((prev) =>
      prev.map((m, i) => (i === activeIdx ? { ...m, ...patch } : m)),
    );
  }

  function addMember() {
    setMembers((prev) => {
      const next: TeamMember = {
        name: "New team member",
        title: "Position title",
        photo_url: null,
        bio: null,
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
      setNote("Local preview only — connect Supabase to persist team profiles.");
      setSaving(false);
      return;
    }

    const payload = {
      name: active.name,
      title: active.title,
      bio: active.bio ?? null,
      photo_url: active.photo_url ?? null,
      sort_order: active.sort_order,
      is_published: active.is_published,
    };

    const { data, error } = active.id
      ? await supabase
          .from("team_members")
          .update(payload)
          .eq("id", active.id)
          .select("*")
          .single()
      : await supabase.from("team_members").insert(payload).select("*").single();

    setSaving(false);
    if (error) {
      setNote(error.message);
      return;
    }
    if (data) {
      setMembers((prev) =>
        prev.map((m, i) => (i === activeIdx ? (data as TeamMember) : m)),
      );
    }
    setNote("Saved successfully.");
  }

  async function removeMember() {
    if (!active.id) {
      setMembers((prev) => prev.filter((_, i) => i !== activeIdx));
      setActiveIdx(0);
      return;
    }
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", active.id);
    if (error) {
      setNote(error.message);
      return;
    }
    setMembers((prev) => prev.filter((_, i) => i !== activeIdx));
    setActiveIdx(0);
    setNote("Member removed.");
  }

  return (
    <AdminShell email={email}>
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-stroke bg-white p-4">
          <div className="flex items-center justify-between gap-2 px-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Team
            </p>
            <button
              type="button"
              onClick={addMember}
              className="rounded-lg bg-forest px-2 py-1 text-xs font-medium text-white"
            >
              + Add
            </button>
          </div>
          <p className="mt-2 px-2 text-[0.7rem] leading-relaxed text-muted">
            Edit the 8 leadership profiles or add more people with photo, name,
            and title.
          </p>
          <ul className="mt-3 max-h-[480px] space-y-1 overflow-y-auto">
            {members.map((member, idx) => (
              <li key={member.id ?? `${member.name}-${idx}`}>
                <button
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                    activeIdx === idx
                      ? "bg-forest text-white"
                      : "text-forest hover:bg-sand"
                  }`}
                >
                  <span className="line-clamp-1">{member.name}</span>
                  {!member.is_published ? (
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
                Leadership team
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-forest-deep">
                Edit profile
              </h2>
              {!configured ? (
                <p className="mt-1 text-xs text-amber-700">
                  Local preview — connect Supabase to sync with the live site.
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={removeMember}>
                Delete
              </Button>
              <Button onClick={save} disabled={saving}>
                {saving ? "Saving…" : "Save profile"}
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-forest">Name</span>
              <input
                value={active.name}
                onChange={(e) => update({ name: e.target.value })}
                className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-forest">Title</span>
              <input
                value={active.title}
                onChange={(e) => update({ title: e.target.value })}
                className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
              />
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

            <CmsImageField
              label="Profile photo"
              folder="team"
              value={active.photo_url ?? null}
              onChange={(url) => update({ photo_url: url })}
              hint="Upload a clear headshot to Supabase Storage, or keep the company-profile photo for now."
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

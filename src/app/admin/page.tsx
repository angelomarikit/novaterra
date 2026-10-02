import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/server";
import { getLocalAdminEmail } from "@/lib/auth/local-admin";
import { HERO, SITE, TEAM } from "@/lib/content/defaults";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const localEmail = await getLocalAdminEmail();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const [{ count: sectionCount }, { count: messageCount }] = await Promise.all([
      supabase.from("content_sections").select("*", { count: "exact", head: true }),
      supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false),
    ]);

    return (
      <AdminShell email={user?.email || localEmail}>
        <Dashboard
          sections={sectionCount ?? 0}
          unread={messageCount ?? 0}
          live
        />
      </AdminShell>
    );
  }

  return (
    <AdminShell email={localEmail}>
      <Dashboard sections={7} unread={0} live={false} />
    </AdminShell>
  );
}

function Dashboard({
  sections,
  unread,
  live,
}: {
  sections: number;
  unread: number;
  live: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-stroke bg-white p-6">
        <h2 className="font-display text-2xl font-semibold text-forest-deep">
          Welcome to the Novaterra CMS
        </h2>
        <p className="mt-2 text-sm text-muted">
          Manage website sections such as the Home <strong>Hero Banner</strong>,
          About copy, Technology content, and Contact details. Mode:{" "}
          <span className="font-semibold text-forest">
            {live ? "Connected to Supabase" : "Local admin session"}
          </span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Content sections", value: String(sections) },
          { label: "Unread messages", value: String(unread) },
          { label: "Team profiles", value: String(TEAM.length) },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-stroke bg-white p-5"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {card.label}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-forest">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/content"
          className="rounded-2xl border border-stroke bg-white p-6 transition hover:border-teal/40 hover:shadow-md"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Example section
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-forest-deep">
            Home · Hero Banner
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-muted">{HERO.description}</p>
        </Link>
        <Link
          href="/admin/messages"
          className="rounded-2xl border border-stroke bg-white p-6 transition hover:border-teal/40 hover:shadow-md"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Contact sidebar data
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-forest-deep">
            {SITE.email}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {SITE.phone} · {SITE.address}
          </p>
        </Link>
      </div>
    </div>
  );
}

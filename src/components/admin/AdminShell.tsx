"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content", label: "Page Content" },
  { href: "/admin/news", label: "News & Articles" },
  { href: "/admin/messages", label: "Contact Messages" },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const configured = isSupabaseConfigured();

  async function signOut() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-sand">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-[240px] shrink-0 flex-col border-r border-stroke bg-white">
        <div className="border-b border-stroke px-5 py-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-teal">
            Novaterra CMS
          </p>
          <h1 className="mt-1 font-display text-base font-semibold leading-snug text-forest-deep">
            Content Administration
          </h1>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {LINKS.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-forest text-white"
                    : "text-muted hover:bg-sand hover:text-forest",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {email ? (
          <div className="border-t border-stroke px-5 py-4">
            <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted">
              Signed in as
            </p>
            <p
              className="mt-1 break-all text-xs font-medium leading-snug text-forest"
              title={email}
            >
              {email}
            </p>
          </div>
        ) : null}
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-stroke bg-white/95 px-6 py-3 backdrop-blur sm:px-8">
          <p className="truncate text-sm text-muted">
            {LINKS.find((l) =>
              l.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(l.href),
            )?.label ?? "Admin"}
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/" className="text-sm text-muted hover:text-forest">
              View site
            </Link>
            <Button size="sm" variant="secondary" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </header>

        {!configured ? (
          <div className="border-b border-leaf/20 bg-leaf/10 px-6 py-2.5 text-center text-sm text-forest sm:px-8">
            Local admin mode — connect Supabase to enable cloud CMS and live
            contact inbox.
          </div>
        ) : null}

        <main className="flex-1 px-6 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}

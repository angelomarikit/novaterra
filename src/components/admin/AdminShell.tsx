"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content", label: "Page Content" },
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
    <div className="min-h-screen bg-sand">
      <header className="border-b border-stroke bg-white">
        <div className="mx-auto flex w-[min(1100px,calc(100%-2rem))] items-center justify-between gap-4 py-4">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-teal">
              Novaterra CMS
            </p>
            <h1 className="font-display text-lg font-semibold text-forest-deep">
              Content Administration
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-muted hover:text-forest">
              View site
            </Link>
            <Button size="sm" variant="secondary" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {!configured ? (
        <div className="border-b border-leaf/20 bg-leaf/10 px-4 py-3 text-center text-sm text-forest">
          Local admin mode — connect Supabase to enable cloud CMS and live
          contact inbox.
        </div>
      ) : null}

      <div className="mx-auto grid w-[min(1100px,calc(100%-2rem))] gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit min-w-0 overflow-hidden rounded-2xl border border-stroke bg-white p-3">
          <nav className="space-y-1">
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
                    "block rounded-xl px-3 py-2.5 text-sm font-medium transition",
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
            <p className="mt-4 border-t border-stroke px-3 pt-4 text-xs text-muted">
              Signed in as
              <br />
              <span
                className="mt-1 block break-all font-medium leading-snug text-forest"
                title={email}
              >
                {email}
              </span>
            </p>
          ) : null}
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}

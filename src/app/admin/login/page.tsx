"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Lock, Leaf } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const configured = isSupabaseConfigured();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to sign in.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 earth-mesh">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 earth-stripes opacity-25" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 leaf-pattern opacity-50" />

      <div className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-stroke bg-white p-8 shadow-[0_30px_80px_rgba(21,32,24,0.1)]">
        <div className="mb-6 flex items-center gap-3">
          <span className="relative h-14 w-40">
            <Image
              src="/logo.png"
              alt="Novaterra"
              fill
              className="object-contain object-left"
            />
          </span>
        </div>
        <div className="mb-1">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-teal">
            Secure CMS Access
          </p>
          <p className="font-display text-lg font-semibold text-forest-deep">
            Admin Login
          </p>
        </div>

        <div className="mb-5 flex items-start gap-2 rounded-xl bg-sand px-3 py-3 text-sm text-muted">
          <Leaf size={16} className="mt-0.5 shrink-0 text-leaf" />
          <p>
            Manage hero banners, page copy, and contact inquiries for Novaterra
            Circular Economy Inc.
          </p>
        </div>

        {!configured ? (
          <div className="mb-5 rounded-xl border border-forest/15 bg-forest/5 px-4 py-3 text-sm text-forest">
            <p className="font-semibold">Local admin mode</p>
            <p className="mt-1 text-muted">
              Email: <code className="text-forest">admin@novaterra.local</code>
              <br />
              Password: <code className="text-forest">Novaterra@2026</code>
            </p>
          </div>
        ) : (
          <p className="mb-5 text-sm text-muted">
            Sign in with your Supabase Auth admin account.
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-forest">Email</span>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-forest">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none focus:border-teal"
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            <Lock size={16} />
            {loading ? "Signing in…" : "Sign in to CMS"}
          </Button>
        </form>

        <Link
          href="/"
          className="mt-6 inline-block text-sm text-muted hover:text-forest"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
}

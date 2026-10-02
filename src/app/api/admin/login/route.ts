import { NextResponse } from "next/server";
import {
  LOCAL_ADMIN_COOKIE,
  createLocalAdminToken,
  getLocalAdminCredentials,
} from "@/lib/auth/local-admin";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || "").trim();
  const password = String(body.password || "");

  // Prefer Supabase when configured
  const supabase = await createClient();
  if (supabase) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ ok: true, mode: "supabase" });
  }

  const local = getLocalAdminCredentials();
  if (email !== local.email || password !== local.password) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true, mode: "local" });
  response.cookies.set(LOCAL_ADMIN_COOKIE, createLocalAdminToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

export async function DELETE() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(LOCAL_ADMIN_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}

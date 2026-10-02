import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim() || null;
    const subject = String(body.subject || "").trim() || null;
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    if (!supabase) {
      // Graceful local fallback when Supabase env is not configured yet
      console.info("[contact] Supabase not configured. Message captured locally:", {
        name,
        email,
        company,
        subject,
        message,
      });
      return NextResponse.json({
        ok: true,
        mode: "local",
        note: "Supabase is not configured. Message logged on server.",
      });
    }

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      company,
      subject,
      message,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

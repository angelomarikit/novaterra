import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.ok) {
    return NextResponse.json(
      { error: admin.message },
      { status: admin.status },
    );
  }

  const { data, error } = await admin.supabase
    .from("content_sections")
    .select("*")
    .order("page_key")
    .order("sort_order");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ sections: data ?? [] });
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin.ok) {
    return NextResponse.json(
      { error: admin.message },
      { status: admin.status },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const page_key = String(body.page_key ?? "");
  const section_key = String(body.section_key ?? "");
  if (!page_key || !section_key) {
    return NextResponse.json(
      { error: "page_key and section_key are required" },
      { status: 400 },
    );
  }

  const payload = {
    page_key,
    section_key,
    title: (body.title as string | null) ?? null,
    subtitle: (body.subtitle as string | null) ?? null,
    body: (body.body as string | null) ?? null,
    image_url: (body.image_url as string | null) ?? null,
    content_json: (body.content_json as Record<string, unknown>) ?? {},
    sort_order: Number(body.sort_order ?? 0),
    is_published: body.is_published !== false,
  };

  const { data, error } = await admin.supabase
    .from("content_sections")
    .upsert(payload, { onConflict: "page_key,section_key" })
    .select("*")
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      {
        error:
          error.message.includes("service_role") ||
          error.message.toLowerCase().includes("jwt")
            ? "Add SUPABASE_SERVICE_ROLE_KEY to .env.local so local admin can save."
            : error.message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ section: data, ok: true });
}

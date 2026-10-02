import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import {
  CMS_MEDIA_BUCKET,
  cmsMediaPublicUrl,
  sanitizeUploadName,
} from "@/lib/storage/cms-media";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin.ok) {
    return NextResponse.json(
      { error: admin.message },
      { status: admin.status },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  const folderRaw = form.get("folder");
  const folder =
    typeof folderRaw === "string" && /^[a-z0-9-]+$/.test(folderRaw)
      ? folderRaw
      : "uploads";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, or GIF images are allowed." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be 5 MB or smaller." },
      { status: 400 },
    );
  }

  const ext = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : ".jpg";
  const objectPath = `${folder}/${Date.now()}-${sanitizeUploadName(file.name.replace(ext, ""))}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.supabase.storage
    .from(CMS_MEDIA_BUCKET)
    .upload(objectPath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json(
      {
        error:
          error.message.includes("Bucket not found")
            ? 'Storage bucket "cms-media" not found — run supabase/storage.sql in your project.'
            : error.message,
      },
      { status: 500 },
    );
  }

  const publicUrl = cmsMediaPublicUrl(objectPath);

  return NextResponse.json({
    path: objectPath,
    url: publicUrl,
  });
}

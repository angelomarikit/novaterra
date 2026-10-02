export const CMS_MEDIA_BUCKET = "cms-media";

export function cmsMediaPublicUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return path;
  const clean = path.replace(/^\/+/, "");
  return `${base}/storage/v1/object/public/${CMS_MEDIA_BUCKET}/${clean}`;
}

export function sanitizeUploadName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

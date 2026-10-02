"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { isSupabaseConfigured } from "@/lib/supabase/client";

type Props = {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: "sections" | "news" | "team" | "uploads";
  hint?: string;
  quickPick?: readonly string[];
};

export function CmsImageField({
  label,
  value,
  onChange,
  folder = "uploads",
  hint,
  quickPick = [],
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const configured = isSupabaseConfigured();

  async function onFileSelect(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }
      if (data.url) onChange(data.url);
    } catch {
      setError("Upload failed — check your connection.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const previewSrc = value || null;
  const remote =
    previewSrc?.startsWith("http") || previewSrc?.startsWith("/");

  return (
    <div className="rounded-2xl border border-stroke bg-gradient-to-br from-sand/50 to-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-forest">{label}</p>
          <p className="mt-1 text-xs text-muted">
            {hint ??
              "Upload to Supabase Storage (cms-media bucket) or paste a URL / site path."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
          />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={uploading || !configured}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? "Uploading…" : "Upload image"}
          </Button>
          {value ? (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => onChange(null)}
            >
              Remove
            </Button>
          ) : null}
        </div>
      </div>

      {!configured ? (
        <p className="mt-2 text-xs text-amber-800">
          Connect Supabase to enable cloud uploads. You can still use{" "}
          <code>/sections/...</code> or <code>/news/...</code> paths.
        </p>
      ) : null}

      <label className="mt-4 block text-sm">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-muted">
          Image URL
        </span>
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value || null)}
          placeholder="Uploaded URL, /news/example.jpg, or https://..."
          className="w-full rounded-xl border border-stroke bg-white px-4 py-3 text-sm outline-none focus:border-teal"
        />
      </label>

      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}

      {previewSrc && remote ? (
        <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-stroke bg-white shadow-sm">
          <Image
            src={previewSrc}
            alt="Preview"
            fill
            className="object-cover"
            sizes="560px"
            unoptimized={previewSrc.startsWith("http")}
          />
        </div>
      ) : null}

      {quickPick.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {quickPick.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => onChange(src)}
              className="rounded-full border border-stroke bg-white px-3 py-1 text-xs text-forest hover:border-teal"
            >
              {src.split("/").pop()}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

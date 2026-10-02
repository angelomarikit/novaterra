-- ============================================================
-- Novaterra CMS — Supabase Storage (cms-media bucket)
-- Run in Supabase SQL Editor after schema.sql
-- Dashboard alternative: Storage → New bucket → name "cms-media", public ON
-- ============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media',
  'cms-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public read
drop policy if exists "Public read cms-media" on storage.objects;
create policy "Public read cms-media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'cms-media');

-- Authenticated CMS users can upload and manage files
drop policy if exists "Admins upload cms-media" on storage.objects;
create policy "Admins upload cms-media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'cms-media');

drop policy if exists "Admins update cms-media" on storage.objects;
create policy "Admins update cms-media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'cms-media')
  with check (bucket_id = 'cms-media');

drop policy if exists "Admins delete cms-media" on storage.objects;
create policy "Admins delete cms-media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'cms-media');

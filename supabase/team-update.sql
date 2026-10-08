-- ============================================================
-- Ensure full 8-person leadership team (+ optional draft slots)
-- Run in Supabase SQL Editor if your project still has only 6 members
-- ============================================================

-- Update existing six with photos when missing
update public.team_members set photo_url = coalesce(nullif(photo_url, ''), '/team/raymo-gino-palaca.jpg'), sort_order = 1
  where name = 'Raymo Gino L. Palaca';
update public.team_members set photo_url = coalesce(nullif(photo_url, ''), '/team/cornelio-macapagal.jpg'), sort_order = 2, title = 'Chief Technology Officer'
  where name = 'Engr. Cornelio Macapagal';
update public.team_members set photo_url = coalesce(nullif(photo_url, ''), '/team/ian-lorenz-agcamaran.jpg'), sort_order = 3, title = 'Chief Management Officer'
  where name = 'Engr. Ian Lorenz Agcamaran';
update public.team_members set photo_url = coalesce(nullif(photo_url, ''), '/team/oscarlito-malveda.jpg'), sort_order = 5, title = 'Chief Operating Officer'
  where name = 'Engr. Oscarlito Malveda';
update public.team_members set photo_url = coalesce(nullif(photo_url, ''), '/team/natalya-moldez-palaca.jpg'), sort_order = 6
  where name = 'Natalya Moldez-Palaca';
update public.team_members set photo_url = coalesce(nullif(photo_url, ''), '/team/aldrich-walther-alvarez.jpg'), sort_order = 7
  where name = 'Aldrich Walther Alvarez';

-- Add the two additional leadership members
insert into public.team_members (name, title, photo_url, sort_order, is_published)
select 'Jared Alvin Valarao', 'Chief Finance Officer', '/team/jared-alvin-valarao.jpg', 4, true
where not exists (select 1 from public.team_members where name = 'Jared Alvin Valarao');

insert into public.team_members (name, title, photo_url, sort_order, is_published)
select 'Henry Klapproth', 'Investment Relations', '/team/henry-klapproth.jpg', 8, true
where not exists (select 1 from public.team_members where name = 'Henry Klapproth');

-- Optional draft slots for future hires (not shown until published)
insert into public.team_members (name, title, photo_url, sort_order, is_published)
select 'Team Member', 'Position Title', null, 9, false
where not exists (
  select 1 from public.team_members where sort_order = 9 and is_published = false
);

insert into public.team_members (name, title, photo_url, sort_order, is_published)
select 'Team Member', 'Position Title', null, 10, false
where not exists (
  select 1 from public.team_members where sort_order = 10 and is_published = false
);

-- ============================================================
-- NOVATERRA CIRCULAR ECONOMY INC. — Supabase CMS Schema
-- Run this in the Supabase SQL Editor (Project → SQL → New query)
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Site settings (singleton-style row)
-- ------------------------------------------------------------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  company_name text not null default 'Novaterra Circular Economy Inc.',
  tagline text not null default 'From Waste to Progress: Building a Sustainable Future',
  phone text,
  email text,
  address text,
  website text,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Editable page sections (hero, about blocks, etc.)
-- ------------------------------------------------------------
create table if not exists public.content_sections (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,          -- home | about | technology | sustainability | contact
  section_key text not null,       -- hero_banner | why_exists | waste_challenge | ...
  title text,
  subtitle text,
  body text,
  image_url text,                  -- CMS-editable section image (/sections/... or remote URL)
  content_json jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (page_key, section_key)
);

create index if not exists content_sections_page_idx
  on public.content_sections (page_key, sort_order);

-- ------------------------------------------------------------
-- Leadership team
-- ------------------------------------------------------------
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  bio text,
  photo_url text,
  sort_order int not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Contact form submissions
-- ------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx
  on public.contact_messages (created_at desc);

-- ------------------------------------------------------------
-- News, articles & blog posts (home + detail pages)
-- ------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null,
  category text not null default 'news'
    check (category in ('news', 'article', 'blog')),
  image_url text,
  published_at timestamptz not null default now(),
  sort_order int not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_idx
  on public.blog_posts (is_published, sort_order, published_at desc);

-- ------------------------------------------------------------
-- Updated_at helper
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_settings_updated on public.site_settings;
create trigger trg_site_settings_updated
  before update on public.site_settings
  for each row execute function public.set_updated_at();

drop trigger if exists trg_content_sections_updated on public.content_sections;
create trigger trg_content_sections_updated
  before update on public.content_sections
  for each row execute function public.set_updated_at();

drop trigger if exists trg_team_members_updated on public.team_members;
create trigger trg_team_members_updated
  before update on public.team_members
  for each row execute function public.set_updated_at();

drop trigger if exists trg_blog_posts_updated on public.blog_posts;
create trigger trg_blog_posts_updated
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.site_settings enable row level security;
alter table public.content_sections enable row level security;
alter table public.team_members enable row level security;
alter table public.contact_messages enable row level security;
alter table public.blog_posts enable row level security;

-- Public read for published content
create policy "Public read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Public read published sections"
  on public.content_sections for select
  to anon, authenticated
  using (is_published = true);

create policy "Public read published team"
  on public.team_members for select
  to anon, authenticated
  using (is_published = true);

create policy "Public read published blog posts"
  on public.blog_posts for select
  to anon, authenticated
  using (is_published = true);

-- Anyone can submit a contact message
create policy "Anyone can insert contact messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

-- Authenticated admins can manage everything
create policy "Admins manage site settings"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins manage content sections"
  on public.content_sections for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins manage team"
  on public.team_members for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins read contact messages"
  on public.contact_messages for select
  to authenticated
  using (true);

create policy "Admins update contact messages"
  on public.contact_messages for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins delete contact messages"
  on public.contact_messages for delete
  to authenticated
  using (true);

create policy "Admins manage blog posts"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- Seed data
-- ------------------------------------------------------------
insert into public.site_settings (company_name, tagline, phone, email, address, website)
values (
  'Novaterra Circular Economy Inc.',
  'From Waste to Progress: Building a Sustainable Future',
  '0898-2001599',
  'info@novaterracircular.com',
  'B10 L14 Kroner Street, Villa Carolina 1, Tunasan, Muntinlupa City, 1773',
  'novaterracircular.com'
)
on conflict do nothing;

insert into public.content_sections (page_key, section_key, title, subtitle, body, image_url, content_json, sort_order)
values
(
  'home',
  'hero_banner',
  'Transforming Waste.',
  'Recovering Value. Building a Circular Future.',
  'We develop, build and operate responsible circular-economy infrastructure that converts suitable waste streams into valuable energy, materials and industrial by-products.',
  null,
  '{"tags":["Environmental Infrastructure","Circular Economy","Resource Recovery","Pyrolysis Technology"]}'::jsonb,
  1
),
(
  'home',
  'why_exists',
  'Why Novaterra Exists',
  null,
  'Modern economies generate increasing volumes of waste while industries still require energy and raw materials. Many waste streams are difficult to manage via landfills or conventional recycling due to contamination, mixed materials, or economic barriers.',
  '/sections/recovery.jpg',
  '{"highlight":"Novaterra exists to address this gap.","mission":"To develop responsible and sustainable solutions that enable waste materials to be recovered, converted, and returned to productive economic use."}'::jsonb,
  2
),
(
  'home',
  'waste_challenge',
  'The Waste Challenge',
  'From waste management to resource management',
  null,
  null,
  '{"items":[{"title":"Growing Waste Volumes","body":"Communities and industries continuously generate municipal, commercial, agricultural, plastic, rubber, and other residual waste."},{"title":"Difficult-to-Recycle Materials","body":"Certain materials are technically or economically challenging to recover through conventional recycling."},{"title":"Landfill Dependence","body":"Disposal consumes land and can create long-term environmental-management requirements."},{"title":"Loss of Embedded Resources","body":"Waste can contain carbon, hydrocarbons, energy, and other materials that may still have economic value."},{"title":"Increasing Sustainability Requirements","body":"Industries and communities are increasingly seeking more resource-efficient and environmentally responsible systems."}]}'::jsonb,
  3
),
(
  'home',
  'news_highlights',
  'News, Articles & Insights',
  'Updates from our circular-economy journey',
  'Follow project milestones, technology explainers, and partnership news as Novaterra develops responsible waste-to-resource infrastructure across the Philippines.',
  null,
  '{}'::jsonb,
  4
),
(
  'about',
  'long_term_vision',
  'Our Long-Term Vision',
  'Building a network of circular infrastructure',
  'Novaterra''s ambition extends beyond a single facility. We envision the development of regional circular-economy infrastructure capable of connecting:',
  '/sections/vision.jpg',
  '{"network":["Municipalities","Waste Generators","Collection & Logistics","Novaterra Facilities","Resource Recovery","Industrial Markets","New Economic Value"],"closing":"Over time, this network can create a more integrated system for managing residual waste and recovering resources."}'::jsonb,
  1
),
(
  'technology',
  'pyrolysis',
  'What is Pyrolysis?',
  'Converting carbon-rich waste into resources',
  'Pyrolysis is a controlled process in which suitable organic or carbon-containing materials are heated under conditions with little or no oxygen. Instead of simply combusting the material, the process thermally breaks down complex organic compounds.',
  '/sections/pyrolysis.jpg',
  '{"products":["Pyro Oil | Bio Oil","Syngas","Biochar | Carbon Black"]}'::jsonb,
  1
),
(
  'sustainability',
  'by_design',
  'Sustainability by Design',
  null,
  'We measure impact across environmental, economic, social, and governance dimensions.',
  '/sections/sustainability.jpg',
  '{}'::jsonb,
  1
),
(
  'contact',
  'intro',
  'Let''s build circular infrastructure together',
  null,
  'Reach the Novaterra team for partnerships, feedstock discussions, project inquiries, and investment conversations.',
  null,
  '{}'::jsonb,
  1
)
on conflict (page_key, section_key) do nothing;

-- If you already created content_sections without image_url, run:
-- alter table public.content_sections add column if not exists image_url text;

insert into public.team_members (name, title, photo_url, sort_order, is_published) values
  ('Raymo Gino L. Palaca', 'Chairman / CEO', '/team/raymo-gino-palaca.jpg', 1, true),
  ('Engr. Cornelio Macapagal', 'Chief Technology Officer', '/team/cornelio-macapagal.jpg', 2, true),
  ('Engr. Ian Lorenz Agcamaran', 'Chief Management Officer', '/team/ian-lorenz-agcamaran.jpg', 3, true),
  ('Jared Alvin Valarao', 'Chief Finance Officer', '/team/jared-alvin-valarao.jpg', 4, true),
  ('Engr. Oscarlito Malveda', 'Chief Operating Officer', '/team/oscarlito-malveda.jpg', 5, true),
  ('Natalya Moldez-Palaca', 'Administrative Officer', '/team/natalya-moldez-palaca.jpg', 6, true),
  ('Aldrich Walther Alvarez', 'Financial Adviser / Corporate Secretary', '/team/aldrich-walther-alvarez.jpg', 7, true),
  ('Henry Klapproth', 'Investment Relations', '/team/henry-klapproth.jpg', 8, true),
  ('Team Member', 'Position Title', null, 9, false),
  ('Team Member', 'Position Title', null, 10, false)
on conflict do nothing;

-- If team_members already seeded earlier, sync roles/photos:
-- update public.team_members set photo_url = '/team/raymo-gino-palaca.jpg' where name = 'Raymo Gino L. Palaca';
-- (or re-run from Admin → Team after uploading clearer headshots)

insert into public.blog_posts (slug, title, excerpt, body, category, image_url, published_at, sort_order)
values
(
  'scaling-circular-infrastructure',
  'Scaling responsible circular infrastructure in the Philippines',
  'Novaterra is advancing integrated waste recovery facilities designed to divert suitable streams from landfills and return materials to productive use.',
  'Modern economies generate rising volumes of residual waste while industries still depend on energy and raw materials. Novaterra Circular Economy Inc. is developing infrastructure that converts selected waste streams into recovered fuels, syngas, and carbon-rich materials through controlled pyrolysis and complementary recovery steps.

Our approach prioritizes environmental safeguards, community engagement, and long-term operability — not one-off disposal projects. Each facility is planned as part of a broader network connecting municipalities, waste generators, logistics partners, and industrial off-takers.

As we progress site development and partnerships, we will share milestones on technology commissioning, feedstock qualification, and regional collaboration that supports a more circular resource system.',
  'news',
  '/news/circular-infrastructure.jpg',
  now() - interval '12 days',
  1
),
(
  'understanding-pyrolysis-for-waste-recovery',
  'Understanding pyrolysis for waste-to-resource recovery',
  'Pyrolysis thermally breaks down carbon-rich materials with limited oxygen, producing oils, gases, and solid carbon products instead of open burning or uncontrolled disposal.',
  'Pyrolysis is a core technology in Novaterra''s recovery toolkit. Suitable organic or carbon-containing feedstocks are heated in a controlled environment where oxygen is limited. Complex molecules break into simpler compounds that can be captured as pyrolysis oil, syngas, and biochar or carbon black.

Unlike incineration focused on disposal, pyrolysis is oriented toward material and energy recovery — provided feedstocks are properly screened and emissions controls are engineered into the plant design.

Novaterra integrates pyrolysis with sorting, pre-treatment, and product handling so recovered outputs can meet industrial specifications. This article summarizes how the process supports circular-economy goals while requiring rigorous environmental and operational discipline.',
  'article',
  '/news/pyrolysis.jpg',
  now() - interval '26 days',
  2
),
(
  'partnerships-for-regional-circular-systems',
  'Building partnerships for regional circular systems',
  'Circular infrastructure succeeds when municipalities, industry, and communities align on feedstock, logistics, and shared environmental outcomes.',
  'Circular-economy infrastructure is inherently collaborative. Novaterra works with local governments, waste generators, logistics providers, and industrial users to design systems that are technically sound and economically viable.

Partnerships help define acceptable feedstock streams, collection routes, and product markets before capital is deployed. They also create transparency around environmental monitoring, safety, and community benefit — essential for long-term acceptance.

We welcome conversations with municipalities exploring alternatives to landfill dependence, companies seeking recovered materials or energy carriers, and investors interested in durable environmental infrastructure.',
  'blog',
  '/news/partnership.jpg',
  now() - interval '40 days',
  3
)
on conflict (slug) do nothing;

-- Storage: run supabase/storage.sql to create the public cms-media bucket.

-- ------------------------------------------------------------
-- Admin user setup (run after creating auth user in dashboard):
-- Authentication → Users → Add user (email + password)
-- That authenticated user can access /admin and edit CMS content.
-- ------------------------------------------------------------

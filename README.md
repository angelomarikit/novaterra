# Novaterra Circular Economy Inc.

Professional corporate website for Novaterra — circular economy, pyrolysis, and resource recovery.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase (Auth + Postgres CMS)

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing — Hero Banner, Why Exists, Waste Challenge, Novaterra Cycle, Value Chain |
| `/about` | Vision, mission, values, commitments, team, long-term vision |
| `/technology` | Pyrolysis, by-products, process model, core principles |
| `/sustainability` | ESG pillars, circular principles, network vision, future statement |
| `/contact` | Contact sidebar + inquiry form |
| `/admin` | CMS dashboard (content + messages) |

## Setup

```bash
npm install
cp .env.local.example .env.local
# Fill in Supabase URL + anon key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase SQL

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** → New query
3. Paste and run everything in [`supabase/schema.sql`](./supabase/schema.sql)
4. Create an admin user under **Authentication → Users**
5. Sign in at `/admin/login`

The site works without Supabase using built-in content defaults. Contact form submissions are logged locally until Supabase is connected.

## Brand

Logo: `public/logo.jpg`  
Palette: leaf green → teal → ocean blue (from Novaterra mark)  
Fonts: Sora (display) + Manrope (body)

## CMS notes

Editable section keys include:

- `home / hero_banner`
- `home / why_exists`
- `home / waste_challenge`
- `about / vision_mission`
- `technology / pyrolysis`
- `sustainability / by_design`
- `contact / intro`

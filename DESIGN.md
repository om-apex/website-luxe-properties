# Om Luxe Properties Website — Design Document

## Overview

Marketing website for Om Luxe Properties LLC, showcasing the "Perch in the Clouds" luxury vacation rental in Ellijay, Georgia. Built with Next.js 16 + Tailwind v4 + shadcn/ui, matching the architecture of the other Om Apex websites (ai-solutions, supply-chain, apex).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router, RSC) |
| UI | React 19.2.3 + Tailwind CSS v4 + shadcn/ui |
| CMS | Supabase (site_content table, site='luxe') |
| Blog | Supabase (blog_posts table, company_brand='om_luxe_properties') |
| Contact | Supabase (leads table) + HubSpot CRM sync |
| Lightbox | Radix Dialog |
| Media | 84 property photos (next/image) + 5 YouTube embeds + hero drone video |
| Deployment | Vercel (omluxeproperties.com) |
| Dev Port | 3004 |

## Brand

| Element | Value |
|---------|-------|
| Primary Color (Green) | #2E7D32 / oklch(0.467 0.13 148.7) |
| Accent Color (Gold) | #C9A227 / oklch(0.725 0.145 85.4) |
| Text Color | #2D2D2D |
| Heading Font | Georgia, serif |
| Body Font | Segoe UI, system-ui |
| Email | hello@omluxeproperties.com |
| Location | Ellijay, Georgia |

## Directory Structure

```
luxe-properties/
├── public/
│   ├── images/
│   │   ├── logo.png, logo.svg, logo-180.png, logo-web.png
│   │   └── photos/                # 84 photos in 6 categories
│   │       ├── amenities/         (8 photos)
│   │       ├── bedrooms/          (9 photos)
│   │       ├── deck-outdoor/      (21 photos)
│   │       ├── entertainment/     (7 photos)
│   │       ├── exterior/          (25 photos)
│   │       └── living-kitchen/    (14 photos)
│   └── videos/hero/
│       └── aerial-drone-tour.mp4  (71 MB)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (Header + Footer + EditMode)
│   │   ├── globals.css            # Tailwind v4 + Luxe brand vars
│   │   ├── page.tsx               # Home (server component)
│   │   ├── amenities/page.tsx     # Coming soon
│   │   ├── things-to-do/page.tsx  # Coming soon
│   │   ├── attractions/page.tsx   # Coming soon
│   │   ├── restaurants/page.tsx   # Coming soon
│   │   ├── house-rules/page.tsx   # Coming soon
│   │   ├── how-to-videos/page.tsx # 5 YouTube embeds
│   │   ├── blog/page.tsx          # Blog listing (ISR, 60s)
│   │   ├── blog/[slug]/page.tsx   # Blog post (SSG + ISR)
│   │   ├── api/auth/callback/route.ts  # OAuth callback (Google → @omapex.com)
│   │   └── api/contact/route.ts   # Contact form API
│   ├── components/
│   │   ├── brand/Logo.tsx
│   │   ├── content/EditableText.tsx  # EditableText + EditableList
│   │   ├── layout/Header.tsx       # 8-link nav + Contact button
│   │   ├── layout/Footer.tsx       # 3-column footer
│   │   ├── pages/
│   │   │   ├── HomePageClient.tsx
│   │   │   ├── ComingSoonPageClient.tsx
│   │   │   ├── HowToVideosPageClient.tsx
│   │   │   ├── BlogListClient.tsx
│   │   │   └── BlogPostClient.tsx
│   │   ├── property/
│   │   │   ├── HeroVideo.tsx       # Drone video with overlay
│   │   │   ├── PropertyStats.tsx   # 4 stat cards
│   │   │   ├── BookingCTA.tsx      # Airbnb link
│   │   │   ├── PhotoGallery.tsx    # 84 photos + filter tabs
│   │   │   ├── Lightbox.tsx        # Full-screen viewer
│   │   │   └── Highlights.tsx      # 4 feature cards
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── ContactModal.tsx
│   │   └── ContactForm.tsx
│   ├── contexts/
│   │   ├── EditModeContext.tsx      # @omapex.com auth + edit mode + login prompt + keyboard shortcut
│   │   └── ContentContext.tsx       # CMS state management
│   └── lib/
│       ├── brand.ts                # Luxe brand config
│       ├── content.ts              # ~55 DEFAULT_CONTENT keys
│       ├── content-fetcher.ts      # Server-side Supabase fetch
│       ├── blog-fetcher.ts         # Blog post queries
│       ├── gallery-data.ts         # 84 photo entries
│       ├── hubspot.ts              # HubSpot CRM integration
│       ├── supabase.ts             # Supabase client (legacy, used by ContentContext)
│       ├── supabase/
│       │   ├── client.ts          # SSR-aware browser client (@supabase/ssr)
│       │   └── server.ts         # Server client with cookie handling
│       ├── types.ts                # TypeScript types
│       └── utils.ts                # cn() utility
├── next.config.ts                  # Redirects from old .html URLs
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── components.json
└── eslint.config.mjs
```

## Pages

### Home (/)
- **Hero:** Drone tour video background, property name, location, bed/bath/sleeps stats
- **Property Stats:** 4 stat cards (360° views, river, sunrise/sunset, hot tub)
- **Booking CTA:** Book on Airbnb (external link)
- **Photo Gallery:** 84 photos with 7 category filter tabs + click-to-lightbox
- **Highlights:** 4 feature cards (mountain views, sunrises, hot tub, river views)

### Coming Soon Pages (/amenities, /things-to-do, /attractions, /restaurants, /house-rules)
- Branded header with page title
- Coming soon message with description
- All CMS-editable

### How-To Videos (/how-to-videos)
- 5 YouTube embedded videos: TV & Fireplace, Theater Remote, Murphy Bed, Google Home, Basement Shower

### Blog (/blog, /blog/[slug])
- Blog listing with card grid, cover images, tags, excerpts
- Individual post pages with SEO metadata
- ISR with 60-second revalidation
- Filters by company_brand='om_luxe_properties'

## CMS Integration

### Content Keys
All keys use `luxe_` prefix: `luxe_{page}_{section}_{descriptor}`

Content stored in `site_content` table (site='luxe'). Default values defined in `src/lib/content.ts`.

### Edit Mode
- Activated by `?editMode=true` URL parameter or `Cmd+Shift+E` / `Ctrl+Shift+E` keyboard shortcut
- Requires Google OAuth with @omapex.com Supabase auth (SSR-aware client via `@supabase/ssr`)
- If not authenticated, a floating "Sign in to edit" banner appears at top of page
- After OAuth login, user is redirected back to same page with editMode active
- Gold dashed outlines on editable fields, pencil icon on hover
- Click-to-edit modal saves to Supabase
- Middleware refreshes auth sessions on every request (no route protection — site stays public)

### Blog Posts
Stored in `blog_posts` table. Filtered by `company_brand='om_luxe_properties'` and `status='published'`.

## URL Redirects

Old static HTML URLs redirect permanently (301):
- `/index.html` → `/`
- `/amenities.html` → `/amenities`
- `/todo.html` → `/things-to-do`
- `/attractions.html` → `/attractions`
- `/restaurants.html` → `/restaurants`
- `/rules.html` → `/house-rules`
- `/howto.html` → `/how-to-videos`

## Deployment

- **Platform:** Vercel
- **Domain:** omluxeproperties.com
- **Build:** `npm run build` (Next.js static + SSG + ISR)
- **Environment Variables (Vercel):**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `HUBSPOT_API_KEY_OMAPEX`

## Supabase Project

Shared with Owner Portal: `hympgocuivzxzxllgmcy`

Tables used:
- `site_content` (site='luxe') — CMS content
- `company_configs` (id='om-luxe-properties') — company contact info
- `leads` — contact form submissions
- `blog_posts` (company_brand='om_luxe_properties') — blog content

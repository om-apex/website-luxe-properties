# Om Luxe Properties Website — Design Document

## Overview

Marketing website for Om Luxe Properties LLC, showcasing the "Perch in the Clouds" luxury vacation rental in Ellijay, Georgia. This is a **static HTML/CSS/JS** site (no framework).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | Static HTML (7 pages) |
| Styling | Custom CSS (style.css, 1477 lines) |
| Interactivity | Vanilla JavaScript (script.js + cms.js) |
| CMS | Client-side Supabase REST API (shared Owner Portal project) |
| Media | 84 property photos + 5 how-to YouTube videos + drone tour video |
| Deployment | Static hosting / Vercel |

## Brand

| Element | Value |
|---------|-------|
| Primary Color | White #FFFFFF |
| Accent Green | #2E7D32 |
| Accent Gold | #C9A227 |
| Text Color | #2D2D2D |
| Heading Font | Georgia, serif |
| Body Font | Segoe UI, system-ui |
| Email | stay@omluxeproperties.com |
| Location | Blue Ridge / Ellijay, Georgia |

## File Structure

```
luxe-properties/
├── index.html              # Home (hero video, booking, photo gallery, highlights)
├── amenities.html          # Amenities (coming soon)
├── attractions.html        # Local attractions (coming soon)
├── restaurants.html        # Restaurant guide (coming soon)
├── todo.html               # Things to do (coming soon)
├── rules.html              # House rules (coming soon)
├── howto.html              # How-to videos (5 YouTube embeds)
├── css/
│   └── style.css           # All styles (1477 lines)
├── js/
│   ├── script.js           # Core JS (menu, gallery, lightbox, modals)
│   └── cms.js              # CMS client (fetch content, edit mode)
├── assets/
│   └── images/
│       ├── logo.png/svg
│       └── photos/         # 84 photos in 7 categories
│           ├── amenities/
│           ├── bedrooms/
│           ├── deck-outdoor/
│           ├── entertainment/
│           ├── exterior/
│           ├── living-kitchen/
│           └── videos/     # Hero drone tour + how-to source videos
└── DESIGN.md
```

## CMS Integration (Client-Side)

Unlike the Next.js sites, this static site uses a lightweight client-side CMS approach:

### How It Works
1. `cms.js` loads on every page via `<script>` tag
2. On DOMContentLoaded, fetches all `site='luxe'` content from Supabase REST API
3. Finds elements with `data-cms-key` attributes and replaces their text
4. In edit mode (`?editMode=true`), adds visual indicators and click-to-edit modals

### Content Key Convention
All keys use `luxe_` prefix: `luxe_{page}_{section}_{descriptor}`

### Key Attributes
- `data-cms-key="luxe_home_hero_title"` — identifies the CMS content key
- `data-cms-type="phone"` — special handling for phone links (updates href + text)

### Edit Mode
- Activated by `?editMode=true` URL parameter
- Shows gold edit mode bar at top of page
- Dashed outlines on all CMS-managed elements
- Click to open modal editor
- Saves directly to Supabase REST API (PATCH)

## JavaScript Modules

### script.js (Core)
- `initMobileMenu()` — hamburger menu toggle
- `initContactModal()` — contact us modal
- `initHeaderScroll()` — header shadow on scroll
- `initGalleryFilter()` — photo gallery category tabs
- `initLightbox()` — full-screen photo viewer with keyboard/touch nav

### cms.js (CMS Client)
- `fetchContent()` — GET from Supabase REST API
- `applyContent()` — update DOM from content map
- `updateContent()` — PATCH to Supabase REST API
- `enableEditMode()` — add visual indicators + click handlers
- `openEditor()` — modal editor UI

## Pages

### index.html (Home)
- Hero: drone tour video background, property name, location, bedroom/bathroom/sleeps stats
- Property Stats Bar: 4 stat cards (views, river, sunrise, hot tub)
- Booking: CTA to book on Airbnb (external link)
- Photo Gallery: 84 photos with category filter tabs + lightbox
- Highlights: 4 cards (mountain views, sunrises, hot tub, river views)

### Content Pages (amenities, attractions, restaurants, todo, rules)
- All have "Coming Soon" placeholder content
- Same header/footer as home page

### howto.html
- 5 how-to video cards with YouTube embeds
- Topics: TV & Fireplace, Theater Remote, Murphy Bed, Google Home, Basement Shower

## Shared Elements (All Pages)

### Header
- Fixed position with backdrop blur
- Logo + "Om Luxe Properties" + "Luxury Vacation Rentals"
- Navigation: 7 page links
- "Call Us" button → `<a>` tag with CMS phone number

### Footer
- Logo + brand name
- Facebook social link
- "Contact Us" button (opens modal)
- Copyright + legal links

## Deployment

- **Platform**: Static hosting (can deploy to Vercel as static)
- **Domain**: omluxeproperties.com
- **No build step**: Just serve the files
- **CMS requires**: Supabase project accessible (REST API)

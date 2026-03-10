# Om Luxe Properties Website

Public marketing website for Om Luxe Properties LLC — vacation rental property showcase featuring "Perch in the Clouds" in Ellijay, GA.

## Architecture
- **Framework:** Next.js 16.1.6 + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (new-york style)
- **Branding:** `@om-apex/brand` package (green/earth tones)
- **CMS:** Supabase-backed inline editing with `luxe_` content key prefix
- **Media:** 84 property photos + video tour
- **Deployed URL:** https://om-luxe-site.vercel.app / omluxeproperties.com
- **GitHub Repo:** om-apex/website-luxe-properties
- **Supabase:** `hympgocuivzxzxllgmcy` (shared Owner Portal project)

## Key Directories
```
src/
├── app/              (routes: home, about, properties, contact, api/)
├── components/       (Header, Footer, EditableText, PhotoGallery, brand/, ui/, pages/)
├── contexts/         (ContentContext, EditModeContext)
├── lib/              (brand.ts, content.ts, supabase/)
└── middleware.ts
```

## Development
- **Local Port:** 3004
- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Deploy:** Auto-deploy to Vercel on push to main

## Key Files
- `src/components/pages/` — Property showcase pages with photo galleries
- `public/images/` — 84 property photos (large files)

## Design Reference
See `DESIGN.md` for detailed architecture, CMS system, and brand guidelines.

## Gotchas
1. **CMS edit mode** — activate with `?editMode=true` or Cmd/Ctrl+Shift+E
2. **Content key prefix** — all CMS keys use `luxe_` prefix
3. **Large media files** — 84 photos, use ISR with 60s revalidation
4. **Photo gallery** — Lightbox component for full-screen viewing

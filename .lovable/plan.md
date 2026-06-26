# Varazdat Avetisyan — CV Website + Admin Panel

A dark, modern personal site for an AI/ML researcher, with a full CMS-style admin panel.

## Visual direction
- **Theme**: Modern Dark — deep navy `#0b1020` background, panels `#111a35`, text `#e2e8f0`, accent electric blue `#60a5fa` with subtle gradient glow.
- **Type**: Space Grotesk for display headings (technical, modern), Inter for body.
- **Feel**: Glass cards over a faint grid/gradient backdrop, generous whitespace, restrained micro-animations (fade-up on scroll, hover lifts).
- **Real content from the start** — your bio, title, location are seeded; no Lorem.

## Public routes
1. `/` — **Home**: hero with name, title, tagline, CTA (Download CV / Contact), featured projects + latest blog/talks teaser.
2. `/about` — Bio, photo, location, skills, education, downloadable CV.
3. `/courses` — Text/curriculum courses grid (title, description, level, link).
4. `/video-courses` — Video courses grid with thumbnails + embed links.
5. `/talks` — Talks & events timeline (event, date, location, slides/video link).
6. `/blog` — Article list + `/blog/$slug` detail with rich content.
7. `/projects` — Research/engineering projects grid + detail.
8. `/companies` — Companies founded / worked with (logo, role, period, link).
9. `/contact` — Form + email/socials (form submissions stored in DB).
10. `/auth` — Sign in (single owner).

## Admin panel `/admin/*` (authenticated)
- Dashboard with counts + quick links.
- CRUD pages for each section: Profile, Skills, Education, Courses, Video Courses, Talks, Blog Posts, Projects, Companies, Messages (inbox).
- Image upload via Storage bucket for thumbnails/logos/profile photo.
- Rich-text editor (Markdown) for blog/about long-form fields.
- "Visible" toggle + display order per item.

## Tech / data
- **Lovable Cloud** for auth, Postgres, and Storage.
- Auth: email/password, single owner (your email becomes admin via a `user_roles` table + `has_role()` security-definer function — never a boolean on profiles).
- Tables: `profile` (singleton), `skills`, `education`, `courses`, `video_courses`, `talks`, `blog_posts`, `projects`, `companies`, `messages`, `user_roles`.
- RLS: public `SELECT` on published content; only admins can `INSERT/UPDATE/DELETE`; `messages` insertable by anyone, readable only by admin.
- Storage bucket `media` (public) for images; admin-only writes.
- Server functions (TanStack Start) only where needed; client uses Supabase directly under RLS.

## Phase 1 (this build)
To keep this shippable in one pass, I'll deliver:
1. Design system + dark theme + layout shell (header, footer, mobile nav).
2. Lovable Cloud enabled with full schema, RLS, and seed data from your bio.
3. All **public pages** rendering live data from DB (Home, About, Courses, Video Courses, Talks, Blog list+detail, Projects, Companies, Contact).
4. Auth (`/auth`) + protected `/admin` shell with sidebar.
5. Admin CRUD for: Profile, Projects, Blog Posts, Courses (the most-used). Other sections (video courses, talks, companies, skills, education, messages) get list views in admin; full CRUD forms follow in a quick second pass so we don't blow this turn's scope.

After you confirm phase 1, I'll fill in remaining admin forms + polish.

Ready to build?
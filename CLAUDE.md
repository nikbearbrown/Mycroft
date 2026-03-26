# CLAUDE.md — Mycroft

> **Mycroft** — a project by Bear Brown & Company. Built using the Mycroft platform as a reference implementation.

## Who this site is for
Mycroft is a site by Bear Brown & Company. It serves as a public-facing hub for course descriptions, research blog posts, interactive tools, and developer documentation.

Primary audiences:
- Prospective and current graduate students evaluating the certificate
- Faculty and researchers in AI, education, cognitive science, and ethics
- Industry professionals exploring what human capabilities remain beyond AI's reach
- General public interested in the intersection of human intelligence and artificial intelligence

Brand voice: Academic, clear, direct. Informed by research, accessible to practitioners. No hype, no jargon for its own sake. "What AI can and can't do."

## Tech stack
- Next.js (App Router)
- Deployed on Vercel
- Tailwind CSS + @tailwindcss/typography (for prose article rendering)
- TypeScript
- next-themes for dark/light mode
- Vercel Blob (@vercel/blob) for image uploads
- Neon (serverless PostgreSQL via @neondatabase/serverless)
- Tiptap (ProseMirror-based rich text editor for blog)
- D3.js (data visualizations embedded in blog posts)
- adm-zip (server-side Substack ZIP parsing)

## Author
**Nik Bear Brown**, Bear Brown & Company. Creator of the Mycroft platform.

## Site structure
1. `/` — Home (program intro + course overview + contact)
2. `/courses` — Course directory (card grid of the 5-course sequence)
3. `/courses/botspeak` — BotSpeak: Fluency in AI Communication
4. `/courses/causal-reasoning` — Causal Reasoning and World Modeling
5. `/courses/ethical-play` — Ethical Play and Moral Imagination
6. `/courses/aimagineering` — AIMagineering: Creative Intelligence
7. `/courses/embodied-teaching` — Embodied Teaching and Mentorship
8. `/tools` — Tools directory (card grid, Neon-driven)
9. `/tools/[slug]` — Artifact tool embed page (full-viewport iframe)
10. `/dev` — Dev docs browser (searchable card grid, filesystem-driven)
11. `/dev/[slug]` — Full-viewport iframe of a dev doc HTML file
12. `/notes` — Notes browser (searchable card grid, grouped by folder, filesystem-driven)
13. `/notes/[...slug]` — Full-viewport iframe of a note HTML file (e.g., `/notes/Irreducibly-Human/NEU_botspeak-syllabus`)
14. `/books` — Books browser (searchable card grid, filesystem-driven via `book.json`)
15. `/books/[slug]` — Book detail page with metadata and TOC
16. `/books/[slug]/[...chapter]` — Full-viewport iframe of a book chapter
17. `/blog` — Blog feed: published posts newest first, clean card list
13. `/blog/[slug]` — Individual blog post with prose content
14. `/about` — About the program (prose format, author info)
15. `/privacy` — Privacy Policy for Mycroft
16. `/privacy/cookies` — Cookie Policy for Mycroft (dedicated page)
17. `/terms-of-service` — Terms of Service for Mycroft
18. `/substack` — Newsletter hub: card grid of all Substack sections
19. `/substack/[section]` — Section page: description, "Follow on Substack" CTA, chronological article list
20. `/substack/[section]/[slug]` — Full article: attribution banner, prose content, "Subscribe on Substack" footer CTA
21. `/admin/login` — Admin login page (password form)
22. `/admin/dashboard` — Admin dashboard (protected via middleware + `admin_session` cookie)
23. `/admin/dashboard/blog` — Manage blog posts (list, create, edit, delete)
24. `/admin/dashboard/blog/new` — New post editor
25. `/admin/dashboard/blog/[id]/edit` — Edit existing post
26. `/admin/dashboard/blog/import` — Import posts (Substack ZIP or blog export ZIP)
27. `/admin/dashboard/tools` — Manage tools (link and artifact types)
28. `/admin/dashboard/substack` — Manage Substack sections & import ZIP archives

### Placeholder pages (noindex, inherited from previous project)
- `/classes` — Coming Soon placeholder
- `/contact` — Coming Soon placeholder
- `/projects` — Coming Soon placeholder
- `/_theme-toggle-demo` — Coming Soon placeholder
- `/template` — Page template for creating new routes (not indexed)

## The Five Courses

### 1. BotSpeak: Fluency in AI Communication (`/courses/botspeak`)
How to talk to machines — and know when they're talking past you. Covers prompt engineering, model limitations, hallucination detection, and the rhetorical gap between human intent and machine output.

### 2. Causal Reasoning and World Modeling (`/courses/causal-reasoning`)
AI finds correlations. Humans build causal models. This course covers counterfactual thinking, interventionist reasoning, and the kind of "why" questions that statistical models cannot answer.

### 3. Ethical Play and Moral Imagination (`/courses/ethical-play`)
Moral reasoning under uncertainty, value pluralism, and the limits of rule-based ethics. Students develop the capacity for ethical judgment that cannot be reduced to optimization or alignment.

### 4. AIMagineering: Creative Intelligence (`/courses/aimagineering`)
Generative AI produces outputs. Humans produce meaning. This course explores creative process, aesthetic judgment, conceptual blending, and the difference between novelty and genuine originality.

### 5. Embodied Teaching and Mentorship (`/courses/embodied-teaching`)
Teaching is irreducibly human. This course covers presence, improvisation, emotional attunement, and the embodied skills that make mentorship effective — none of which transfer to a language model.

## Persistent layout (every page)

### Header (`/components/Header/Header.tsx`) — DONE
- Logo: text-based "Mycroft" in bold tracking-tighter
- Nav: Home (`/`) | Courses (`/courses`) | Tools (`/tools`) | Dev (`/dev`) | About (`/about`) | Blog (`/blog`)
- Social buttons (top right): GitHub (github.com/nikbearbrown/irreducibly-human), Substack (skepticism.ai), YouTube (youtube.com/@Musinique), Spotify (open.spotify.com/artist/0hSpFCJodAYMP2cWK72zI6) — black button style
- Dark/light mode toggle (ThemeToggle component)
- Mobile hamburger menu with backdrop (lg breakpoint)
- Sticky, z-50, backdrop-blur

### Footer (`/components/Footer/Footer.tsx`) — DONE
Four-column grid layout:
- **Program Info:** Mycroft, Bear Brown & Company, Bear Brown & Company, bear@bearbrown.co
- **Platform:** Links to Courses, Tools, Blog, About
- **Connect:** GitHub (github.com/nikbearbrown/irreducibly-human), Substack (skepticism.ai), Bear Brown & Co (bearbrown.co), YouTube (youtube.com/@Musinique), Spotify (open.spotify.com/artist/0hSpFCJodAYMP2cWK72zI6)
- **Legal:** Privacy Policy, Cookie Policy, Terms of Service
- Bottom bar: copyright

### Root layout (`/app/layout.tsx`) — DONE
- ThemeProvider: defaultTheme="light", enableSystem
- Inter font
- Header + main + Footer
- Vercel Analytics

## Home page (`/app/page.tsx`) — NEEDS UPDATE
Five sections, alternating white/muted/dark backgrounds:
1. **Hero** (two-column): Left — h1 "Mycroft", subtext "What AI Can and Can't Do", program description, "Explore Courses" + "Contact Us" buttons. Right — introductory video embed.
2. **The Five Courses** (2x2+1 card grid, muted bg): Five course cards — BotSpeak, Causal Reasoning, Ethical Play, AIMagineering, Embodied Teaching. Each with description + course link.
3. **Who This Is For** (3-column cards, dark bg): For Graduate Students, For Researchers, For Professionals — each with 4 bullet points.
4. **Get Started** (bb-2 bg): CTA section with "EXPLORE COURSES" (/courses), "ABOUT THE PROGRAM" (/about), "CONTACT US" buttons.
5. **Bear Brown & Company** (dark bg): Program affiliation and contact info.

## Tools system — DONE

### Database (`tools` table in Neon PostgreSQL)
```sql
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  tool_type TEXT DEFAULT 'link',  -- 'link' | 'artifact'
  claude_url TEXT,                  -- external URL (for link tools, or fallback for artifacts)
  chatgpt_url TEXT,                 -- optional ChatGPT URL for the tool
  artifact_id TEXT,                -- Claude artifact UUID
  artifact_embed_code TEXT,        -- raw iframe embed (overrides artifact_id if set)
  tags TEXT[],                     -- category tags stored as array
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_tools" ON tools FOR SELECT USING (true);
CREATE POLICY "service_role_tools" ON tools FOR ALL USING (true) WITH CHECK (true);
```

### Tool types
- **link** — External URL tool (database-driven). Card clicks open URL in new tab.
- **artifact** — HTML file in `public/artifacts/` (filesystem-driven). Card clicks go to `/tools/[slug]` which renders the file in a full-viewport iframe. No database entry needed.

### Adding a new artifact tool
1. Build the HTML file with `<title>`, `<meta name="description">`, and `<meta name="keywords">` tags
2. Drop into `public/artifacts/`
3. Push to main — Vercel deploys and it appears on `/tools` automatically
4. No database entry needed — filesystem is the source of truth for artifacts

### Adding a new link tool
1. Use admin UI at `/admin/dashboard/tools`
2. Set tool_type to 'link', enter claude_url
3. Appears on `/tools` immediately

### API routes (admin-protected)
- `GET/POST /api/admin/tools` — list & create link tools
- `PUT/DELETE /api/admin/tools/[id]` — update & delete link tools

### Admin UI (`/app/admin/dashboard/tools/page.tsx`)
- Link tool list with name, type badge, slug, tags, URL
- "New Link Tool" button → dialog form with:
  - Name, slug (auto-generated), description
  - Conditional fields: URL for link tools; artifact_id + embed_code + fallback URL for artifacts
  - Tags (comma-separated input, stored as array)
- Edit and delete per tool

### Public pages
- `/tools` — Card grid of all tools. Artifact tools show "Artifact" badge and link to `/tools/[slug]`. Link tools open in new tab.
- `/tools/[slug]` — Full-page artifact embed with title bar (name, description, "Back to Tools" link, optional "Open External" button). Iframe takes full viewport height minus header.

## Notes system — DONE

### Structure
Notes are organized into subdirectories under `public/notes/`, each folder representing a collection:
- `public/notes/Irreducibly-Human/` — Core curriculum documents (syllabi, TIC TOCs, project doc)
- `public/notes/White-Label/` — White-label workshop materials

### Adding new notes
1. Create or choose a folder under `public/notes/` (folder name becomes the section heading)
2. Build the HTML file with `<title>`, `<meta name="description">`, and `<meta name="keywords">` tags
3. Drop into the appropriate folder
4. It appears automatically on `/notes` — no database, no sync needed
5. Filesystem is the source of truth

### Public pages
- `/notes` — Searchable card browser grouped by folder. Each folder is a section with heading. Tag filter bar from keywords metadata. Alphabetical by folder and title.
- `/notes/[...slug]` — Full-viewport iframe of the note (catch-all route handles `folder/file` paths)

### Components
- `app/notes/NotesBrowser.tsx` — Client component: search input, tag filter badges, folder-grouped card grid
- `app/notes/page.tsx` — Server component: scans `public/notes/` subdirectories via `scanHtmlSubdirs()`
- `app/notes/[...slug]/page.tsx` — Catch-all route for viewing individual notes in iframe

## Books system — DONE

### Structure
Books are organized into subdirectories under `public/books/`, one folder per book:
- `public/books/AI-Sherpa/` — The AI Sherpa
- `public/books/AImagineering/` — AImagineering
- `public/books/Botspeak/` — Botspeak
- `public/books/Causal-Reasoning/` — Causal Reasoning
- `public/books/Conducting-AI/` — Conducting AI
- `public/books/Embodied-Teaching/` — Embodied Teaching
- `public/books/Ethical-Play/` — Ethical Play

Each folder contains:
- `book.json` — Book-level metadata (title, subtitle, authors, publisher, ISBN, ASIN, series, description, keywords, categories, cover, amazonUrl, relatedCourse, license, parts with chapter lists)
- `*.html` — Chapter HTML files with standard `<title>`, `<meta name="description">`, `<meta name="keywords">` tags
- Optional `cover.jpg` — Book cover image

### Adding a new book
1. Create a folder under `public/books/`
2. Add a `book.json` with metadata (see existing books for schema)
3. Add chapter HTML files
4. It appears automatically on `/books` — no database, no sync needed

### Public pages
- `/books` — Searchable card grid of all books. Shows title, subtitle, authors, status badge, series position, description, keywords. Tag filter bar.
- `/books/[slug]` — Book detail page with full metadata, TOC (parts/chapters from `book.json`, falls back to flat HTML file list), cover image, Amazon link, related course link.
- `/books/[slug]/[...chapter]` — Full-viewport iframe chapter viewer with back navigation to the book.

### Components
- `lib/book-meta.ts` — `scanBooks(dir)` reads subdirectories, parses `book.json`, extracts chapter HTML metadata. Returns `BookMeta[]` sorted by series position.
- `app/books/BooksBrowser.tsx` — Client component: search input, tag filter badges, card grid
- `app/books/page.tsx` — Server component: scans `public/books/` via `scanBooks()`
- `app/books/[slug]/page.tsx` — Book detail with TOC
- `app/books/[slug]/[...chapter]/page.tsx` — Chapter iframe viewer

## Dev Docs system

### Adding new dev docs
1. Build the HTML doc (use Claude Project with the dev docs prompt)
2. Drop into `public/dev/`
3. Ensure the HTML has `<title>`, `<meta name="description">`, and `<meta name="keywords">` tags
4. It appears automatically on `/dev` — no database, no sync needed
5. Filesystem is the source of truth

### Public pages
- `/dev` — searchable card browser of all docs in `public/dev/` with tag filtering
- `/dev/[slug]` — full-viewport iframe of the doc

### Admin
- `/admin/dashboard` → Dev tab — lists all files with title, filename, tags, description, open/delete buttons
- "Sync Dev Docs" button refreshes the list from the filesystem

### Shared utility
- `lib/html-meta.ts` — `scanHtmlDir(dir)` reads all `.html` files from a directory and extracts `<title>`, `<meta name="description">`, `<meta name="keywords">` tags. Returns `HtmlDocMeta[]`. Used by `/dev` pages and admin. `scanHtmlSubdirs(dir)` scans subdirectories and returns `GroupedHtmlDocs[]` (folder + docs). Used by `/notes`.

## Blog system — DONE

### Database (`blog_posts` table in Neon PostgreSQL)
```sql
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT NOT NULL UNIQUE,
  byline TEXT,
  cover_image TEXT,
  content TEXT NOT NULL,
  excerpt TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
RLS: public can read published posts only, service role has full access.

### API routes
- `GET/POST /api/admin/blog` — admin: list all posts (with tags) / create post
- `GET/PUT/DELETE /api/admin/blog/[id]` — admin: get / update / delete post
- `GET /api/blog` — public: list published posts
- `GET /api/blog/[slug]` — public: single published post
- `POST /api/admin/blog/import-substack` — import Substack ZIP as blog drafts with tags
- `POST /api/admin/blog/import-json` — import blog export ZIP (posts.json) as drafts
- `GET /api/admin/blog/export?tags=a,b` — export matching posts as ZIP (posts.json + .html files)
- `POST /api/admin/upload` — upload image to Vercel Blob, returns `{ url }` (admin-protected, images only)

### Admin UI
- `/admin/dashboard/blog` — Post list with tag badges, tag filter bar, select-all checkbox, bulk delete, Import/Export buttons
- `/admin/dashboard/blog/new` — New post editor
- `/admin/dashboard/blog/[id]/edit` — Edit existing post
- `/admin/dashboard/blog/import` — Import page: Substack ZIP or blog export ZIP, tag assignment, source label, results summary

### Blog Editor (`/components/BlogEditor/BlogEditor.tsx`)
Tiptap (ProseMirror-based) rich text editor, Substack-style:
- Large title input (no label, headline style)
- Italic subtitle input ("Add a subtitle...")
- Cover image upload (drag/drop or click, uploads to Vercel Blob, preview with remove button)
- Byline textarea (pre-populated with copyright + MIT attribution, editable per post)
- Tags input (comma-separated, stored as PostgreSQL text array)
- Auto-generated slug from title (editable)
- Tiptap WYSIWYG editor with toolbar:
  - Text: Bold, Italic, Underline, Strikethrough, Inline Code, Code Block
  - Structure: H2, H3, Bullet List, Ordered List, Blockquote, Horizontal Rule
  - Embeds: Link, Image (upload to Vercel Blob via drag/drop/paste/button), YouTube (via @tiptap/extension-youtube), D3 Viz (inserts `data-viz` placeholder)
- Preview toggle renders HTML via BlogVizHydrator (D3 vizzes work in preview)
- Output is clean HTML via `editor.getHTML()`, stored in `content` column
- Actions: "Save Draft", "Publish" (sets published=true + published_at), "Unpublish" (for published posts)
- Auto-generates excerpt (first 200 chars plain text)

### Blog viz system
- `lib/viz/registry.ts` — maps `data-viz` names to lazy-loaded render functions
- `lib/viz/ai-adoption-bars.ts` — D3 horizontal bar chart ("AI Adoption by Sector"), responsive
- `lib/viz/ai-ecosystem-graph.ts` — D3 force-directed graph ("The AI Ecosystem 2025"), interactive: drag nodes, hover/click to highlight connections, tooltips, color-coded groups
- `components/BlogVizHydrator/BlogVizHydrator.tsx` — client component that renders HTML via `dangerouslySetInnerHTML`, then hydrates any `[data-viz]` elements by looking up the registry and dynamically importing the renderer
- To add a new viz: create `lib/viz/<name>.ts` exporting `default (el: HTMLElement) => void`, add entry to `registry.ts`

### Blog import/export system
- **Substack-to-blog import** (`/admin/dashboard/blog/import`): Upload a Substack ZIP, assign tags (comma-separated) and a source label (auto-prefixed as `source:name`). Posts are inserted as drafts into `blog_posts`, skipping existing slugs. Uses the existing `lib/substack-parser.ts`.
- **Blog export** (`GET /api/admin/blog/export?tags=a,b`): Returns a ZIP with `posts.json` (full post data) and individual `.html` files per post. Tag filtering optional.
- **Blog import** (`POST /api/admin/blog/import-json`): Accepts a blog export ZIP, inserts posts as drafts, skips existing slugs. Enables cross-site transfer between instances of the same codebase.
- **Workflow**: Export Substack → import as drafts with tags → edit in Tiptap → export → import on another site

### Public pages
- `/blog` — Blog feed with search bar, cover image thumbnails, published posts newest first, title + subtitle + excerpt + date + "Read →"
- `/blog/[slug]` — Full post: cover image hero, title, subtitle, date + reading time, HTML prose content (hydrated via BlogVizHydrator), byline footer, previous/next navigation, og:image + twitter:card meta tags

## About page (`/app/about/page.tsx`) — NEEDS UPDATE
Prose-forward format with sections:
- Program introduction (Mycroft at Bear Brown & Company)
- Author (Nik Bear Brown, Bear Brown & Company)
- The Thesis (what AI can and can't do — the irreducibly human capacities)
- The Five Courses (overview of the sequence)
- Contact (email)

## Legal Pages — DONE
All three pages use the same structural template, branded for Mycroft. Bear Brown & Company, Bear Brown & Company. Contact: bear@bearbrown.co. Educational program.

### Privacy Policy (`/app/privacy/page.tsx`)
Sections: introduction, information we collect (contact data, inquiry content, engagement data, analytics), how we use info, sharing (consent, legitimate interests, contract, legal, vital interests), third-party services (Vercel, Neon, Substack, Anthropic, GitHub), cookies reference (links to Cookie Policy page), data security, data retention, your privacy rights, children's privacy, changes, contact. Nav: Terms of Service ← → Cookie Policy.

### Cookie Policy (`/app/privacy/cookies/page.tsx`)
Separate dedicated page at `/privacy/cookies`. Sections: what are cookies, cookies we use (table: theme + admin_session), cookies we do NOT use (advertising, remarketing, cross-site tracking, social pixels, individual analytics), third-party cookies (Substack, Claude.site with links to their policies), how to manage cookies (browser-specific instructions), Do Not Track, changes, contact. Nav: Privacy Policy ← → Terms of Service.

### Terms of Service (`/app/terms-of-service/page.tsx`)
15 sections: introduction, website purpose, educational content, intellectual property, use license, user conduct, newsletter content, third-party services and links, disclaimer, limitations, indemnification, revisions and errata, governing law (Massachusetts, USA), modifications, contact. Nav: Privacy Policy ← → Home.

## Theming (Mycroft palette)

The color palette lives in three places that must stay in sync:
- `lib/theme.ts` — TypeScript source of truth
- `public/theme.json` — machine-readable for doc generators
- `app/globals.css` — CSS variables (`--bb-1` through `--bb-8`) that drive the actual site

### Current palette (inherited, pending rebrand)
| Var | Hex | Role | WCAG on bb8 |
|-----|-----|------|-------------|
| bb1 | #0D0D0D | soot black — primary text | 16.5:1 |
| bb2 | #4A4A4A | iron grey — primary accent | 5.9:1 |
| bb3 | #8B0000 | dried-ink red — danger/emphasis | 5.2:1 |
| bb4 | #8B7536 | cold brass — highlight/callout | 4.5:1 |
| bb5 | #2F2F2F | charcoal — secondary accent | 10.8:1 |
| bb6 | #6B6B5E | tarnished pewter — muted accent | — |
| bb7 | #9C9680 | aged ledger tan — borders, subtle bg | — |
| bb8 | #E8E0D0 | parchment — page background | — |

### To rebrand a new deployment
1. Edit the hex values in all three files (`lib/theme.ts`, `public/theme.json`, `app/globals.css`)
2. The entire site repaints — no component changes needed
3. Doc generators read `public/theme.json` to match HTML output

### Design principles
- Minimal and editorial by default — white space is the primary design element
- Color used for accent, hierarchy, and accessibility — not decoration
- Never use color for pure aesthetics — every color use must serve readability or navigation
- WCAG AA contrast minimum for all text/background combinations
- Clean academic aesthetic — clarity over ornamentation

## Design direction
- Light mode default (dark mode toggle available)
- Clean, editorial — scholarly and readable
- Typography: Inter font (headings bold tracking-tighter, body clean)
- Color: driven by the BB palette above — use `var(--color-accent)` etc.
- Black button style: `bg-black text-white hover:bg-gray-800` (dark mode: border outline with accent hover)

## Existing components (do not rebuild)

### ThemeToggle.tsx (`/components/ThemeToggle.tsx`)
Sun/Moon toggle using next-themes. Import and use as-is.

### theme-provider.tsx (`/components/theme-provider.tsx`)
Wrapper around NextThemesProvider. Used in root layout.

### UI components (`/components/ui/`)
60+ shadcn/ui components. PrimaryButton and SecondaryButton exist but home page currently uses inline button styles.

## Substack import system — DONE

### Database (Neon PostgreSQL)
Two tables: `substack_sections` and `substack_articles`. Sections have title, slug, description, substack_url, article_count. Articles belong to a section and store title, subtitle, slug, excerpt, content (HTML), original_url, published_at, display_date.

### ZIP parser (`lib/substack-parser.ts`)
Server-side parser using adm-zip. Reads `posts.csv` + HTML files from a Substack export ZIP. Returns parsed posts with title, subtitle, slug, content, publishedAt, displayDate, excerpt (~200 chars plain text), canonicalUrl. Skips drafts and podcasts.

### API routes (all admin-protected via `admin_session` cookie)
- `GET/POST /api/admin/substack/sections` — list & create sections
- `PUT/DELETE /api/admin/substack/sections/[id]` — update & delete sections
- `POST /api/admin/substack/upload` — multipart formData (zip + sectionId), parses ZIP, upserts articles, updates article_count

### Admin UI (`/app/admin/dashboard/substack/page.tsx`)
- Section list with title, slug badge, article count, Substack URL
- "New Section" button → dialog form (title, auto-slug, substack URL, description)
- "Import ZIP" button per section → file upload dialog with drag area
- Edit and delete per section

### Public pages
- `/substack` — hero + card grid of sections (force-dynamic, graceful fallback if DB not configured)
- `/substack/[section]` — section hero + "Follow on Substack" CTA + article list
- `/substack/[section]/[slug]` — attribution banner, prose content via `dangerouslySetInnerHTML`, subscribe CTA

### Database client
- `lib/db.ts` — exports `sql` tagged template literal from `@neondatabase/serverless`. Lazily initialized from `DATABASE_URL` env var. Used in all API routes and server components.

### Admin auth
- `middleware.ts` — protects all `/admin/dashboard/*` routes; redirects to `/admin/login` if no `admin_session` cookie
- `app/admin/login/page.tsx` — password login form, POSTs to `/api/admin/login`
- `app/api/admin/login/route.ts` — validates password against `ADMIN_PASSWORD` env var, sets `admin_session` cookie (httpOnly, secure, 7-day expiry)
- `app/admin/page.tsx` — redirects to `/admin/dashboard` if authenticated, `/admin/login` if not
- `lib/admin-auth.ts` — `isAdmin()` helper used by API routes to check `admin_session` cookie
- All `/api/admin/*` routes check `isAdmin()` before proceeding

## SEO — DONE
- `app/sitemap.ts` — dynamic sitemap: static pages + all `/blog/*`, `/tools/*`, `/substack/*` routes from Neon. Falls back to static-only if DB not configured.
- `app/robots.ts` — allows all, disallows `/admin/` and `/api/`, points to `/sitemap.xml`

## Admin dashboard (`/app/admin/dashboard/`) — DONE
- Protected by `middleware.ts` — redirects to `/admin/login` without valid session
- Login page at `/admin/login` validates against `ADMIN_PASSWORD` env var
- Session stored as `admin_session` httpOnly cookie (7-day expiry)
- Layout with tabbed nav (Overview, Blog, Tools, Substack)
- Blog management: create/edit/delete posts with rich text editor, publish/unpublish
- Tools management: create/edit/delete tools with link/artifact type support
- Substack management: create/edit/delete sections, import ZIP archives
- Overview is placeholder

## Environment variables
```
DATABASE_URL=                    # Neon PostgreSQL connection string (from Vercel marketplace or Neon dashboard)
ADMIN_PASSWORD=                  # Password for /admin/login — set a strong value in production
NEXT_PUBLIC_SITE_URL=https://mycroft.site  # Used in sitemap generation
BLOB_READ_WRITE_TOKEN=           # Vercel Blob token (from Vercel dashboard → Storage → Blob)
NEXT_PUBLIC_GA_ID=               # Google Analytics measurement ID (optional, e.g. G-XXXXXXXXXX)
NEXT_PUBLIC_ANTHROPIC_API_KEY=   # only if embedding AI assistant directly
```

## Deployment
- Push to main → auto-deploys to Vercel
- Domain: mycroft.site

## What NOT to do
- Do not use localStorage — use React state or sessionStorage
- Do not add analytics or tracking beyond what's already present
- Keep public nav to six items: Home, Courses, Tools, Dev, About, Blog
- Do not commit .env.local or credentials to git

## User Guide

### Overview

mycroft.site is the companion site for "Mycroft: What AI Can and Can't Do," a 5-course graduate certificate in Bear Brown & Company. It runs on Next.js with Vercel auto-deploy. The public site has no login; the admin dashboard is cookie-protected.

---

### For visitors

**Home page** (`/`) — Landing page with program introduction, course overview cards, audience benefits, CTA, and contact info.

**Courses** (`/courses`) — Card grid of the five courses in the Mycroft sequence. Click a course to read its full description.

**About** (`/about`) — Prose-format page covering the program's thesis, author, course sequence, and contact details.

**Tools** (`/tools`) — Tools directory page. Contains interactive tool cards when populated.

**Newsletter** (`/substack`) — Card grid of all Substack newsletter sections. Click a section to see its articles listed chronologically. Click an article to read the full post with original Substack attribution.

**Privacy** (`/privacy`) — Privacy policy covering data collection, third-party services, and cookies.

**Dark/light mode** — Toggle via the sun/moon icon in the top-right header. Defaults to light mode.

---

### For the site admin

#### Initial setup (one-time)

1. **Neon database** — Create a project at neon.tech (or add via Vercel marketplace). Run this SQL in the SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS substack_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  substack_url TEXT NOT NULL,
  article_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS substack_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES substack_sections(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  excerpt TEXT,
  content TEXT,
  original_url TEXT,
  published_at TIMESTAMPTZ,
  display_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section_id, slug)
);

ALTER TABLE substack_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE substack_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_sections" ON substack_sections FOR SELECT USING (true);
CREATE POLICY "public_read_articles" ON substack_articles FOR SELECT USING (true);
CREATE POLICY "service_role_sections" ON substack_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "service_role_articles" ON substack_articles FOR ALL USING (true) WITH CHECK (true);
```

2. **Pending migrations** — Run these in Neon SQL Editor if you haven't already (safe to re-run):

```sql
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS byline TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT;
```

3. **Environment variables** — Add to `.env.local` (local dev) and Vercel project settings (production):

```
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_SITE_URL=https://mycroft.site
```

4. **Admin access** — Navigate to `/admin` (redirects to `/admin/login`). Enter the password set in `ADMIN_PASSWORD` env var. On success, an `admin_session` cookie is set (httpOnly, 7-day expiry) and you're redirected to the dashboard.

#### Managing Substack sections

1. Go to `/admin/dashboard/substack`
2. Click **"New Section"** to create a newsletter section
   - **Title**: Display name shown on public pages
   - **Slug**: Auto-generated from title, used in URLs
   - **Substack URL**: Link to the original Substack
   - **Description**: Shown on the section page hero and section cards
3. Each section card shows its title, slug badge, article count, and Substack URL
4. Use the **pencil icon** to edit or the **trash icon** to delete (deletes all articles too)

#### Importing Substack articles

1. Export your Substack archive:
   - Go to your Substack → Settings → Exports → "Create new export"
   - Download the ZIP file (contains `posts.csv` + individual `.html` files)
2. In the admin dashboard, click **"Import ZIP"** on the target section
3. Select or drag the ZIP file, then click **"Upload & Import"**
4. The parser reads `posts.csv` for metadata and matches HTML files by slug
   - Skips drafts and podcast-type posts
   - Extracts: title, subtitle, slug, content (HTML), published date, canonical URL
   - Generates a ~200-character plain-text excerpt from each post
5. Articles are upserted — re-importing the same ZIP updates existing articles by slug
6. The section's article count updates automatically

#### How articles appear publicly

- `/substack` — All sections as cards with article counts
- `/substack/[section]` — Section hero with description and "Follow on Substack" button, then a chronological list of articles showing date, title, subtitle, and excerpt
- `/substack/[section]/[slug]` — Full article page with:
  - Attribution banner ("Originally published on Substack" + "View original" link)
  - Back link to the section
  - Full HTML content rendered as prose
  - "Subscribe on Substack" CTA at the bottom

#### SEO

- **Sitemap** (`/sitemap.xml`) — Automatically generated. Includes all static pages plus all dynamic `/blog/*`, `/tools/*`, `/substack/*` routes from Neon. Falls back to static-only if DB is not configured.
- **Robots** (`/robots.txt`) — Allows all crawlers. Blocks `/admin/` and `/api/` paths. Points to the sitemap.

---

### For developers

#### Local development

```bash
npm install
npm run dev        # starts at http://localhost:3000
```

#### Project structure (key paths)

```
app/
  page.tsx                          # Home
  about/page.tsx                    # About the program
  courses/page.tsx                  # Course directory (card grid)
  courses/botspeak/page.tsx         # BotSpeak course page
  courses/causal-reasoning/page.tsx # Causal Reasoning course page
  courses/ethical-play/page.tsx     # Ethical Play course page
  courses/aimagineering/page.tsx    # AIMagineering course page
  courses/embodied-teaching/page.tsx # Embodied Teaching course page
  blog/page.tsx                     # Blog feed (server component, fetches posts)
  blog/BlogFeed.tsx                 # Client component: search + post cards with cover images
  blog/[slug]/page.tsx              # Individual blog post
  tools/page.tsx                    # Tools directory (merges filesystem artifacts + DB link tools)
  tools/ToolsBrowser.tsx            # Client component: search + tag filter + card grid
  tools/[slug]/page.tsx             # Tool page (filesystem first, DB fallback)
  dev/
    page.tsx                        # Dev docs browser (server component, reads filesystem)
    DevBrowser.tsx                  # Client component: search + tag filter + card grid
    [slug]/page.tsx                 # Full-viewport iframe for a dev doc
  privacy/page.tsx                  # Privacy Policy
  privacy/cookies/page.tsx          # Cookie Policy (dedicated page)
  terms-of-service/page.tsx         # Terms of Service
  substack/
    page.tsx                        # Newsletter hub
    [section]/page.tsx              # Section article list
    [section]/[slug]/page.tsx       # Full article
  admin/dashboard/
    layout.tsx                      # Admin layout with tab nav
    login/page.tsx                  # Admin login (password form)
    page.tsx                        # Admin overview (placeholder)
    blog/page.tsx                   # Blog post list (tag filter, bulk ops, export dialog)
    blog/new/page.tsx               # New post editor
    blog/[id]/edit/page.tsx         # Edit post editor
    blog/import/page.tsx            # Import: Substack ZIP or blog export ZIP
    tools/page.tsx                  # Tools manager (link + artifact types)
    dev/page.tsx                    # Dev docs list (filesystem browser)
    substack/page.tsx               # Substack section manager
  api/admin/login/route.ts          # POST: validate password, set session cookie
  api/admin/blog/
    route.ts                        # GET/POST blog posts (admin, with tags)
    [id]/route.ts                   # GET/PUT/DELETE blog post (admin)
    import-substack/route.ts        # POST: Substack ZIP → blog drafts with tags
    import-json/route.ts            # POST: blog export ZIP → blog drafts
    export/route.ts                 # GET: export posts as ZIP (optional tag filter)
  api/blog/
    route.ts                        # GET published posts (public)
    [slug]/route.ts                 # GET single published post (public)
  api/admin/tools/
    route.ts                        # GET/POST tools
    [id]/route.ts                   # PUT/DELETE tool
    sync-artifacts/route.ts         # DEPRECATED: artifacts are now filesystem-driven
  api/admin/upload/route.ts         # POST: image upload to Vercel Blob
  api/admin/dev/sync/route.ts      # POST: scan public/dev/, return doc metadata
  api/admin/substack/
    sections/route.ts               # GET/POST sections
    sections/[id]/route.ts          # PUT/DELETE section
    upload/route.ts                 # POST ZIP import
  sitemap.ts                        # Dynamic sitemap generator
  robots.ts                         # Robots.txt generator
middleware.ts                         # Auth middleware (protects /admin/dashboard)
components/
  Header/Header.tsx                 # Sticky header with nav + social + theme toggle
  Footer/Footer.tsx                 # 4-column footer (program, platform, social, legal)
  BlogEditor/BlogEditor.tsx         # Tiptap rich text editor (WYSIWYG, embeds, viz)
  BlogVizHydrator/BlogVizHydrator.tsx # Client component: hydrates data-viz elements with D3 charts
  ThemeToggle.tsx                   # Dark/light mode toggle
  theme-provider.tsx                # next-themes wrapper
  ui/                               # 60+ shadcn/ui components
lib/
  utils.ts                          # cn() helper + getReadingTime()
  html-meta.ts                      # scanHtmlDir() + scanHtmlSubdirs() — extract metadata from HTML files
  admin-auth.ts                     # admin_session cookie check
  substack-parser.ts                # Substack ZIP parser (adm-zip)
  db.ts                             # Neon PostgreSQL client (sql tagged template)
  viz/
    registry.ts                     # data-viz name → lazy import map
    ai-adoption-bars.ts             # D3 horizontal bar chart (AI Adoption by Sector)
    ai-ecosystem-graph.ts           # D3 interactive force-directed graph (AI Ecosystem)
```

#### Adding content

- **New Substack section**: Use the admin UI at `/admin/dashboard/substack`, or insert directly into the database
- **New tool**: Use the admin UI at `/admin/dashboard/tools`. Choose "Link Tool" for external URLs or "Claude Artifact" to embed an artifact at `/tools/[slug]`

#### Deployment

Push to `main` on GitHub → Vercel auto-deploys. Make sure Vercel environment variables match `.env.local`.

---

## License & Attribution

- **License:** MIT License, Copyright (c) 2026 Nik Bear Brown (see `LICENSE` file)
- **Attribution links:** All pages include footer links to [bearbrown.co](https://www.bearbrown.co/) and [The Skepticism AI Substack](https://www.skepticism.ai/)
- **Persistence requirement:** This attribution must be preserved in all brand instances, forks, and deployments. The footer attribution line in `components/Footer/Footer.tsx` and all standalone HTML files in `public/dev/` and `public/artifacts/` must include the MIT License notice, bearbrown.co link, and Skepticism AI Substack link.

---

## Standing Instructions

After every session, always:
1. Update CLAUDE.md to reflect any changes made — check `git log` and `git diff` to see exactly what was changed, do not ask.
2. Commit and push all changes to main with a descriptive commit message.

## Remaining work (in priority order)
1. Rebrand Header, Footer, Home page, and About page to Mycroft
2. Build `/courses` directory page and five individual course pages
3. Update legal pages (Privacy, Cookies, Terms) for Mycroft branding
4. Update color palette for Mycroft branding
5. Add tools via admin dashboard
6. Consider contact form widget (currently all CTAs route to mailto)

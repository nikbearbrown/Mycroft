
# Mycroft

By Bear Brown & Company.

## Stack

- Next.js (App Router)
- Tailwind CSS + @tailwindcss/typography
- TypeScript
- Neon (serverless PostgreSQL)
- Vercel Blob (image storage)
- Tiptap (rich text editor)
- next-themes (dark/light mode)

## Prerequisites

- Node.js LTS — https://nodejs.org/
- Git — https://git-scm.com/downloads

### macOS
```bash
brew install node git
```

### Ubuntu/Debian
```bash
sudo apt update && sudo apt install nodejs npm git
```

### Windows
Download and run the installers from the links above. Restart after.

### Verify
```bash
node --version && npm --version && git --version
```

## Getting Started

```bash
git clone <your-repo-url>
cd Mycroft
npm install --legacy-peer-deps
cp .env.example .env.local   # add your environment variables
npm run dev
```

Open http://localhost:3000

## Environment Variables

```
DATABASE_URL=              # Neon PostgreSQL connection string
ADMIN_PASSWORD=            # Password for /admin/login
BLOB_READ_WRITE_TOKEN=     # Vercel Blob token
NEXT_PUBLIC_SITE_URL=      # Your deployed site URL
```

## Database Setup

Run the SQL in `db/schema.sql` in your Neon dashboard, or paste the contents
into the Neon SQL Editor.

## Deployment

Push to `main` → Vercel auto-deploys.

Set all environment variables in Vercel → Project Settings → Environment Variables.

## Admin

Navigate to `/admin` — login with `ADMIN_PASSWORD`. Manage blog posts, tools,
and Substack sections from the dashboard.

## Troubleshooting

- **npm install fails** — try `npm cache clean --force` then re-run with `--legacy-peer-deps`
- **Permission errors on Mac/Linux** — use `sudo` for system-wide installs
- **Network issues** — `npm config set registry https://registry.npmjs.org/`

## About

Created by Nik Bear Brown, Bear Brown & Company.

Mycroft is open source (MIT License). See `LICENSE` for details.

- [bearbrown.co](https://www.bearbrown.co/)
- [The Skepticism AI Substack](https://www.skepticism.ai/)

/**
 * Seed script: insert the AI Adoption test blog post.
 * Run with: npx tsx scripts/seed-viz-post.ts
 * Requires DATABASE_URL in .env.local or environment.
 */
import { readFileSync } from 'fs'
import { neon } from '@neondatabase/serverless'

// Load .env.local if DATABASE_URL not already set
if (!process.env.DATABASE_URL) {
  try {
    const envFile = readFileSync('.env.local', 'utf-8')
    for (const line of envFile.split('\n')) {
      const match = line.match(/^(\w+)=(.*)$/)
      if (match) process.env[match[1]] = match[2]
    }
  } catch {}
}

const sql = neon(process.env.DATABASE_URL!)

const title = 'AI Adoption Across Industries — What the Data Shows'
const subtitle = 'A look at where AI is gaining real traction'
const slug = 'ai-adoption-across-industries'
const byline = `Mycroft — What AI Can and Can't Do. A 5-course series from Bear Brown & Company.
Contact: bear@bearbrown.co`

const content = `<p>Artificial intelligence is no longer a uniform phenomenon. Adoption rates vary dramatically by sector, shaped by regulatory environment, data availability, and organizational appetite for change.</p>

<p>The chart below illustrates estimated AI integration levels across key industries as of 2025, based on composite survey data from McKinsey, Deloitte, and Stanford HAI.</p>

<div data-viz="ai-adoption-bars"></div>

<p>Financial services and technology lead the pack — unsurprisingly, given their data infrastructure and competitive pressure. Healthcare lags despite enormous potential, held back primarily by HIPAA compliance complexity and institutional conservatism.</p>

<p>What's most striking is the middle tier: manufacturing, logistics, and education are all crossing the threshold from pilot projects to production deployments. This is where the next wave of AI value creation will come from.</p>`

const excerpt = 'Artificial intelligence is no longer a uniform phenomenon. Adoption rates vary dramatically by sector, shaped by regulatory environment, data availability, and organizational appetite for\u2026'

async function main() {
  await sql`
    INSERT INTO blog_posts (title, subtitle, slug, byline, content, excerpt, published, published_at)
    VALUES (${title}, ${subtitle}, ${slug}, ${byline}, ${content}, ${excerpt}, true, NOW())
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      subtitle = EXCLUDED.subtitle,
      byline = EXCLUDED.byline,
      content = EXCLUDED.content,
      excerpt = EXCLUDED.excerpt,
      published = true,
      published_at = COALESCE(blog_posts.published_at, NOW()),
      updated_at = NOW()
  `
  console.log('Seeded blog post: /blog/' + slug)
}

main().catch(err => { console.error(err); process.exit(1) })

/**
 * DEPRECATED: Artifact tools are now filesystem-driven.
 * Drop HTML files into public/artifacts/ and they appear on /tools automatically.
 * No database registration needed.
 *
 * This script is kept for backward compatibility but is no longer required.
 * Usage: npx tsx scripts/sync-artifacts.ts
 */
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
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

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  return match ? match[1].trim() : null
}

export async function syncArtifacts(): Promise<{ added: string[]; skipped: string[] }> {
  const dir = join(process.cwd(), 'public', 'artifacts')
  let files: string[]
  try {
    files = readdirSync(dir).filter(f => f.endsWith('.html'))
  } catch {
    return { added: [], skipped: [] }
  }

  const added: string[] = []
  const skipped: string[] = []

  for (const file of files) {
    const slug = file.replace('.html', '')
    const existing = await sql`SELECT id FROM tools WHERE slug = ${slug}`
    if (existing.length > 0) {
      skipped.push(slug)
      continue
    }

    // Read file to extract title
    let name = titleCase(slug)
    try {
      const html = readFileSync(join(dir, file), 'utf-8')
      const title = extractTitle(html)
      if (title) name = title
    } catch {}

    await sql`
      INSERT INTO tools (name, slug, description, tool_type, claude_url)
      VALUES (${name}, ${slug}, '', 'link', ${'/artifacts/' + file})
    `
    added.push(slug)
  }

  return { added, skipped }
}

// CLI entry point
async function main() {
  const { added, skipped } = await syncArtifacts()
  for (const s of added) console.log(`Added: ${s}`)
  for (const s of skipped) console.log(`Skipped: ${s} (already exists)`)
  console.log(`\nDone: ${added.length} added, ${skipped.length} skipped`)
}

main().catch(err => { console.error(err); process.exit(1) })

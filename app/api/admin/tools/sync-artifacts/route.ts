import { NextResponse } from 'next/server'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'

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

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const dir = join(process.cwd(), 'public', 'artifacts')
    let files: string[]
    try {
      files = readdirSync(dir).filter(f => f.endsWith('.html'))
    } catch {
      return NextResponse.json({ added: 0, skipped: 0, message: 'No public/artifacts/ directory found' })
    }

    let added = 0
    let skipped = 0

    for (const file of files) {
      const slug = file.replace('.html', '')
      const existing = await sql`SELECT id FROM tools WHERE slug = ${slug}`
      if (existing.length > 0) {
        skipped++
        continue
      }

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
      added++
    }

    return NextResponse.json({ added, skipped })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Sync failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

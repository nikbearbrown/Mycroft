import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'
import { parseSubstackZip } from '@/lib/substack-parser'

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('zip') as File | null
    const tagsRaw = (formData.get('tags') as string) || ''

    if (!file) {
      return NextResponse.json({ error: 'No ZIP file provided' }, { status: 400 })
    }

    const tags = tagsRaw
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    const buffer = Buffer.from(await file.arrayBuffer())
    const posts = parseSubstackZip(buffer)

    let imported = 0
    let skipped = 0

    for (const post of posts) {
      const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${post.slug}`
      if (existing.length > 0) {
        skipped++
        continue
      }

      await sql`
        INSERT INTO blog_posts (title, subtitle, slug, content, excerpt, published, published_at, tags)
        VALUES (
          ${post.title},
          ${post.subtitle || null},
          ${post.slug},
          ${post.content},
          ${post.excerpt || null},
          false,
          ${post.publishedAt},
          ${tags}
        )
      `
      imported++
    }

    return NextResponse.json({ imported, skipped, total: posts.length })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Import failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

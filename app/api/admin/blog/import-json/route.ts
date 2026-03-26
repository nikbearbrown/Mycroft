import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'
import AdmZip from 'adm-zip'

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('zip') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No ZIP file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const zip = new AdmZip(buffer)

    const jsonEntry = zip.getEntry('posts.json')
    if (!jsonEntry) {
      return NextResponse.json({ error: 'No posts.json found in ZIP' }, { status: 400 })
    }

    const posts = JSON.parse(jsonEntry.getData().toString('utf-8'))
    if (!Array.isArray(posts)) {
      return NextResponse.json({ error: 'posts.json must contain an array' }, { status: 400 })
    }

    let imported = 0
    let skipped = 0

    for (const post of posts) {
      if (!post.title || !post.slug || !post.content) {
        skipped++
        continue
      }

      const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${post.slug}`
      if (existing.length > 0) {
        skipped++
        continue
      }

      const tags = Array.isArray(post.tags) ? post.tags : []

      await sql`
        INSERT INTO blog_posts (title, subtitle, slug, byline, content, excerpt, published, published_at, tags)
        VALUES (
          ${post.title},
          ${post.subtitle || null},
          ${post.slug},
          ${post.byline || null},
          ${post.content},
          ${post.excerpt || null},
          false,
          ${post.published_at || null},
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

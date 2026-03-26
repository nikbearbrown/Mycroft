import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'
import { parseSubstackZip } from '@/lib/substack-parser'

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('zip') as File | null
  const sectionId = formData.get('sectionId') as string | null

  if (!file || !sectionId) {
    return NextResponse.json({ error: 'Missing zip file or sectionId' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  let posts
  try {
    posts = parseSubstackZip(buffer)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to parse ZIP'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (posts.length === 0) {
    return NextResponse.json({ error: 'No posts found in ZIP' }, { status: 400 })
  }

  try {
    // Upsert articles one by one (Neon doesn't have bulk upsert syntax like Supabase)
    for (const p of posts) {
      await sql`
        INSERT INTO substack_articles (section_id, slug, title, subtitle, excerpt, content, original_url, published_at, display_date)
        VALUES (${sectionId}, ${p.slug}, ${p.title}, ${p.subtitle || null}, ${p.excerpt || null}, ${p.content || null}, ${p.canonicalUrl || null}, ${p.publishedAt}, ${p.displayDate || null})
        ON CONFLICT (section_id, slug) DO UPDATE SET
          title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, excerpt = EXCLUDED.excerpt,
          content = EXCLUDED.content, original_url = EXCLUDED.original_url,
          published_at = EXCLUDED.published_at, display_date = EXCLUDED.display_date
      `
    }

    // Update article count
    const countResult = await sql`
      SELECT COUNT(*)::int as count FROM substack_articles WHERE section_id = ${sectionId}
    `
    const total = countResult[0]?.count ?? 0

    await sql`
      UPDATE substack_sections SET article_count = ${total}, updated_at = NOW()
      WHERE id = ${sectionId}
    `

    return NextResponse.json({ imported: posts.length, total })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

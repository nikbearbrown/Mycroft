import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await sql`
      SELECT id, title, subtitle, slug, excerpt, published, published_at, tags, created_at, updated_at
      FROM blog_posts
      ORDER BY created_at DESC
    `
    return NextResponse.json(data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { title, subtitle, slug, byline, cover_image, content, excerpt, published, tags } = body

  if (!title || !slug || !content) {
    return NextResponse.json({ error: 'Title, slug, and content are required' }, { status: 400 })
  }

  const tagsArray = Array.isArray(tags) ? tags : []

  try {
    const rows = await sql`
      INSERT INTO blog_posts (title, subtitle, slug, byline, cover_image, content, excerpt, published, published_at, tags)
      VALUES (${title}, ${subtitle || null}, ${slug}, ${byline || null}, ${cover_image || null}, ${content}, ${excerpt || null}, ${published || false}, ${published ? new Date().toISOString() : null}, ${tagsArray})
      RETURNING *
    `
    return NextResponse.json(rows[0])
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

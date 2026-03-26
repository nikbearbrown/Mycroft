import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const rows = await sql`SELECT * FROM blog_posts WHERE id = ${id}`
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(rows[0])
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()

  try {
    // Fetch existing post to merge partial updates
    const existing = await sql`SELECT * FROM blog_posts WHERE id = ${id}`
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const current = existing[0]

    const title = body.title ?? current.title
    const subtitle = body.subtitle !== undefined ? (body.subtitle || null) : current.subtitle
    const slug = body.slug ?? current.slug
    const byline = body.byline !== undefined ? (body.byline || null) : current.byline
    const cover_image = body.cover_image !== undefined ? (body.cover_image || null) : current.cover_image
    const content = body.content ?? current.content
    const excerpt = body.excerpt !== undefined ? (body.excerpt || null) : current.excerpt
    const published = body.published ?? current.published
    const tags = body.tags !== undefined ? (Array.isArray(body.tags) ? body.tags : []) : (current.tags || [])

    // Set published_at on first publish
    let publishedAt = current.published_at
    if (published && !current.published_at) {
      publishedAt = body.published_at || new Date().toISOString()
    }
    // Clear published_at on unpublish? Keep it — shows original publish date.

    const rows = await sql`
      UPDATE blog_posts SET
        title = ${title},
        subtitle = ${subtitle},
        slug = ${slug},
        byline = ${byline},
        cover_image = ${cover_image},
        content = ${content},
        excerpt = ${excerpt},
        published = ${published},
        tags = ${tags},
        published_at = ${publishedAt},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(rows[0])
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    await sql`DELETE FROM blog_posts WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

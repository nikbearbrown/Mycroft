import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  try {
    const data = await sql`
      SELECT id, title, subtitle, slug, excerpt, published_at
      FROM blog_posts
      WHERE published = true
      ORDER BY published_at DESC
    `
    return NextResponse.json(data)
  } catch (err) {
    console.error('[api/blog] Failed to fetch posts:', err)
    return NextResponse.json([])
  }
}

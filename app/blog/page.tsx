import { sql } from '@/lib/db'
import type { Metadata } from 'next'
import BlogFeed from './BlogFeed'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog - Mycroft',
  description: "Writing on what AI can and can't do and what that means for education.",
}

export default async function BlogPage() {
  let posts: { id: string; title: string; subtitle: string | null; slug: string; excerpt: string | null; cover_image: string | null; tags: string[] | null; published_at: string | null }[] = []
  try {
    posts = await sql`
      SELECT id, title, subtitle, slug, excerpt, cover_image, tags, published_at
      FROM blog_posts WHERE published = true
      ORDER BY published_at DESC
    `
  } catch (err) {
    // Fallback: query without newer columns in case migrations haven't run
    try {
      const rows = await sql`
        SELECT id, title, subtitle, slug, excerpt, published_at
        FROM blog_posts WHERE published = true
        ORDER BY published_at DESC
      `
      posts = rows.map((r: Record<string, unknown>) => ({ ...r, cover_image: null, tags: null } as typeof posts[number]))
    } catch (err2) {
      console.error('[blog/page] Failed to fetch posts:', err2)
    }
  }

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Blog</h1>
        <p className="text-muted-foreground mb-10">
          Writing on what AI can and can't do and what that means for education.
        </p>
        <BlogFeed posts={posts} />
      </div>
    </div>
  )
}

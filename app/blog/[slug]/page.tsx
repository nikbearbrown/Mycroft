import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sql } from '@/lib/db'
import { getReadingTime } from '@/lib/utils'
import BlogVizHydrator from '@/components/BlogVizHydrator/BlogVizHydrator'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  try {
    const rows = await sql`
      SELECT title, subtitle, excerpt, cover_image FROM blog_posts WHERE slug = ${slug} AND published = true
    `
    if (rows.length > 0) {
      const post = rows[0]
      return {
        title: `${post.title} - Mycroft`,
        description: post.excerpt || post.subtitle || post.title,
        openGraph: {
          title: post.title,
          description: post.excerpt || post.subtitle || post.title,
          images: post.cover_image ? [post.cover_image] : [],
        },
        twitter: {
          card: 'summary_large_image' as const,
          title: post.title,
          description: post.excerpt || post.subtitle || post.title,
          images: post.cover_image ? [post.cover_image] : [],
        },
      }
    }
  } catch {}
  return { title: 'Blog - Mycroft' }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const rows = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} AND published = true`

  if (rows.length === 0) notFound()
  const post = rows[0]

  // Previous / Next posts
  let prevPost: { title: string; slug: string } | null = null
  let nextPost: { title: string; slug: string } | null = null

  try {
    if (post.published_at) {
      const prev = await sql`
        SELECT title, slug FROM blog_posts
        WHERE published = true AND published_at < ${post.published_at}
        ORDER BY published_at DESC LIMIT 1
      `
      if (prev.length > 0) prevPost = prev[0]

      const next = await sql`
        SELECT title, slug FROM blog_posts
        WHERE published = true AND published_at > ${post.published_at}
        ORDER BY published_at ASC LIMIT 1
      `
      if (next.length > 0) nextPost = next[0]
    }
  } catch {}

  const readingTime = getReadingTime(post.content || '')

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">
            ← Back to Blog
          </Link>
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt=""
              className="w-full h-64 sm:h-80 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">{post.title}</h1>
          {post.subtitle && <p className="text-xl text-muted-foreground mt-3">{post.subtitle}</p>}
          <div className="flex items-center gap-3 mt-4 text-sm text-muted-foreground">
            {post.published_at && <time>{formatDate(post.published_at)}</time>}
            {post.published_at && <span>·</span>}
            <span>{readingTime}</span>
          </div>
        </header>
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-foreground prose-a:underline prose-img:rounded-lg">
          <BlogVizHydrator html={post.content} />
        </div>
        {post.byline && (
          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground whitespace-pre-line">
            {post.byline}
          </div>
        )}

        {/* Previous / Next */}
        {(prevPost || nextPost) && (
          <nav className="mt-16 pt-8 border-t grid grid-cols-2 gap-8">
            <div>
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="group block">
                  <span className="text-xs text-muted-foreground">← Previous</span>
                  <p className="text-sm font-medium mt-1 group-hover:underline">{prevPost.title}</p>
                </Link>
              )}
            </div>
            <div className="text-right">
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group block">
                  <span className="text-xs text-muted-foreground">Next →</span>
                  <p className="text-sm font-medium mt-1 group-hover:underline">{nextPost.title}</p>
                </Link>
              )}
            </div>
          </nav>
        )}

        <div className="mt-16 pt-8 border-t">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">← Back to Blog</Link>
        </div>
      </div>
    </div>
  )
}

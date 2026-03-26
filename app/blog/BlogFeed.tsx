'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'

interface Post {
  id: string
  title: string
  subtitle: string | null
  slug: string
  excerpt: string | null
  cover_image: string | null
  tags: string[] | null
  published_at: string | null
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogFeed({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return posts
    const q = query.toLowerCase()
    return posts.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
    )
  }, [posts, query])

  return (
    <>
      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          className="w-full pl-10 pr-10 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">
          {query ? `No posts matching "${query}".` : 'No posts yet. Check back soon.'}
        </p>
      ) : (
        <div className="divide-y">
          {filtered.map((post) => (
            <article key={post.id} className="py-8 first:pt-0">
              <Link href={`/blog/${post.slug}`} className="group block">
                {post.cover_image && (
                  <img
                    src={post.cover_image}
                    alt=""
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                {post.published_at && (
                  <time className="text-sm text-muted-foreground">
                    {formatDate(post.published_at)}
                  </time>
                )}
                <h2 className="text-2xl font-semibold mt-1 group-hover:underline">
                  {post.title}
                </h2>
                {post.subtitle && (
                  <p className="text-lg text-muted-foreground mt-1">
                    {post.subtitle}
                  </p>
                )}
                {post.excerpt && (
                  <p className="text-muted-foreground mt-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <span className="text-sm font-medium mt-3 inline-block group-hover:underline">
                  Read →
                </span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  )
}

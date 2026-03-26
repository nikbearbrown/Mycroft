'use client'

import { useState, useEffect, use } from 'react'
import BlogEditor from '@/components/BlogEditor/BlogEditor'

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [post, setPost] = useState<{
    id: string
    title: string
    subtitle: string
    slug: string
    byline: string
    tags: string[]
    cover_image: string
    content: string
    published: boolean
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/blog/${id}`)
        if (!res.ok) throw new Error('Failed to load post')
        const data = await res.json()
        setPost({
          id: data.id,
          title: data.title || '',
          subtitle: data.subtitle || '',
          slug: data.slug || '',
          byline: data.byline || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          cover_image: data.cover_image || '',
          content: data.content || '',
          published: data.published || false,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading post')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <p className="text-muted-foreground">Loading…</p>
  if (error)
    return (
      <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
        {error}
      </div>
    )
  if (!post) return <p className="text-muted-foreground">Post not found.</p>

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tighter mb-6">Edit Post</h2>
      <BlogEditor post={post} />
    </div>
  )
}

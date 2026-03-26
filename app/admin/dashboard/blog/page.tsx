'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Pencil, Trash2, Plus, Upload, Download, X, Check, XCircle } from 'lucide-react'

interface Post {
  id: string
  title: string
  subtitle: string | null
  slug: string
  published: boolean
  published_at: string | null
  tags: string[] | null
  created_at: string
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function BulkActions({
  posts,
  selectedIds,
  onPublish,
  onUnpublish,
  onDelete,
}: {
  posts: Post[]
  selectedIds: Set<string>
  onPublish: () => void
  onUnpublish: () => void
  onDelete: () => void
}) {
  const selectedDrafts = posts.filter(p => selectedIds.has(p.id) && !p.published).length
  const selectedPublished = posts.filter(p => selectedIds.has(p.id) && p.published).length
  return (
    <>
      {selectedDrafts > 0 && (
        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={onPublish}>
          Publish {selectedDrafts} selected
        </Button>
      )}
      {selectedPublished > 0 && (
        <Button variant="secondary" size="sm" onClick={onUnpublish}>
          Unpublish {selectedPublished} selected
        </Button>
      )}
      <Button variant="destructive" size="sm" onClick={onDelete}>
        Delete {selectedIds.size} selected
      </Button>
    </>
  )
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Export dialog
  const [exportOpen, setExportOpen] = useState(false)
  const [exportTags, setExportTags] = useState('')
  const [exportCount, setExportCount] = useState<number | null>(null)
  const [loadingCount, setLoadingCount] = useState(false)

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/blog')
      if (!res.ok) throw new Error('Failed to load posts')
      setPosts(await res.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading posts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    for (const post of posts) {
      if (post.tags) {
        for (const tag of post.tags) tagSet.add(tag)
      }
    }
    return Array.from(tagSet).sort()
  }, [posts])

  // Filter posts by active tag
  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts
    return posts.filter(p => p.tags?.includes(activeTag))
  }, [posts, activeTag])

  // Select all filtered
  const allFilteredSelected = filteredPosts.length > 0 && filteredPosts.every(p => selectedIds.has(p.id))

  function toggleSelectAll() {
    if (allFilteredSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredPosts.map(p => p.id)))
    }
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this post?')) return
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      fetchPosts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting post')
    }
  }

  async function bulkDelete() {
    if (selectedIds.size === 0) return
    if (!confirm(`Delete ${selectedIds.size} selected posts?`)) return
    for (const id of selectedIds) {
      await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    }
    setSelectedIds(new Set())
    fetchPosts()
  }

  async function bulkPublish() {
    if (selectedIds.size === 0) return
    const drafts = posts.filter(p => selectedIds.has(p.id) && !p.published)
    if (drafts.length === 0) return
    const now = new Date().toISOString()
    for (const post of drafts) {
      await fetch(`/api/admin/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: true, published_at: now }),
      })
    }
    setSelectedIds(new Set())
    fetchPosts()
  }

  async function bulkUnpublish() {
    if (selectedIds.size === 0) return
    const published = posts.filter(p => selectedIds.has(p.id) && p.published)
    if (published.length === 0) return
    for (const post of published) {
      await fetch(`/api/admin/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: false }),
      })
    }
    setSelectedIds(new Set())
    fetchPosts()
  }

  async function togglePublish(post: Post) {
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          post.published
            ? { published: false }
            : { published: true, published_at: new Date().toISOString() }
        ),
      })
      if (!res.ok) throw new Error('Failed to update')
      // Update in place
      const updated = await res.json()
      setPosts(prev =>
        prev.map(p =>
          p.id === post.id
            ? { ...p, published: updated.published, published_at: updated.published_at }
            : p
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating post')
    }
  }

  // Export: fetch count preview
  useEffect(() => {
    if (!exportOpen) return
    setLoadingCount(true)
    const tags = exportTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    // Count matching posts client-side from loaded posts
    if (tags.length === 0) {
      setExportCount(posts.length)
    } else {
      setExportCount(posts.filter(p => p.tags && tags.some(t => p.tags!.includes(t))).length)
    }
    setLoadingCount(false)
  }, [exportOpen, exportTags, posts])

  function downloadExport() {
    const tags = exportTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
    const params = tags.length > 0 ? `?tags=${encodeURIComponent(tags.join(','))}` : ''
    window.open(`/api/admin/blog/export${params}`, '_blank')
    setExportOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tighter">Blog Posts</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage blog posts
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/dashboard/blog/import">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
          </Link>
          <Button variant="outline" className="gap-2" onClick={() => { setExportTags(activeTag || ''); setExportOpen(true) }}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Link href="/admin/dashboard/blog/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-muted-foreground mr-1">Filter:</span>
          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={activeTag === tag ? 'default' : 'outline'}
              className="cursor-pointer text-xs"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Bulk actions */}
      {filteredPosts.length > 0 && (
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={allFilteredSelected}
              onChange={toggleSelectAll}
              className="rounded"
            />
            Select all {activeTag ? 'filtered' : ''} ({filteredPosts.length})
          </label>
          {selectedIds.size > 0 && (
            <BulkActions
              posts={posts}
              selectedIds={selectedIds}
              onPublish={bulkPublish}
              onUnpublish={bulkUnpublish}
              onDelete={bulkDelete}
            />
          )}
        </div>
      )}

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-muted-foreground">
          {activeTag ? `No posts with tag "${activeTag}".` : 'No posts yet. Create one to get started.'}
        </p>
      ) : (
        <div className="grid gap-3">
          {filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(post.id)}
                    onChange={(e) => {
                      const next = new Set(selectedIds)
                      if (e.target.checked) next.add(post.id)
                      else next.delete(post.id)
                      setSelectedIds(next)
                    }}
                    className="rounded shrink-0"
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <CardTitle className="text-base flex items-center gap-2 flex-wrap">
                      {post.title}
                      <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                      {post.tags?.map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] cursor-pointer"
                          onClick={() => setActiveTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </CardTitle>
                    <CardDescription>
                      {post.published
                        ? `Published ${formatDate(post.published_at)}`
                        : `Created ${formatDate(post.created_at)}`}
                      {' · '}
                      <span className="font-mono text-xs">/blog/{post.slug}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    title={post.published ? 'Unpublish' : 'Publish'}
                    onClick={() => togglePublish(post)}
                  >
                    {post.published ? (
                      <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    )}
                  </Button>
                  <Link href={`/admin/dashboard/blog/${post.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deletePost(post.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Export dialog */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Blog Posts</DialogTitle>
            <DialogDescription>
              Download posts as a ZIP file (posts.json + individual HTML files).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Filter by tags (optional, comma-separated)</Label>
              <Input
                value={exportTags}
                onChange={(e) => setExportTags(e.target.value)}
                placeholder="ai, education"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {loadingCount
                ? 'Counting…'
                : exportCount !== null
                  ? `${exportCount} post${exportCount !== 1 ? 's' : ''} match${exportCount === 1 ? 'es' : ''}`
                  : ''}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={downloadExport} disabled={exportCount === 0}>
              Download ZIP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

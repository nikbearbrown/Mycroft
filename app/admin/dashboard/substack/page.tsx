'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
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
import { Pencil, Trash2, Upload, Plus } from 'lucide-react'

interface Section {
  id: string
  title: string
  slug: string
  description: string | null
  substack_url: string
  article_count: number
  created_at: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function SubstackAdminPage() {
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Section dialog
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [sectionForm, setSectionForm] = useState({
    title: '',
    slug: '',
    description: '',
    substack_url: '',
  })
  const [saving, setSaving] = useState(false)

  // Upload dialog
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploadSectionId, setUploadSectionId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchSections = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/substack/sections')
      if (!res.ok) throw new Error('Failed to load sections')
      const data = await res.json()
      setSections(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading sections')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSections()
  }, [fetchSections])

  function openNewSection() {
    setEditingSection(null)
    setSectionForm({ title: '', slug: '', description: '', substack_url: '' })
    setSectionDialogOpen(true)
  }

  function openEditSection(s: Section) {
    setEditingSection(s)
    setSectionForm({
      title: s.title,
      slug: s.slug,
      description: s.description || '',
      substack_url: s.substack_url,
    })
    setSectionDialogOpen(true)
  }

  async function saveSection() {
    setSaving(true)
    setError('')
    try {
      const url = editingSection
        ? `/api/admin/substack/sections/${editingSection.id}`
        : '/api/admin/substack/sections'
      const method = editingSection ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionForm),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }
      setSectionDialogOpen(false)
      fetchSections()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving section')
    } finally {
      setSaving(false)
    }
  }

  async function deleteSection(id: string) {
    if (!confirm('Delete this section and all its articles?')) return
    try {
      const res = await fetch(`/api/admin/substack/sections/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      fetchSections()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting section')
    }
  }

  function openUpload(sectionId: string) {
    setUploadSectionId(sectionId)
    setUploadResult('')
    setUploadDialogOpen(true)
  }

  async function handleUpload() {
    const file = fileRef.current?.files?.[0]
    if (!file || !uploadSectionId) return

    setUploading(true)
    setUploadResult('')
    try {
      const formData = new FormData()
      formData.append('zip', file)
      formData.append('sectionId', uploadSectionId)
      const res = await fetch('/api/admin/substack/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setUploadResult(`Imported ${data.imported} posts (${data.total} total)`)
      fetchSections()
    } catch (err) {
      setUploadResult(err instanceof Error ? err.message : 'Upload error')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tighter">Substack Sections</h2>
          <p className="text-sm text-muted-foreground">
            Manage your Substack newsletter sections and import articles
          </p>
        </div>
        <Button onClick={openNewSection} className="gap-2">
          <Plus className="h-4 w-4" />
          New Section
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : sections.length === 0 ? (
        <p className="text-muted-foreground">No sections yet. Create one to get started.</p>
      ) : (
        <div className="grid gap-4">
          {sections.map((s) => (
            <Card key={s.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="secondary">{s.slug}</Badge>
                    <span>{s.article_count} articles</span>
                  </CardDescription>
                  {s.description && (
                    <p className="text-sm text-muted-foreground pt-1">{s.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openUpload(s.id)}
                    className="gap-1"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Import ZIP
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditSection(s)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSection(s.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={s.substack_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground underline"
                >
                  {s.substack_url}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Section Dialog */}
      <Dialog open={sectionDialogOpen} onOpenChange={setSectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSection ? 'Edit Section' : 'New Section'}
            </DialogTitle>
            <DialogDescription>
              {editingSection
                ? 'Update the section details.'
                : 'Create a new Substack section to organize imported articles.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="section-title">Title</Label>
              <Input
                id="section-title"
                value={sectionForm.title}
                onChange={(e) => {
                  const title = e.target.value
                  setSectionForm((prev) => ({
                    ...prev,
                    title,
                    slug: editingSection ? prev.slug : slugify(title),
                  }))
                }}
                placeholder="e.g. AI in Education"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-slug">Slug</Label>
              <Input
                id="section-slug"
                value={sectionForm.slug}
                onChange={(e) =>
                  setSectionForm((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="ai-in-education"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-url">Substack URL</Label>
              <Input
                id="section-url"
                value={sectionForm.substack_url}
                onChange={(e) =>
                  setSectionForm((prev) => ({
                    ...prev,
                    substack_url: e.target.value,
                  }))
                }
                placeholder="https://example.substack.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-desc">Description</Label>
              <Textarea
                id="section-desc"
                value={sectionForm.description}
                onChange={(e) =>
                  setSectionForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description of this newsletter section"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSectionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveSection} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Substack ZIP</DialogTitle>
            <DialogDescription>
              Upload a Substack export ZIP file. It should contain posts.csv and
              HTML article files.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-foreground/50 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to select a ZIP file or drag it here
              </p>
              <input
                ref={fileRef}
                type="file"
                accept=".zip"
                className="hidden"
                onChange={() => {
                  const name = fileRef.current?.files?.[0]?.name
                  if (name) setUploadResult(`Selected: ${name}`)
                }}
              />
            </div>
            {uploadResult && (
              <p className="text-sm text-muted-foreground">{uploadResult}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUploadDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Importing…' : 'Upload & Import'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

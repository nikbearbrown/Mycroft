'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'

export default function BlogImportPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [tags, setTags] = useState('')
  const [sourceLabel, setSourceLabel] = useState('')
  const [importType, setImportType] = useState<'substack' | 'json'>('substack')
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  async function handleImport() {
    if (!file) {
      setError('Select a ZIP file')
      return
    }

    setUploading(true)
    setError('')
    setResult('')

    const formData = new FormData()
    formData.append('zip', file)

    // Build tags list
    const allTags = tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
    if (sourceLabel.trim()) {
      allTags.push(`source:${sourceLabel.trim().toLowerCase().replace(/\s+/g, '-')}`)
    }
    formData.append('tags', allTags.join(','))

    try {
      const endpoint =
        importType === 'substack'
          ? '/api/admin/blog/import-substack'
          : '/api/admin/blog/import-json'

      const res = await fetch(endpoint, { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Import failed')

      setResult(`Imported ${data.imported} posts, skipped ${data.skipped} (already exist). Total in ZIP: ${data.total}.`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">Import Blog Posts</h2>
        <p className="text-sm text-muted-foreground">
          Import posts from a Substack export ZIP or a blog export ZIP. Posts are imported as drafts.
        </p>
      </div>

      {/* Import type selector */}
      <div className="flex gap-2">
        <Button
          variant={importType === 'substack' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setImportType('substack')}
        >
          Substack ZIP
        </Button>
        <Button
          variant={importType === 'json' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setImportType('json')}
        >
          Blog Export ZIP
        </Button>
      </div>

      {/* File drop zone */}
      <div
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-foreground/30 transition-colors"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const f = e.dataTransfer.files[0]
          if (f && f.name.endsWith('.zip')) setFile(f)
        }}
      >
        <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
        {file ? (
          <p className="font-medium">{file.name}</p>
        ) : (
          <p className="text-muted-foreground">
            Drop a ZIP file here or click to select
          </p>
        )}
        <input
          ref={fileRef}
          type="file"
          accept=".zip"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) setFile(f)
          }}
        />
      </div>

      {/* Tags */}
      {importType === 'substack' && (
        <>
          <div className="space-y-2">
            <Label>Tags (comma-separated)</Label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ai, education, northeastern"
            />
            <p className="text-xs text-muted-foreground">
              Applied to all imported posts
            </p>
          </div>

          <div className="space-y-2">
            <Label>Source Substack</Label>
            <Input
              value={sourceLabel}
              onChange={(e) => setSourceLabel(e.target.value)}
              placeholder="skepticism-ai"
            />
            <p className="text-xs text-muted-foreground">
              Stored as a <code className="text-xs">source:name</code> tag
            </p>
          </div>
        </>
      )}

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400">
          {result}
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={handleImport} disabled={uploading || !file}>
          {uploading ? 'Importing…' : 'Import'}
        </Button>
        <Button variant="outline" onClick={() => router.push('/admin/dashboard/blog')}>
          Back to Posts
        </Button>
      </div>
    </div>
  )
}

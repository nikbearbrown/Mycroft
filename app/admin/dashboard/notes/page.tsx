'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Trash2, RefreshCw, ExternalLink } from 'lucide-react'

interface Doc {
  slug: string
  filename: string
  title: string
  description: string
  tags: string[]
}

export default function DevAdminPage() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const fetchDocs = useCallback(async () => {
    setSyncing(true)
    setError('')
    try {
      const res = await fetch('/api/admin/notes/sync', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to sync')
      setDocs(data.docs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setLoading(false)
      setSyncing(false)
    }
  }, [])

  useEffect(() => {
    fetchDocs()
  }, [fetchDocs])

  async function deleteDoc(filename: string) {
    if (!confirm(`Delete ${filename}? This removes the file from public/notes/.`)) return
    try {
      const res = await fetch('/api/admin/notes/sync', {
        method: 'POST',
      })
      // Note: file deletion requires server access — show message instead
      setMessage(`To delete ${filename}, remove it from public/notes/ and redeploy.`)
    } catch {
      setError('Delete not available — remove the file manually from public/notes/')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tighter">Notes</h2>
          <p className="text-sm text-muted-foreground">
            HTML files in <code className="text-xs bg-muted px-1 rounded">public/notes/</code> — filesystem is the source of truth
          </p>
        </div>
        <Button variant="outline" onClick={fetchDocs} disabled={syncing} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing…' : 'Sync Notes'}
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      )}
      {message && (
        <div className="rounded-md bg-yellow-500/10 p-3 text-sm text-yellow-700 dark:text-yellow-400">{message}</div>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : docs.length === 0 ? (
        <p className="text-muted-foreground">No docs found. Drop .html files into public/notes/.</p>
      ) : (
        <div className="grid gap-3">
          {docs.map(doc => (
            <Card key={doc.slug}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
                <div className="space-y-1 min-w-0 flex-1">
                  <CardTitle className="text-base flex items-center gap-2 flex-wrap">
                    {doc.title}
                    <Badge variant="outline" className="font-mono text-xs">{doc.filename}</Badge>
                    {doc.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                    ))}
                  </CardTitle>
                  {doc.description && (
                    <CardDescription>{doc.description}</CardDescription>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <a href={`/notes/${doc.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                  <Button variant="outline" size="sm" onClick={() => deleteDoc(doc.filename)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

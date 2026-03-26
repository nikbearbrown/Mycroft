'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Search, X, ExternalLink } from 'lucide-react'

interface Doc {
  slug: string
  filename: string
  title: string
  description: string
  tags: string[]
}

interface Group {
  folder: string
  folderTitle: string
  docs: Doc[]
}

export default function NotesBrowser({ groups }: { groups: Group[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    groups.forEach(g => g.docs.forEach(d => d.tags.forEach(t => set.add(t))))
    return Array.from(set).sort()
  }, [groups])

  const filteredGroups = useMemo(() => {
    return groups
      .map(g => {
        let docs = g.docs
        if (activeTag) {
          docs = docs.filter(d => d.tags.includes(activeTag))
        }
        if (query.trim()) {
          const q = query.toLowerCase()
          docs = docs.filter(
            d =>
              d.title.toLowerCase().includes(q) ||
              d.description.toLowerCase().includes(q) ||
              d.tags.some(t => t.toLowerCase().includes(q))
          )
        }
        return { ...g, docs }
      })
      .filter(g => g.docs.length > 0)
  }, [groups, query, activeTag])

  const totalDocs = filteredGroups.reduce((n, g) => n + g.docs.length, 0)

  return (
    <>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes…"
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

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 items-center mb-8">
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

      {/* Grouped cards */}
      {totalDocs === 0 ? (
        <p className="text-muted-foreground">
          {query || activeTag ? 'No notes match your search.' : 'No notes yet.'}
        </p>
      ) : (
        <div className="space-y-10">
          {filteredGroups.map(g => (
            <section key={g.folder}>
              <h2 className="text-2xl font-bold tracking-tighter mb-4 border-b pb-2">
                {g.folderTitle}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.docs.map(doc => (
                  <Link key={doc.slug} href={`/notes/${doc.slug}`}>
                    <Card className="h-full hover:border-foreground/20 transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          {doc.title}
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        </CardTitle>
                        {doc.description && (
                          <CardDescription className="line-clamp-2">
                            {doc.description}
                          </CardDescription>
                        )}
                        {doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-2">
                            {doc.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-[10px]">
                                {tag}
                              </Badge>
                            ))}
                            {doc.tags.length > 3 && (
                              <span className="text-[10px] text-muted-foreground">
                                +{doc.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  )
}

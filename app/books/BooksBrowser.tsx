'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Search, X, BookOpen } from 'lucide-react'

interface BookSeries {
  name: string
  position: number
}

interface BookMeta {
  slug: string
  title: string
  subtitle: string
  authors: string[]
  status: string
  series: BookSeries
  description: string
  keywords: string[]
}

export default function BooksBrowser({ books }: { books: BookMeta[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    books.forEach(b => b.keywords.forEach(k => set.add(k)))
    return Array.from(set).sort()
  }, [books])

  const filtered = useMemo(() => {
    let result = books
    if (activeTag) {
      result = result.filter(b => b.keywords.includes(activeTag))
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.subtitle.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.keywords.some(k => k.toLowerCase().includes(q))
      )
    }
    return result
  }, [books, query, activeTag])

  return (
    <>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books…"
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

      {/* Book cards */}
      {filtered.length === 0 ? (
        <p className="text-muted-foreground">
          {query || activeTag ? 'No books match your search.' : 'No books yet.'}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(book => (
            <Link key={book.slug} href={`/books/${book.slug}`}>
              <Card className="h-full hover:border-foreground/20 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                    {book.title}
                  </CardTitle>
                  {book.subtitle && (
                    <p className="text-sm text-muted-foreground italic">{book.subtitle}</p>
                  )}
                  {book.authors.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {book.authors.join(', ')}
                    </p>
                  )}
                  <div className="flex items-center gap-2 pt-1">
                    <Badge variant={book.status === 'published' ? 'default' : 'outline'} className="text-[10px]">
                      {book.status}
                    </Badge>
                    {book.series.name && (
                      <span className="text-[10px] text-muted-foreground">
                        {book.series.name} #{book.series.position}
                      </span>
                    )}
                  </div>
                  {book.description && (
                    <CardDescription className="line-clamp-2 pt-1">
                      {book.description}
                    </CardDescription>
                  )}
                  {book.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2">
                      {book.keywords.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                      {book.keywords.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">
                          +{book.keywords.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

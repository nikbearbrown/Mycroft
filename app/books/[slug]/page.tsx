import Link from 'next/link'
import { notFound } from 'next/navigation'
import { join } from 'path'
import { scanBooks } from '@/lib/book-meta'
import { Badge } from '@/components/ui/badge'
import { BookOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const books = scanBooks(join(process.cwd(), 'public', 'books'))
  const book = books.find(b => b.slug === slug)
  if (!book) return { title: 'Books - Mycroft' }
  return {
    title: `${book.title} - Books`,
    description: book.description || book.title,
  }
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const books = scanBooks(join(process.cwd(), 'public', 'books'))
  const book = books.find(b => b.slug === slug)

  if (!book) notFound()

  // Build chapter list: from parts if available, else flat from HTML files
  const hasParts = book.parts.length > 0 && book.parts.some(p => p.chapters.length > 0)

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/books"
          className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block"
        >
          &larr; Back to Books
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Cover image */}
          {book.cover && (
            <div className="shrink-0">
              <img
                src={book.cover}
                alt={`${book.title} cover`}
                className="w-48 rounded-md border shadow-sm"
              />
            </div>
          )}

          {/* Book info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tighter mb-2">{book.title}</h1>
            {book.subtitle && (
              <p className="text-xl text-muted-foreground italic mb-4">{book.subtitle}</p>
            )}

            {book.authors.length > 0 && (
              <p className="text-sm text-muted-foreground mb-2">
                By {book.authors.join(', ')}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant={book.status === 'published' ? 'default' : 'outline'}>
                {book.status}
              </Badge>
              {book.series.name && (
                <span className="text-sm text-muted-foreground">
                  {book.series.name} &middot; #{book.series.position}
                </span>
              )}
              {book.edition && (
                <span className="text-sm text-muted-foreground">
                  {book.edition} edition
                </span>
              )}
            </div>

            {book.publisher && (
              <p className="text-sm text-muted-foreground mb-1">
                Publisher: {book.publisher}
              </p>
            )}
            {book.isbn && (
              <p className="text-sm text-muted-foreground mb-1">
                ISBN: {book.isbn}
              </p>
            )}
            {book.published && (
              <p className="text-sm text-muted-foreground mb-1">
                Published: {book.published}
              </p>
            )}

            {book.description && (
              <p className="mt-4 text-foreground leading-relaxed">{book.description}</p>
            )}

            <div className="flex flex-wrap gap-3 mt-6">
              {book.amazonUrl && (
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 dark:border dark:border-white/20 dark:hover:bg-white/10 transition-colors"
                >
                  Buy on Amazon
                </a>
              )}
              {book.relatedCourse && (
                <Link
                  href={book.relatedCourse}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-md hover:bg-accent transition-colors"
                >
                  Related Course
                </Link>
              )}
            </div>

            {book.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-6">
                {book.keywords.map(k => (
                  <Badge key={k} variant="secondary" className="text-xs">
                    {k}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table of Contents */}
        {(hasParts || book.chapterFiles.length > 0) && (
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold tracking-tighter mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Table of Contents
            </h2>

            {hasParts ? (
              <div className="space-y-6">
                {book.parts.map((part, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold mb-3">{part.title}</h3>
                    <ul className="space-y-2 pl-4">
                      {part.chapters.map(ch => {
                        const file = book.chapterFiles.find(f => f.slug === ch)
                        return (
                          <li key={ch}>
                            {file ? (
                              <Link
                                href={`/books/${book.slug}/${file.slug}`}
                                className="text-sm hover:underline text-foreground"
                              >
                                {file.title}
                              </Link>
                            ) : (
                              <span className="text-sm text-muted-foreground">{ch}</span>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {book.chapterFiles.map(file => (
                  <li key={file.slug}>
                    <Link
                      href={`/books/${book.slug}/${file.slug}`}
                      className="group flex items-start gap-3 p-3 rounded-md border hover:border-foreground/20 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium group-hover:underline">{file.title}</p>
                        {file.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {file.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

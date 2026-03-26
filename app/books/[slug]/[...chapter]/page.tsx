import Link from 'next/link'
import { notFound } from 'next/navigation'
import { join } from 'path'
import { existsSync } from 'fs'
import { scanBooks } from '@/lib/book-meta'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapter: string[] }>
}) {
  const { slug, chapter } = await params
  const chapterSlug = chapter.join('/')
  const books = scanBooks(join(process.cwd(), 'public', 'books'))
  const book = books.find(b => b.slug === slug)
  if (book) {
    const file = book.chapterFiles.find(f => f.slug === chapterSlug)
    if (file) {
      return {
        title: `${file.title} - ${book.title}`,
        description: file.description || file.title,
      }
    }
  }
  return { title: 'Books - Mycroft' }
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapter: string[] }>
}) {
  const { slug, chapter } = await params
  const chapterSlug = chapter.join('/')
  const filePath = join(process.cwd(), 'public', 'books', slug, `${chapterSlug}.html`)

  if (!existsSync(filePath)) notFound()

  const books = scanBooks(join(process.cwd(), 'public', 'books'))
  const book = books.find(b => b.slug === slug)

  let title = chapter[chapter.length - 1]
  let description = ''
  let bookTitle = slug

  if (book) {
    bookTitle = book.title
    const file = book.chapterFiles.find(f => f.slug === chapterSlug)
    if (file) {
      title = file.title
      description = file.description
    }
  }

  return (
    <div className="flex flex-col w-full" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="w-full border-b bg-background">
        <div className="container px-4 md:px-6 mx-auto py-4 flex items-center justify-between">
          <div>
            <Link
              href={`/books/${slug}`}
              className="text-sm text-muted-foreground hover:text-foreground mb-1 inline-block"
            >
              &larr; Back to {bookTitle}
            </Link>
            <h1 className="text-2xl font-bold tracking-tighter">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 w-full">
        <iframe
          src={`/books/${slug}/${chapterSlug}.html`}
          title={title}
          className="w-full border-none"
          style={{ minHeight: 'calc(100vh - 12rem)' }}
        />
      </div>
    </div>
  )
}

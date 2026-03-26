import { join } from 'path'
import type { Metadata } from 'next'
import { scanBooks } from '@/lib/book-meta'
import BooksBrowser from './BooksBrowser'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Books - Mycroft',
  description: 'The companion book series for the Mycroft curriculum.',
}

export default function BooksPage() {
  const books = scanBooks(join(process.cwd(), 'public', 'books'))

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Mycroft: Books</h1>
        <p className="text-muted-foreground mb-10">
          The companion book series for the Mycroft curriculum.
        </p>
        <BooksBrowser books={books} />
      </div>
    </div>
  )
}

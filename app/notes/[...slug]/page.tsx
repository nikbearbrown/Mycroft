import Link from 'next/link'
import { notFound } from 'next/navigation'
import { join } from 'path'
import { existsSync } from 'fs'
import { scanHtmlSubdirs } from '@/lib/html-meta'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const slugPath = slug.join('/')
  const groups = scanHtmlSubdirs(join(process.cwd(), 'public', 'notes'))
  for (const g of groups) {
    const doc = g.docs.find(d => d.slug === slugPath)
    if (doc) {
      return {
        title: `${doc.title} - Notes`,
        description: doc.description || doc.title,
      }
    }
  }
  return { title: 'Notes - Mycroft' }
}

export default async function NoteDocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const slugPath = slug.join('/')
  const filePath = join(process.cwd(), 'public', 'notes', `${slugPath}.html`)

  if (!existsSync(filePath)) notFound()

  const groups = scanHtmlSubdirs(join(process.cwd(), 'public', 'notes'))
  let title = slug[slug.length - 1]
  let description = ''
  for (const g of groups) {
    const doc = g.docs.find(d => d.slug === slugPath)
    if (doc) {
      title = doc.title
      description = doc.description
      break
    }
  }

  return (
    <div className="flex flex-col w-full" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="w-full border-b bg-background">
        <div className="container px-4 md:px-6 mx-auto py-4 flex items-center justify-between">
          <div>
            <Link
              href="/notes"
              className="text-sm text-muted-foreground hover:text-foreground mb-1 inline-block"
            >
              ← Back to Notes
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
          src={`/notes/${slugPath}.html`}
          title={title}
          className="w-full border-none"
          style={{ minHeight: 'calc(100vh - 12rem)' }}
        />
      </div>
    </div>
  )
}

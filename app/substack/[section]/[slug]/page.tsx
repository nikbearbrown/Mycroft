import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>
}) {
  const { section, slug } = await params

  const sectionRows = await sql`SELECT * FROM substack_sections WHERE slug = ${section}`
  if (sectionRows.length === 0) notFound()
  const sectionData = sectionRows[0]

  const articleRows = await sql`
    SELECT * FROM substack_articles WHERE section_id = ${sectionData.id} AND slug = ${slug}
  `
  if (articleRows.length === 0) notFound()
  const article = articleRows[0]

  return (
    <div className="flex flex-col w-full">
      {/* Attribution Banner */}
      <div className="w-full border-b bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl py-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Originally published on{' '}
            <a
              href={sectionData.substack_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium text-foreground"
            >
              Substack
            </a>
          </span>
          {article.original_url && (
            <a
              href={article.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline"
            >
              View original
            </a>
          )}
        </div>
      </div>

      {/* Article */}
      <article className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-8">
            <Link
              href={`/substack/${section}`}
              className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
            >
              ← {sectionData.title}
            </Link>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-xl text-muted-foreground mt-3">
                {article.subtitle}
              </p>
            )}
            {article.display_date && (
              <time className="text-sm text-muted-foreground mt-4 block">
                {article.display_date}
              </time>
            )}
          </header>

          {/* Content */}
          <div
            className="prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tighter
              prose-a:text-foreground prose-a:underline
              prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />

          {/* Subscribe CTA */}
          <div className="mt-16 border-t pt-8">
            <p className="text-lg font-semibold">Enjoy this article?</p>
            <p className="text-muted-foreground mt-1">
              Subscribe on Substack to get new posts delivered to your inbox.
            </p>
            <a
              href={sectionData.substack_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium mt-4 bg-black text-white shadow hover:bg-gray-800 dark:border dark:border-input dark:bg-background dark:text-foreground dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground"
            >
              Subscribe on Substack
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params

  const sectionRows = await sql`SELECT * FROM substack_sections WHERE slug = ${section}`
  if (sectionRows.length === 0) notFound()
  const sectionData = sectionRows[0]

  const articles = await sql`
    SELECT * FROM substack_articles WHERE section_id = ${sectionData.id}
    ORDER BY published_at DESC
  `

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {sectionData.title}
          </h1>
          {sectionData.description && (
            <p className="mt-4 text-lg text-muted-foreground">
              {sectionData.description}
            </p>
          )}
          <a
            href={sectionData.substack_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium mt-6 bg-black text-white shadow hover:bg-gray-800 dark:border dark:border-input dark:bg-background dark:text-foreground dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground"
          >
            Follow on Substack
          </a>
        </div>
      </section>

      {/* Article List */}
      <section className="w-full pb-16">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          {!articles || articles.length === 0 ? (
            <p className="text-muted-foreground">No articles yet.</p>
          ) : (
            <div className="divide-y">
              {articles.map((a) => (
                <article key={a.id} className="py-6 first:pt-0">
                  <Link
                    href={`/substack/${section}/${a.slug}`}
                    className="group block"
                  >
                    {a.display_date && (
                      <time className="text-sm text-muted-foreground">
                        {a.display_date}
                      </time>
                    )}
                    <h2 className="text-xl font-semibold mt-1 group-hover:underline">
                      {a.title}
                    </h2>
                    {a.subtitle && (
                      <p className="text-muted-foreground mt-1">{a.subtitle}</p>
                    )}
                    {a.excerpt && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {a.excerpt}
                      </p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

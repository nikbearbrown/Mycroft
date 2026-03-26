import Link from 'next/link'
import { sql } from '@/lib/db'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

interface Section {
  id: string
  title: string
  slug: string
  description: string | null
  substack_url: string
  article_count: number
}

async function getSections(): Promise<Section[]> {
  try {
    return await sql`SELECT * FROM substack_sections ORDER BY created_at DESC`
  } catch {
    return []
  }
}

export default async function SubstackPage() {
  const sections = await getSections()

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              Newsletter
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-[600px]">
              Writing on AI, education, music, and the intersections between
              them. Explore the archives below or subscribe on Substack.
            </p>
          </div>
        </div>
      </section>

      {/* Section Grid */}
      <section className="w-full pb-16">
        <div className="container px-4 md:px-6 mx-auto">
          {sections.length === 0 ? (
            <p className="text-muted-foreground">No sections yet. Check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((s) => (
                <Link key={s.id} href={`/substack/${s.slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">{s.title}</CardTitle>
                      {s.description && (
                        <CardDescription>{s.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {s.article_count} article{s.article_count !== 1 ? 's' : ''}
                        </Badge>
                        <a
                          href={s.substack_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View on Substack
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

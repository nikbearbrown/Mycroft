import Link from 'next/link'
import { notFound } from 'next/navigation'
import { join } from 'path'
import { existsSync } from 'fs'
import { sql } from '@/lib/db'
import { scanHtmlDir } from '@/lib/html-meta'

export const dynamic = 'force-dynamic'

function getArtifactDoc(slug: string) {
  const dir = join(process.cwd(), 'public', 'artifacts')
  const filePath = join(dir, `${slug}.html`)
  if (!existsSync(filePath)) return null
  const docs = scanHtmlDir(dir)
  return docs.find(d => d.slug === slug) || null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Check filesystem first
  const doc = getArtifactDoc(slug)
  if (doc) {
    return {
      title: `${doc.title} - Mycroft Tools`,
      description: doc.description || `${doc.title} — tool by Mycroft`,
    }
  }

  // Fall back to database
  try {
    const rows = await sql`SELECT name, description FROM tools WHERE slug = ${slug}`
    if (rows.length > 0) {
      return {
        title: `${rows[0].name} - Mycroft Tools`,
        description: rows[0].description || `${rows[0].name} — tool by Mycroft`,
      }
    }
  } catch {}

  return { title: 'Tool - Mycroft' }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Check filesystem first
  const doc = getArtifactDoc(slug)
  if (doc) {
    return (
      <div className="flex flex-col w-full" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        <div className="w-full border-b bg-background">
          <div className="container px-4 md:px-6 mx-auto py-4">
            <Link
              href="/tools"
              className="text-sm text-muted-foreground hover:text-foreground mb-1 inline-block"
            >
              ← Back to Tools
            </Link>
            <h1 className="text-2xl font-bold tracking-tighter">{doc.title}</h1>
            {doc.description && (
              <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
            )}
          </div>
        </div>
        <div className="flex-1 w-full">
          <iframe
            src={`/artifacts/${doc.filename}`}
            title={doc.title}
            className="w-full border-none"
            style={{ minHeight: 'calc(100vh - 12rem)' }}
          />
        </div>
      </div>
    )
  }

  // Fall back to database for link tools
  let tool
  try {
    const rows = await sql`SELECT * FROM tools WHERE slug = ${slug}`
    if (rows.length > 0) tool = rows[0]
  } catch {}

  if (!tool) notFound()

  // Build iframe src for legacy DB artifacts
  let iframeSrc = ''
  let useRawEmbed = false

  if (tool.artifact_embed_code) {
    useRawEmbed = true
  } else if (tool.artifact_id) {
    iframeSrc = `https://claude.site/artifacts/${tool.artifact_id}`
  }

  return (
    <div className="flex flex-col w-full" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="w-full border-b bg-background">
        <div className="container px-4 md:px-6 mx-auto py-4 flex items-center justify-between">
          <div>
            <Link
              href="/tools"
              className="text-sm text-muted-foreground hover:text-foreground mb-1 inline-block"
            >
              ← Back to Tools
            </Link>
            <h1 className="text-2xl font-bold tracking-tighter">{tool.name}</h1>
            {tool.description && (
              <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
            )}
          </div>
          {tool.claude_url && (
            <a
              href={tool.claude_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium bg-black text-white shadow hover:bg-gray-800 dark:border dark:border-input dark:bg-background dark:text-foreground dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground"
            >
              Open External
            </a>
          )}
        </div>
      </div>
      <div className="flex-1 w-full">
        {useRawEmbed ? (
          <div
            className="w-full h-full"
            style={{ minHeight: 'calc(100vh - 12rem)' }}
            dangerouslySetInnerHTML={{
              __html: tool.artifact_embed_code.replace(
                /height="[^"]*"/,
                'height="100%" style="min-height:calc(100vh - 12rem);width:100%;border:none;"',
              ),
            }}
          />
        ) : iframeSrc ? (
          <iframe
            src={iframeSrc}
            title={tool.name}
            className="w-full border-none"
            style={{ minHeight: 'calc(100vh - 12rem)' }}
            allow="clipboard-write"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>No artifact configured for this tool.</p>
          </div>
        )}
      </div>
    </div>
  )
}

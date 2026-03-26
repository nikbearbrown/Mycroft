import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

export interface ChapterFile {
  slug: string
  filename: string
  title: string
  description: string
}

export interface BookPart {
  title: string
  chapters: string[]
}

export interface BookSeries {
  name: string
  position: number
}

export interface BookMeta {
  slug: string
  title: string
  subtitle: string
  authors: string[]
  publisher: string
  language: string
  isbn: string
  asin: string
  published: string
  status: string
  edition: string
  series: BookSeries
  description: string
  keywords: string[]
  categories: string[]
  cover: string
  amazonUrl: string
  relatedCourse: string
  license: string
  parts: BookPart[]
  chapterFiles: ChapterFile[]
}

function extractTag(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern)
  return match ? match[1].trim() : null
}

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function scanChapterFiles(dir: string): ChapterFile[] {
  let files: string[]
  try {
    files = readdirSync(dir).filter(f => f.endsWith('.html')).sort()
  } catch {
    return []
  }

  return files.map(filename => {
    const slug = filename.replace('.html', '')
    let title = titleCase(slug)
    let description = ''

    try {
      const html = readFileSync(join(dir, filename), 'utf-8')
      const t = extractTag(html, /<title[^>]*>([^<]+)<\/title>/i)
      if (t) title = t
      const d = extractTag(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
        ?? extractTag(html, /<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i)
      if (d) description = d
    } catch { /* ignore read errors */ }

    return { slug, filename, title, description }
  })
}

export function scanBooks(dir: string): BookMeta[] {
  let entries: string[]
  try {
    entries = readdirSync(dir).sort()
  } catch {
    return []
  }

  const books: BookMeta[] = []

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    try {
      if (!statSync(fullPath).isDirectory()) continue
    } catch {
      continue
    }

    const jsonPath = join(fullPath, 'book.json')
    let raw: Record<string, unknown>
    try {
      raw = JSON.parse(readFileSync(jsonPath, 'utf-8'))
    } catch {
      continue // skip folders without valid book.json
    }

    const chapterFiles = scanChapterFiles(fullPath)

    books.push({
      slug: entry,
      title: (raw.title as string) || titleCase(entry),
      subtitle: (raw.subtitle as string) || '',
      authors: (raw.authors as string[]) || [],
      publisher: (raw.publisher as string) || '',
      language: (raw.language as string) || 'en',
      isbn: (raw.isbn as string) || '',
      asin: (raw.asin as string) || '',
      published: (raw.published as string) || '',
      status: (raw.status as string) || 'in-progress',
      edition: (raw.edition as string) || '',
      series: (raw.series as BookSeries) || { name: '', position: 0 },
      description: (raw.description as string) || '',
      keywords: (raw.keywords as string[]) || [],
      categories: (raw.categories as string[]) || [],
      cover: (raw.cover as string) || '',
      amazonUrl: (raw.amazonUrl as string) || '',
      relatedCourse: (raw.relatedCourse as string) || '',
      license: (raw.license as string) || '',
      parts: (raw.parts as BookPart[]) || [],
      chapterFiles,
    })
  }

  // Sort by series position
  books.sort((a, b) => (a.series.position || 0) - (b.series.position || 0))

  return books
}

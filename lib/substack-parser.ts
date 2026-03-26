import AdmZip from 'adm-zip'

export interface ParsedPost {
  title: string
  subtitle: string
  slug: string
  content: string
  publishedAt: string | null
  displayDate: string
  excerpt: string
  canonicalUrl: string
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        fields.push(current)
        current = ''
      } else {
        current += char
      }
    }
  }
  fields.push(current)
  return fields
}

/**
 * Clean up Substack HTML content by removing subscription widgets and CTAs.
 * Substack export HTML is already just the post body (no <html>/<head>/<body>
 * wrapper), but includes subscribe buttons and widget forms we don't want.
 */
function cleanSubstackContent(html: string): string {
  let content = html

  // Remove subscription widget divs
  content = content.replace(/<div\s+class="subscription-widget-wrap[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '')

  // Remove "Subscribe now" button wrappers
  content = content.replace(/<p\s+class="button-wrapper"[^>]*>[\s\S]*?<\/p>/gi, '')

  // Remove empty paragraphs at start and end
  content = content.replace(/^(\s*<p>\s*<\/p>\s*)+/, '')
  content = content.replace(/(\s*<p>\s*<\/p>\s*)+$/, '')

  return content.trim()
}

export function parseSubstackZip(buffer: Buffer): ParsedPost[] {
  const zip = new AdmZip(buffer)
  const entries = zip.getEntries()

  console.log('[substack-parser] ZIP contains', entries.length, 'entries')

  // Find posts.csv
  const csvEntry = entries.find(
    (e) => e.entryName === 'posts.csv' || e.entryName.endsWith('/posts.csv'),
  )
  if (!csvEntry) {
    throw new Error('No posts.csv found in ZIP archive')
  }

  const csvText = csvEntry.getData().toString('utf-8')
  const lines = csvText.split('\n').filter((l) => l.trim())
  if (lines.length < 2) {
    throw new Error('posts.csv has no data rows')
  }

  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase())
  console.log('[substack-parser] CSV headers:', headers)

  const postIdIdx = headers.indexOf('post_id')
  const titleIdx = headers.indexOf('title')
  const subtitleIdx = headers.indexOf('subtitle')
  const postDateIdx = headers.indexOf('post_date')
  const urlIdx = headers.indexOf('post_url') !== -1 ? headers.indexOf('post_url') : headers.indexOf('url')
  const slugIdx = headers.indexOf('slug')
  const typeIdx = headers.indexOf('type')
  const isPublishedIdx = headers.indexOf('is_published')

  // Build a map of HTML files keyed by basename (without .html extension).
  // Substack ZIPs put files in posts/ subdirectory with names like:
  //   posts/186459709.the-collapse-of-traditional-resume.html
  // The basename (186459709.the-collapse-of-traditional-resume) matches the
  // post_id column in posts.csv.
  const htmlMap = new Map<string, string>()
  for (const entry of entries) {
    if (entry.entryName.endsWith('.html')) {
      const basename = entry.entryName.split('/').pop()!.replace('.html', '')
      const rawHtml = entry.getData().toString('utf-8')
      htmlMap.set(basename, rawHtml)
    }
  }

  console.log('[substack-parser] Found', htmlMap.size, 'HTML files')

  const posts: ParsedPost[] = []

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i])
    if (fields.length < headers.length) continue

    // Skip drafts and non-newsletter types
    const isPublished = isPublishedIdx >= 0 ? fields[isPublishedIdx]?.trim().toLowerCase() : 'true'
    if (isPublished === 'false') continue

    const type = typeIdx >= 0 ? fields[typeIdx]?.trim().toLowerCase() : 'newsletter'
    if (type === 'podcast') continue

    const title = fields[titleIdx]?.trim() || 'Untitled'
    const subtitle = subtitleIdx >= 0 ? fields[subtitleIdx]?.trim() || '' : ''
    const postDate = postDateIdx >= 0 ? fields[postDateIdx]?.trim() || '' : ''
    const url = urlIdx >= 0 ? fields[urlIdx]?.trim() || '' : ''
    const postId = postIdIdx >= 0 ? fields[postIdIdx]?.trim() || '' : ''

    // Derive the public-facing slug for the URL.
    // Substack post_id format: "186459709.the-collapse-of-traditional-resume"
    // The part after the first dot is the slug fragment.
    let slug = ''
    if (slugIdx >= 0 && fields[slugIdx]?.trim()) {
      slug = fields[slugIdx].trim()
    } else if (url) {
      const urlPath = url.replace(/\/$/, '')
      const parts = urlPath.split('/')
      slug = parts[parts.length - 1] || ''
    }
    if (!slug && postId) {
      // Extract slug from post_id: "186459709.the-collapse-of-traditional-resume" → "the-collapse-of-traditional-resume"
      const dotIdx = postId.indexOf('.')
      slug = dotIdx >= 0 ? postId.substring(dotIdx + 1) : postId
    }
    if (!slug) {
      slug = slugify(title)
    }

    // Find matching HTML content.
    // Strategy 1: Use post_id directly as the htmlMap key (exact match for Substack format)
    // Strategy 2: Look for any key that ends with the slug
    // Strategy 3: Look for any key that contains the slug
    let rawHtml: string | null = null
    if (postId && htmlMap.has(postId)) {
      rawHtml = htmlMap.get(postId)!
    }
    if (!rawHtml) {
      // Try keys ending with the slug (handles numeric prefix variations)
      for (const [key, val] of htmlMap) {
        if (key.endsWith('.' + slug) || key.endsWith('-' + slug)) {
          rawHtml = val
          break
        }
      }
    }
    if (!rawHtml) {
      // Try substring containment
      for (const [key, val] of htmlMap) {
        if (key.includes(slug) || slug.includes(key.replace(/^\d+\./, ''))) {
          rawHtml = val
          break
        }
      }
    }

    const content = rawHtml ? cleanSubstackContent(rawHtml) : ''

    console.log(
      '[substack-parser] Post:', JSON.stringify(slug),
      '| postId:', JSON.stringify(postId),
      '→ match:', rawHtml ? 'YES' : 'NO',
      '| content:', content.length, 'bytes',
    )

    // Build excerpt from content
    const plainText = stripHtml(content)
    const excerpt = plainText.length > 200
      ? plainText.slice(0, 200).replace(/\s\S*$/, '') + '…'
      : plainText

    // Parse date
    let publishedAt: string | null = null
    let displayDate = ''
    if (postDate) {
      try {
        const d = new Date(postDate)
        if (!isNaN(d.getTime())) {
          publishedAt = d.toISOString()
          displayDate = d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }
      } catch {
        displayDate = postDate
      }
    }

    posts.push({
      title,
      subtitle,
      slug,
      content,
      publishedAt,
      displayDate,
      excerpt,
      canonicalUrl: url,
    })
  }

  console.log('[substack-parser] Parsed', posts.length, 'posts,',
    posts.filter((p) => p.content.length > 0).length, 'with content')

  return posts
}

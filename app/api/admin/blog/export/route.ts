import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'
import AdmZip from 'adm-zip'

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const tagsParam = req.nextUrl.searchParams.get('tags') || ''
    const filterTags = tagsParam
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    let posts
    if (filterTags.length > 0) {
      posts = await sql`
        SELECT * FROM blog_posts
        WHERE tags && ${filterTags}
        ORDER BY created_at DESC
      `
    } else {
      posts = await sql`
        SELECT * FROM blog_posts
        ORDER BY created_at DESC
      `
    }

    const zip = new AdmZip()

    // Add posts.json with full data
    zip.addFile('posts.json', Buffer.from(JSON.stringify(posts, null, 2), 'utf-8'))

    // Add individual HTML files
    for (const post of posts) {
      if (post.content) {
        zip.addFile(`${post.slug}.html`, Buffer.from(post.content, 'utf-8'))
      }
    }

    const zipBuffer = zip.toBuffer()

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="blog-export-${new Date().toISOString().slice(0, 10)}.zip"`,
      },
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Export failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

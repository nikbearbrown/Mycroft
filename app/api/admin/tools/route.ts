import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAdmin } from '@/lib/admin-auth'

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await sql`SELECT * FROM tools ORDER BY created_at DESC`
    return NextResponse.json(data)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { name, slug, description, tool_type, claude_url, artifact_id, artifact_embed_code, tags } = body

  if (!name || !slug) {
    return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
  }

  try {
    const rows = await sql`
      INSERT INTO tools (name, slug, description, tool_type, claude_url, artifact_id, artifact_embed_code, tags)
      VALUES (${name}, ${slug}, ${description || null}, ${tool_type || 'link'}, ${claude_url || null}, ${artifact_id || null}, ${artifact_embed_code || null}, ${tags || []})
      RETURNING *
    `
    return NextResponse.json(rows[0])
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

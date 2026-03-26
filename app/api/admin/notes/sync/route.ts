import { NextResponse } from 'next/server'
import { join } from 'path'
import { isAdmin } from '@/lib/admin-auth'
import { scanHtmlDir } from '@/lib/html-meta'

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const docs = scanHtmlDir(join(process.cwd(), 'public', 'notes'))
  return NextResponse.json({ docs })
}

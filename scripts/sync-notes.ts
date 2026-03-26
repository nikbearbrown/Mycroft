/**
 * List all notes in public/notes/.
 * Usage: npx tsx scripts/sync-notes.ts
 */
import { join } from 'path'
import { scanHtmlDir } from '../lib/html-meta'

const docs = scanHtmlDir(join(process.cwd(), 'public', 'notes'))

if (docs.length === 0) {
  console.log('No HTML files found in public/notes/')
} else {
  console.log(`Found ${docs.length} doc(s) in public/notes/:\n`)
  for (const doc of docs) {
    console.log(`  ${doc.filename}`)
    console.log(`    Title: ${doc.title}`)
    if (doc.description) console.log(`    Description: ${doc.description}`)
    if (doc.tags.length) console.log(`    Tags: ${doc.tags.join(', ')}`)
    console.log()
  }
}

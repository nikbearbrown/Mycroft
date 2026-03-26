'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import BlogVizHydrator from '@/components/BlogVizHydrator/BlogVizHydrator'
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikeIcon,
  Code as CodeIcon,
  Link as LinkIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  ImageIcon,
  Youtube as YoutubeIcon,
  BarChart,
  Braces,
  Upload,
  X,
} from 'lucide-react'

interface BlogPost {
  id?: string
  title: string
  subtitle: string
  slug: string
  byline: string
  tags: string[]
  cover_image?: string
  content: string
  published: boolean
}

const DEFAULT_BYLINE = `© 2026 Mycroft. All rights reserved.\n\nMycroft is open source (MIT License) · Built by Nik Bear Brown · bearbrown.co · The Skepticism AI Substack`

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function extractExcerpt(html: string): string {
  const text = stripHtml(html)
  if (text.length <= 200) return text
  return text.slice(0, 200).replace(/\s\S*$/, '') + '…'
}

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Upload failed')
  }
  const data = await res.json()
  return data.url
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`h-8 w-8 inline-flex items-center justify-center rounded transition-colors ${
        active ? 'bg-muted text-foreground' : 'hover:bg-muted'
      }`}
    >
      {children}
    </button>
  )
}

function ToolbarSep() {
  return <div className="w-px h-5 bg-border mx-0.5" />
}

export default function BlogEditor({ post }: { post?: BlogPost }) {
  const router = useRouter()
  const coverRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState(post?.title || '')
  const [subtitle, setSubtitle] = useState(post?.subtitle || '')
  const [byline, setByline] = useState(post?.byline ?? DEFAULT_BYLINE)
  const [tagsInput, setTagsInput] = useState((post?.tags || []).join(', '))
  const [slug, setSlug] = useState(post?.slug || '')
  const [slugEdited, setSlugEdited] = useState(!!post)
  const [coverImage, setCoverImage] = useState(post?.cover_image || '')
  const [coverUploading, setCoverUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-lg' },
      }),
      Youtube.configure({
        HTMLAttributes: { class: 'rounded-lg' },
        width: 640,
        height: 360,
      }),
      Placeholder.configure({
        placeholder: 'Start writing…',
      }),
    ],
    content: post?.content || '',
    editorProps: {
      attributes: {
        class:
          'min-h-[400px] prose prose-neutral dark:prose-invert max-w-none p-6 focus:outline-none prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-foreground prose-a:underline prose-img:rounded-lg',
      },
      handleDrop: (view, event, _slice, moved) => {
        if (moved || !event.dataTransfer?.files.length) return false
        const file = event.dataTransfer.files[0]
        if (!file.type.startsWith('image/')) return false
        event.preventDefault()
        uploadFile(file).then(url => {
          const { schema } = view.state
          const node = schema.nodes.image.create({ src: url })
          const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos
          if (pos !== undefined) {
            const tr = view.state.tr.insert(pos, node)
            view.dispatch(tr)
          }
        })
        return true
      },
      handlePaste: (view, event) => {
        const files = event.clipboardData?.files
        if (!files?.length) return false
        const file = files[0]
        if (!file.type.startsWith('image/')) return false
        event.preventDefault()
        uploadFile(file).then(url => {
          const { schema } = view.state
          const node = schema.nodes.image.create({ src: url })
          const tr = view.state.tr.replaceSelectionWith(node)
          view.dispatch(tr)
        })
        return true
      },
    },
  })

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value)
      if (!slugEdited) {
        setSlug(slugify(value))
      }
    },
    [slugEdited],
  )

  async function handleCoverUpload(file: File) {
    if (!file.type.startsWith('image/')) return
    setCoverUploading(true)
    try {
      const url = await uploadFile(file)
      setCoverImage(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cover upload failed')
    } finally {
      setCoverUploading(false)
    }
  }

  function getContent(): string {
    return editor?.getHTML() || ''
  }

  async function save(publish: boolean) {
    const content = getContent()
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    if (!content.trim() || content === '<p></p>') {
      setError('Content is required')
      return
    }

    setSaving(true)
    setError('')

    const excerpt = extractExcerpt(content)
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      slug: slug.trim() || slugify(title),
      byline: byline.trim() || null,
      tags,
      cover_image: coverImage || null,
      content,
      excerpt,
      published: publish,
    }

    try {
      const url = post?.id ? `/api/admin/blog/${post.id}` : '/api/admin/blog'
      const method = post?.id ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }
      router.push('/admin/dashboard/blog')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving post')
    } finally {
      setSaving(false)
    }
  }

  function insertYoutube() {
    const url = window.prompt('YouTube URL:')
    if (!url) return
    editor?.chain().focus().setYoutubeVideo({ src: url }).run()
  }

  async function insertImageFromUpload() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      try {
        const url = await uploadFile(file)
        editor?.chain().focus().setImage({ src: url }).run()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Image upload failed')
      }
    }
    input.click()
  }

  function insertLink() {
    const url = window.prompt('URL:')
    if (!url) {
      editor?.chain().focus().unsetLink().run()
      return
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  function insertViz() {
    const name = window.prompt('Viz name (e.g. ai-adoption-bars):')
    if (!name) return
    editor?.chain().focus().insertContent(`<div data-viz="${name}"></div>`).run()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Cover Image */}
      <div>
        {coverImage ? (
          <div className="relative rounded-lg overflow-hidden">
            <img src={coverImage} alt="Cover" className="w-full h-48 object-cover" />
            <button
              type="button"
              onClick={() => setCoverImage('')}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
              title="Remove cover image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-foreground/30 transition-colors"
            onClick={() => coverRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const file = e.dataTransfer.files[0]
              if (file) handleCoverUpload(file)
            }}
          >
            <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {coverUploading ? 'Uploading…' : 'Add cover image — drag or click'}
            </p>
            <input
              ref={coverRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleCoverUpload(file)
              }}
            />
          </div>
        )}
      </div>

      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="Title"
        className="w-full text-4xl font-bold tracking-tighter bg-transparent border-none outline-none placeholder:text-muted-foreground/40"
      />

      {/* Subtitle */}
      <input
        type="text"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Add a subtitle..."
        className="w-full text-xl bg-transparent border-none outline-none placeholder:text-muted-foreground/40 italic"
      />

      {/* Byline */}
      <div>
        <Label className="text-xs text-muted-foreground mb-1 block">Byline</Label>
        <textarea
          value={byline}
          onChange={(e) => setByline(e.target.value)}
          placeholder="Author byline..."
          rows={4}
          className="w-full text-sm border rounded-md p-3 bg-background resize-y focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Tags */}
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Tags (comma-separated)</Label>
        <Input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="ai, education, source:skepticism-ai"
          className="text-sm h-8"
        />
      </div>

      {/* Slug */}
      <div className="flex items-center gap-2">
        <Label className="text-xs text-muted-foreground whitespace-nowrap">
          /blog/
        </Label>
        <Input
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value)
            setSlugEdited(true)
          }}
          className="text-sm h-8 font-mono"
          placeholder="post-slug"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border rounded-md p-1.5 bg-muted/30 sticky top-16 z-10">
        <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} title="Bold">
          <BoldIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} title="Italic">
          <ItalicIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive('underline')} title="Underline">
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive('strike')} title="Strikethrough">
          <StrikeIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleCode().run()} active={editor?.isActive('code')} title="Inline code">
          <CodeIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleCodeBlock().run()} active={editor?.isActive('codeBlock')} title="Code block">
          <Braces className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSep />

        <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} title="Bullet list">
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} title="Ordered list">
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} title="Blockquote">
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().setHorizontalRule().run()} title="Divider">
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSep />

        <ToolbarButton onClick={insertLink} active={editor?.isActive('link')} title="Link">
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertImageFromUpload} title="Upload image">
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertYoutube} title="YouTube embed">
          <YoutubeIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={insertViz} title="D3 viz embed">
          <BarChart className="h-4 w-4" />
        </ToolbarButton>

        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="h-8 px-3 text-xs font-medium rounded hover:bg-muted transition-colors"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {showPreview ? (
        <div className="min-h-[400px] prose prose-neutral dark:prose-invert max-w-none border rounded-md p-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-foreground prose-a:underline prose-img:rounded-lg">
          <BlogVizHydrator html={getContent()} />
        </div>
      ) : (
        <div className="border rounded-md bg-background">
          <EditorContent editor={editor} />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 border-t pt-6">
        <Button
          variant="outline"
          onClick={() => save(false)}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save Draft'}
        </Button>
        <Button onClick={() => save(true)} disabled={saving}>
          {saving ? 'Publishing…' : post?.published ? 'Update' : 'Publish'}
        </Button>
        {post?.published && (
          <Button
            variant="outline"
            onClick={() => save(false)}
            disabled={saving}
            className="text-destructive hover:text-destructive"
          >
            Unpublish
          </Button>
        )}
      </div>
    </div>
  )
}

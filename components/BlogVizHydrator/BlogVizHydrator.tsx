'use client'

import { useRef, useEffect } from 'react'
import { vizRegistry } from '@/lib/viz/registry'

export default function BlogVizHydrator({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const vizEls = container.querySelectorAll<HTMLElement>('[data-viz]')
    vizEls.forEach(el => {
      const name = el.getAttribute('data-viz')
      if (!name) return

      const loader = vizRegistry[name]
      if (!loader) {
        console.warn(`[BlogVizHydrator] No viz registered for "${name}"`)
        return
      }

      loader()
        .then(render => render(el))
        .catch(err => console.warn(`[BlogVizHydrator] Failed to render "${name}":`, err))
    })
  }, [html])

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export const theme = {
  // Mycroft palette — swap these to rebrand the entire site
  // All pairings meet WCAG AA contrast (4.5:1) against bb8 (parchment)
  colors: {
    bb1: '#0D0D0D',   // soot black — primary text
    bb2: '#4A4A4A',   // iron grey — primary accent, headers
    bb3: '#8B0000',   // dried-ink red — danger, emphasis
    bb4: '#8B7536',   // cold brass — highlight, callout
    bb5: '#2F2F2F',   // charcoal — secondary accent
    bb6: '#6B6B5E',   // tarnished pewter — muted accent
    bb7: '#9C9680',   // aged ledger tan — borders, subtle backgrounds
    bb8: '#E8E0D0',   // parchment — page background, light surfaces
  },
  // Semantic aliases — use these in components, not raw hex
  semantic: {
    text:        'bb1',
    accent:      'bb2',
    danger:      'bb3',
    highlight:   'bb4',
    secondary:   'bb5',
    muted:       'bb6',
    border:      'bb7',
    background:  'bb8',
  },
} as const

export type Theme = typeof theme

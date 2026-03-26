interface Node {
  id: string
  group: string
  label: string
  desc: string
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
  vx?: number
  vy?: number
}

interface Link {
  source: string | Node
  target: string | Node
  strength: number
}

const GROUP_COLORS: Record<string, string> = {
  'Foundation Models': '#5C3D2E',
  'Applications': '#8B5E3C',
  'Infrastructure': '#A0522D',
  'Research': '#6B4226',
  'Regulation': '#C41E3A',
  'Data': '#2E4A3E',
}

const NODES: Node[] = [
  { id: 'gpt', group: 'Foundation Models', label: 'GPT-4 / GPT-5', desc: 'OpenAI\'s flagship large language models' },
  { id: 'claude', group: 'Foundation Models', label: 'Claude', desc: 'Anthropic\'s constitutional AI assistant' },
  { id: 'gemini', group: 'Foundation Models', label: 'Gemini', desc: 'Google DeepMind\'s multimodal model family' },
  { id: 'llama', group: 'Foundation Models', label: 'Llama', desc: 'Meta\'s open-weight model series' },
  { id: 'mistral', group: 'Foundation Models', label: 'Mistral', desc: 'European open-weight model lab' },

  { id: 'copilot', group: 'Applications', label: 'Code Assistants', desc: 'Copilot, Cursor, Claude Code — AI-powered development' },
  { id: 'search', group: 'Applications', label: 'AI Search', desc: 'Perplexity, Google AI Overviews, Bing Chat' },
  { id: 'agents', group: 'Applications', label: 'AI Agents', desc: 'Autonomous task execution and tool use' },
  { id: 'creative', group: 'Applications', label: 'Creative AI', desc: 'Image, video, and music generation' },
  { id: 'enterprise', group: 'Applications', label: 'Enterprise AI', desc: 'Salesforce, ServiceNow, internal copilots' },

  { id: 'gpu', group: 'Infrastructure', label: 'GPU Compute', desc: 'NVIDIA H100/B200, AMD MI300, custom ASICs' },
  { id: 'cloud', group: 'Infrastructure', label: 'Cloud Platforms', desc: 'AWS, Azure, GCP — training and inference at scale' },
  { id: 'edge', group: 'Infrastructure', label: 'Edge / On-device', desc: 'Apple Intelligence, Qualcomm NPUs, local inference' },

  { id: 'alignment', group: 'Research', label: 'Alignment', desc: 'Making AI systems safe and value-aligned' },
  { id: 'scaling', group: 'Research', label: 'Scaling Laws', desc: 'Compute-optimal training and emergent capabilities' },
  { id: 'multimodal', group: 'Research', label: 'Multimodal', desc: 'Vision, audio, video understanding in unified models' },

  { id: 'euai', group: 'Regulation', label: 'EU AI Act', desc: 'Risk-based regulatory framework for AI in Europe' },
  { id: 'exec_order', group: 'Regulation', label: 'US Executive Orders', desc: 'Federal AI safety and innovation policy' },

  { id: 'synthetic', group: 'Data', label: 'Synthetic Data', desc: 'Model-generated training data for augmentation' },
  { id: 'benchmarks', group: 'Data', label: 'Benchmarks', desc: 'MMLU, HumanEval, GPQA — measuring capability' },
]

const LINKS: Link[] = [
  // Foundation models connect to applications
  { source: 'gpt', target: 'copilot', strength: 0.8 },
  { source: 'gpt', target: 'search', strength: 0.6 },
  { source: 'gpt', target: 'agents', strength: 0.7 },
  { source: 'gpt', target: 'enterprise', strength: 0.7 },
  { source: 'claude', target: 'copilot', strength: 0.7 },
  { source: 'claude', target: 'agents', strength: 0.8 },
  { source: 'claude', target: 'enterprise', strength: 0.6 },
  { source: 'gemini', target: 'search', strength: 0.9 },
  { source: 'gemini', target: 'creative', strength: 0.5 },
  { source: 'llama', target: 'enterprise', strength: 0.6 },
  { source: 'llama', target: 'edge', strength: 0.5 },
  { source: 'mistral', target: 'enterprise', strength: 0.5 },

  // Infrastructure supports models
  { source: 'gpu', target: 'gpt', strength: 0.9 },
  { source: 'gpu', target: 'claude', strength: 0.8 },
  { source: 'gpu', target: 'gemini', strength: 0.8 },
  { source: 'gpu', target: 'llama', strength: 0.7 },
  { source: 'gpu', target: 'mistral', strength: 0.6 },
  { source: 'cloud', target: 'gpu', strength: 0.9 },
  { source: 'cloud', target: 'enterprise', strength: 0.7 },
  { source: 'edge', target: 'agents', strength: 0.4 },

  // Research threads
  { source: 'alignment', target: 'claude', strength: 0.9 },
  { source: 'alignment', target: 'gpt', strength: 0.6 },
  { source: 'scaling', target: 'gpt', strength: 0.8 },
  { source: 'scaling', target: 'gemini', strength: 0.7 },
  { source: 'multimodal', target: 'gemini', strength: 0.8 },
  { source: 'multimodal', target: 'gpt', strength: 0.7 },
  { source: 'multimodal', target: 'creative', strength: 0.7 },

  // Regulation touches everything
  { source: 'euai', target: 'enterprise', strength: 0.6 },
  { source: 'euai', target: 'creative', strength: 0.4 },
  { source: 'exec_order', target: 'alignment', strength: 0.5 },
  { source: 'exec_order', target: 'gpt', strength: 0.4 },

  // Data
  { source: 'synthetic', target: 'scaling', strength: 0.6 },
  { source: 'synthetic', target: 'llama', strength: 0.5 },
  { source: 'benchmarks', target: 'gpt', strength: 0.5 },
  { source: 'benchmarks', target: 'claude', strength: 0.5 },
  { source: 'benchmarks', target: 'gemini', strength: 0.5 },
]

export default async function render(el: HTMLElement): Promise<void> {
  const d3 = await import('d3')

  const width = el.clientWidth || 700
  const height = 520

  el.innerHTML = ''

  // Tooltip
  const tooltip = d3
    .select(el)
    .append('div')
    .style('position', 'absolute')
    .style('pointer-events', 'none')
    .style('background', 'rgba(0,0,0,0.85)')
    .style('color', '#fff')
    .style('padding', '8px 12px')
    .style('border-radius', '6px')
    .style('font-size', '13px')
    .style('line-height', '1.4')
    .style('max-width', '220px')
    .style('opacity', 0)
    .style('transition', 'opacity 0.15s')
    .style('z-index', '10')

  // Make container relative for tooltip positioning
  d3.select(el).style('position', 'relative')

  const svg = d3
    .select(el)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('width', '100%')
    .attr('height', height)
    .style('font-family', 'Inter, system-ui, sans-serif')
    .style('cursor', 'grab')

  // Title
  svg
    .append('text')
    .attr('x', 16)
    .attr('y', 24)
    .attr('fill', 'currentColor')
    .attr('font-size', 15)
    .attr('font-weight', 700)
    .text('The AI Ecosystem (2025)')

  svg
    .append('text')
    .attr('x', 16)
    .attr('y', 42)
    .attr('fill', 'currentColor')
    .attr('font-size', 11)
    .attr('opacity', 0.5)
    .text('Drag nodes · Hover for details · Click to highlight connections')

  const nodes: Node[] = NODES.map(d => ({ ...d }))
  const links: Link[] = LINKS.map(d => ({ ...d }))

  const simulation = d3
    .forceSimulation(nodes)
    .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(80).strength(d => (d as Link).strength * 0.3))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2 + 15))
    .force('collision', d3.forceCollide().radius(28))
    .force('x', d3.forceX(width / 2).strength(0.05))
    .force('y', d3.forceY(height / 2 + 15).strength(0.05))

  const g = svg.append('g')

  const link = g
    .append('g')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.25)
    .attr('stroke-width', d => (d as Link).strength * 2.5)

  const node = g
    .append('g')
    .selectAll<SVGCircleElement, Node>('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 10)
    .attr('fill', d => GROUP_COLORS[d.group] || '#666')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .style('cursor', 'pointer')
    .style('transition', 'r 0.2s')

  const label = g
    .append('g')
    .selectAll<SVGTextElement, Node>('text')
    .data(nodes)
    .join('text')
    .text(d => d.label)
    .attr('fill', 'currentColor')
    .attr('font-size', 10)
    .attr('text-anchor', 'middle')
    .attr('dy', -16)
    .style('pointer-events', 'none')
    .attr('opacity', 0.8)

  // Drag behavior
  const drag = d3
    .drag<SVGCircleElement, Node>()
    .on('start', (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
      svg.style('cursor', 'grabbing')
    })
    .on('drag', (event, d) => {
      d.fx = event.x
      d.fy = event.y
    })
    .on('end', (event, d) => {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
      svg.style('cursor', 'grab')
    })

  node.call(drag)

  // Hover
  node
    .on('mouseenter', (event, d) => {
      // Highlight connected
      const connected = new Set<string>()
      connected.add(d.id)
      links.forEach(l => {
        const s = typeof l.source === 'object' ? l.source.id : l.source
        const t = typeof l.target === 'object' ? l.target.id : l.target
        if (s === d.id) connected.add(t)
        if (t === d.id) connected.add(s)
      })

      node.attr('opacity', n => connected.has(n.id) ? 1 : 0.15)
      label.attr('opacity', n => connected.has(n.id) ? 1 : 0.1)
      link.attr('stroke-opacity', l => {
        const s = typeof l.source === 'object' ? l.source.id : l.source
        const t = typeof l.target === 'object' ? l.target.id : l.target
        return s === d.id || t === d.id ? 0.6 : 0.05
      })

      d3.select(event.currentTarget as SVGCircleElement).attr('r', 14)

      tooltip
        .html(`<strong>${d.label}</strong><br/><span style="opacity:0.7">${d.group}</span><br/>${d.desc}`)
        .style('opacity', 1)
    })
    .on('mousemove', (event) => {
      const rect = el.getBoundingClientRect()
      tooltip
        .style('left', (event.clientX - rect.left + 14) + 'px')
        .style('top', (event.clientY - rect.top - 10) + 'px')
    })
    .on('mouseleave', (event) => {
      node.attr('opacity', 1)
      label.attr('opacity', 0.8)
      link.attr('stroke-opacity', 0.25)
      d3.select(event.currentTarget as SVGCircleElement).attr('r', 10)
      tooltip.style('opacity', 0)
    })

  // Click to pin highlight
  let pinned: string | null = null
  node.on('click', (event, d) => {
    event.stopPropagation()
    if (pinned === d.id) {
      pinned = null
      node.attr('opacity', 1)
      label.attr('opacity', 0.8)
      link.attr('stroke-opacity', 0.25)
      return
    }
    pinned = d.id
    const connected = new Set<string>()
    connected.add(d.id)
    links.forEach(l => {
      const s = typeof l.source === 'object' ? l.source.id : l.source
      const t = typeof l.target === 'object' ? l.target.id : l.target
      if (s === d.id) connected.add(t)
      if (t === d.id) connected.add(s)
    })
    node.attr('opacity', n => connected.has(n.id) ? 1 : 0.15)
    label.attr('opacity', n => connected.has(n.id) ? 1 : 0.1)
    link.attr('stroke-opacity', l => {
      const s = typeof l.source === 'object' ? l.source.id : l.source
      const t = typeof l.target === 'object' ? l.target.id : l.target
      return s === d.id || t === d.id ? 0.6 : 0.05
    })
  })

  svg.on('click', () => {
    pinned = null
    node.attr('opacity', 1)
    label.attr('opacity', 0.8)
    link.attr('stroke-opacity', 0.25)
  })

  // Legend
  const groups = Object.entries(GROUP_COLORS)
  const legend = svg.append('g').attr('transform', `translate(${width - 140}, ${height - groups.length * 18 - 8})`)
  groups.forEach(([name, color], i) => {
    const row = legend.append('g').attr('transform', `translate(0, ${i * 18})`)
    row.append('circle').attr('r', 5).attr('cx', 5).attr('cy', 0).attr('fill', color)
    row.append('text').attr('x', 16).attr('y', 4).attr('fill', 'currentColor').attr('font-size', 10).text(name)
  })

  // Tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => (d.source as Node).x!)
      .attr('y1', d => (d.source as Node).y!)
      .attr('x2', d => (d.target as Node).x!)
      .attr('y2', d => (d.target as Node).y!)

    node.attr('cx', d => d.x!).attr('cy', d => d.y!)
    label.attr('x', d => d.x!).attr('y', d => d.y!)
  })
}

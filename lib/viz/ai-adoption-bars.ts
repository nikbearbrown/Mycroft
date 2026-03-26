export default async function render(el: HTMLElement): Promise<void> {
  const d3 = await import('d3')

  const data = [
    { sector: 'Financial Services', pct: 72 },
    { sector: 'Technology', pct: 68 },
    { sector: 'Retail & E-commerce', pct: 54 },
    { sector: 'Manufacturing', pct: 47 },
    { sector: 'Logistics & Supply Chain', pct: 43 },
    { sector: 'Education', pct: 38 },
    { sector: 'Healthcare', pct: 31 },
    { sector: 'Government', pct: 22 },
    { sector: 'Agriculture', pct: 16 },
  ]

  const width = el.clientWidth || 600
  const barHeight = 32
  const gap = 8
  const margin = { top: 40, right: 50, bottom: 30, left: 180 }
  const height = margin.top + margin.bottom + data.length * (barHeight + gap)

  el.innerHTML = ''

  const svg = d3
    .select(el)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('width', '100%')
    .attr('height', height)
    .style('font-family', 'Inter, system-ui, sans-serif')

  const x = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right])

  const y = d3
    .scaleBand<string>()
    .domain(data.map(d => d.sector))
    .range([margin.top, height - margin.bottom])
    .padding(gap / (barHeight + gap))

  // Title
  svg
    .append('text')
    .attr('x', margin.left)
    .attr('y', 24)
    .attr('fill', 'currentColor')
    .attr('font-size', 15)
    .attr('font-weight', 700)
    .text('AI Adoption by Sector (2025)')

  // Grid lines
  svg
    .append('g')
    .attr('transform', `translate(0,${margin.top})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
        .tickSize(height - margin.top - margin.bottom)
        .tickFormat(() => '')
    )
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('.tick line').attr('stroke', '#e5e5e5').attr('stroke-dasharray', '2,3'))

  // Bars
  svg
    .selectAll('rect.bar')
    .data(data)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', margin.left)
    .attr('y', d => y(d.sector)!)
    .attr('width', d => x(d.pct) - margin.left)
    .attr('height', y.bandwidth())
    .attr('fill', '#5C3D2E')
    .attr('rx', 3)

  // Percentage labels
  svg
    .selectAll('text.pct')
    .data(data)
    .join('text')
    .attr('class', 'pct')
    .attr('x', d => x(d.pct) + 6)
    .attr('y', d => y(d.sector)! + y.bandwidth() / 2)
    .attr('dy', '0.35em')
    .attr('fill', 'currentColor')
    .attr('font-size', 12)
    .text(d => `${d.pct}%`)

  // Y axis (sector labels)
  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(0).tickPadding(8))
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('text').attr('fill', 'currentColor').attr('font-size', 12))

  // X axis (bottom)
  svg
    .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
        .tickFormat(d => `${d}%`)
    )
    .call(g => g.select('.domain').remove())
    .call(g => g.selectAll('text').attr('fill', 'currentColor').attr('font-size', 11))
    .call(g => g.selectAll('.tick line').remove())
}

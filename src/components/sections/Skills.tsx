import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GlassCard } from '@/components/ui/GlassCard'
import type { Skill } from '@/types'

interface SkillsProps {
  skills: Skill[]
}

// ─── Category styling ─────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<Skill['category'], { color: string; label: string; dim: string }> = {
  frontend:  { color: '#f59e0b', label: 'Frontend',  dim: '#92400e' },
  animation: { color: '#fbbf24', label: 'Animation', dim: '#78350f' },
  backend:   { color: '#d97706', label: 'Backend',   dim: '#713f12' },
  tools:     { color: '#a8a29e', label: 'Tools',     dim: '#57534e' },
  language:  { color: '#fde68a', label: 'Language',  dim: '#92400e' },
}

// ─── SVG Network visualisation ────────────────────────────────────────────────

interface NodePos {
  id:   string
  x:    number
  y:    number
  skill: Skill
}

// How much space to reserve around the outermost ring for node glow + labels
const LAYOUT_PADDING = 52

function buildLayout(skills: Skill[], W: number, H: number): NodePos[] {
  if (!skills.length) return []

  // Group by category, arrange in concentric rings
  const groups: Record<string, Skill[]> = {}
  for (const s of skills) {
    groups[s.category] = groups[s.category] ?? []
    groups[s.category].push(s)
  }

  const positions: NodePos[] = []
  const cx = W / 2
  const cy = H / 2

  // Derive ring radii from the actual available space so nodes always fit.
  // We use the smaller dimension minus padding so the graph is never clipped.
  const maxR = Math.min(W, H) / 2 - LAYOUT_PADDING

  // Sort categories ascending by node count so the fewest nodes get the
  // innermost rings (shortest circumference, but fewest items to spread).
  // Dense categories get outer rings where there is more arc length per node.
  const catKeys = Object.keys(groups).sort(
    (a, b) => groups[a].length - groups[b].length
  )

  // Rings evenly spaced at fractions 1/N, 2/N … N/N of maxR.
  // Starting at 1/N (never 0) means no two nodes from the same category
  // can ever collapse onto the same point regardless of their angle.
  const radii = catKeys.map((_, i) => (maxR / catKeys.length) * (i + 1))

  catKeys.forEach((cat, ci) => {
    const ring  = groups[cat]
    const r     = radii[ci] ?? maxR
    const count = ring.length
    ring.forEach((skill, si) => {
      const angle = (si / count) * 2 * Math.PI - Math.PI / 2 + (ci * 0.3)
      positions.push({
        id:    skill.id,
        x:     cx + r * Math.cos(angle),
        y:     cy + r * Math.sin(angle),
        skill,
      })
    })
  })

  return positions
}

// ─── Component ────────────────────────────────────────────────────────────────

// Extra space around nodes to accommodate labels (rendered below) and glow rings
const VIEWBOX_PAD = 36

export function Skills({ skills }: SkillsProps) {
  const [ref, inView]         = useInView({ triggerOnce: true, threshold: 0.1 })
  const [hovered, setHovered] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Track only the container width — height is derived from node layout
  const [containerW, setContainerW] = useState(700)

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setContainerW(containerRef.current.offsetWidth || 700)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Height is always square-ish on desktop, capped on mobile
  const svgH  = Math.min(containerW * 0.75, 580)
  const nodes = buildLayout(skills, containerW, svgH)

  // Compute the real bounding box of all positioned nodes so the viewBox
  // always contains every node + its label, with no clipping.
  const viewBox = (() => {
    if (!nodes.length) return `0 0 ${containerW} ${svgH}`
    const xs   = nodes.map((n) => n.x)
    const ys   = nodes.map((n) => n.y)
    const minX = Math.min(...xs) - VIEWBOX_PAD
    const minY = Math.min(...ys) - VIEWBOX_PAD
    const maxX = Math.max(...xs) + VIEWBOX_PAD
    // Extra bottom pad for labels which render below the node
    const maxY = Math.max(...ys) + VIEWBOX_PAD + 20
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`
  })()

  // Build a set of all connections for the hovered node
  const hoveredSkill  = skills.find((s) => s.id === hovered)
  const connectedIds  = new Set<string>(hoveredSkill ? [hovered!, ...hoveredSkill.connections] : [])

  // Collect all unique connection pairs from graph data
  const connections: [string, string][] = []
  const seen = new Set<string>()
  for (const s of skills) {
    for (const cid of s.connections) {
      const key = [s.id, cid].sort().join('—')
      if (!seen.has(key) && skills.find((x) => x.id === cid)) {
        seen.add(key)
        connections.push([s.id, cid])
      }
    }
  }

  function isHighlighted(a: string, b: string) {
    if (!hovered) return true
    return connectedIds.has(a) && connectedIds.has(b)
  }

  function getNode(id: string) {
    return nodes.find((n) => n.id === id)
  }

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-void-100 py-24 md:py-32"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)' }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="02 / Skills"
          title="The neural map."
          subtitle="An interactive graph of my technical skills and how they connect. Hover any node to trace its relationships."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* containerRef measures available width so layout radii scale correctly */}
          <div ref={containerRef}>
          <GlassCard noPadding>
            {/* SVG Network — viewBox is computed from actual node bounding box */}
            <svg
              className="w-full"
              style={{ height: svgH, display: 'block' }}
              viewBox={viewBox}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-strong">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Connection lines */}
              {connections.map(([a, b]) => {
                const na = getNode(a)
                const nb = getNode(b)
                if (!na || !nb) return null
                const lit = isHighlighted(a, b)
                const isActive = hovered && connectedIds.has(a) && connectedIds.has(b)
                return (
                  <motion.line
                    key={`${a}—${b}`}
                    x1={na.x} y1={na.y}
                    x2={nb.x} y2={nb.y}
                    stroke={isActive ? '#f59e0b' : 'rgba(245,158,11,0.12)'}
                    strokeWidth={isActive ? 1.5 : 0.8}
                    opacity={lit ? 1 : 0.08}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: lit ? 1 : 0.08 } : {}}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                    filter={isActive ? 'url(#glow)' : undefined}
                  />
                )
              })}

              {/* Nodes */}
              {nodes.map(({ id, x, y, skill }) => {
                const cfg      = CATEGORY_CONFIG[skill.category]
                const isHov    = id === hovered
                const isConn   = hovered ? connectedIds.has(id) : false
                const isDim    = hovered ? !connectedIds.has(id) : false
                const r        = isHov ? 10 : (skill.proficiency / 100) * 8 + 4

                return (
                  <g
                    key={id}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Pulse ring on hover */}
                    {isHov && (
                      <motion.circle
                        cx={x} cy={y} r={r + 12}
                        fill="none"
                        stroke={cfg.color}
                        strokeWidth={1}
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                    )}

                    {/* Node circle */}
                    <motion.circle
                      cx={x} cy={y}
                      r={r}
                      fill={isHov ? cfg.color : (isConn ? cfg.color + 'cc' : cfg.dim + '88')}
                      filter={isHov ? 'url(#glow-strong)' : (isConn ? 'url(#glow)' : undefined)}
                      opacity={isDim ? 0.2 : 1}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: isDim ? 0.2 : 1 } : {}}
                      transition={{
                        scale:   { type: 'spring', stiffness: 200, damping: 15, delay: 0.4 + Math.random() * 0.4 },
                        opacity: { duration: 0.4, delay: 0.4 },
                      }}
                      style={{ transition: 'fill 0.2s, opacity 0.2s' }}
                    />

                    {/* Label */}
                    <motion.text
                      x={x}
                      y={y + r + 14}
                      textAnchor="middle"
                      fontSize={10}
                      fontFamily="'JetBrains Mono', monospace"
                      fill={isHov ? cfg.color : (isDim ? '#44403c' : '#a8a29e')}
                      opacity={isDim ? 0.2 : 1}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: isDim ? 0.2 : 1 } : {}}
                      transition={{ delay: 0.7 }}
                      style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill 0.2s, opacity 0.2s' }}
                    >
                      {skill.name}
                    </motion.text>
                  </g>
                )
              })}
            </svg>
          </GlassCard>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          {Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => (
            <div key={cat} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: cfg.color }}
              />
              <span className="font-mono text-xs text-warm-500">{cfg.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Proficiency bars — top 6 skills */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[...skills]
            .sort((a, b) => b.proficiency - a.proficiency)
            .slice(0, 6)
            .map((skill, i) => (
              <motion.div
                key={skill.id}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.06 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-warm-300">{skill.name}</span>
                  <span className="font-mono text-xs text-amber-500">{skill.proficiency}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-void-300">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.proficiency}%` } : {}}
                    transition={{ duration: 1, ease: 'easeOut', delay: 1 + i * 0.06 }}
                  />
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}

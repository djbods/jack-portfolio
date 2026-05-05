import { useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Node {
  x:          number
  y:          number
  vx:         number
  vy:         number
  radius:     number
  pulsePhase: number
  pulseSpeed: number
  alpha:      number
}

interface Particle {
  nodeA:    number
  nodeB:    number
  progress: number   // 0 → 1 along the connection
  speed:    number
  alpha:    number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NODE_COUNT      = 55
const MAX_DIST        = 180
const BASE_ALPHA      = 0.55
const AMBER           = { r: 245, g: 158, b: 11 }
const WARM_WHITE      = { r: 250, g: 250, b: 249 }

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${a})`
}

// ─── Component ────────────────────────────────────────────────────────────────

interface NeuralCanvasProps {
  /** 0–1 opacity multiplier — used to fade out on scroll */
  opacity?: number
  /** CSS class overrides */
  className?: string
}

export function NeuralCanvas({ opacity = 1, className = '' }: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    // ── Init ──────────────────────────────────────────────────────────────────

    let W = 0, H = 0
    let nodes:     Node[]     = []
    let particles: Particle[] = []
    let frameId:   number

    function resize() {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W * window.devicePixelRatio
      canvas.height = H * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    function spawnNode(): Node {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.15 + Math.random() * 0.25
      return {
        x:          Math.random() * W,
        y:          Math.random() * H,
        vx:         Math.cos(angle) * speed,
        vy:         Math.sin(angle) * speed,
        radius:     1.5 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        alpha:      0.4 + Math.random() * 0.5,
      }
    }

    function initNodes() {
      nodes = Array.from({ length: NODE_COUNT }, spawnNode)
    }

    function spawnParticle(): Particle | null {
      // Find a valid connection to travel along
      const candidates: [number, number][] = []
      for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          if (Math.sqrt(dx * dx + dy * dy) < MAX_DIST * 0.7) {
            candidates.push([i, j])
          }
        }
      }
      if (candidates.length === 0) return null
      const [a, b] = candidates[Math.floor(Math.random() * candidates.length)]
      return {
        nodeA:    a,
        nodeB:    b,
        progress: 0,
        speed:    0.004 + Math.random() * 0.006,
        alpha:    0.6 + Math.random() * 0.4,
      }
    }

    function initParticles() {
      particles = Array.from({ length: 12 }, () => spawnParticle()).filter(Boolean) as Particle[]
    }

    // ── Update ─────────────────────────────────────────────────────────────────

    function updateNodes() {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulsePhase += n.pulseSpeed

        // Bounce softly off edges
        if (n.x < 0)  { n.x = 0;  n.vx *= -1 }
        if (n.x > W)  { n.x = W;  n.vx *= -1 }
        if (n.y < 0)  { n.y = 0;  n.vy *= -1 }
        if (n.y > H)  { n.y = H;  n.vy *= -1 }
      }
    }

    function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].progress += particles[i].speed
        if (particles[i].progress >= 1) {
          particles.splice(i, 1)
          const p = spawnParticle()
          if (p) particles.push(p)
        }
      }
    }

    // ── Draw ──────────────────────────────────────────────────────────────────

    function drawConnections() {
      for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MAX_DIST) {
            const a = (1 - dist / MAX_DIST) * BASE_ALPHA * opacity
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            grad.addColorStop(0,   rgba(AMBER.r, AMBER.g, AMBER.b, a * nodes[i].alpha))
            grad.addColorStop(0.5, rgba(AMBER.r, AMBER.g, AMBER.b, a * 0.3))
            grad.addColorStop(1,   rgba(AMBER.r, AMBER.g, AMBER.b, a * nodes[j].alpha))

            ctx.beginPath()
            ctx.strokeStyle = grad
            ctx.lineWidth   = 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function drawNodes() {
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(n.pulsePhase)
        const r     = n.radius + pulse * 1.2
        const a     = n.alpha * opacity

        // Outer glow
        ctx.beginPath()
        ctx.arc(n.x, n.y, r + 4, 0, Math.PI * 2)
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r + 4)
        glow.addColorStop(0,   rgba(AMBER.r, AMBER.g, AMBER.b, a * 0.4))
        glow.addColorStop(1,   rgba(AMBER.r, AMBER.g, AMBER.b, 0))
        ctx.fillStyle = glow
        ctx.fill()

        // Core dot (mix amber + warm white)
        const mixRatio = 0.3 + 0.7 * pulse
        const cr = Math.round(AMBER.r * (1 - mixRatio) + WARM_WHITE.r * mixRatio)
        const cg = Math.round(AMBER.g * (1 - mixRatio) + WARM_WHITE.g * mixRatio)
        const cb = Math.round(AMBER.b * (1 - mixRatio) + WARM_WHITE.b * mixRatio)

        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = rgba(cr, cg, cb, a)
        ctx.shadowColor = rgba(AMBER.r, AMBER.g, AMBER.b, 0.8)
        ctx.shadowBlur  = 8
        ctx.fill()
        ctx.shadowBlur  = 0
      }
    }

    function drawParticles() {
      for (const p of particles) {
        const nA = nodes[p.nodeA]
        const nB = nodes[p.nodeB]
        const t  = p.progress

        const x = nA.x + (nB.x - nA.x) * t
        const y = nA.y + (nB.y - nA.y) * t

        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)

        const glow = ctx.createRadialGradient(x, y, 0, x, y, 5)
        glow.addColorStop(0,   rgba(AMBER.r, AMBER.g, AMBER.b, p.alpha * opacity))
        glow.addColorStop(0.5, rgba(AMBER.r, AMBER.g, AMBER.b, p.alpha * 0.4 * opacity))
        glow.addColorStop(1,   rgba(AMBER.r, AMBER.g, AMBER.b, 0))

        ctx.shadowColor = rgba(AMBER.r, AMBER.g, AMBER.b, 1)
        ctx.shadowBlur  = 12
        ctx.fillStyle   = glow
        ctx.fill()
        ctx.shadowBlur  = 0
      }
    }

    // ── Main loop ─────────────────────────────────────────────────────────────

    function tick() {
      ctx.clearRect(0, 0, W, H)
      updateNodes()
      updateParticles()
      drawConnections()
      drawParticles()
      drawNodes()
      frameId = requestAnimationFrame(tick)
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────────

    resize()
    initNodes()
    initParticles()
    tick()

    const ro = new ResizeObserver(() => {
      resize()
      // Re-scatter nodes so they fill the new size
      for (const n of nodes) {
        n.x = Math.random() * W
        n.y = Math.random() * H
      }
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(frameId)
      ro.disconnect()
    }
  }, [opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  )
}

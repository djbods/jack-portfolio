import { useEffect, useRef } from 'react'

/**
 * CursorGlow — a custom amber radial gradient that follows the cursor.
 * Renders as a fixed, pointer-events-none overlay; purely decorative.
 * Hidden on touch devices to avoid janky fallbacks.
 */
export function CursorGlow() {
  const glowRef    = useRef<HTMLDivElement>(null)
  const outerRef   = useRef<HTMLDivElement>(null)
  const pos        = useRef({ x: -200, y: -200 })
  const outerPos   = useRef({ x: -200, y: -200 })
  const frameId    = useRef<number>(0)

  useEffect(() => {
    // Don't render on coarse pointer devices (mobile/tablet)
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    // Animate outer ring with easing
    const animate = () => {
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.12
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.12

      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`
      }
      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${outerPos.current.x - 16}px, ${outerPos.current.y - 16}px)`
      }

      frameId.current = requestAnimationFrame(animate)
    }

    frameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameId.current)
    }
  }, [])

  return (
    <>
      {/* Large ambient glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        style={{
          width:        400,
          height:       400,
          background:   'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
          willChange:   'transform',
        }}
      />
      {/* Small precise cursor dot */}
      <div
        ref={outerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        style={{
          width:        32,
          height:       32,
          border:       '1px solid rgba(245,158,11,0.4)',
          borderRadius: '50%',
          willChange:   'transform',
          transition:   'border-color 0.2s',
        }}
      />
    </>
  )
}

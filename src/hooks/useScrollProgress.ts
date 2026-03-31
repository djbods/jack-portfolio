/**
 * useScrollProgress.ts
 *
 * Tracks scroll position, direction, and overall page progress.
 * Used to drive parallax effects, navbar transparency, and scroll indicators.
 */

import { useState, useEffect, useRef } from 'react'
import type { ScrollProgress } from '@/types'

export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    scrollY:        0,
    scrollProgress: 0,
    direction:      'down',
    isAtTop:        true,
    isAtBottom:     false,
  })

  const lastScrollY = useRef(0)
  const ticking     = useRef(false)

  useEffect(() => {
    function update() {
      const scrollY    = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      const progress   = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0
      const direction  = scrollY > lastScrollY.current ? 'down' : 'up'

      setState({
        scrollY,
        scrollProgress: progress,
        direction,
        isAtTop:        scrollY < 10,
        isAtBottom:     progress > 0.98,
      })

      lastScrollY.current = scrollY
      ticking.current     = false
    }

    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(update)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}

/**
 * useParallax — maps scroll position to a translated Y offset.
 * Pass a speed multiplier: positive = slower than scroll, negative = opposite.
 */
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)
  const ticking = useRef(false)

  useEffect(() => {
    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setOffset(window.scrollY * speed)
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return offset
}

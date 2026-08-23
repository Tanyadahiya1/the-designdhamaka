import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)
  const [label, setLabel] = useState('')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches
    setIsTouch(touch)
    if (touch) return

    let x = 0
    let y = 0
    let cx = 0
    let cy = 0

    function onMove(e: MouseEvent) {
      x = e.clientX
      y = e.clientY
    }

    function tick() {
      cx += (x - cx) * 0.25
      cy += (y - cy) * 0.25
      if (dotRef.current) {
        dotRef.current.style.left = `${cx}px`
        dotRef.current.style.top = `${cy}px`
      }
      if (labelRef.current) {
        labelRef.current.style.left = `${cx}px`
        labelRef.current.style.top = `${cy}px`
      }
      requestAnimationFrame(tick)
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement
      const el = target.closest('[data-cursor]') as HTMLElement | null
      if (el) {
        setExpanded(true)
        setLabel(el.getAttribute('data-cursor') || '')
      } else {
        setExpanded(false)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    const raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${expanded ? 'expand' : ''}`} />
      <div ref={labelRef} className="cursor-label" style={{ opacity: expanded && label ? 1 : 0 }}>
        {label}
      </div>
    </>
  )
}

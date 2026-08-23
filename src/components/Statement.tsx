import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

export default function Statement() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!rootRef.current) return

    const el = rootRef.current.querySelector('.statement-h2') as HTMLElement
    if (!el) return

    let split: InstanceType<typeof SplitText> | null = null
    let triggers: ScrollTrigger[] = []

    document.fonts.ready.then(() => {
      if (!rootRef.current) return

      split = SplitText.create(el, {
        type: 'lines,words,chars',
        linesClass: 'st-line',
        wordsClass: 'st-word',
        charsClass: 'st-char',
        autoSplit: true,
      })

      const { chars, lines } = split

      gsap.set(chars, { x: 80, opacity: 0, skewX: 20 })

      const charMeta = lines.flatMap((line) => {
        const lineChars = chars.filter((c) => line.contains(c))
        return lineChars.map((char, charIndexInLine) => ({ char, charIndexInLine }))
      })

      const tl = gsap.timeline({ paused: true })

      charMeta.forEach(({ char, charIndexInLine }) => {
        tl.to(
          char,
          { x: 0, opacity: 1, skewX: 0, ease: 'power3.out', duration: 0.65 },
          charIndexInLine * 0.05
        )
      })

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => tl.restart(),
        onLeaveBack: () => tl.pause(0),
      })

      triggers.push(trigger)
    })

    return () => {
      triggers.forEach(t => t.kill())
      split?.revert()
    }
  }, [])

  return (
    <section
      ref={rootRef}
      style={{
        position: 'relative',
        padding: '12rem 2rem',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: '#0a0a0a',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          width: '70vmax',
          height: '70vmax',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,121,43,0.15) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <h2
        className="statement-h2"
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: '"Barlow Condensed", "Fredoka", sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(3.5rem, 11vw, 13rem)',
          textTransform: 'uppercase',
          lineHeight: 0.85,
          letterSpacing: '-2px',
          color: '#fff',
          width: '90%',
          maxWidth: '1100px',
        }}
      >
        We are small.{' '}
        <span style={{ color: '#E8792B' }}>But ideas</span>{' '}
        aren&apos;t.
      </h2>

      <style>{`
        .st-line { display: block; }
        .st-word { display: inline-block; }
        .st-char { display: inline-block; will-change: transform, opacity; }
      `}</style>
    </section>
  )
}
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

export default function Agency() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!rootRef.current) return

    const lines = Array.from(
      rootRef.current.querySelectorAll('.agency-line')
    ) as HTMLElement[]

    let splits: InstanceType<typeof SplitText>[] = []
    let triggers: ScrollTrigger[] = []

    document.fonts.ready.then(() => {
      if (!rootRef.current) return

      lines.forEach((line, lineIndex) => {
        const split = SplitText.create(line, {
          type: 'lines,words,chars',
          linesClass: 'ag-line',
          wordsClass: 'ag-word',
          charsClass: 'ag-char',
          autoSplit: true,
        })
        splits.push(split)

        const { chars, lines: splitLines } = split

        gsap.set(chars, { x: 80, opacity: 0, skewX: 20 })

        const charMeta = splitLines.flatMap((ln) => {
          const lineChars = chars.filter((c) => ln.contains(c))
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
          trigger: line,
          start: 'top 88%',
          onEnter: () => tl.restart(),
          onLeaveBack: () => tl.pause(0),
        })

        triggers.push(trigger)
      })
    })

    return () => {
      triggers.forEach(t => t.kill())
      splits.forEach(s => s.revert())
    }
  }, [])

  return (
    <section
      ref={rootRef}
      id="about-agency"
      className="relative flex min-h-screen items-center overflow-hidden bg-bg px-5 py-24 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#F2B705]/10 blur-3xl" />

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mono mb-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ink/45"
        >
          <span className="h-px w-10 bg-accent" />
          The Design Dhamaka
        </motion.div>

        {/* Animated headlines */}
        <h2 className="max-w-full overflow-hidden">
          <div
            className="agency-line font-display font-bold leading-[0.82] tracking-[-0.08em] text-[17vw] sm:text-8xl md:text-[9rem] lg:text-[11rem] text-ink"
            style={{ display: 'block', overflow: 'hidden' }}
          >
            WE&apos;RE SMALL.
          </div>
          <div
            className="agency-line font-display font-bold leading-[0.82] tracking-[-0.08em] text-[17vw] sm:text-8xl md:text-[9rem] lg:text-[11rem] text-ink/25"
            style={{ display: 'block', overflow: 'hidden' }}
          >
            OUR IDEAS AREN&apos;T.
          </div>
        </h2>

        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="max-w-md text-base leading-relaxed text-ink/60 md:text-lg"
          >
            We combine strategy, design, development and marketing to help
            businesses build identities that stand out in a crowded digital world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mono flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-ink/40"
          >
            <span className="h-px w-8 bg-accent" />
            Delhi NCR, India — Working globally
          </motion.div>
        </div>
      </div>

      <style>{`
        .ag-line { display: block; }
        .ag-word { display: inline-block; }
        .ag-char { display: inline-block; will-change: transform, opacity; }
      `}</style>
    </section>
  )
}
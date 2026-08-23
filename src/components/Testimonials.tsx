import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const QUOTES = [
  {
    quote: 'They handled everything — product photos, ad creatives, made our small brand look premium.',
    name: 'Revanta Regency',
    role: 'Hotel Owner',
    x: '2%', y: '14%', side: 'left' as const,
  },
  {
    quote: 'They understood our vibe instantly and made posts that looked professional from day one.',
    name: 'Spice Route Cafe',
    role: 'Restaurant Owner',
    x: '74%', y: '26%', side: 'right' as const,
  },
  {
    quote: 'Super professional. Built our social presence from scratch with a clean, modern identity.',
    name: 'Brew Cafe',
    role: 'Cafe Owner',
    x: '3%', y: '54%', side: 'left' as const,
  },
  {
    quote: 'Fast, sharp, and the site outperformed everything our old agency built us.',
    name: 'APEX MODS',
    role: 'Founder',
    x: '75%', y: '68%', side: 'right' as const,
  },
  {
    quote: 'They delivered in 5 days and it still looks better than sites that took a month.',
    name: 'Vahan360',
    role: 'Co-founder',
    x: '4%', y: '86%', side: 'left' as const,
  },
]

function useIsMobile(breakpoint = 760) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])
  return isMobile
}

function BubbleContent({ q }: { q: (typeof QUOTES)[number] }) {
  return (
    <>
      <blockquote className="text-sm leading-relaxed text-ink/80">&ldquo;{q.quote}&rdquo;</blockquote>
      <figcaption className="mt-3 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-semibold text-accent shrink-0">
          {q.name[0]}
        </div>
        <div className="text-xs">
          <span className="font-medium">{q.name}</span>
          <span className="text-ink/40"> — {q.role}</span>
        </div>
      </figcaption>
    </>
  )
}

function FloatingBubble({ q }: { q: (typeof QUOTES)[number] }) {
  const fromX = q.side === 'right' ? 40 : -40
  const tilt = q.side === 'right' ? 3 : -3

  return (
    <motion.figure
      initial={{ opacity: 0, x: fromX, y: 18, rotate: tilt * 2, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: tilt, scale: 1 }}
      viewport={{ once: false, margin: '-15% 0px -15% 0px' }}
      transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ left: q.x, top: q.y }}
      className="glass absolute w-64 md:w-72 lg:w-80 rounded-2xl p-5"
    >
      <BubbleContent q={q} />
    </motion.figure>
  )
}

function StackedBubble({ q, i }: { q: (typeof QUOTES)[number]; i: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
      className="glass relative w-full max-w-sm mx-auto rounded-2xl p-5"
    >
      <BubbleContent q={q} />
    </motion.figure>
  )
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55])

  if (isMobile) {
    return (
      <section className="[overflow-x:clip] px-5 py-16">
        <h2 className="text-center font-display text-3xl font-medium tracking-tight mb-10">
          They call.
          <br />
          They come back.
          <br />
          <span className="text-accent">Every time.</span>
        </h2>
        <div className="flex flex-col gap-5">
          {QUOTES.map((q, i) => (
            <StackedBubble key={q.name} q={q} i={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="[overflow-x:clip]">
      <div ref={trackRef} className="relative min-h-[220vh] pt-[50vh]">
        <motion.h2
          style={{ opacity: headlineOpacity }}
          className="sticky top-1/2 -translate-y-1/2 z-10 mx-auto max-w-[620px] text-center font-display text-4xl md:text-6xl font-medium tracking-tight pointer-events-none"
        >
          They call.
          <br />
          They come back.
          <br />
          <span className="text-accent">Every time.</span>
        </motion.h2>

        {QUOTES.map((q) => (
          <FloatingBubble key={q.name} q={q} />
        ))}
      </div>
    </section>
  )
}
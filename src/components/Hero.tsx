import { Suspense, lazy, useState, useEffect, Component, ReactNode } from 'react'
import { motion } from 'framer-motion'

const Scene3D = lazy(() => import('./Scene3D'))

const words = ['WE MAKE', 'BRANDS', 'MOVE.']

function scrollTo(id: string) {
  const el = document.querySelector(id) as HTMLElement | null
  if (!el) return
  window.scrollTo({
    top: el.offsetTop - 80,
    behavior: 'smooth',
  })
}

class ErrorBoundary extends Component<{ children: ReactNode }, { crashed: boolean }> {
  state = { crashed: false }
  static getDerivedStateFromError() { return { crashed: true } }
  render() {
    if (this.state.crashed) return null
    return this.props.children
  }
}

export default function Hero() {
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    // Only show on desktop, and delay so rest of page mounts first
    if (window.innerWidth >= 768) {
      const t = setTimeout(() => setShow3D(true), 300)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col justify-between pt-24 pb-8 overflow-hidden">

      {show3D && (
        <div className="absolute inset-0 pointer-events-none">
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex items-center gap-3"
        >
          <span className="mono text-[10px] uppercase text-ink/50">Creative Digital Agency</span>
          <span className="w-8 h-px bg-accent" />
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mono text-[10px] uppercase text-ink/40 hidden sm:block"
        >
          Delhi NCR — Working Globally
        </motion.span>
      </div>

      <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-16 mt-10">
        <h1 className="font-medium font-display leading-[0.9] tracking-tight text-[15vw] sm:text-7xl lg:text-[9rem] select-none">
          {words.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-16 mt-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="order-2 lg:order-1 flex flex-wrap gap-x-8 gap-y-2"
          >
            {['50+ BRANDS', '100+ PROJECTS', '5+ YEARS CREATING'].map((m) => (
              <span key={m} className="mono text-[10px] uppercase text-ink/40">{m}</span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="order-1 lg:order-2 max-w-sm text-right ml-auto text-left sm:text-right text-ink/65 text-base leading-relaxed"
          >
            Your brand. Our dhamaka. We build bold digital experiences, identities and campaigns that turn attention into impact.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 mt-10"
        >
          <button
            onClick={() => scrollTo('#contact')}
            className="rounded-full bg-ink text-bg px-7 py-3.5 text-xs tracking-[0.1em] font-semibold hover:scale-[1.03] transition-transform duration-300"
          >
            START A PROJECT
          </button>
          <button
            onClick={() => scrollTo('#work')}
            className="rounded-full glass px-7 py-3.5 text-xs tracking-[0.1em] font-medium hover:bg-ink/15 transition-colors duration-300"
          >
            VIEW OUR WORK
          </button>
        </motion.div>
      </div>
    </section>
  )
}
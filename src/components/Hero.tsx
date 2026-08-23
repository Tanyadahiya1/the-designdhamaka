import {
  Suspense,
  lazy,
  useState,
  useEffect,
  Component,
  ReactNode,
} from 'react'
import { motion } from 'framer-motion'

const Scene3D = lazy(() => import('./Scene3D'))

const words = ['WE MAKE', 'BRANDS', 'MOVE.']

function scrollTo(id: string) {
  const element = document.querySelector(id) as HTMLElement | null

  if (!element) return

  window.scrollTo({
    top: element.offsetTop - 80,
    behavior: 'smooth',
  })
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  { crashed: boolean }
> {
  state = {
    crashed: false,
  }

  static getDerivedStateFromError() {
    return {
      crashed: true,
    }
  }

  componentDidCatch(error: Error) {
    console.warn('3D scene failed to load:', error)
  }

  render() {
    if (this.state.crashed) {
      return null
    }

    return this.props.children
  }
}

export default function Hero() {
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShow3D(true)
    }, 300)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8 pt-24"
    >
      {/* 3D animation */}
      {show3D && (
        <div className="pointer-events-none absolute inset-0">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 animate-pulse rounded-full bg-gold/30" />
                </div>
              }
            >
              <Scene3D />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Top information */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex items-center gap-3"
        >
          <span className="mono text-[10px] uppercase text-ink/50">
            Creative Digital Agency
          </span>

          <span className="h-px w-8 bg-accent" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mono hidden text-[10px] uppercase text-ink/40 sm:block"
        >
          Delhi NCR — Working Globally
        </motion.span>
      </div>

      {/* Main heading */}
      <div className="relative z-10 mt-10 px-5 sm:px-8 md:px-12 lg:px-16">
        <h1 className="select-none font-display text-[15vw] font-medium leading-[0.9] tracking-tight sm:text-7xl lg:text-[9rem]">
          {words.map((word, index) => (
            <span
              key={word}
              className="block overflow-hidden"
            >
              <motion.span
                initial={{
                  opacity: 0,
                  y: 60,
                  filter: 'blur(10px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 mt-10 px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="order-2 flex flex-wrap gap-x-8 gap-y-2 lg:order-1"
          >
            {[
              '50+ BRANDS',
              '100+ PROJECTS',
              '5+ YEARS CREATING',
            ].map((stat) => (
              <span
                key={stat}
                className="mono text-[10px] uppercase text-ink/40"
              >
                {stat}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: 0.1,
            }}
            className="order-1 ml-auto max-w-sm text-left text-base leading-relaxed text-ink/65 lg:order-2 lg:text-right"
          >
            Your brand. Our dhamaka. We build bold digital experiences,
            identities and campaigns that turn attention into impact.
          </motion.p>
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: 'easeOut',
            delay: 0.2,
          }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollTo('#contact')}
            className="rounded-full bg-ink px-7 py-3.5 text-xs font-semibold tracking-[0.1em] text-bg transition-transform duration-300 hover:scale-[1.03]"
          >
            START A PROJECT
          </button>

          <button
            type="button"
            onClick={() => scrollTo('#work')}
            className="glass rounded-full px-7 py-3.5 text-xs font-medium tracking-[0.1em] transition-colors duration-300 hover:bg-ink/15"
          >
            VIEW OUR WORK
          </button>
        </motion.div>
      </div>
    </section>
  )
}
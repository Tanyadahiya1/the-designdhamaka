import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

const OFFERS = [
  {
    number: '01',
    label: 'Brand',
    bg: 'bg-[#F6E3C5]',
    items: [
      'Logo & Identity',
      'Color & Type System',
      'Brand Guidelines',
      'Packaging',
      'Social Templates',
      'Brand Voice',
    ],
  },
  {
    number: '02',
    label: 'Web',
    bg: 'bg-[#F3D9B8]',
    items: [
      'UX Wireframes',
      'Visual Design',
      'Responsive Build',
      'CMS Setup',
      'Motion & Animation',
      'Launch & QA',
    ],
  },
  {
    number: '03',
    label: 'Growth',
    bg: 'bg-[#F0CC9E]',
    items: [
      'Social Strategy',
      'Content Calendar',
      'SEO Audit',
      'Ad Campaigns',
      'Lead Funnels',
      'Monthly Reporting',
    ],
  },
]

type Offer = (typeof OFFERS)[number]

function useIsMobile(breakpoint = 1000) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [breakpoint])

  return isMobile
}

function OfferCard({
  offer,
  index,
  scrollYProgress,
}: {
  offer: Offer
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const startPoint = index * 0.08

  const progress = useTransform(
    scrollYProgress,
    [startPoint, 0.65],
    [0, 1],
    { clamp: true }
  )

  const y = useTransform(
    progress,
    [0, 0.4, 1],
    ['35%', '0%', '0%']
  )

  const x = useTransform(
    progress,
    [0, 1],
    [index === 0 ? '-30%' : index === 1 ? '0%' : '30%', '0%']
  )

  const scale = useTransform(
    progress,
    [0, 0.45, 1],
    [0.85, 1, 1]
  )

  const opacity = useTransform(
    progress,
    [0, 0.25, 1],
    [0, 1, 1]
  )

  const rotate = useTransform(
    progress,
    [0, 1],
    [index === 0 ? -4 : index === 2 ? 4 : 0, 0]
  )

  const rotateY = useTransform(
    scrollYProgress,
    [0.65 + index * 0.05, 0.85 + index * 0.05],
    [0, 180],
    { clamp: true }
  )

  return (
    <motion.div
      style={{
        y,
        x,
        scale,
        opacity,
        rotate,
        willChange: 'transform',
      }}
      className="relative aspect-[5/7] w-40 shrink-0 sm:w-48 md:w-56"
    >
      <div
        className="absolute inset-0"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative h-full w-full"
        >
          {/* Front side */}
          <div
            className={`absolute inset-0 flex flex-col justify-between rounded-2xl p-5 ${offer.bg}`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="mono flex justify-between text-xs uppercase text-ink/70">
              <span>{offer.label}</span>
              <span>{offer.number}</span>
            </div>

            <div className="mono flex justify-between text-xs uppercase text-ink/70">
              <span>{offer.label}</span>
              <span>{offer.number}</span>
            </div>
          </div>

          {/* Back side */}
          <div
            className="absolute inset-0 flex flex-col gap-2 rounded-2xl bg-white p-4"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="mono flex justify-between text-xs uppercase text-ink/50">
              <span>{offer.label}</span>
              <span>{offer.number}</span>
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
              {offer.items.map((item) => (
                <p
                  key={item}
                  className="flex flex-1 items-center justify-center rounded-md bg-bg2 px-1 text-center text-xs"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Offerings() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const headerY = useTransform(
    scrollYProgress,
    [0, 0.2],
    ['-30%', '0%']
  )

  if (isMobile) {
    return (
      <section className="px-5 py-16">
        <h2 className="mb-8 text-center font-display text-3xl font-medium tracking-tight">
          WHAT WE OFFER
        </h2>

        <div className="flex flex-col gap-4">
          {OFFERS.map((offer) => (
            <div
              key={offer.number}
              className="rounded-2xl bg-white p-4"
            >
              <div className="mono mb-2 text-xs uppercase text-ink/50">
                {offer.label} — {offer.number}
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {offer.items.map((item) => (
                  <p
                    key={item}
                    className="rounded-md bg-bg2 py-2 text-center text-xs"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="offerings"
      className="relative min-h-[400vh]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5">
        <div className="flex w-full flex-col items-center">
          <motion.h2
            style={{ y: headerY }}
            className="mb-12 text-center font-display text-4xl font-medium tracking-tight md:text-5xl"
          >
            WHAT WE OFFER
          </motion.h2>

          <div className="flex w-full max-w-full items-center justify-center gap-4 px-4 md:gap-6">
            {OFFERS.map((offer, index) => (
              <OfferCard
                key={offer.number}
                offer={offer}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

const STAGES = [
  {
    n: '01',
    title: 'DISCOVER',
    desc: 'We dig into your business, audience and competitors before touching a pixel.',
    color: '#F6E3C5',
    x: '24%',
    y: '17%',
  },
  {
    n: '02',
    title: 'STRATEGIZE',
    desc: 'A clear roadmap connecting brand goals to creative decisions.',
    color: '#F3D9B8',
    x: '55%',
    y: '34%',
  },
  {
    n: '03',
    title: 'DESIGN',
    desc: 'Concepts, identity and interface — refined until it feels inevitable.',
    color: '#F0CC9E',
    x: '12%',
    y: '51%',
  },
  {
    n: '04',
    title: 'BUILD',
    desc: 'Development that turns design into a fast, working product.',
    color: '#E8D5F5',
    x: '55%',
    y: '67%',
  },
  {
    n: '05',
    title: 'LAUNCH',
    desc: 'Ship it, measure it, and keep sharpening what works.',
    color: '#D8E8D9',
    x: '24%',
    y: '78%',
  },
]

function RoadmapCard({
  stage,
  index,
  progress,
}: {
  stage: (typeof STAGES)[number]
  index: number
  progress: MotionValue<number>
}) {
  const start = index * 0.18

  const opacity = useTransform(
    progress,
    [start, start + 0.1, start + 0.22],
    [0.35, 1, 1],
    { clamp: true }
  )

  const scale = useTransform(
    progress,
    [start, start + 0.1, start + 0.22],
    [0.92, 1, 1],
    { clamp: true }
  )

  const cardY = useTransform(
    progress,
    [start, start + 0.1],
    [20, 0],
    { clamp: true }
  )

  return (
    <motion.div
      style={{
        left: stage.x,
        top: stage.y,
        opacity,
        scale,
        y: cardY,
        backgroundColor: stage.color,
      }}
      className="absolute z-10 w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5 shadow-lg md:w-[280px]"
    >
      <div className="mono mb-4 flex items-center justify-between text-xs uppercase text-ink/50">
        <span>Step {stage.n}</span>
        <span>✦</span>
      </div>

      <h3 className="font-display text-3xl font-medium tracking-tight">
        {stage.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-ink/60">
        {stage.desc}
      </p>
    </motion.div>
  )
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const travelerX = useTransform(
    scrollYProgress,
    [0, 0.22, 0.44, 0.66, 0.88, 1],
    ['50%', '32%', '68%', '32%', '58%', '58%']
  )

  const travelerY = useTransform(
    scrollYProgress,
    [0, 0.22, 0.44, 0.66, 0.88, 1],
    ['8%', '28%', '45%', '64%', '78%', '78%']
  )

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative h-auto md:h-[300vh]"
    >
      <div className="relative flex min-h-screen items-center overflow-hidden px-5 py-10 sm:px-8 md:sticky md:top-0 md:h-screen md:px-12 lg:px-16">
        <div className="relative min-h-screen w-full overflow-hidden rounded-[28px] bg-[#FFF8EC] md:h-full">
          {/* Background decoration */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F2B705]/20 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#E8792B]/15 blur-3xl" />

          {/* Heading */}
          <div className="relative z-20 max-w-[280px] px-6 pt-8 sm:px-10 sm:pt-10 md:absolute md:left-14 md:top-14 md:px-0 md:pt-0">
            <div className="mono mb-4 flex items-center gap-3 text-[10px] uppercase text-ink/50">
              <span className="h-px w-8 bg-accent" />
              Our process
            </div>

            <h2 className="font-display text-4xl font-medium leading-[0.92] tracking-tight sm:text-5xl md:text-6xl">
              HOW WE
              <br />
              MAKE IT
              <br />
              HAPPEN
            </h2>

            <p className="mt-5 max-w-[230px] text-sm leading-relaxed text-ink/50">
              Scroll through our journey from the first idea to the final launch.
            </p>

            <div className="mono mt-5 text-xs uppercase text-accent">
              SCROLL TO EXPLORE
            </div>
          </div>

          {/* Mobile cards */}
          <div className="relative z-10 mt-10 flex flex-col gap-4 px-5 pb-8 md:hidden">
            {STAGES.map((stage) => (
              <div
                key={stage.n}
                style={{ backgroundColor: stage.color }}
                className="rounded-2xl p-5 shadow-md"
              >
                <div className="mono mb-3 flex items-center justify-between text-xs uppercase text-ink/50">
                  <span>Step {stage.n}</span>
                  <span>✦</span>
                </div>

                <h3 className="font-display text-3xl font-medium tracking-tight">
                  {stage.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop roadmap */}
          <div className="absolute inset-0 hidden md:block">
            <svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {/* Full dotted route */}
              <path
                d="M500 80 C350 180 300 230 320 280 C350 350 650 370 680 450 C710 530 350 570 320 650 C290 730 500 810 580 900"
                fill="none"
                stroke="#2B1810"
                strokeOpacity="0.14"
                strokeWidth="4"
                strokeDasharray="7 13"
              />

              {/* Animated orange route */}
              <motion.path
                d="M500 80 C350 180 300 230 320 280 C350 350 650 370 680 450 C710 530 350 570 320 650 C290 730 500 810 580 900"
                fill="none"
                stroke="#E8792B"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="1 18"
                style={{
                  pathLength: scrollYProgress,
                }}
              />

              {/* Roadmap dots */}
              {[
                [500, 80],
                [320, 280],
                [680, 450],
                [320, 650],
                [580, 900],
              ].map(([cx, cy], index) => (
                <g key={index}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r="15"
                    fill="#FFF8EC"
                    stroke="#E8792B"
                    strokeWidth="5"
                  />

                  <circle
                    cx={cx}
                    cy={cy}
                    r="5"
                    fill="#E8792B"
                  />
                </g>
              ))}
            </svg>

            {/* Moving yellow traveller */}
            <motion.div
              style={{
                left: travelerX,
                top: travelerY,
              }}
              className="absolute z-20 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2B705] shadow-[0_0_0_8px_rgba(242,183,5,0.2),0_0_30px_rgba(232,121,43,0.8)]"
            />

            {/* Desktop cards */}
            {STAGES.map((stage, index) => (
              <RoadmapCard
                key={stage.n}
                stage={stage}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
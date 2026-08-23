import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const SERVICES = [
  {
    n: '01',
    title: 'WEB DESIGN & DEVELOPMENT',
    desc: "Websites that don't just look good — they perform.",
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    n: '02',
    title: 'BRANDING & VISUAL IDENTITY',
    desc: 'Identity systems that hold together across every surface.',
    img: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    n: '03',
    title: 'SOCIAL MEDIA',
    desc: 'Content and campaigns built to stop the scroll.',
    img: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1200&auto=format&fit=crop',
  },
  {
    n: '04',
    title: 'DIGITAL MARKETING',
    desc: 'Performance-driven strategy, measured against real growth.',
    img: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1200&auto=format&fit=crop',
  },
  {
    n: '05',
    title: 'SEO & GROWTH',
    desc: 'Findable, fast, and built to compound over time.',
    img: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200&auto=format&fit=crop',
  },
]

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="services" className="py-28 md:py-36 px-5 sm:px-8 md:px-12 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium font-display tracking-tight">WHAT WE DO</h2>
        <p className="text-ink/50 max-w-xs">Ideas, strategy, design and technology — all under one roof.</p>
      </motion.div>

      <div className="border-t border-ink/10">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.05 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            data-cursor="VIEW"
            className="group relative border-b border-ink/10 py-8 md:py-10 flex items-center justify-between gap-6 cursor-pointer transition-all duration-500"
          >
            <div className="flex items-baseline gap-6 md:gap-12 flex-1">
              <span className="mono text-xs text-ink/30">{s.n}</span>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-medium font-display tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                {s.title}
              </h3>
            </div>

            <p className="hidden md:block text-ink/50 max-w-[220px] text-sm group-hover:text-ink/80 transition-colors duration-500">
              {s.desc}
            </p>

            <ArrowUpRight
              className="text-ink/40 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500"
              size={26}
            />

            {hovered === i && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="hidden lg:block absolute right-24 top-1/2 -translate-y-1/2 w-48 h-32 rounded-xl overflow-hidden pointer-events-none z-20 shadow-2xl"
              >
                <img src={s.img} alt="" className="w-full h-full object-cover" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

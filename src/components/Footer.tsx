import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Asterisk,
  ArrowUpRight,
  ArrowRight,
  Palette,
  Megaphone,
  Instagram,
  Code2,
  TrendingUp,
  Linkedin,
  Mail,
} from 'lucide-react'

const NAV_LINKS: [string, string][] = [
  ['SERVICES', '/services'],
  ['PORTFOLIO', '/portfolio'],
  ['ABOUT', '/about'],
  ['PRICING', '/pricing'],
  ['BLOG', '/blog'],
  ['CONTACT', '/contact'],
]

const ORBIT_ICONS = [
  { Icon: Palette, ring: 1, style: { top: '-21px', left: '50%', transform: 'translateX(-50%)' } },
  { Icon: Megaphone, ring: 2, style: { top: '50%', right: '-21px', transform: 'translateY(-50%)' } },
  { Icon: Instagram, ring: 2, style: { top: '50%', left: '-21px', transform: 'translateY(-50%)' } },
  { Icon: Code2, ring: 3, style: { top: '6px', right: '6px' } },
  { Icon: TrendingUp, ring: 3, style: { bottom: '6px', left: '6px' } },
]

function OrbitGraphic() {
  return (
    <div className="relative hidden lg:block shrink-0" style={{ width: 260, height: 260 }}>
      <div
        className="orbit-ring-1 absolute top-1/2 left-1/2 rounded-full border border-dashed border-ink/15"
        style={{ width: 100, height: 100 }}
      />
      <div
        className="orbit-ring-2 absolute top-1/2 left-1/2 rounded-full border border-dashed border-ink/15"
        style={{ width: 180, height: 180 }}
      />
      <div
        className="orbit-ring-3 absolute top-1/2 left-1/2 rounded-full border border-dashed border-ink/15"
        style={{ width: 260, height: 260 }}
      />

      {ORBIT_ICONS.map(({ Icon, ring, style }, i) => (
        <div
          key={i}
          className={`orbit-ring-${ring} absolute top-1/2 left-1/2`}
          style={{ width: ring === 1 ? 100 : ring === 2 ? 180 : 260, height: ring === 1 ? 100 : ring === 2 ? 180 : 260 }}
        >
          <div className={`orbit-icon-${ring} absolute`} style={style}>
            <div className="w-9 h-9 rounded-full bg-white shadow-md border border-ink/10 flex items-center justify-center">
              <Icon size={15} className="text-accent" />
            </div>
          </div>
        </div>
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-ink flex items-center justify-center shadow-lg">
        <Asterisk size={20} className="text-accent" />
      </div>
    </div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="px-5 sm:px-8 md:px-12 lg:px-16 pt-8 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="glass rounded-[2rem] p-8 md:p-12 lg:p-16 mb-16 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden"
      >
        <div className="max-w-lg text-center lg:text-left">
          <span className="mono text-[11px] uppercase tracking-[0.15em] text-accent">Ready to start?</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium font-display tracking-tight leading-[1.05] mt-3">
            LET&rsquo;S BUILD SOMETHING <span className="text-ink/30">DHAMAKA.</span>
          </h2>
          <p className="mt-4 text-ink/55 text-[15px] leading-relaxed">
            Tell us what you&rsquo;re building — we&rsquo;ll figure out how to make it impossible to ignore.
          </p>
          <Link
            to="/contact"
            data-cursor="GO"
            className="inline-flex items-center gap-2.5 mt-7 rounded-full bg-ink text-bg px-7 py-3.5 text-xs tracking-[0.1em] font-semibold hover:scale-[1.02] transition-transform duration-300"
          >
            START A PROJECT <ArrowUpRight size={14} />
          </Link>
        </div>

        <OrbitGraphic />
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-ink/10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-[10px] bg-ink flex items-center justify-center group">
              <Asterisk size={16} className="text-accent transition-transform duration-500 group-hover:rotate-90" />
            </div>
            <span className="text-sm tracking-tight font-medium">the.designdhamaka</span>
          </div>
          <p className="mt-4 text-ink/40 text-sm max-w-xs leading-relaxed">
            A creative digital agency helping ambitious businesses build brands worth remembering.
          </p>
        </div>

        <div className="lg:col-span-2">
          <span className="mono text-[10px] uppercase text-ink/30">Navigate</span>
          <div className="flex flex-col gap-2.5 mt-4">
            {NAV_LINKS.map(([label, href]) => (
              <Link key={label} to={href} className="text-sm text-ink/60 hover:text-ink transition-colors w-fit">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <span className="mono text-[10px] uppercase text-ink/30">Connect</span>
          <div className="flex flex-col gap-2.5 mt-4">
            <a
              href="https://www.instagram.com/the.designdhamaka/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1 text-sm text-ink/60 hover:text-ink transition-colors w-fit"
            >
              INSTAGRAM
              <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://www.linkedin.com/company/the-designdhamaka"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1 text-sm text-ink/60 hover:text-ink transition-colors w-fit"
            >
              LINKEDIN
              <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="mailto:the.designdhamaka@gmail.com"
              className="text-sm text-ink/60 hover:text-ink transition-colors w-fit"
            >
              the.designdhamaka@gmail.com
            </a>
          </div>
        </div>

        <div className="lg:col-span-4">
          <span className="mono text-[10px] uppercase text-ink/30">Stay in the loop</span>
          <p className="mt-4 text-sm text-ink/50 leading-relaxed max-w-sm">
            Occasional notes on design, growth and the projects we&rsquo;re building. No spam.
          </p>
          {subscribed ? (
            <p className="mt-4 text-sm text-accent">You&rsquo;re in — thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="relative mt-4 max-w-sm">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 text-sm pointer-events-none">@</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-full bg-white/50 border border-ink/15 py-3.5 pl-9 pr-14 text-sm outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                data-cursor="GO"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                aria-label="Subscribe"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 mono text-[10px] uppercase text-ink/30">
        <span>© 2026 The Design Dhamaka. All rights reserved. Made with intent.</span>
        <div className="flex items-center gap-5">
          <span>Delhi, India</span>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/the.designdhamaka/" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">
              <Instagram size={14} />
            </a>
            <a href="https://www.linkedin.com/company/the-designdhamaka" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">
              <Linkedin size={14} />
            </a>
            <a href="mailto:the.designdhamaka@gmail.com" className="hover:text-ink transition-colors">
              <Mail size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
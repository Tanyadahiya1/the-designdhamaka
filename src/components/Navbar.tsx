import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Asterisk, Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'SERVICES', href: '/services' },
  { label: 'PORTFOLIO', href: '/portfolio' },
  { label: 'ABOUT', href: '/about' },
  { label: 'PRICING', href: '/pricing' },
  { label: 'BLOG', href: '/blog' },
  { label: 'CONTACT', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'bg-white/55 backdrop-blur-xl backdrop-saturate-150 border-ink/10 shadow-[0_8px_32px_rgba(43,24,16,0.06)]'
          : 'bg-transparent border-ink/0'
      }`}
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 h-16 md:h-20 flex items-center justify-between">

        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 group" data-cursor="GO">
          <Asterisk size={16} className="text-accent transition-transform duration-500 group-hover:rotate-90" />
          <span className="text-sm tracking-tight font-medium">the.designdhamaka</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="text-[11px] tracking-[0.15em] text-ink/65 hover:text-ink transition-colors duration-300"
              data-cursor="GO"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* DESKTOP LETS TALK BUTTON */}
        <a href="/contact" data-cursor="GO" className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink/10 border border-ink/15 backdrop-blur-md px-5 py-2.5 text-[11px] tracking-[0.1em] font-medium hover:bg-ink hover:text-bg transition-colors duration-300">
          LET&rsquo;S TALK
        </a>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-bg border-t border-ink/10 px-5 pb-6 pt-2"
        >
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => setOpen(false)}
                className="text-left py-3 text-sm tracking-[0.1em] text-ink/70 hover:text-ink border-b border-ink/5"
              >
                {l.label}
              </Link>
            ))}

            {/* MOBILE LETS TALK BUTTON */}
            <a href="/contact" onClick={() => setOpen(false)} className="mt-4 w-full rounded-full bg-ink text-bg text-center py-3 text-sm font-medium tracking-[0.05em]">
              LET&rsquo;S TALK
            </a>

          </div>
        </motion.div>
      )}
    </header>
  )
}
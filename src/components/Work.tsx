// src/components/Work.tsx
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fallbackProjects } from '../data/projects'
import { supabase } from '../lib/supabase'
import { Project } from '../types'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setProjects(data)
      })
  }, [])

  const displayProjects = projects.slice(0, 5)

  useEffect(() => {
    if (!rootRef.current) return
    if (displayProjects.length === 0) return

    // Delay so Three.js / rest of page finishes mounting first
    const timer = setTimeout(() => {
      if (!rootRef.current) return

      triggersRef.current.forEach(t => t.kill())
      triggersRef.current = []

      const root        = rootRef.current
      const footer      = root.querySelector('.work-footer') as HTMLElement | null
      const pinnedSects = Array.from(root.querySelectorAll('.work-pinned'))
      const heroH1      = root.querySelector('.work-hero h1') as HTMLElement | null

      if (!footer || pinnedSects.length === 0) return

      pinnedSects.forEach((section, index, sections) => {
        const el     = section as HTMLElement
        const img    = el.querySelector('.work-img') as HTMLElement | null
        const nextEl = sections[index + 1] as HTMLElement | undefined
        const delta  = nextEl ? nextEl.offsetTop - el.offsetTop : window.innerHeight

        const pinTrigger = ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: footer.offsetTop - window.innerHeight,
          pin: true,
          pinSpacing: false,
          scrub: 1,
        })
        triggersRef.current.push(pinTrigger)

        if (img) {
          const tween = gsap.fromTo(
            img,
            { scale: 1 },
            {
              scale: 0.5,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: `top+=${delta} top`,
                scrub: 1,
              },
            }
          )
          if (tween.scrollTrigger) triggersRef.current.push(tween.scrollTrigger)
        }
      })

      if (heroH1) {
        const heroTrigger = ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: '+=400vh',
          scrub: 1,
          onUpdate: (self: ScrollTrigger) => {
            gsap.set(heroH1, { opacity: 1 - self.progress })
          },
        })
        triggersRef.current.push(heroTrigger)
      }
    }, 500) // wait 500ms for page to fully settle

    return () => {
      clearTimeout(timer)
      triggersRef.current.forEach(t => t.kill())
      triggersRef.current = []
    }
  }, [displayProjects.length])

  return (
    <div ref={rootRef} style={{ background: '#000', width: '100%' }}>

      <section className="work-pinned work-hero" style={sectionStyle}>
        <h1 style={heroH1Style}>Selected<br />Work</h1>
      </section>

      {displayProjects.map((project) => (
        <section key={project.id} className="work-pinned" style={sectionStyle}>
          <div className="work-img" style={imgWrapStyle}>
            <img
              src={project.cover_image}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={labelStyle}>
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{project.title}</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '2px' }}>
              {project.category}
            </span>
          </div>
        </section>
      ))}

            <section className="work-footer" style={footerStyle}>
        <a href="/portfolio" style={{ textDecoration: 'none' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 600, color: '#fff', letterSpacing: '-1px', cursor: 'pointer' }}>
            All Work ↗
          </h2>
        </a>
      </section>

    </div>
  )
}

const sectionStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
}

const imgWrapStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate3d(-50%, -50%, 0)',
  width: 'min(1000px, 90vw)',
  height: 'min(700px, 60vw)',
  overflow: 'hidden',
  borderRadius: '6px',
}

const heroH1Style: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  fontFamily: 'Georgia, serif' ,
  fontWeight: 700,
  fontSize: 'clamp(64px, 12vw, 160px)',
  color: '#fff',
  lineHeight: '90%',
  letterSpacing: '-4px',
}

const labelStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '2rem',
  left: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  color: '#fff',
  fontFamily: '"Inter", sans-serif',
  zIndex: 2,
}

const footerStyle: React.CSSProperties = {
  width: '100%',
  height: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#000',
}
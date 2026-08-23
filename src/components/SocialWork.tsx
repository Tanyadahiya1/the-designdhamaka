import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fallbackProjects } from '../data/projects'
import { supabase } from '../lib/supabase'
import { Project } from '../types'

export default function SocialWork() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('projects')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setProjects(data)
      })
  }, [])

  const allMedia = projects.flatMap((project) =>
    project.gallery && project.gallery.length > 0
      ? project.gallery.filter((g) => g.type === 'image').map((g) => ({ url: g.url, project }))
      : [{ url: project.cover_image, project }]
  )

  return (
    <section style={{ background: '#0a0a0a', padding: '6rem 0' }}>
      <div style={{ padding: '0 2rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#E8792B', marginBottom: '0.75rem' }}
        >
          Social Media Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: '"Fredoka", sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-1px' }}
        >
          Content That Stops the Scroll
        </motion.h2>
      </div>

      <div style={{ columns: '3 280px', columnGap: '0.75rem', padding: '0 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {allMedia.map((item, i) => (
          <GridCard key={i} url={item.url} project={item.project} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginTop: '3rem' }}
      >
        <a
          href="/portfolio"
          style={{ display: 'inline-block', padding: '0.85rem 2rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: '"Inter", sans-serif', fontSize: '0.78rem', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}
        >
          View All Work
        </a>
      </motion.div>
    </section>
  )
}

function GridCard({ url, project, index }: { url: string; project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', breakInside: 'avoid', marginBottom: '0.75rem', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}
    >
      <img
        src={url}
        alt={project.title}
        style={{ width: '100%', display: 'block', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }}
      />

      <div
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem' }}
      >
        <div style={{ transform: hovered ? 'translateY(0)' : 'translateY(12px)', transition: 'transform 0.3s ease' }}>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#E8792B', marginBottom: '0.25rem' }}>
            {project.category}
          </p>
          <p style={{ fontFamily: '"Fredoka", sans-serif', fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>
            {project.title}
          </p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.7rem', color: '#fff', fontFamily: '"Inter", sans-serif', letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '1px' }}
            >
              View Project
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
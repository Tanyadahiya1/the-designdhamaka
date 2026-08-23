import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { fallbackProjects } from '@/data/projects'
import { supabase } from '@/lib/supabase'
import { Project } from '@/types'

export default function PortfolioPage() {
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

  return (
    <>
      <Navbar />
      <main style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '7rem', paddingBottom: '4rem' }}>

        {/* Page heading */}
        <div style={{ padding: '0 2rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: '"Fredoka", sans-serif',
              fontSize: 'clamp(48px, 8vw, 100px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: '90%',
              letterSpacing: '-3px',
              marginBottom: '1rem',
            }}
          >
            All Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: '"Inter", sans-serif', fontSize: '0.95rem' }}
          >
            {projects.length} projects
          </motion.p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
          padding: '0 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </main>
      <Footer />
    </>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const hasLink = Boolean(project.link)

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#141414',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: hasLink ? 'pointer' : 'default',
        border: hovered ? '1px solid rgba(232,121,43,0.5)' : '1px solid rgba(255,255,255,0.06)',
        transition: 'border 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Image */}
      <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
        <img
          src={project.cover_image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{
            fontFamily: '"Fredoka", sans-serif',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: '#fff',
            margin: 0,
          }}>
            {project.title}
          </h3>
          <span style={{
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: '"Inter", sans-serif',
            marginTop: '3px',
          }}>
            {project.year}
          </span>
        </div>

        <p style={{
          fontSize: '0.75rem',
          color: '#E8792B',
          fontFamily: '"Inter", sans-serif',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          margin: '0 0 0.75rem',
        }}>
          {project.category}
        </p>

        {project.description && (
          <p style={{
            fontSize: '0.88rem',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: '"Inter", sans-serif',
            lineHeight: '1.6',
            margin: '0 0 1rem',
          }}>
            {project.description}
          </p>
        )}

        {hasLink && (
          <span style={{
            fontSize: '0.78rem',
            color: hovered ? '#E8792B' : 'rgba(255,255,255,0.3)',
            fontFamily: '"Inter", sans-serif',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}>
            View Project ↗
          </span>
        )}
      </div>
    </motion.div>
  )

  if (hasLink) {
    return (
      <a href={project.link!} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        {card}
      </a>
    )
  }

  return card
}
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { fallbackProjects } from '@/data/projects'
import { Project } from '@/types'
import Navbar from '@/components/Navbar'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null | undefined>(undefined)

  useEffect(() => {
    async function load() {
      if (supabase) {
        const { data } = await supabase.from('projects').select('*').eq('id', id).single()
        if (data) {
          setProject(data as Project)
          return
        }
      }
      setProject(fallbackProjects.find((p) => p.id === id) || null)
    }
    load()
  }, [id])

  if (project === undefined) {
    return (
      <>
        <Navbar />
        <div className="pt-32 text-center text-ink/40 text-sm">Loading...</div>
      </>
    )
  }

  if (project === null) {
    return (
      <>
        <Navbar />
        <div className="pt-32 text-center">
          <p className="text-ink/50">Project not found.</p>
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-accent text-sm mt-2">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
        </div>
      </>
    )
  }

  const media = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [{ url: project.cover_image, type: 'image' as const }]

  return (
    <>
      <Navbar />
      <main className="pt-28">
        <section className="px-5 sm:px-8 md:px-12 lg:px-16 pb-10">
          <Link to="/portfolio" className="inline-flex items-center gap-2 mono text-[11px] uppercase text-ink/50 hover:text-accent transition-colors">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-6">
            <div>
              <span className="mono text-[11px] uppercase tracking-[0.15em] text-accent">{project.category}</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium font-display tracking-tight mt-2">
                {project.title}
              </h1>
            </div>
            <span className="mono text-sm text-ink/40">{project.year}</span>
          </div>

          {project.description && (
            <p className="mt-6 text-ink/60 text-lg max-w-2xl leading-relaxed">{project.description}</p>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 mono text-xs uppercase tracking-[0.1em] text-accent hover:underline"
            >
              Visit live project
              <ArrowUpRight size={14} />
            </a>
          )}
        </section>

        <section className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24">
          <div className="grid sm:grid-cols-2 gap-5">
            {media.map((item, i) => (
              <motion.div
                key={item.url}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.05 }}
                className={`rounded-2xl overflow-hidden ${i === 0 ? 'sm:col-span-2' : ''}`}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.url}
                    controls
                    playsInline
                    className="w-full h-full object-cover bg-ink/5"
                  />
                ) : (
                  <img src={item.url} alt={project.title} className="w-full h-full object-cover" />
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
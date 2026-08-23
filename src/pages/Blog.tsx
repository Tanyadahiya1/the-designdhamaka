import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

// Replace these with your real posts whenever you have them.
// Swap this array for a Supabase fetch later the same way projects.ts works.
const POSTS = [
  {
    title: 'How We Deliver Full Websites in 7 Days (Without Cutting Corners)',
    category: 'Process',
    date: 'Aug 2026',
    excerpt: 'A behind-the-scenes look at the workflow that lets us ship premium, custom-built sites on a tight, honest timeline.',
  },
  {
    title: '5 Branding Mistakes Small Businesses Make (And How to Avoid Them)',
    category: 'Branding',
    date: 'Jul 2026',
    excerpt: 'From inconsistent logos to no brand guidelines — the small fixes that make a brand feel instantly more trustworthy.',
  },
  {
    title: 'Why Your Instagram Growth Is Stalling at 340% Less Than It Could Be',
    category: 'Social Media',
    date: 'Jul 2026',
    excerpt: 'What actually moves the needle on Reels, posts and stories — and what most small brands get wrong.',
  },
  {
    title: 'SEO Basics Every New Website Needs Before Launch',
    category: 'SEO',
    date: 'Jun 2026',
    excerpt: 'The technical and content checklist we run through on every project before it goes live.',
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="px-5 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-24 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mono text-[11px] uppercase tracking-[0.2em] text-accent"
          >
            Blog
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-medium font-display tracking-tight leading-[0.95] mt-3"
          >
            NOTES ON DESIGN
            <br />
            <span className="text-ink/30">& GROWTH.</span>
          </motion.h1>
          <p className="mt-6 text-ink/60 text-lg max-w-xl leading-relaxed">
            Thoughts on branding, websites and marketing from the team behind the work.
          </p>
        </section>

        <section className="px-5 sm:px-8 md:px-12 lg:px-16 pb-28">
          <div className="grid md:grid-cols-2 gap-6">
            {POSTS.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.06 }}
                className="glass rounded-2xl p-7 md:p-8 flex flex-col justify-between group cursor-pointer"
                data-cursor="READ"
              >
                <div>
                  <div className="flex items-center gap-3 mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
                    <span className="text-accent">{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="text-2xl font-medium font-display tracking-tight mt-4 leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-ink/55 text-sm leading-relaxed">{post.excerpt}</p>
                </div>

                <div className="mt-6 inline-flex items-center gap-1.5 mono text-[11px] tracking-[0.1em] text-ink/70 group-hover:text-accent transition-colors w-fit">
                  READ MORE
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
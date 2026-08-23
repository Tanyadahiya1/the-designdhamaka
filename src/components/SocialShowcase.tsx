import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { SocialPost } from '@/types'

const FALLBACK_POSTS: SocialPost[] = [
  {
    id: '1', created_at: '', sort_order: 0, published: true,
    business_name: 'Spice Route Cafe',
    before_image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
    after_image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop',
    caption: 'From a blurry phone menu to a feed that actually sells the food.',
  },
  {
    id: '2', created_at: '', sort_order: 1, published: true,
    business_name: 'Brew Cafe',
    before_image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    after_image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
    caption: 'A consistent grid instead of whatever photo was on hand that day.',
  },
  {
    id: '3', created_at: '', sort_order: 2, published: true,
    business_name: 'Revanta Regency',
    before_image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    after_image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
    caption: 'Rooms that finally look as good online as they do in person.',
  },
]

const ROTATIONS = [-8, 6, -4, 5, -5, 3]

function useIsMobile(bp = 900) {
  const [m, setM] = useState(false)
  useEffect(() => {
    const check = () => setM(window.innerWidth < bp)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [bp])
  return m
}

function CardFace({ post }: { post: SocialPost }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col bg-ink w-56 sm:w-64">
      <div className="relative flex-1 grid grid-cols-2 min-h-[220px]">
        <div className="relative overflow-hidden">
          <img src={post.before_image} alt="Before" className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute top-2 left-2 mono text-[9px] uppercase bg-black/55 text-white px-2 py-1 rounded-full">
            Before
          </span>
        </div>
        <div className="relative overflow-hidden">
          <img src={post.after_image} alt="After" className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute top-2 left-2 mono text-[9px] uppercase bg-accent text-ink px-2 py-1 rounded-full">
            After
          </span>
        </div>
      </div>
      <div className="p-3 bg-white">
        <p className="text-xs text-ink/70 leading-snug">{post.caption}</p>
        <p className="mono text-[10px] uppercase text-ink/40 mt-1">{post.business_name}</p>
      </div>
    </div>
  )
}

function DeckCard({
  post, index, total, scrollYProgress,
}: {
  post: SocialPost
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const y = useTransform(scrollYProgress, (raw) => {
    const slice = 1 / total
    const cardStart = index * slice
    let cardProgress = (raw - cardStart) / slice
    cardProgress = Math.min(Math.max(cardProgress, 0), 1)

    let yPos = (1 - cardProgress) * 70 // vh, entry from below

    if (cardProgress === 1 && index < total - 1) {
      const remaining = (raw - (cardStart + slice)) / (1 - (cardStart + slice))
      if (remaining > 0) {
        const mult = 1 - index * 0.12
        yPos = -28 * mult * remaining
      }
    }
    return `${yPos}vh`
  })

  const x = useTransform(scrollYProgress, (raw) => {
    const slice = 1 / total
    const cardStart = index * slice
    const cardProgress = Math.min(Math.max((raw - cardStart) / slice, 0), 1)
    if (cardProgress === 1 && index < total - 1) {
      const remaining = (raw - (cardStart + slice)) / (1 - (cardStart + slice))
      if (remaining > 0) {
        const mult = 1 - index * 0.12
        return `${-28 * mult * remaining}vw`
      }
    }
    return '0vw'
  })

  return (
    <motion.div
      style={{ y, x, rotate: `${ROTATIONS[index % ROTATIONS.length]}deg`, willChange: 'transform' }}
      className="absolute inset-0 m-auto h-[340px] sm:h-[380px] w-fit"
    >
      <CardFace post={post} />
    </motion.div>
  )
}

export default function SocialShowcase() {
  const isMobile = useIsMobile()
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const [posts, setPosts] = useState<SocialPost[]>(FALLBACK_POSTS)

  useEffect(() => {
    async function load() {
      if (!supabase) return
      const { data, error } = await supabase
        .from('social_posts')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
      if (!error && data && data.length > 0) setPosts(data as SocialPost[])
    }
    load()
  }, [])

  if (isMobile) {
    return (
      <section className="px-5 py-16">
        <h2 className="text-center font-display text-3xl font-medium tracking-tight mb-8">
          SOCIAL MEDIA WINS
        </h2>
        <div className="flex flex-col gap-6 items-center">
          {posts.map((post) => (
            <CardFace key={post.id} post={post} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[500vh]">
      <div ref={trackRef} className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <h2 className="absolute top-16 left-1/2 -translate-x-1/2 font-display text-4xl md:text-5xl font-medium tracking-tight text-center z-10">
          SOCIAL MEDIA WINS
        </h2>
        <div className="relative w-full h-full">
          {posts.map((post, i) => (
            <DeckCard key={post.id} post={post} index={i} total={posts.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
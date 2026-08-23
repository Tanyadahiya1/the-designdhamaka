import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { SocialPost } from '@/types'

const FALLBACK_POSTS: SocialPost[] = [
  {
    id: '1',
    created_at: '',
    sort_order: 0,
    published: true,
    business_name: 'Spice Route Cafe',
    before_image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
    after_image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop',
    caption:
      'From a blurry phone menu to a feed that actually sells the food.',
  },
  {
    id: '2',
    created_at: '',
    sort_order: 1,
    published: true,
    business_name: 'Brew Cafe',
    before_image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    after_image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
    caption:
      'A consistent grid instead of whatever photo was on hand that day.',
  },
  {
    id: '3',
    created_at: '',
    sort_order: 2,
    published: true,
    business_name: 'Revanta Regency',
    before_image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    after_image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
    caption:
      'Rooms that finally look as good online as they do in person.',
  },
]

const ROTATIONS = [-8, 6, -4, 5, -5, 3]

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [breakpoint])

  return isMobile
}

function CardFace({ post }: { post: SocialPost }) {
  return (
    <div className="flex h-full w-56 flex-col overflow-hidden rounded-2xl bg-ink shadow-2xl sm:w-64">
      <div className="relative grid min-h-[220px] flex-1 grid-cols-2">
        <div className="relative overflow-hidden">
          <img
            src={post.before_image}
            alt={`${post.business_name} before`}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          <span className="mono absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[9px] uppercase text-white">
            Before
          </span>
        </div>

        <div className="relative overflow-hidden">
          <img
            src={post.after_image}
            alt={`${post.business_name} after`}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          <span className="mono absolute left-2 top-2 rounded-full bg-accent px-2 py-1 text-[9px] uppercase text-ink">
            After
          </span>
        </div>
      </div>

      <div className="bg-white p-3">
        <p className="text-xs leading-snug text-ink/70">
          {post.caption}
        </p>

        <p className="mono mt-1 text-[10px] uppercase text-ink/40">
          {post.business_name}
        </p>
      </div>
    </div>
  )
}

function DeckCard({
  post,
  index,
  total,
  progress,
}: {
  post: SocialPost
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const y = useTransform(progress, (rawProgress) => {
    const safeTotal = Math.max(total, 1)
    const progressPerCard = 1 / safeTotal
    const cardStart = index * progressPerCard

    let cardProgress =
      (rawProgress - cardStart) / progressPerCard

    cardProgress = Math.min(Math.max(cardProgress, 0), 1)

    let yPosition = (1 - cardProgress) * 75

    const hasLanded = cardProgress >= 0.999
    const isNotLastCard = index < safeTotal - 1

    if (hasLanded && isNotLastCard) {
      const remainingProgress =
        (rawProgress - (cardStart + progressPerCard)) /
        (1 - (cardStart + progressPerCard))

      if (remainingProgress > 0) {
        const distance = 1 - index * 0.12
        yPosition = -28 * distance * remainingProgress
      }
    }

    return `${yPosition}vh`
  })

  const x = useTransform(progress, (rawProgress) => {
    const safeTotal = Math.max(total, 1)
    const progressPerCard = 1 / safeTotal
    const cardStart = index * progressPerCard

    let cardProgress =
      (rawProgress - cardStart) / progressPerCard

    cardProgress = Math.min(Math.max(cardProgress, 0), 1)

    const hasLanded = cardProgress >= 0.999
    const isNotLastCard = index < safeTotal - 1

    if (hasLanded && isNotLastCard) {
      const remainingProgress =
        (rawProgress - (cardStart + progressPerCard)) /
        (1 - (cardStart + progressPerCard))

      if (remainingProgress > 0) {
        const distance = 1 - index * 0.12
        return `${-28 * distance * remainingProgress}vw`
      }
    }

    return '0vw'
  })

  return (
    <motion.div
      style={{
        y,
        x,
        rotate: ROTATIONS[index % ROTATIONS.length],
        willChange: 'transform',
      }}
      className="absolute inset-0 m-auto h-[340px] w-fit sm:h-[380px]"
    >
      <CardFace post={post} />
    </motion.div>
  )
}

export default function SocialShowcase() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const [posts, setPosts] = useState<SocialPost[]>(FALLBACK_POSTS)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    let cancelled = false

    async function loadPosts() {
      if (!supabase) return

      const { data, error } = await supabase
        .from('social_posts')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })

      if (!cancelled && !error && data && data.length > 0) {
        setPosts(data as SocialPost[])
      }
    }

    loadPosts()

    return () => {
      cancelled = true
    }
  }, [])

  if (isMobile) {
    return (
      <section
        id="social-media"
        className="bg-bg px-5 py-20"
      >
        <div className="mb-10">
          <p className="mono mb-3 text-[10px] uppercase tracking-[0.18em] text-accent">
            Selected results
          </p>

          <h2 className="font-display text-4xl font-medium tracking-tight">
            SOCIAL MEDIA
            <br />
            WINS
          </h2>
        </div>

        <div className="flex flex-col items-center gap-6">
          {posts.map((post) => (
            <CardFace key={post.id} post={post} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="social-media"
      className="relative min-h-[500vh] bg-bg"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute left-5 top-10 z-10 sm:left-8 md:left-12 lg:left-16">
          <p className="mono mb-3 text-[10px] uppercase tracking-[0.18em] text-accent">
            Selected results
          </p>

          <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
            SOCIAL MEDIA
            <br />
            WINS
          </h2>
        </div>

        <div className="relative h-full w-full">
          {posts.map((post, index) => (
            <DeckCard
              key={post.id}
              post={post}
              index={index}
              total={posts.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
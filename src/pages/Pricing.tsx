import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Navbar from '@/components/Navbar'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

const PLANS = [
  {
    name: 'STARTER',
    price: '₹25,000',
    tagline: 'For new brands that need a clean, credible presence — fast.',
    features: [
      'Up to 5-page responsive website',
      'Custom design, no templates',
      'Hosting setup included',
      'Basic SEO setup',
      '1 month of support',
      '5–7 day delivery',
    ],
    highlighted: false,
  },
  {
    name: 'GROWTH',
    price: '₹45,000',
    tagline: 'Our most popular package — for brands ready to scale online.',
    features: [
      'Everything in Starter',
      'Up to 10-page website',
      'Brand identity & logo design',
      'Social media setup (4 platforms)',
      'Monthly content calendar (1 month)',
      '3 months of support',
    ],
    highlighted: true,
  },
  {
    name: 'DHAMAKA',
    price: 'Custom',
    tagline: 'Full-funnel growth — website, brand, content & ads working together.',
    features: [
      'Everything in Growth',
      'Ongoing social media management',
      'Meta & Google Ads setup',
      'Landing pages & lead funnels',
      'Priority turnaround',
      'Dedicated account support',
    ],
    highlighted: false,
  },
]

const FAQS = [
  {
    q: 'How long does a website take?',
    a: 'We deliver most websites in 5–7 business days. For large or complex projects, we keep it to a maximum of 1 week.',
  },
  {
    q: 'What is included in the ₹25,000 package?',
    a: 'A complete, fully responsive website with up to 5 pages, hosting setup, SEO basics, and 1 month of support.',
  },
  {
    q: 'Do you work with businesses outside Delhi?',
    a: 'Absolutely! We work with clients across India and globally. All communication is online.',
  },
  {
    q: 'Can I see the work before paying?',
    a: 'We start with a 30–50% advance. You review drafts throughout, and balance is due on final delivery.',
  },
  {
    q: 'Do you offer ongoing social media management?',
    a: 'Yes! We offer monthly packages starting at ₹8,000/month for content creation, posting, and engagement.',
  },
]

export default function PricingPage() {
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
            Pricing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-medium font-display tracking-tight leading-[0.95] mt-3"
          >
            PREMIUM QUALITY,
            <br />
            <span className="text-ink/30">STARTUP PRICING.</span>
          </motion.h1>
          <p className="mt-6 text-ink/60 text-lg max-w-xl leading-relaxed">
            Websites, branding & social media that convert — starting at ₹25,000, delivered in a maximum of 7 days.
          </p>
        </section>

        <section className="px-5 sm:px-8 md:px-12 lg:px-16 pb-24">
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? 'bg-ink text-bg shadow-[0_20px_60px_rgba(43,24,16,0.18)] md:-translate-y-3'
                    : 'glass'
                }`}
              >
                {plan.highlighted && (
                  <span className="mono text-[10px] uppercase tracking-[0.15em] text-accent mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-medium font-display tracking-tight">{plan.name}</h3>
                <p className={`mt-3 text-3xl font-medium font-display ${plan.highlighted ? 'text-bg' : ''}`}>
                  {plan.price}
                </p>
                <p className={`mt-3 text-sm leading-relaxed ${plan.highlighted ? 'text-bg/60' : 'text-ink/50'}`}>
                  {plan.tagline}
                </p>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-accent' : 'text-accent'}`} />
                      <span className={plan.highlighted ? 'text-bg/85' : 'text-ink/70'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  data-cursor="GO"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-xs tracking-[0.1em] font-semibold transition-transform duration-300 hover:scale-[1.02] ${
                    plan.highlighted ? 'bg-accent text-bg' : 'bg-ink text-bg'
                  }`}
                >
                  START A PROJECT →
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-5 sm:px-8 md:px-12 lg:px-16 pb-28">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mono text-[11px] uppercase tracking-[0.2em] text-accent"
          >
            FAQ
          </motion.p>
          <h2 className="text-4xl sm:text-5xl font-medium font-display tracking-tight mt-3 mb-10">
            COMMON QUESTIONS
          </h2>

          <div className="max-w-3xl divide-y divide-ink/10 border-t border-ink/10">
            {FAQS.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.05 }}
                className="py-6"
              >
                <h3 className="text-lg font-medium">{item.q}</h3>
                <p className="mt-2 text-ink/55 text-sm leading-relaxed max-w-xl">{item.a}</p>
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
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function CTA() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', budget: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    setErrorMsg('')

    try {
      if (supabase) {
        const { error } = await supabase.from('inquiries').insert({
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          budget: form.budget || null,
          message: form.message,
        })
        if (error) throw error
      } else {
        // No database configured yet — keep the UX working locally.
        await new Promise((r) => setTimeout(r, 600))
      }
      setStatus('success')
      setForm({ name: '', email: '', phone: '', budget: '', message: '' })
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="relative py-28 md:py-40 px-5 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vmax] h-[50vmax] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(232,121,43,0.14) 0%, rgba(251,243,228,0) 65%)' }}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium font-display tracking-tight leading-[0.95]">
            GOT AN IDEA?
            <br />
            <span className="text-ink/30">LET&rsquo;S MAKE</span>
            <br />
            <span className="text-ink/30">SOME NOISE.</span>
          </h2>
          <p className="mt-8 text-ink/60 text-lg max-w-md leading-relaxed">
            Tell us what you&rsquo;re building. We&rsquo;ll figure out how to make it impossible to ignore.
          </p>
          <a
            href="mailto:the.designdhamaka@gmail.com"
            data-cursor="GO"
            className="inline-flex items-center gap-2 mt-8 mono text-xs uppercase tracking-[0.1em] text-ink/60 hover:text-accent transition-colors"
          >
            EMAIL US → the.designdhamaka@gmail.com
          </a>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="glass rounded-2xl p-6 md:p-8 space-y-4"
        >
          {!isSupabaseConfigured && (
            <p className="mono text-[10px] uppercase text-ink/30 -mt-1 mb-1">
              Demo mode — connect Supabase to save enquiries.
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">Budget</label>
              <input
                value={form.budget}
                onChange={(e) => update('budget', e.target.value)}
                className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <label className="mono text-[10px] uppercase text-ink/40">Message *</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm resize-none"
              placeholder="Tell us about your project"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            data-cursor="GO"
            className="w-full rounded-full bg-ink text-bg py-3.5 text-xs tracking-[0.1em] font-semibold hover:scale-[1.01] transition-transform duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {status === 'loading' && <Loader2 size={14} className="animate-spin" />}
            {status === 'success' ? (
              <>
                <Check size={14} /> SENT — WE&rsquo;LL BE IN TOUCH
              </>
            ) : (
              'START A PROJECT →'
            )}
          </button>

          {status === 'error' && <p className="text-red-400 text-xs">{errorMsg}</p>}
        </motion.form>
      </div>
    </section>
  )
}

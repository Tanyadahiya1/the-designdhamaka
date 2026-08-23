import { useState } from 'react'
import { Asterisk, Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <Asterisk className="text-accent mx-auto mb-6" size={28} />
          <h1 className="text-2xl font-medium tracking-tight mb-3">Admin isn&rsquo;t connected yet</h1>
          <p className="text-ink/50 text-sm leading-relaxed">
            Add <code className="text-accent">VITE_SUPABASE_URL</code> and{' '}
            <code className="text-accent">VITE_SUPABASE_ANON_KEY</code> to your environment, run the SQL
            in <code className="text-accent">supabase/schema.sql</code>, then create an admin user under
            Supabase → Authentication → Users. See the README for the full 5-minute setup.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm glass rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Asterisk size={16} className="text-accent" />
          <span className="text-sm tracking-tight font-medium">the.designdhamaka / admin</span>
        </div>

        <label className="mono text-[10px] uppercase text-ink/40">Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 mb-4 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
        />

        <label className="mono text-[10px] uppercase text-ink/40">Password</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 mb-6 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ink text-bg py-3 text-xs tracking-[0.1em] font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          LOG IN
        </button>

        {error && <p className="text-red-400 text-xs mt-4">{error}</p>}
      </form>
    </div>
  )
}

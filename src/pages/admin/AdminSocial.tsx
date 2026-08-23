import { useEffect, useState } from 'react'
import { Loader2, Plus, Trash2, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { SocialPost } from '@/types'

const emptyForm = {
  business_name: '',
  before_image: '',
  after_image: '',
  caption: '',
  published: true,
}

export default function AdminSocial() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function load() {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase.from('social_posts').select('*').order('sort_order', { ascending: true })
    setPosts((data as SocialPost[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setSaving(true)
    const { data, error } = await supabase
      .from('social_posts')
      .insert({ ...form, sort_order: posts.length })
      .select()
      .single()
    setSaving(false)
    if (!error && data) {
      setPosts((prev) => [...prev, data as SocialPost])
      setForm(emptyForm)
      setShowForm(false)
    }
  }

  async function togglePublished(p: SocialPost) {
    if (!supabase) return
    await supabase.from('social_posts').update({ published: !p.published }).eq('id', p.id)
    setPosts((prev) => prev.map((x) => (x.id === p.id ? { ...x, published: !x.published } : x)))
  }

  async function remove(id: string) {
    if (!supabase) return
    if (!confirm('Delete this post?')) return
    await supabase.from('social_posts').delete().eq('id', id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-ink/40 text-sm py-12">
        <Loader2 size={16} className="animate-spin" /> Loading posts…
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => setShowForm((v) => !v)}
        className="mb-6 inline-flex items-center gap-2 rounded-full bg-ink text-bg px-5 py-2.5 text-xs font-semibold tracking-[0.05em]"
      >
        {showForm ? <X size={14} /> : <Plus size={14} />}
        {showForm ? 'CANCEL' : 'ADD SOCIAL POST'}
      </button>

      {showForm && (
        <form onSubmit={handleAdd} className="glass rounded-xl p-6 mb-8 space-y-4">
          <div>
            <label className="mono text-[10px] uppercase text-ink/40">Business Name *</label>
            <input
              required
              value={form.business_name}
              onChange={(e) => update('business_name', e.target.value)}
              className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">Before Image URL *</label>
              <input
                required
                value={form.before_image}
                onChange={(e) => update('before_image', e.target.value)}
                placeholder="https://…"
                className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
              />
            </div>
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">After Image URL *</label>
              <input
                required
                value={form.after_image}
                onChange={(e) => update('after_image', e.target.value)}
                placeholder="https://…"
                className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mono text-[10px] uppercase text-ink/40">Caption *</label>
            <textarea
              required
              rows={2}
              value={form.caption}
              onChange={(e) => update('caption', e.target.value)}
              className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-accent text-bg px-6 py-2.5 text-xs font-semibold tracking-[0.05em] flex items-center gap-2 disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            SAVE POST
          </button>
        </form>
      )}

      {posts.length === 0 ? (
        <p className="text-ink/40 text-sm py-6">
          No social posts yet. Add your first before/after above — it'll appear in the Social Media
          Wins section on your live site.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <div key={p.id} className="glass rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 aspect-video">
                <img src={p.before_image} alt="Before" className="w-full h-full object-cover" />
                <img src={p.after_image} alt="After" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{p.business_name}</h3>
                <p className="text-xs text-ink/50 mt-1">{p.caption}</p>
                <div className="flex items-center justify-between mt-3">
                  <label className="flex items-center gap-2 text-xs text-ink/50">
                    <input type="checkbox" checked={p.published} onChange={() => togglePublished(p)} />
                    Published
                  </label>
                  <button onClick={() => remove(p.id)} className="text-ink/40 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
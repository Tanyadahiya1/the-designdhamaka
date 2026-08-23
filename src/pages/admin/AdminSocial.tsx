import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
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

type ImageField = 'before_image' | 'after_image'

export default function AdminSocial() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<ImageField | null>(null)

  async function loadPosts() {
    if (!supabase) {
      setLoading(false)
      return
    }
    setLoading(true)
    const { data } = await supabase
      .from('social_posts')
      .select('*')
      .order('sort_order', { ascending: true })
    setPosts((data as SocialPost[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    loadPosts()
  }, [])

  function updateForm(key: keyof typeof emptyForm, value: string | boolean) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>, field: ImageField) {
    const file = event.target.files?.[0]
    if (!file || !supabase) return
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }
    setUploading(field)
    const extension = file.name.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`
    const filePath = `social-posts/${fileName}`
    const { error: uploadError } = await supabase.storage
      .from('social-media')
      .upload(filePath, file, { cacheControl: '3600', upsert: false })
    if (uploadError) {
      alert(`Image upload failed: ${uploadError.message}`)
      setUploading(null)
      return
    }
    const { data } = supabase.storage.from('social-media').getPublicUrl(filePath)
    updateForm(field, data.publicUrl)
    setUploading(null)
    event.target.value = ''
  }

  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return
    if (!form.before_image || !form.after_image) {
      alert('Please upload both Before and After images.')
      return
    }
    setSaving(true)
    const { data, error } = await supabase
      .from('social_posts')
      .insert({
        business_name: form.business_name,
        before_image: form.before_image,
        after_image: form.after_image,
        caption: form.caption,
        published: form.published,
        sort_order: posts.length,
      })
      .select()
      .single()
    setSaving(false)
    if (error) {
      alert(`Could not save post: ${error.message}`)
      return
    }
    if (data) {
      setPosts((current) => [...current, data as SocialPost])
      setForm(emptyForm)
      setShowForm(false)
    }
  }

  async function togglePublished(post: SocialPost) {
    if (!supabase) return
    await supabase.from('social_posts').update({ published: !post.published }).eq('id', post.id)
    setPosts((current) =>
      current.map((item) => (item.id === post.id ? { ...item, published: !item.published } : item))
    )
  }

  async function removePost(id: string) {
    if (!supabase) return
    if (!window.confirm('Delete this social media post?')) return
    await supabase.from('social_posts').delete().eq('id', id)
    setPosts((current) => current.filter((post) => post.id !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-ink/40">
        <Loader2 size={16} className="animate-spin" />
        Loading posts...
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowForm((current) => !current)}
        className="mb-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold tracking-[0.05em] text-bg"
      >
        {showForm ? <X size={14} /> : <Plus size={14} />}
        {showForm ? 'CANCEL' : 'ADD SOCIAL POST'}
      </button>

      {showForm && (
        <form onSubmit={handleAdd} className="glass mb-8 space-y-5 rounded-xl p-6">
          <div>
            <label className="mono text-[10px] uppercase text-ink/40">Business Name *</label>
            <input
              required
              value={form.business_name}
              onChange={(event) => updateForm('business_name', event.target.value)}
              placeholder="Example: Spice Route Cafe"
              className="mt-1.5 w-full border-b border-ink/20 bg-transparent py-2 text-sm outline-none focus:border-accent"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">Before Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => uploadImage(event, 'before_image')}
                disabled={uploading !== null}
                className="mt-2 block w-full text-sm text-ink/60 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-xs file:font-semibold file:text-bg"
              />
              {uploading === 'before_image' && (
                <p className="mt-2 flex items-center gap-2 text-xs text-ink/50">
                  <Loader2 size={13} className="animate-spin" />
                  Uploading before image...
                </p>
              )}
              {form.before_image && (
                <img src={form.before_image} alt="Before preview" className="mt-3 h-32 w-full rounded-lg object-cover" />
              )}
            </div>

            <div>
              <label className="mono text-[10px] uppercase text-ink/40">After Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => uploadImage(event, 'after_image')}
                disabled={uploading !== null}
                className="mt-2 block w-full text-sm text-ink/60 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-xs file:font-semibold file:text-bg"
              />
              {uploading === 'after_image' && (
                <p className="mt-2 flex items-center gap-2 text-xs text-ink/50">
                  <Loader2 size={13} className="animate-spin" />
                  Uploading after image...
                </p>
              )}
              {form.after_image && (
                <img src={form.after_image} alt="After preview" className="mt-3 h-32 w-full rounded-lg object-cover" />
              )}
            </div>
          </div>

          <div>
            <label className="mono text-[10px] uppercase text-ink/40">Caption *</label>
            <textarea
              required
              rows={3}
              value={form.caption}
              onChange={(event) => updateForm('caption', event.target.value)}
              placeholder="Explain the result..."
              className="mt-1.5 w-full resize-none border-b border-ink/20 bg-transparent py-2 text-sm outline-none focus:border-accent"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-ink/60">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(event) => updateForm('published', event.target.checked)}
            />
            Publish on website
          </label>

          <button
            type="submit"
            disabled={saving || uploading !== null}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-semibold tracking-[0.05em] text-bg disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            SAVE POST
          </button>
        </form>
      )}

      {posts.length === 0 ? (
        <p className="py-6 text-sm text-ink/40">
          No social posts yet. Add your first before/after post above.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="glass overflow-hidden rounded-xl">
              <div className="grid aspect-video grid-cols-2">
                <img src={post.before_image} alt="Before" className="h-full w-full object-cover" />
                <img src={post.after_image} alt="After" className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{post.business_name}</h3>
                <p className="mt-1 text-xs text-ink/50">{post.caption}</p>
                <div className="mt-3 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-ink/50">
                    <input
                      type="checkbox"
                      checked={post.published}
                      onChange={() => togglePublished(post)}
                    />
                    Published
                  </label>
                  <button type="button" onClick={() => removePost(post.id)} className="text-ink/40 hover:text-red-500">
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
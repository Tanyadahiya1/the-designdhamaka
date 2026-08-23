import { useEffect, useState } from 'react'
import { Loader2, Plus, Trash2, X, Star, Video as VideoIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Project, GalleryItem } from '@/types'

const emptyForm = {
  title: '',
  category: '',
  year: String(new Date().getFullYear()),
  cover_image: '',
  description: '',
  link: '',
  featured: true,
  sort_order: 0,
  gallery: [] as GalleryItem[],
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  async function load() {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
    setProjects((data as Project[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  // Uploads every selected file to the "project-media" Supabase Storage bucket
  // and adds the public URL to the gallery. First uploaded image also becomes
  // the cover image if none is set yet.
  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0 || !supabase) return
    setUploading(true)

    const uploaded: GalleryItem[] = []
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('project-media').upload(path, file)
      if (!error) {
        const { data } = supabase.storage.from('project-media').getPublicUrl(path)
        uploaded.push({
          url: data.publicUrl,
          type: file.type.startsWith('video') ? 'video' : 'image',
        })
      }
    }

    setForm((f) => ({
      ...f,
      gallery: [...f.gallery, ...uploaded],
      cover_image: f.cover_image || uploaded.find((u) => u.type === 'image')?.url || f.cover_image,
    }))
    setUploading(false)
    e.target.value = ''
  }

  function removeFromGallery(url: string) {
    setForm((f) => ({
      ...f,
      gallery: f.gallery.filter((g) => g.url !== url),
      cover_image: f.cover_image === url ? '' : f.cover_image,
    }))
  }

  function setAsCover(url: string) {
    setForm((f) => ({ ...f, cover_image: url }))
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return
    if (!form.cover_image) {
      alert('Please upload at least one image and set it as the cover.')
      return
    }
    setSaving(true)
    const { data, error } = await supabase
      .from('projects')
      .insert({ ...form, sort_order: projects.length })
      .select()
      .single()
    setSaving(false)
    if (!error && data) {
      setProjects((prev) => [...prev, data as Project])
      setForm(emptyForm)
      setShowForm(false)
    }
  }

  async function toggleFeatured(p: Project) {
    if (!supabase) return
    await supabase.from('projects').update({ featured: !p.featured }).eq('id', p.id)
    setProjects((prev) => prev.map((x) => (x.id === p.id ? { ...x, featured: !x.featured } : x)))
  }

  async function remove(id: string) {
    if (!supabase) return
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-ink/40 text-sm py-12">
        <Loader2 size={16} className="animate-spin" /> Loading projects…
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
        {showForm ? 'CANCEL' : 'ADD PROJECT'}
      </button>

      {showForm && (
        <form onSubmit={handleAdd} className="glass rounded-xl p-6 mb-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
              />
            </div>
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">Category *</label>
              <input
                required
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                placeholder="WEBSITE / BRAND EXPERIENCE"
                className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">Year</label>
              <input
                value={form.year}
                onChange={(e) => update('year', e.target.value)}
                className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
              />
            </div>
            <div>
              <label className="mono text-[10px] uppercase text-ink/40">Project link (optional)</label>
              <input
                value={form.link}
                onChange={(e) => update('link', e.target.value)}
                placeholder="https://…"
                className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mono text-[10px] uppercase text-ink/40">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className="mt-1.5 w-full bg-transparent border-b border-ink/20 focus:border-accent outline-none py-2 text-sm resize-none"
            />
          </div>

          <div>
            <label className="mono text-[10px] uppercase text-ink/40">Upload images & videos *</label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFiles}
              disabled={uploading}
              className="mt-2 block w-full text-sm text-ink/60 file:mr-4 file:rounded-full file:border-0 file:bg-ink file:text-bg file:px-4 file:py-2 file:text-xs file:font-semibold file:tracking-[0.05em] file:cursor-pointer"
            />
            {uploading && (
              <p className="mt-2 flex items-center gap-2 text-xs text-ink/50">
                <Loader2 size={13} className="animate-spin" /> Uploading…
              </p>
            )}
          </div>

          {form.gallery.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {form.gallery.map((item) => (
                <div
                  key={item.url}
                  className={`relative rounded-lg overflow-hidden aspect-square border-2 ${
                    form.cover_image === item.url ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full bg-ink/10 flex items-center justify-center">
                      <VideoIcon size={20} className="text-ink/40" />
                    </div>
                  ) : (
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                  )}

                  <div className="absolute inset-0 bg-ink/0 hover:bg-ink/60 transition-colors flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                    {item.type === 'image' && (
                      <button
                        type="button"
                        onClick={() => setAsCover(item.url)}
                        title="Set as cover"
                        className="text-bg bg-ink/70 rounded-full p-1.5 hover:bg-accent"
                      >
                        <Star size={13} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFromGallery(item.url)}
                      title="Remove"
                      className="text-bg bg-ink/70 rounded-full p-1.5 hover:bg-red-500"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {form.cover_image === item.url && (
                    <span className="absolute top-1 left-1 mono text-[8px] uppercase bg-accent text-bg px-1.5 py-0.5 rounded">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          {form.gallery.length > 0 && !form.cover_image && (
            <p className="text-xs text-red-400">Click the star on an image to set it as the cover.</p>
          )}

          <button
            type="submit"
            disabled={saving || uploading}
            className="rounded-full bg-accent text-bg px-6 py-2.5 text-xs font-semibold tracking-[0.05em] flex items-center gap-2 disabled:opacity-60"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            SAVE PROJECT
          </button>
        </form>
      )}

      {projects.length === 0 ? (
        <p className="text-ink/40 text-sm py-6">
          No projects yet. Add your first case study above — it will appear in the Selected Work section
          on your live site.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="glass rounded-xl overflow-hidden">
              <div className="aspect-video overflow-hidden relative">
                <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
                {p.gallery && p.gallery.length > 0 && (
                  <span className="absolute bottom-2 right-2 mono text-[9px] uppercase bg-ink/70 text-bg px-2 py-1 rounded-full">
                    {p.gallery.length} media
                  </span>
                )}
              </div>
              <div className="p-4">
                <span className="mono text-[10px] uppercase text-accent">{p.category}</span>
                <h3 className="font-medium mt-1">{p.title}</h3>
                <div className="flex items-center justify-between mt-3">
                  <label className="flex items-center gap-2 text-xs text-ink/50">
                    <input type="checkbox" checked={p.featured} onChange={() => toggleFeatured(p)} />
                    Featured on site
                  </label>
                  <button onClick={() => remove(p.id)} className="text-ink/40 hover:text-red-400">
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
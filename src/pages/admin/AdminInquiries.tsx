import { useEffect, useState } from 'react'
import { Mail, Phone, Trash2, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Inquiry } from '@/types'

const STATUSES: Inquiry['status'][] = ['new', 'contacted', 'archived']

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    setInquiries((data as Inquiry[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function updateStatus(id: string, status: Inquiry['status']) {
    if (!supabase) return
    await supabase.from('inquiries').update({ status }).eq('id', id)
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
  }

  async function remove(id: string) {
    if (!supabase) return
    if (!confirm('Delete this enquiry?')) return
    await supabase.from('inquiries').delete().eq('id', id)
    setInquiries((prev) => prev.filter((i) => i.id !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-ink/40 text-sm py-12">
        <Loader2 size={16} className="animate-spin" /> Loading enquiries…
      </div>
    )
  }

  if (inquiries.length === 0) {
    return <p className="text-ink/40 text-sm py-12">No enquiries yet. New submissions from the contact form will show up here.</p>
  }

  return (
    <div className="space-y-3">
      {inquiries.map((inq) => (
        <div key={inq.id} className="glass rounded-xl p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-medium">{inq.name}</h3>
              <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-ink/50">
                <a href={`mailto:${inq.email}`} className="flex items-center gap-1 hover:text-ink">
                  <Mail size={12} /> {inq.email}
                </a>
                {inq.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> {inq.phone}
                  </span>
                )}
                {inq.budget && <span>Budget: {inq.budget}</span>}
                <span className="mono">{new Date(inq.created_at).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={inq.status}
                onChange={(e) => updateStatus(inq.id, e.target.value as Inquiry['status'])}
                className="bg-bg2 border border-ink/15 rounded-full px-3 py-1.5 text-xs capitalize outline-none"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button onClick={() => remove(inq.id)} className="text-ink/40 hover:text-red-400 p-1.5" aria-label="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <p className="mt-3 text-sm text-ink/70 leading-relaxed">{inq.message}</p>
        </div>
      ))}
    </div>
  )
}

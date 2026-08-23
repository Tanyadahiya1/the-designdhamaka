import { useState } from 'react'
import { Asterisk, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import AdminInquiries from './AdminInquiries'
import AdminProjects from './AdminProjects'
import AdminSocial from './AdminSocial'

type Tab = 'inquiries' | 'projects' | 'social'

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('inquiries')

  async function logout() {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-ink/10 px-5 sm:px-8 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Asterisk size={16} className="text-accent" />
          <span className="text-sm tracking-tight font-medium">the.designdhamaka / admin</span>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-xs text-ink/50 hover:text-ink">
          <LogOut size={14} /> LOG OUT
        </button>
      </header>

      <div className="px-5 sm:px-8 md:px-12 py-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          {(['inquiries', 'projects' , 'social'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full text-xs tracking-[0.05em] font-medium capitalize transition-colors ${
                tab === t ? 'bg-ink text-bg' : 'glass text-ink/60 hover:text-ink'
              }`}
            >
              {t === 'inquiries' ? 'Client Enquiries' : t === 'projects' ? 'Portfolio Work' : 'Social Media'}
            </button>
          ))}
        </div>

        {tab === 'inquiries' ? <AdminInquiries /> : tab === 'projects' ? <AdminProjects /> : <AdminSocial />}
      </div>
    </div>
  )
}

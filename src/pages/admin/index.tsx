import { Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/useAuth'
import { isSupabaseConfigured } from '@/lib/supabase'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function Admin() {
  const { session, loading } = useAuth()

  if (!isSupabaseConfigured) return <AdminLogin />

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-ink/40" size={22} />
      </div>
    )
  }

  return session ? <AdminDashboard /> : <AdminLogin />
}

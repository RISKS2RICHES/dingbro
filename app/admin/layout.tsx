import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const metadata = { title: 'Admin' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FB' }}>
      {user && (
        <header style={{ background: '#102659', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
            <Link href="/admin" className="text-white font-bold uppercase" style={{ fontFamily: 'var(--font-barlow)', fontSize: '20px', letterSpacing: '0.04em' }}>
              Dingbro <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 400 }}>/ Admin</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em' }}>
                View Site
              </Link>
              <form action="/admin/logout" method="post">
                <button className="text-xs font-semibold uppercase tracking-widest px-3 py-2" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', letterSpacing: '0.18em' }}>
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      {children}
    </div>
  )
}

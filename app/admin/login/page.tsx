import { login } from './actions'

export const metadata = { title: 'Admin Login' }

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#102659' }}>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.24em' }}>
            Dingbro Ltd
          </p>
          <h1 className="text-white font-bold uppercase" style={{ fontFamily: 'var(--font-barlow)', fontSize: '32px', letterSpacing: '-0.01em' }}>
            Admin Portal
          </h1>
        </div>

        <form action={login} className="space-y-4 p-8" style={{ background: 'white' }}>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#1c3c8e', letterSpacing: '0.18em' }}>Email</label>
            <input
              required
              type="email"
              name="email"
              defaultValue="admin@dingbro.com"
              className="w-full px-4 py-3 text-sm"
              style={{ border: '1px solid #E2E6EF', background: '#F5F7FB', color: '#0A0F1C' }}
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#1c3c8e', letterSpacing: '0.18em' }}>Password</label>
            <input
              required
              type="password"
              name="password"
              className="w-full px-4 py-3 text-sm"
              style={{ border: '1px solid #E2E6EF', background: '#F5F7FB', color: '#0A0F1C' }}
            />
          </div>

          {error && (
            <p className="text-xs px-3 py-2" style={{ background: '#FEF1F1', color: '#8A1A1A', border: '1px solid #F4C7C7' }}>
              {decodeURIComponent(error)}
            </p>
          )}

          <button type="submit" className="btn-blue w-full text-white text-sm font-semibold py-3.5 uppercase tracking-widest" style={{ letterSpacing: '0.14em' }}>
            Sign In
          </button>

          <p className="text-[11px]" style={{ color: '#8A93A6' }}>
            Restricted area — authorised personnel only.
          </p>
        </form>
      </div>
    </div>
  )
}

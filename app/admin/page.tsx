import Image from 'next/image'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import {
  uploadHero,
  createSponsor,
  deleteSponsor,
  createService,
  deleteService,
  createProduct,
  deleteProduct,
} from './actions'

export const dynamic = 'force-dynamic'

const card: React.CSSProperties = { background: 'white', border: '1px solid #E2E6EF', padding: '28px' }
const label: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#1c3c8e', marginBottom: '8px' }
const input: React.CSSProperties = { width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #E2E6EF', background: '#F5F7FB' }
const subhead: React.CSSProperties = { fontFamily: 'var(--font-barlow), sans-serif', fontWeight: 700, textTransform: 'uppercase', fontSize: '20px', letterSpacing: '0.02em', color: '#0A0F1C', marginBottom: '4px' }
const muted: React.CSSProperties = { fontSize: '13px', color: '#6B7280', marginBottom: '20px' }

export default async function AdminDashboard() {
  const admin = createSupabaseAdminClient()
  const [sponsorsRes, servicesRes, productsRes, heroRes] = await Promise.all([
    admin.from('sponsors').select('*').order('created_at', { ascending: false }),
    admin.from('services').select('*').order('created_at', { ascending: false }),
    admin.from('products').select('*').order('created_at', { ascending: false }),
    admin.from('site_config').select('value').eq('key', 'hero_image_url').maybeSingle(),
  ])
  const sponsors = (sponsorsRes.data || []) as Array<{ id: string; name: string; logo_url: string; storage_path: string | null; track: string; display_width: number | null }>
  const services = (servicesRes.data || []) as Array<{ id: string; title: string; body: string; icon: string | null }>
  const products = (productsRes.data || []) as Array<{ id: string; name: string; category: string | null; description: string | null; image_url: string | null }>
  const heroUrl = (heroRes.data?.value as string | undefined) || null

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#1c3c8e', letterSpacing: '0.18em' }}>Control Panel</p>
        <h1 style={{ fontFamily: 'var(--font-barlow), sans-serif', fontWeight: 600, fontSize: '40px', color: '#0A0F1C', lineHeight: 1.05 }}>
          Dingbro content management
        </h1>
      </header>

      {/* ── HERO ── */}
      <section style={card}>
        <h2 style={subhead}>Hero image</h2>
        <p style={muted}>Replaces the homepage hero background.</p>

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start">
          <div style={{ aspectRatio: '16/10', position: 'relative', background: '#F5F7FB', border: '1px solid #E2E6EF' }}>
            {heroUrl ? (
              <Image src={heroUrl} alt="Current hero" fill className="object-cover" unoptimized />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: '#8A93A6' }}>No hero set — using default</div>
            )}
          </div>
          <form action={uploadHero} className="space-y-3">
            <div>
              <label style={label}>Upload new image</label>
              <input style={input} type="file" name="file" accept="image/*" required />
            </div>
            <button className="btn-blue text-white text-sm font-semibold px-6 py-2.5">Save hero image</button>
          </form>
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <section style={card}>
        <h2 style={subhead}>Sponsor logos</h2>
        <p style={muted}>Logos appear in the dual marquee on the homepage. Track A scrolls left → right, Track B scrolls right → left.</p>

        <form action={createSponsor} className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_1fr_auto] gap-3 items-end" encType="multipart/form-data">
          <div>
            <label style={label}>Name</label>
            <input style={input} name="name" required placeholder="e.g. Bosch" />
          </div>
          <div>
            <label style={label}>Track</label>
            <select style={input} name="track" defaultValue="A">
              <option value="A">A — Clients</option>
              <option value="B">B — OE Partners</option>
            </select>
          </div>
          <div>
            <label style={label}>Width (px)</label>
            <input style={input} name="width" type="number" defaultValue={150} min={40} max={400} />
          </div>
          <div>
            <label style={label}>Logo file</label>
            <input style={input} name="logo" type="file" accept="image/*" required />
          </div>
          <button className="btn-blue text-white text-sm font-semibold px-6 py-2.5">Add</button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
          {sponsors.map((s) => (
            <div key={s.id} style={{ border: '1px solid #E2E6EF', padding: '14px', background: '#F5F7FB' }}>
              <div style={{ height: 72, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', marginBottom: 10 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.logo_url} alt={s.name} style={{ maxHeight: 56, maxWidth: '85%', objectFit: 'contain' }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: '#0A0F1C' }}>{s.name}</p>
              <p className="text-[11px] uppercase tracking-widest" style={{ color: '#1c3c8e', letterSpacing: '0.16em' }}>Track {s.track} · {s.display_width}px</p>
              <form action={deleteSponsor} className="mt-3">
                <input type="hidden" name="id" value={s.id} />
                <input type="hidden" name="path" value={s.storage_path || ''} />
                <button className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5" style={{ background: 'white', border: '1px solid #E2E6EF', color: '#8A1A1A', letterSpacing: '0.14em' }}>Remove</button>
              </form>
            </div>
          ))}
          {sponsors.length === 0 && <p className="text-sm col-span-full" style={{ color: '#8A93A6' }}>No sponsors yet — run the seed script or add one above.</p>}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={card}>
        <h2 style={subhead}>Services</h2>
        <p style={muted}>Shown on the homepage and services page.</p>

        <form action={createService} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_140px_auto] gap-3 items-end">
          <div>
            <label style={label}>Title</label>
            <input style={input} name="title" required />
          </div>
          <div>
            <label style={label}>Description</label>
            <input style={input} name="body" required />
          </div>
          <div>
            <label style={label}>Icon</label>
            <select style={input} name="icon" defaultValue="wrench">
              {['wrench','truck','brush','anchor','shield','building','cog','zap','factory'].map(o=> <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <button className="btn-blue text-white text-sm font-semibold px-6 py-2.5">Add</button>
        </form>

        <ul className="mt-8 divide-y" style={{ borderTop: '1px solid #E2E6EF' }}>
          {services.map((s) => (
            <li key={s.id} className="py-4 flex items-start justify-between gap-6">
              <div>
                <p className="font-semibold text-sm" style={{ color: '#0A0F1C' }}>{s.title}</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>{s.body}</p>
              </div>
              <form action={deleteService}>
                <input type="hidden" name="id" value={s.id} />
                <button className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5" style={{ background: 'white', border: '1px solid #E2E6EF', color: '#8A1A1A', letterSpacing: '0.14em' }}>Remove</button>
              </form>
            </li>
          ))}
          {services.length === 0 && <li className="py-4 text-sm" style={{ color: '#8A93A6' }}>No services yet.</li>}
        </ul>
      </section>

      {/* ── PRODUCTS ── */}
      <section style={card}>
        <h2 style={subhead}>Products</h2>
        <p style={muted}>Featured product entries (optional image).</p>

        <form action={createProduct} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr_1fr_auto] gap-3 items-end" encType="multipart/form-data">
          <div>
            <label style={label}>Name</label>
            <input style={input} name="name" required />
          </div>
          <div>
            <label style={label}>Category</label>
            <input style={input} name="category" />
          </div>
          <div>
            <label style={label}>Description</label>
            <input style={input} name="description" />
          </div>
          <div>
            <label style={label}>Image (optional)</label>
            <input style={input} name="image" type="file" accept="image/*" />
          </div>
          <button className="btn-blue text-white text-sm font-semibold px-6 py-2.5">Add</button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
          {products.map((p) => (
            <div key={p.id} style={{ border: '1px solid #E2E6EF', background: 'white' }}>
              <div style={{ aspectRatio: '4/3', position: 'relative', background: '#F5F7FB' }}>
                {p.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#1c3c8e', letterSpacing: '0.16em' }}>{p.category || '—'}</p>
                <p className="text-sm font-semibold mt-1" style={{ color: '#0A0F1C' }}>{p.name}</p>
                {p.description && <p className="text-xs mt-1" style={{ color: '#6B7280' }}>{p.description}</p>}
                <form action={deleteProduct} className="mt-3">
                  <input type="hidden" name="id" value={p.id} />
                  <button className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5" style={{ background: '#F5F7FB', border: '1px solid #E2E6EF', color: '#8A1A1A', letterSpacing: '0.14em' }}>Remove</button>
                </form>
              </div>
            </div>
          ))}
          {products.length === 0 && <p className="text-sm col-span-full" style={{ color: '#8A93A6' }}>No products yet.</p>}
        </div>
      </section>
    </main>
  )
}

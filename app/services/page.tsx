import type { Metadata } from 'next'
import Link from 'next/link'
import { Wrench, Truck, Sprout, Anchor, Shield, Building2, Package, Zap, Cog, Brush, Factory } from 'lucide-react'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; strokeWidth?: number }>> = {
  wrench: Wrench, truck: Truck, brush: Brush, anchor: Anchor, shield: Shield,
  building: Building2, cog: Cog, zap: Zap, factory: Factory, package: Package,
}

async function loadDbServices() {
  try {
    const admin = createSupabaseAdminClient()
    const { data } = await admin.from('services').select('id, title, body, icon').order('position', { ascending: true })
    return (data as Array<{ id: string; title: string; body: string; icon: string | null }>) || []
  } catch { return [] }
}

export const metadata: Metadata = {
  title: 'Products & Services',
  description: 'Dingbro supplies motor vehicle components, bodyshop supplies, truck & trailer parts, marine parts, and more. OE quality. 300,000+ part lines. Trade only.',
}

const services = [
  { icon: Wrench, title: 'Motor Vehicle Components', body: 'OE quality parts from leading manufacturers including Bosch. Full range for passenger cars, vans and light commercial vehicles.', items: ['Braking systems — pads, discs, drums, callipers', 'Filters — oil, air, fuel, cabin', 'Steering and suspension', 'Engine management and sensors', 'Electrical components', 'Exhaust systems'] },
  { icon: Truck, title: 'Truck & Trailer Parts', body: 'Suspension air bags, brake drums and full drivetrain components for HGVs, large lorries and cranes.', items: ['Suspension air bags and bellows', 'Brake drums and chambers', 'Wheel bearings and hubs', 'Driveline and transmission', 'Trailer electrics', 'Coupling gear'] },
  { icon: Sprout, title: 'Bodyshop Supplies & Paint', body: 'Complete range of refinishing products, bodyshop consumables and paint systems for trade professionals.', items: ['Paint systems and refinishing products', 'Primer, filler and body repair materials', 'Abrasives and polishing compounds', 'Masking and preparation materials', 'Spray equipment', 'Plastic repair systems'] },
  { icon: Anchor, title: 'Marine & Offshore', body: 'Filters and batteries for deep sea oil tankers, cruise liners and offshore platforms. Serving the North Sea oil and gas sector.', items: ['Heavy-duty filtration systems', 'Marine batteries and charging', 'Offshore platform parts', 'Oil service company supply', 'Ship chandler support', 'Commercial vessel supply'] },
  { icon: Shield, title: 'Emergency Services', body: 'Contracted main supplier to Police Scotland, the Scottish Ambulance Service and Scottish Fire & Rescue. Critical fleet supply.', items: ['Police Scotland — contracted supplier', 'Scottish Ambulance Service — contracted', 'Scottish Fire & Rescue — contracted', 'Priority service and availability', 'Emergency delivery capability', 'Specialist fleet parts'] },
  { icon: Building2, title: 'Councils & Local Authorities', body: 'Supporting local government fleet operations across Scotland with reliable supply and priority service.', items: ['Local authority fleet supply', 'Council vehicle maintenance', 'Fleet management support', 'Competitive trade pricing', 'Account management', 'Scheduled delivery'] },
  { icon: Package, title: 'Stock Availability', body: 'With 300,000+ active part lines and £30M+ stockholding, we maintain exceptional availability across our 29-site network.', items: ['300,000+ active part lines', '£30M+ stockholding', '400,000 sq ft storage area', 'Same-day availability on stock parts', 'Daily deliveries across Scotland', 'Next-day to remote areas'] },
  { icon: Zap, title: 'Delivery & Distribution', body: 'At least daily delivery to all mainland areas. Many enjoy hourly service. Ferry services to Orkney, Shetland and the Western Isles.', items: ['Minimum daily delivery — all mainland', 'Hourly service in many areas', 'Central Belt, Borders and Cumbria', 'Caithness in the North', 'Ferry to Orkney, Shetland, Western Isles', 'Faroe Islands coverage'] },
]

export default async function ServicesPage() {
  const dbServices = await loadDbServices()
  return (
    <>
      <section className="subpage-hero pt-40 pb-16 md:pt-52 md:pb-24" style={{ backgroundImage: 'linear-gradient(180deg, rgba(10,15,28,0.55) 0%, rgba(10,15,28,0.78) 60%, rgba(10,15,28,0.92) 100%), url("https://i.postimg.cc/T1dWbLNQ/dingbrobg-(1).jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest" style={{ color: '#93B4FF', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}>What We Supply</p>
          </div>
          <h1 className="font-bold uppercase text-white leading-[1.05] md:leading-none max-w-3xl" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(34px, 6vw, 72px)' }}>
            A Complete Parts Solution<br />For Every Sector
          </h1>
        </div>
      </section>

      {dbServices.length > 0 && (
        <section className="py-14 bg-white" style={{ borderBottom: '1px solid #E2E6EF' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#1c3c8e', letterSpacing: '0.18em' }}>From the admin</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dbServices.map((s) => {
                const Icon = iconMap[s.icon || 'wrench'] || Wrench
                return (
                  <div key={s.id} className="service-card bg-white p-7" style={{ border: '1px solid #E2E6EF' }}>
                    <div className="w-11 h-11 flex items-center justify-center mb-4" style={{ background: '#EEF2FB', borderRadius: 4 }}>
                      <Icon size={20} style={{ color: '#1c3c8e' }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-base uppercase mb-2" style={{ fontFamily: 'var(--font-barlow)', color: '#0A0F1C', letterSpacing: '0.03em' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{s.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="service-card p-6 md:p-9" style={{ background: 'white', border: '1px solid #E6EAF1', borderRadius: 6 }}>
                  <div className="flex items-start gap-5 mb-5">
                    <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{ background: '#EEF2FB', borderRadius: 4 }}>
                      <Icon size={20} style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
                    </div>
                    <div>
                      <h2 className="font-bold text-base uppercase" style={{ fontFamily: 'var(--font-barlow)', color: '#0F1117', letterSpacing: '0.03em' }}>{s.title}</h2>
                      <p className="text-sm mt-2 leading-relaxed" style={{ color: '#6B7280', fontFamily: 'var(--font-inter)' }}>{s.body}</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-2 gap-1.5">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-xs" style={{ color: '#9CA3AF', fontFamily: 'var(--font-inter)' }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: '#1c3c8e' }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-14" style={{ background: '#F4F6FA', borderTop: '1px solid #E2E6EF' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          <div>
            <h3 className="font-bold text-xl uppercase mb-1.5" style={{ fontFamily: 'var(--font-barlow)', color: '#0F1117' }}>Trade enquiries welcome</h3>
            <p className="text-sm" style={{ color: '#6B7280', fontFamily: 'var(--font-inter)' }}>Dingbro supplies the trade only. Find your nearest branch to place an order or open an account.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/branches" className="btn-blue inline-block text-center text-white text-sm font-semibold px-6 py-3" style={{ fontFamily: 'var(--font-inter)' }}>Find Your Branch</Link>
            <Link href="/contact" className="btn-outline-dark inline-block text-center text-sm font-semibold px-6 py-3" style={{ fontFamily: 'var(--font-inter)', background: 'white' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}

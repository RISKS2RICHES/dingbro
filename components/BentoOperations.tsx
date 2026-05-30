import { Cog, Truck, Brush, Anchor, Zap, ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'

const tiles = [
  {
    id: 'auto',
    icon: Cog,
    title: 'Automotive Components',
    body: 'OE-grade parts, steering, engine management, braking and ignition for passenger and light commercial fleets.',
    tags: ['OE Parts', 'Steering', 'Engine Management'],
    span: 'lg:col-span-3 lg:row-span-2',
    dark: true,
  },
  {
    id: 'truck',
    icon: Truck,
    title: 'Commercial Truck & Trailer',
    body: 'Heavy-duty programmes built for HGV, plant and trailer operators.',
    tags: ['Air Brakes', '5th Wheels & Landing Legs', 'Axles', 'Air Suspension'],
    span: 'lg:col-span-3 lg:row-span-1',
  },
  {
    id: 'paint',
    icon: Brush,
    title: 'Paint & Bodyshop Supplies',
    body: 'Industrial coatings, panels and full refinish systems for trade bodyshops.',
    tags: ['Industrial Coatings', 'Panels', 'Wet & Powder Finishes'],
    span: 'lg:col-span-2 lg:row-span-1',
  },
  {
    id: 'marine',
    icon: Anchor,
    title: 'Industrial & Marine Filtration',
    body: 'Filtration for deep-sea oil tankers, power generation and cruise liners across the North Sea and beyond.',
    tags: ['Deep-Sea Oil Tanker', 'Power Gen', 'Cruise Liner'],
    span: 'lg:col-span-2 lg:row-span-1',
  },
  {
    id: 'taylor',
    icon: Zap,
    title: 'Taylor Auto Electrical',
    body: 'Our specialist automotive electronics division — diagnostics, starters, alternators and EV components.',
    tags: ['Specialist Division', 'Auto Electronics'],
    span: 'lg:col-span-2 lg:row-span-1',
  },
]

export default function BentoOperations() {
  return (
    <section className="py-16" style={{ background: '#F5F7FB' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#1c3c8e', letterSpacing: '0.18em' }}>
              Five Specialised Operations
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-semibold leading-tight mb-14 max-w-3xl" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(32px, 4vw, 50px)', color: '#0A0F1C' }}>
            One integrated supply chain.<br />Built for every sector we serve.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[230px] gap-4">
          {tiles.map((t, i) => {
            const Icon = t.icon
            const isDark = !!t.dark
            return (
              <Reveal
                key={t.id}
                delay={i * 90}
                className={`bento-tile ${isDark ? 'bento-tile--dark' : ''} ${t.span} p-7 flex flex-col justify-between`}
              >
                <div>
                  <div
                    className="w-11 h-11 flex items-center justify-center mb-5"
                    style={{ background: isDark ? 'rgba(255,255,255,0.08)' : '#EEF2FB', border: isDark ? '1px solid rgba(255,255,255,0.12)' : 'none' }}
                  >
                    <Icon size={20} style={{ color: isDark ? 'white' : '#1c3c8e', strokeWidth: 1.5 }} />
                  </div>
                  <h3
                    className="font-bold uppercase mb-3"
                    style={{
                      fontFamily: 'var(--font-barlow)',
                      letterSpacing: '0.02em',
                      fontSize: isDark ? '28px' : '18px',
                      lineHeight: 1.1,
                      color: isDark ? 'white' : '#0A0F1C',
                    }}
                  >
                    {t.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: isDark ? 'rgba(255,255,255,0.72)' : '#4B5563', maxWidth: isDark ? '32ch' : 'unset' }}
                  >
                    {t.body}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 items-center">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1"
                      style={{
                        background: isDark ? 'rgba(255,255,255,0.08)' : 'white',
                        color: isDark ? 'rgba(255,255,255,0.85)' : '#1c3c8e',
                        border: isDark ? '1px solid rgba(255,255,255,0.14)' : '1px solid #D6DEEF',
                        letterSpacing: '0.12em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <ArrowUpRight
                    size={16}
                    style={{ marginLeft: 'auto', color: isDark ? 'rgba(255,255,255,0.6)' : '#1c3c8e', strokeWidth: 1.5 }}
                  />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

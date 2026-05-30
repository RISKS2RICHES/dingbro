import Link from 'next/link'
import { CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react'
import BranchDropdown from '@/components/BranchDropdown'
import CoverageMap from '@/components/CoverageMap'
import DualMarquee from '@/components/DualMarquee'
import Reveal from '@/components/Reveal'
import { branches } from '@/data/branches'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
const DEFAULT_HERO_VIDEO = 'https://snvwynjuhzdkdkszbvcf.supabase.co/storage/v1/object/public/hero/copy_8101D942-7F7A-4086-9127-781C1BC8D76D.mov'

async function loadHero(): Promise<string> {
  try {
    const admin = createSupabaseAdminClient()
    const { data } = await admin.from('site_config').select('value').eq('key', 'hero_video_url').maybeSingle()
    return (data?.value as string | undefined) || DEFAULT_HERO_VIDEO
  } catch { return DEFAULT_HERO_VIDEO }
}

const coverage = [
  'Daily delivery across the Scottish mainland',
  'Hourly service available in many areas',
  'Ferry delivery to Orkney, Shetland and the Western Isles',
  'Faroe Islands and North Atlantic coverage',
  'North West England via Carlisle and Workington',
]

export default async function HomePage() {
  const heroVideo = await loadHero()
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[72vh] md:min-h-screen flex flex-col justify-end" style={{ background: '#102659' }}>
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          >
            <source src={heroVideo} type="video/quicktime" />
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Black overlay to darken footage */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(0,0,0,0.42)' }} />
          {/* legibility scrim — only behind text + at the bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,15,28,0.18) 0%, rgba(10,15,28,0) 35%, rgba(10,15,28,0) 70%, rgba(10,15,28,0.55) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl pt-36 pb-10 sm:pt-40 sm:pb-20">
            <Reveal>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-5 sm:mb-6" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em' }}>
                Est. 1973 — Scotland's Largest Independent Motor Factor
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="font-bold uppercase text-white leading-[0.95] mb-8"
                style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(36px, 7.2vw, 92px)', letterSpacing: '-0.015em' }}
              >
                The Scottish Factor.<br />
                Engineered for<br />
                Industry.
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mb-10 max-w-xl" style={{ color: 'rgba(255,255,255,0.78)', fontSize: '18px', lineHeight: 1.75 }}>
                A trade-only supply network distributing motor vehicle components, paint, truck &amp; trailer parts and industrial filtration across Scotland, the North Sea and beyond.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <BranchDropdown />
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-8 py-3.5"
                  style={{ background: 'white', color: '#1c3c8e', border: '1.5px solid white' }}
                >
                  Our Story
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

      </section>

      {/* ── ABOUT (stats only) ── */}
      <section className="pt-0 pb-0 sm:py-16" style={{ background: '#F4F6FA' }}>

          {/* Mobile layout — horizontal scroll strip */}
          <div className="stats-mobile overflow-x-auto">
            <div className="flex gap-0 min-w-max" style={{ background: '#1c3c8e' }}>
              {[
                { number: '1973', label: 'Founded', note: 'Fraserburgh' },
                { number: '29', label: 'Hubs', note: 'Scotland & NW England' },
                { number: '300K+', label: 'Active Lines', note: 'In live stock' },
                { number: '400K', label: 'sq ft', note: 'Total storage' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-center px-7 py-6 shrink-0"
                  style={{
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.14)' : 'none',
                    minWidth: 132,
                  }}
                >
                  <p className="font-bold leading-none mb-1.5" style={{ fontFamily: 'var(--font-barlow)', fontSize: 30, color: '#ffffff' }}>
                    {s.number}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em' }}>
                    {s.label}
                  </p>
                  <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop layout — coloured boxes grid */}
          <div className="stats-desktop">
            {[
              { number: '1973', label: 'Founded', note: 'Fraserburgh' },
              { number: '29', label: 'Hubs', note: 'Scotland & NW England' },
              { number: '300K+', label: 'Active Lines', note: 'In live stock' },
              { number: '400K', label: 'sq ft', note: 'Total storage' },
            ].map((s, i) => {
              const dark = true
              return (
                <Reveal
                  key={i}
                  delay={i * 80}
                  className="p-6"
                  style={{
                    background: dark ? '#1c3c8e' : '#F5F7FB',
                    border: '1px solid ' + (dark ? '#1c3c8e' : '#E2E6EF'),
                  }}
                >
                  <p className="font-bold leading-none mb-2" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(26px, 4vw, 34px)', color: dark ? 'white' : '#1c3c8e' }}>
                    {s.number}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: dark ? 'rgba(255,255,255,0.78)' : '#374151', letterSpacing: '0.1em' }}>
                    {s.label}
                  </p>
                  <p className="text-xs" style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#9CA3AF' }}>{s.note}</p>
                </Reveal>
              )
            })}
          </div>

      </section>

      {/* ── DUAL MARQUEE ── */}
      <DualMarquee />

      {/* ── PHILOSOPHY ── */}
      <section className="py-14" style={{ background: '#1c3c8e' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.3)' }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.22em' }}>Operating Philosophy</p>
              <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.3)' }} />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-bold text-white leading-tight mb-8" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(26px, 5vw, 58px)' }}>
              "Keep it simple. Do it right.<br />Every time."
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.85 }}>
              Customer service is part of a very simple philosophy we have applied to business since the day we started. Treat people as you would like to be treated yourself. This applies to stock, service, personal contact, administration, credits and warranties.
            </p>
          </Reveal>
        </div>
      </section>


      {/* ── MAP ── */}
      {MAPBOX_TOKEN && (
        <section className="h-[420px] sm:h-[520px]" style={{ borderTop: '3px solid #1c3c8e' }}>
          <CoverageMap branches={branches} token={MAPBOX_TOKEN} />
        </section>
      )}

      {/* ── CTA STRIP ── */}
      <section className="py-16 bg-white" style={{ borderTop: '1px solid #E2E6EF' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          <div>
            <h3 className="font-bold text-xl uppercase mb-1.5" style={{ fontFamily: 'var(--font-barlow)', color: '#0A0F1C' }}>Trade enquiries welcome</h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>Strictly trade only. Find your nearest branch or speak to our team.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/branches" className="btn-blue inline-block text-center text-white text-sm font-semibold px-6 py-3">Find Your Branch</Link>
            <Link href="/contact" className="btn-outline-dark inline-block text-center text-sm font-semibold px-6 py-3">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}

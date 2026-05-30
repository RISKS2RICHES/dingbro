import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Mail, Clock, ExternalLink, ArrowLeft } from 'lucide-react'
import { branches } from '@/data/branches'
import BranchMap from '@/components/BranchMap'
import { slugToGoogleMapsUrl } from '@/lib/utils'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export async function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const branch = branches.find((b) => b.slug === slug)
  if (!branch) return {}
  return {
    title: `${branch.name} Branch`,
    description: `Dingbro ${branch.name} — ${branch.address}, ${branch.town}, ${branch.postcode}. Call ${branch.tel}.`,
  }
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const branch = branches.find((b) => b.slug === slug)
  if (!branch) notFound()

  const mapsUrl = slugToGoogleMapsUrl(branch.address, branch.town, branch.postcode)

  return (
    <>
      <section className="subpage-hero pt-44 pb-16 md:pt-52 md:pb-20" style={{ backgroundImage: 'linear-gradient(180deg, rgba(10,15,28,0.55) 0%, rgba(10,15,28,0.78) 60%, rgba(10,15,28,0.92) 100%), url("https://i.postimg.cc/T1dWbLNQ/dingbrobg-(1).jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/branches" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-8 transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)', letterSpacing: '0.1em', textDecoration: 'none' }}>
            <ArrowLeft size={12} strokeWidth={2} /> Back to Branch Network
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#93B4FF', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}>Branch</p>
          </div>
          <h1 className="font-bold uppercase text-white leading-none" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(44px, 6vw, 72px)' }}>
            {branch.name}
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
                  <address className="not-italic text-base" style={{ color: '#374151', fontFamily: 'var(--font-inter)', lineHeight: 1.7 }}>
                    {branch.address}<br />{branch.town}<br />{branch.postcode}
                  </address>
                </div>
                <a href={`tel:${branch.tel.replace(/\s/g, '')}`} className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
                  <Phone size={15} style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
                  <span className="text-base font-medium" style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)' }}>{branch.tel}</span>
                </a>
                <a href={`mailto:${branch.email}`} className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
                  <Mail size={15} style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
                  <span className="text-base" style={{ color: '#4B5563', fontFamily: 'var(--font-inter)' }}>{branch.email}</span>
                </a>
                <div className="flex items-start gap-3">
                  <Clock size={15} className="mt-0.5 shrink-0" style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
                  <div style={{ fontFamily: 'var(--font-inter)' }}>
                    <p className="text-sm" style={{ color: '#374151' }}>Mon–Fri: 07:30–17:30</p>
                    <p className="text-sm" style={{ color: '#374151' }}>Saturday: 08:00–12:00</p>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="py-6 mb-8" style={{ borderTop: '1px solid #E2E6EF', borderBottom: '1px solid #E2E6EF' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)' }}>
                      {branch.managerTitle || 'Branch Manager'}
                    </p>
                    <p className="text-base font-semibold" style={{ color: '#0F1117', fontFamily: 'var(--font-inter)' }}>{branch.manager}</p>
                  </div>
                  {branch.deputy && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#9CA3AF', fontFamily: 'var(--font-inter)' }}>
                        {branch.deputyTitle || 'Deputy Branch Manager'}
                      </p>
                      <p className="text-base" style={{ color: '#374151', fontFamily: 'var(--font-inter)' }}>{branch.deputy}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${branch.email}`} className="btn-blue inline-block text-white text-sm font-semibold px-6 py-3" style={{ fontFamily: 'var(--font-inter)', textDecoration: 'none' }}>
                  Email This Branch
                </a>
                <a href={`tel:${branch.tel.replace(/\s/g, '')}`} className="btn-outline-dark inline-block text-sm font-semibold px-6 py-3" style={{ fontFamily: 'var(--font-inter)', textDecoration: 'none' }}>
                  Call Now
                </a>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark inline-flex items-center gap-2 text-sm font-semibold px-6 py-3" style={{ fontFamily: 'var(--font-inter)', textDecoration: 'none' }}>
                  Get Directions <ExternalLink size={12} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="h-[460px]" style={{ border: '1px solid #E2E6EF' }}>
              {MAPBOX_TOKEN ? (
                <BranchMap coordinates={branch.coordinates} name={branch.name} token={MAPBOX_TOKEN} />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: '#F4F6FA' }}>
                  <p className="text-sm" style={{ color: '#9CA3AF', fontFamily: 'var(--font-inter)' }}>Map loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

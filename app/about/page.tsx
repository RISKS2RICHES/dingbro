import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Dingbro',
  description: "Founded in Fraserburgh in 1973 by the Dingwall Brothers, Dingbro has grown to become Scotland's largest independent motor factor with 29 sites and over 1,500 employees.",
}

const tradeCustomers = [
  'Motor trade professionals',
  'Truck and fleet operators',
  'Plant operators',
  'Offshore industry and oil service companies',
  'Marine engineers and ship chandlers',
  'Shipping companies',
  'Emergency services',
  'Councils and local authorities',
]

const timeline = [
  { year: '1973', event: 'Dingbro Ltd founded by the Dingwall Brothers in a 1,000 sq ft unit in Fraserburgh, Aberdeenshire.' },
  { year: '1980s', event: 'Rapid expansion across North East Scotland. Key branches established in Aberdeen and Peterhead, serving the growing oil and gas sector.' },
  { year: '1990s', event: 'Network grows throughout Central Scotland and the West Coast, reaching Glasgow, Edinburgh and surrounding areas.' },
  { year: '2000s', event: 'Expansion into the Scottish Borders and North West England, with branches in Carlisle and Workington.' },
  { year: '2010s', event: 'Emergency services contracts secured with Police Scotland, Scottish Ambulance Service, and Scottish Fire & Rescue Service.' },
  { year: 'Today', event: "Scotland's largest independent motor factor. 29 sites. Over 1,500 employees. £30M+ stockholding. 300,000+ active part lines." },
]

const sectionHead = (eyebrow: string, title: string) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}>{eyebrow}</p>
    </div>
    <h2 className="font-semibold leading-tight" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(22px, 4.5vw, 42px)', color: '#0F1117' }}>
      {title}
    </h2>
  </div>
)

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="subpage-hero pt-40 pb-16 md:pt-52 md:pb-24" style={{ backgroundImage: 'linear-gradient(180deg, rgba(10,15,28,0.55) 0%, rgba(10,15,28,0.78) 60%, rgba(10,15,28,0.92) 100%), url("https://i.postimg.cc/T1dWbLNQ/dingbrobg-(1).jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest" style={{ color: '#93B4FF', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}>Our Story</p>
          </div>
          <h1 className="font-bold uppercase text-white leading-[1.05] md:leading-none max-w-3xl" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(34px, 6vw, 72px)' }}>
            Built on Trust.<br />Grown on Service.
          </h1>
        </div>
      </section>

      {/* About body */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}>About Dingbro</p>
              </div>
              <h2 className="font-semibold leading-tight mb-7" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(22px, 4.5vw, 40px)', color: '#0F1117' }}>
                Scotland's Largest<br />Independent Motor Factor
              </h2>
              <div className="space-y-4 text-base" style={{ color: '#4B5563', lineHeight: 1.8, fontFamily: 'var(--font-inter)' }}>
                <p>Dingbro Ltd are wholesale distributors of motor vehicle components, bodyshop supplies &amp; paint plus truck &amp; trailer parts.</p>
                <p>We are strictly trade only suppliers to the motor trade, truck operators, plant operators, offshore industry, oil service companies, marine engineers, shipping &amp; ship chandlers, emergency services, councils and local authorities.</p>
                <p>We supply a wide range of products, from the original equipment component manufacturers, ranging from small Bosch repair parts for diesel &amp; fuel injection to suspension air bags and brake drums for large lorries &amp; cranes. Filters and batteries for deep sea oil tankers &amp; cruise liners.</p>
                <p>Stockholding within the company is in excess of £30 million, with over 300,000 part lines on our active stock list.</p>
                <p>We have at least a daily delivery in all areas of the mainland that we cover, from the Central Belt, Borders and Cumbria in the South, to Caithness in the North &mdash; many areas enjoy hourly service. We also service Orkney, Shetland, and the Western Isles by ferry.</p>
                <p>Dingbro Ltd are a local family business who started trading in Fraserburgh in a small 1,000 sq ft unit in 1973. Dingbro Ltd (short for Dingwall Brothers) are now the largest independent motor factor in Scotland with over 1,500 staff and a storage area exceeding 400,000 sq ft in 29 sites throughout Scotland and North West England (see <Link href="/contact" style={{ color: '#1c3c8e', textDecoration: 'underline' }}>contacts</Link> for details).</p>
                <p>Customer service is part of a very simple philosophy that we have applied to business since the day we started. Treat people as you would like to be treated yourself. This applies to our outlook on everything — stock, service, personal contact, administration, credits and warranties.</p>
                <p style={{ color: '#0F1117', fontWeight: 600 }}>Keep it simple and do it right every time.</p>
              </div>
            </div>

            <div>
              <div className="p-8 mb-5" style={{ background: '#1c3c8e' }}>
                <p className="font-bold text-white text-xl uppercase mb-5" style={{ fontFamily: 'var(--font-barlow)', letterSpacing: '0.03em' }}>Trade Only Customers</p>
                <ul className="space-y-2.5">
                  {tradeCustomers.map((c) => (
                    <li key={c} className="flex items-start gap-3">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: '#93B4FF', strokeWidth: 1.5 }} />
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)' }}>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { number: '1973', label: 'Founded' },
                  { number: '29', label: 'Branch Sites' },
                  { number: '1,500+', label: 'Employees' },
                  { number: '£30M+', label: 'Stock Value' },
                ].map((s) => (
                  <div key={s.label} className="p-5" style={{ background: 'white', border: '1px solid #E6EAF1', borderRadius: 4 }}>
                    <p className="font-bold text-2xl" style={{ fontFamily: 'var(--font-barlow)', color: '#0F1117' }}>{s.number}</p>
                    <p className="text-xs uppercase tracking-wide mt-1" style={{ color: '#9CA3AF', fontFamily: 'var(--font-inter)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 md:py-24" style={{ background: '#F4F6FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}>Our History</p>
          </div>
          <h2 className="font-semibold leading-tight mb-14" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(22px, 4.5vw, 42px)', color: '#0F1117' }}>
            Five Decades of Growth
          </h2>
          <div className="relative pl-8 md:pl-0">
            <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-px" style={{ background: '#E2E6EF' }} />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="relative md:grid md:grid-cols-[120px_1fr] md:gap-12 pb-10">
                  <div className="hidden md:block absolute left-[120px] top-1.5 -translate-x-1.5 w-3 h-3 rounded-full border-2 border-white" style={{ background: '#1c3c8e' }} />
                  <div className="hidden md:flex justify-end">
                    <span className="font-bold text-base" style={{ fontFamily: 'var(--font-barlow)', color: '#1c3c8e', letterSpacing: '0.03em' }}>{item.year}</span>
                  </div>
                  <div className="md:pl-10">
                    <span className="md:hidden font-bold text-sm mb-1 block" style={{ color: '#1c3c8e', fontFamily: 'var(--font-barlow)' }}>{item.year}</span>
                    <p className="text-sm" style={{ color: '#4B5563', fontFamily: 'var(--font-inter)', lineHeight: 1.7 }}>{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-14 md:py-24" style={{ background: '#1c3c8e' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter)', letterSpacing: '0.2em' }}>Our Philosophy</p>
            <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </div>
          <h2 className="font-bold text-white leading-tight mb-8" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(26px, 5vw, 52px)' }}>
            "Keep It Simple. Do It Right. Every Time."
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-inter)', lineHeight: 1.85 }}>
            Customer service is part of a very simple philosophy we have applied to business since the day we started. Treat people as you would like to be treated yourself — in stock, service, personal contact, administration, credits and warranties.
          </p>
        </div>
      </section>

      <section className="py-14 bg-white" style={{ borderTop: '1px solid #E2E6EF' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          <div>
            <h3 className="font-bold text-xl uppercase mb-1.5" style={{ fontFamily: 'var(--font-barlow)', color: '#0F1117' }}>Ready to work with us?</h3>
            <p className="text-sm" style={{ color: '#6B7280', fontFamily: 'var(--font-inter)' }}>Find your nearest branch or get in touch today. Trade enquiries only.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/branches" className="btn-blue inline-block text-center text-white text-sm font-semibold px-6 py-3" style={{ fontFamily: 'var(--font-inter)' }}>Find Your Branch</Link>
            <Link href="/contact" className="btn-outline-dark inline-block text-center text-sm font-semibold px-6 py-3" style={{ fontFamily: 'var(--font-inter)' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}

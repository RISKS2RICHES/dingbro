'use client'

import { useState } from 'react'
import { branches, regionLabels, type Branch } from '@/data/branches'
import BranchCard from '@/components/BranchCard'

const regions = Object.entries(regionLabels) as [Branch['region'], string][]

export default function BranchesPage() {
  const [active, setActive] = useState<Branch['region'] | 'all'>('all')
  const filtered = active === 'all' ? branches : branches.filter((b) => b.region === active)

  return (
    <>
      <section className="subpage-hero pt-40 pb-14 md:pt-52 md:pb-20" style={{ backgroundImage: 'linear-gradient(180deg, rgba(10,15,28,0.55) 0%, rgba(10,15,28,0.78) 60%, rgba(10,15,28,0.92) 100%), url("https://i.postimg.cc/T1dWbLNQ/dingbrobg-(1).jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest" style={{ color: '#93B4FF', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}>Branch Network</p>
          </div>
          <h1 className="font-bold uppercase text-white leading-[1.05] md:leading-none" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(34px, 6vw, 72px)' }}>
            Branch Network
          </h1>
          <p className="mt-4 text-base max-w-xl" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-inter)' }}>
            29 locations across Scotland and North West England
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="lg:w-52 shrink-0">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)', letterSpacing: '0.15em' }}>Filter by Region</p>
              <ul className="space-y-1">
                <li>
                  <button onClick={() => setActive('all')} className="w-full text-left text-sm px-3 py-2.5 transition-colors duration-150"
                    style={{ fontFamily: 'var(--font-inter)', background: active === 'all' ? '#1c3c8e' : 'transparent', color: active === 'all' ? 'white' : '#374151', fontWeight: active === 'all' ? 600 : 400 }}>
                    All Regions ({branches.length})
                  </button>
                </li>
                {regions.map(([key, label]) => {
                  const count = branches.filter((b) => b.region === key).length
                  return (
                    <li key={key}>
                      <button onClick={() => setActive(key)} className="w-full text-left text-sm px-3 py-2.5 transition-colors duration-150"
                        style={{ fontFamily: 'var(--font-inter)', background: active === key ? '#1c3c8e' : 'transparent', color: active === key ? 'white' : '#374151', fontWeight: active === key ? 600 : 400 }}>
                        {label} ({count})
                      </button>
                    </li>
                  )
                })}
              </ul>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              <p className="text-xs mb-6 uppercase tracking-wide font-medium" style={{ color: '#9CA3AF', fontFamily: 'var(--font-inter)' }}>
                Showing {filtered.length} {filtered.length === 1 ? 'branch' : 'branches'}
                {active !== 'all' && ` in ${regionLabels[active]}`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((branch) => (
                  <BranchCard key={branch.slug} branch={branch} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

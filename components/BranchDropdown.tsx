'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, MapPin, X } from 'lucide-react'
import { branches, regionLabels, type Branch } from '@/data/branches'

type Variant = 'solid' | 'nav'

const grouped: Record<string, Branch[]> = (() => {
  const out: Record<string, Branch[]> = {}
  for (const b of branches) (out[b.region] ||= []).push(b)
  return out
})()

const regionOrder: Array<Branch['region']> = [
  'highland-islands',
  'north-east',
  'central',
  'east',
  'west',
  'borders-south',
  'north-west-england',
]

export default function BranchDropdown({ variant = 'solid' }: { variant?: Variant }) {
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function show() {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setOpen(true)
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 160)
  }

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(false); setMobileOpen(false) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Body scroll lock while mobile sheet is open
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [mobileOpen])

  function onTriggerClick(e: React.MouseEvent) {
    // Mobile: intercept and open full-screen overlay instead of navigating
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      e.preventDefault()
      setMobileOpen(true)
    }
  }

  const triggerClass =
    variant === 'nav'
      ? 'inline-flex items-center text-white text-sm font-semibold px-5 h-[38px]'
      : 'btn-blue inline-flex items-center gap-2 text-white text-sm font-semibold px-8 py-3.5'
  const triggerStyle: React.CSSProperties =
    variant === 'nav'
      ? { background: '#ffffff', color: '#1c3c8e', fontFamily: 'var(--font-inter)' }
      : { fontFamily: 'var(--font-inter)' }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => { if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) show() }}
      onMouseLeave={() => { if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) scheduleClose() }}
      onFocus={() => { if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) show() }}
      onBlur={(e) => {
        if (typeof window !== 'undefined' && !window.matchMedia('(min-width: 768px)').matches) return
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) scheduleClose()
      }}
    >
      <Link
        href="/branches"
        className={triggerClass}
        style={triggerStyle}
        aria-haspopup="true"
        aria-expanded={open || mobileOpen}
        onClick={onTriggerClick}
      >
        Find Your Branch
        {variant === 'solid' && <ArrowRight size={14} strokeWidth={2} />}
      </Link>

      {/* Mobile full-screen overlay (portal — escapes transformed ancestors) */}
      {mobileOpen && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="md:hidden flex flex-col"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 100,
            background: '#FFFFFF',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ background: '#102659', color: 'white' }}>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.22em' }}>
                Branch Network
              </p>
              <h3 className="font-bold uppercase mt-1 leading-tight" style={{ fontFamily: 'var(--font-barlow)', fontSize: 22 }}>
                Find Your Branch
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close branch finder"
              className="w-10 h-10 flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Branch list — scrollable */}
          <div className="flex-1 overflow-y-auto px-5 py-5" style={{ background: '#F2F4F8' }}>
            <p className="text-xs mb-5" style={{ color: '#4B5563', lineHeight: 1.7 }}>
              29 strategic hubs across Scotland &amp; North West England. Tap a branch to view details.
            </p>
            <div className="space-y-6">
              {regionOrder.filter((r) => grouped[r]?.length).map((region) => (
                <div key={region}>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: '#1c3c8e', letterSpacing: '0.2em', borderBottom: '1px solid #E2E6EF', paddingBottom: 6 }}
                  >
                    {regionLabels[region]}
                  </p>
                  <ul className="divide-y" style={{ borderColor: '#E2E6EF' }}>
                    {grouped[region].map((b) => (
                      <li key={b.slug}>
                        <Link
                          href={`/branches/${b.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between py-3 text-sm"
                          style={{ color: '#1A1D23', fontFamily: 'var(--font-inter)' }}
                        >
                          <span className="flex items-center gap-2">
                            <MapPin size={13} style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
                            <span className="font-medium">{b.name}</span>
                          </span>
                          <span className="text-[11px] uppercase tracking-widest" style={{ color: '#1c3c8e', letterSpacing: '0.14em' }}>
                            {b.postcode.split(' ')[0]}
                            <ArrowRight size={12} strokeWidth={2} className="inline ml-1.5 -mt-0.5" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="border-t px-5 py-4 shrink-0" style={{ borderColor: '#E2E6EF', background: '#FFFFFF' }}>
            <Link
              href="/branches"
              onClick={() => setMobileOpen(false)}
              className="btn-blue inline-flex w-full items-center justify-center gap-2 text-white text-sm font-semibold py-3"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              View full branch directory <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>,
        document.body
      )}

      <div
        role="menu"
        aria-hidden={!open}
        className="absolute right-0 z-50"
        style={{
          top: 'calc(100% + 12px)',
          width: 'min(880px, 92vw)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-6px)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      >
        <div
          className="relative"
          style={{
            background: '#ffffff',
            border: '1px solid #E2E6EF',
            boxShadow: '0 20px 60px rgba(16,38,89,0.18)',
          }}
        >
          {/* Top accent rail */}
          <div style={{ height: 3, background: '#1c3c8e' }} />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
            {/* Side panel */}
            <div className="p-6" style={{ background: '#102659', color: 'white' }}>
              <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.22em' }}>
                Branch Network
              </p>
              <h3 className="font-bold uppercase mt-2 leading-tight" style={{ fontFamily: 'var(--font-barlow)', fontSize: '24px', letterSpacing: '0.02em' }}>
                29 Strategic Hubs<br />Across Scotland
              </h3>
              <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                Daily delivery on the mainland; ferry to Orkney, Shetland and the Western Isles.
              </p>
              <Link
                href="/branches"
                className="inline-flex items-center gap-2 mt-5 text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: '#ffffff', letterSpacing: '0.18em' }}
              >
                View full directory <ArrowRight size={12} strokeWidth={2} />
              </Link>
            </div>

            {/* Branch grid by region */}
            <div className="p-5 grid grid-cols-2 gap-x-6 gap-y-4 max-h-[520px] overflow-y-auto">
              {regionOrder.filter((r) => grouped[r]?.length).map((region) => (
                <div key={region}>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: '#1c3c8e', letterSpacing: '0.2em', borderBottom: '1px solid #E2E6EF', paddingBottom: 6 }}
                  >
                    {regionLabels[region]}
                  </p>
                  <ul className="space-y-1">
                    {grouped[region].map((b) => (
                      <li key={b.slug}>
                        <Link
                          href={`/branches/${b.slug}`}
                          className="group flex items-center justify-between py-1 text-[13px]"
                          style={{ color: '#1A1D23', fontFamily: 'var(--font-inter)' }}
                          role="menuitem"
                        >
                          <span className="flex items-center gap-1.5">
                            <MapPin size={11} style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
                            {b.name}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#1c3c8e', letterSpacing: '0.14em' }}>
                            {b.postcode.split(' ')[0]}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

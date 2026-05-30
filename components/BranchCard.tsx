import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import type { Branch } from '@/data/branches'

export default function BranchCard({ branch }: { branch: Branch }) {
  return (
    <div
      className="branch-card bg-white flex flex-col"
      style={{
        borderTop: '3px solid #1c3c8e',
        border: '1px solid #E2E6EF',
        borderTop: '3px solid #1c3c8e',
        padding: '24px',
        transition: 'box-shadow 0.15s',
      }}
    >
      <h3
        className="font-bold text-lg uppercase mb-3"
        style={{ fontFamily: 'var(--font-barlow)', color: '#0F1117', letterSpacing: '0.03em' }}
      >
        {branch.name}
      </h3>

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          <MapPin size={13} className="mt-1 shrink-0" style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
          <p className="text-xs leading-relaxed" style={{ color: '#6B7280', fontFamily: 'var(--font-inter)' }}>
            {branch.address}, {branch.town}, {branch.postcode}
          </p>
        </div>
        <a href={`tel:${branch.tel.replace(/\s/g, '')}`} className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
          <Phone size={13} style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
          <span className="text-xs font-medium" style={{ color: '#374151', fontFamily: 'var(--font-inter)' }}>{branch.tel}</span>
        </a>
        <a href={`mailto:${branch.email}`} className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
          <Mail size={13} style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
          <span className="text-xs" style={{ color: '#374151', fontFamily: 'var(--font-inter)' }}>{branch.email}</span>
        </a>
      </div>

      <div className="pt-3 mb-4" style={{ borderTop: '1px solid #E2E6EF' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)' }}>
          {branch.managerTitle || 'Branch Manager'}
        </p>
        <p className="text-sm font-medium" style={{ color: '#1A1D23', fontFamily: 'var(--font-inter)' }}>{branch.manager}</p>
        {branch.deputy && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide mt-2 mb-0.5" style={{ color: '#9CA3AF', fontFamily: 'var(--font-inter)' }}>
              {branch.deputyTitle || 'Deputy Branch Manager'}
            </p>
            <p className="text-sm" style={{ color: '#4B5563', fontFamily: 'var(--font-inter)' }}>{branch.deputy}</p>
          </>
        )}
      </div>

      <Link
        href={`/branches/${branch.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
        style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)', textDecoration: 'none', letterSpacing: '0.08em' }}
      >
        View Branch <ArrowRight size={12} strokeWidth={2.5} />
      </Link>
    </div>
  )
}

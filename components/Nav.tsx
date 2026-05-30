'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import Image from 'next/image'
import BranchDropdown from './BranchDropdown'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/branches', label: 'Branch Network' },
  { href: '/reach', label: 'REACH' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <nav
        className="site-nav fixed left-0 right-0 z-50 transition-all duration-200"
        style={{
          top: 'var(--announcement-h, 32px)',
          background: '#F4F6FA',
          borderBottom: '1px solid #E2E6EF',
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="https://i.postimg.cc/SN8yxTDR/dingdong.jpg"
              alt="Dingbro Ltd"
              width={210}
              height={64}
              className="h-12 sm:h-12 md:h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium${pathname === link.href ? ' active' : ''}`}
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <BranchDropdown variant="nav" />
            </div>
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 transition-colors"
              style={{ background: 'transparent', color: '#1c3c8e' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={28} strokeWidth={2.2} /> : <Plus size={28} strokeWidth={2.2} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col" style={{ background: '#F4F6FA', paddingTop: '112px' }}>
          <div className="flex flex-col px-6 pt-10 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-barlow)',
                  color: pathname === link.href ? '#1c3c8e' : '#1A1D23',
                  letterSpacing: '0.03em',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/branches"
              className="btn-blue mt-4 inline-block text-white text-sm font-semibold px-8 py-3 text-center"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Find Your Branch
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

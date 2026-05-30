import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#1c3c8e' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <Image
                src="https://i.postimg.cc/SN8yxTDR/dingdong.jpg"
                alt="Dingbro Ltd"
                width={140}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)' }}>
              Take The Scottish Factor Into Your Equation
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-inter)' }}>
              Scotland's Largest Independent Motor Factor Since 1973
            </p>
            <div className="mt-5 h-px w-10" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)', letterSpacing: '0.15em' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Dingbro' },
                { href: '/services', label: 'Products & Services' },
                { href: '/branches', label: 'Branch Network' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors duration-150 hover:text-white" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)', textDecoration: 'none' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)', letterSpacing: '0.15em' }}>
              Key Regions
            </h4>
            <ul className="space-y-3">
              {['Highland & Islands', 'North East Scotland', 'Central Belt', 'West of Scotland', 'East of Scotland', 'Borders & North England'].map((r) => (
                <li key={r}>
                  <Link href="/branches" className="text-sm transition-colors duration-150 hover:text-white" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)', textDecoration: 'none' }}>{r}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)', letterSpacing: '0.15em' }}>
              Head Office
            </h4>
            <address className="not-italic space-y-2">
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)' }}>
                Unit 7-9, Whitemyres Avenue<br />
                Mastrick Industrial Estate<br />
                Aberdeen AB16 6HQ
              </p>
              <p>
                <a href="tel:01224682000" className="text-sm transition-colors duration-150 hover:text-white" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)', textDecoration: 'none' }}>
                  01224 682000
                </a>
              </p>
              <p>
                <a href="mailto:aberdeen@dingbro.com" className="text-sm transition-colors duration-150 hover:text-white" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-inter)', textDecoration: 'none' }}>
                  aberdeen@dingbro.com
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)' }}>
            &copy; 2025 Dingbro Ltd. All rights reserved. Trade Only.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 sm:gap-x-4 gap-y-2">
            <Link href="/terms" className="text-xs uppercase tracking-widest whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)', letterSpacing: '0.15em', textDecoration: 'none' }}>
              Terms &amp; Conditions
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <Link href="/admin/login" className="text-xs uppercase tracking-widest whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)', letterSpacing: '0.15em', textDecoration: 'none' }}>
              Admin Portal
            </Link>
            <span className="hidden sm:inline" style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <p className="text-xs whitespace-nowrap w-full sm:w-auto" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)' }}>
              Registered in Scotland
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

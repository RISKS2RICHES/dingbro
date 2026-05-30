import type { Metadata } from 'next'
import { MapPin, Phone, Mail, AlertCircle } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Dingbro Ltd. Trade enquiries only. Aberdeen head office: AB16 6HQ. Tel: 01224 682000.',
}

export default function ContactPage() {
  return (
    <>
      <section className="subpage-hero pt-40 pb-14 md:pt-52 md:pb-20" style={{ backgroundImage: 'linear-gradient(180deg, rgba(10,15,28,0.55) 0%, rgba(10,15,28,0.78) 60%, rgba(10,15,28,0.92) 100%), url("https://i.postimg.cc/T1dWbLNQ/dingbrobg-(1).jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest" style={{ color: '#93B4FF', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}>Get In Touch</p>
          </div>
          <h1 className="font-bold uppercase text-white leading-[1.05] md:leading-none" style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(34px, 6vw, 72px)' }}>
            Contact Us
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-7">
                <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)', letterSpacing: '0.15em' }}>Send an Enquiry</p>
              </div>
              <ContactForm />
            </div>

            <div>
              <div className="p-7 mb-5" style={{ background: '#1c3c8e' }}>
                <p className="font-bold text-white text-lg uppercase mb-5" style={{ fontFamily: 'var(--font-barlow)', letterSpacing: '0.03em' }}>
                  Head Office — Aberdeen
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={14} className="mt-1 shrink-0" style={{ color: '#93B4FF', strokeWidth: 1.5 }} />
                    <address className="not-italic text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-inter)' }}>
                      Unit 7-9, Whitemyres Avenue<br />Mastrick Industrial Estate<br />Aberdeen AB16 6HQ
                    </address>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={14} style={{ color: '#93B4FF', strokeWidth: 1.5 }} />
                    <a href="tel:01224682000" className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-inter)', textDecoration: 'none' }}>01224 682000</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={14} style={{ color: '#93B4FF', strokeWidth: 1.5 }} />
                    <a href="mailto:aberdeen@dingbro.com" className="text-sm" style={{ color: '#93B4FF', fontFamily: 'var(--font-inter)', textDecoration: 'none' }}>aberdeen@dingbro.com</a>
                  </div>
                </div>
              </div>

              <div className="p-5 flex items-start gap-3" style={{ background: '#F4F6FA', border: '1px solid #E2E6EF', borderLeft: '3px solid #1c3c8e' }}>
                <AlertCircle size={15} className="mt-0.5 shrink-0" style={{ color: '#1c3c8e', strokeWidth: 1.5 }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)' }}>Trade Enquiries Only</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#6B7280', fontFamily: 'var(--font-inter)' }}>
                    Dingbro Ltd is a wholesale trade-only supplier. We do not supply to members of the public. All enquiries must be from a registered trade customer or business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

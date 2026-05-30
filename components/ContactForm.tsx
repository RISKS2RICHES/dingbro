'use client'

import { useState } from 'react'

const baseInput: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '14px',
  border: '1px solid #E2E6EF',
  borderRadius: 0,
  padding: '10px 14px',
  width: '100%',
  outline: 'none',
  color: '#1A1D23',
  background: 'white',
  transition: 'border-color 0.15s',
}

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null)

  const inputStyle = (name: string): React.CSSProperties => ({
    ...baseInput,
    borderColor: focused === name ? '#1c3c8e' : '#E2E6EF',
  })

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
          { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Your company' },
        ].map(({ name, label, type, placeholder }) => (
          <div key={name}>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#1A1D23', fontFamily: 'var(--font-inter)', letterSpacing: '0.08em' }}>
              {label} *
            </label>
            <input type={type} required placeholder={placeholder} style={inputStyle(name)}
              onFocus={() => setFocused(name)} onBlur={() => setFocused(null)} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@company.com' },
          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '01234 567890' },
        ].map(({ name, label, type, placeholder }) => (
          <div key={name}>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#1A1D23', fontFamily: 'var(--font-inter)', letterSpacing: '0.08em' }}>
              {label}{name === 'email' ? ' *' : ''}
            </label>
            <input type={type} required={name === 'email'} placeholder={placeholder} style={inputStyle(name)}
              onFocus={() => setFocused(name)} onBlur={() => setFocused(null)} />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#1A1D23', fontFamily: 'var(--font-inter)', letterSpacing: '0.08em' }}>
          Subject *
        </label>
        <select required style={{
          ...inputStyle('subject'),
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231D3B8B' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
          paddingRight: '36px',
        }}
          onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}>
          <option value="">Select a subject</option>
          <option value="general">General Enquiry</option>
          <option value="trade-account">Trade Account</option>
          <option value="parts">Parts Query</option>
          <option value="emergency">Emergency Services</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#1A1D23', fontFamily: 'var(--font-inter)', letterSpacing: '0.08em' }}>
          Message *
        </label>
        <textarea required rows={6} placeholder="Your enquiry..."
          style={{ ...inputStyle('message'), resize: 'vertical' }}
          onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
      </div>

      <button type="submit" className="btn-blue w-full py-3.5 text-white text-sm font-semibold uppercase tracking-widest"
        style={{ fontFamily: 'var(--font-inter)', letterSpacing: '0.12em' }}>
        Send Enquiry
      </button>
    </form>
  )
}

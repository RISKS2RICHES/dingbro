import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react'

const items = [
  { icon: Phone, label: '01224 682000', href: 'tel:01224682000' },
  { icon: Mail, label: 'aberdeen@dingbro.com', href: 'mailto:aberdeen@dingbro.com' },
  { icon: MapPin, label: 'Head Office — Aberdeen AB16 6HQ' },
  { icon: ShieldCheck, label: 'Strictly Trade Only — Est. 1973' },
  { icon: MapPin, label: '29 Branches · Scotland & North West England' },
]

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="announcement-row" aria-hidden={ariaHidden}>
      {items.map((it, i) => {
        const Icon = it.icon
        const content = (
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <Icon size={12} strokeWidth={2} style={{ opacity: 0.85 }} />
            <span>{it.label}</span>
          </span>
        )
        return (
          <span key={i} className="announcement-item">
            {it.href ? (
              <a href={it.href} className="announcement-link">{content}</a>
            ) : (
              content
            )}
            <span className="announcement-sep" aria-hidden="true">·</span>
          </span>
        )
      })}
    </div>
  )
}

export default function AnnouncementBar() {
  return (
    <div
      className="announcement-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: '#1c3c8e',
        height: 32,
        color: 'rgba(255,255,255,0.92)',
        fontFamily: 'var(--font-inter)',
        fontSize: 11.5,
        letterSpacing: '0.04em',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="announcement-marquee">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  )
}

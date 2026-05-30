import { CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

type LogoItem = { name: string; src: string; w: number }

const fallbackA: LogoItem[] = [
  { name: 'Police Scotland', src: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Logo_of_Police_Scotland.svg/500px-Logo_of_Police_Scotland.svg.png', w: 140 },
  { name: 'Scottish Ambulance Service', src: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Scottish_Ambulance_Service_logo.svg/1280px-Scottish_Ambulance_Service_logo.svg.png', w: 170 },
  { name: 'Scottish Fire and Rescue', src: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Scottish_Fire_and_Rescue_Service_logo.svg/1280px-Scottish_Fire_and_Rescue_Service_logo.svg.png', w: 170 },
  { name: 'Scotland Excel', src: 'https://home.scotland-excel.org.uk/images/Logo.png', w: 160 },
  { name: 'TAQA Offshore', src: 'https://i.postimg.cc/KjjfrcZN/taqa-small-logo.webp', w: 120 },
  { name: 'Tidewater Marine', src: 'https://i.postimg.cc/SNwdCpHB/tidee.png', w: 150 },
  { name: 'Vroon Offshore Services', src: 'https://i.postimg.cc/d3g228NC/vroon-removebg-preview.png', w: 90 },
]

const fallbackB: LogoItem[] = [
  { name: 'Bosch', src: 'https://i.postimg.cc/0yySzXNq/Bosch-logo-svg.png', w: 130 },
  { name: 'Delphi Technologies', src: 'https://i.postimg.cc/Rhm64XYQ/delph-removebg-preview.png', w: 150 },
  { name: 'Mann + Hummel', src: 'https://i.postimg.cc/qBKxrFNC/mannn.png', w: 120 },
  { name: 'AkzoNobel', src: 'https://i.postimg.cc/Rqrt6vqg/Akzo-Nobel-Logo.png', w: 150 },
  { name: 'PPG Refinish', src: 'https://i.postimg.cc/wvZ22873/asw-removebg-preview.png', w: 130 },
  { name: 'MaxMeyer', src: 'https://i.postimg.cc/rwR8Z5hv/Max-Meyer-4col-logo-1.png', w: 140 },
  { name: 'NGK Spark Plugs', src: 'https://i.postimg.cc/GhsNZzC7/NGK-Spark-Plugs-(Circle).webp', w: 70 },
  { name: 'Hella', src: 'https://i.postimg.cc/BbZSmyk0/Hella-logo-svg.png', w: 120 },
  { name: 'Exide Technologies', src: 'https://i.postimg.cc/nhNLn3jQ/exxx-removebg-preview.png', w: 150 },
]

async function loadSponsors(): Promise<{ trackA: LogoItem[]; trackB: LogoItem[] }> {
  try {
    const admin = createSupabaseAdminClient()
    const { data } = await admin
      .from('sponsors')
      .select('name, logo_url, display_width, track, position')
      .order('position', { ascending: true })

    type Row = { name: string; logo_url: string; display_width: number | null; track: string }
    const rows = (data as Row[] | null) || []
    if (rows.length === 0) return { trackA: fallbackA, trackB: fallbackB }

    const map = (r: Row): LogoItem => ({ name: r.name, src: r.logo_url, w: r.display_width || 150 })
    const trackA = rows.filter((r) => r.track === 'A').map(map)
    const trackB = rows.filter((r) => r.track === 'B').map(map)
    return {
      trackA: trackA.length ? trackA : fallbackA,
      trackB: trackB.length ? trackB : fallbackB,
    }
  } catch {
    return { trackA: fallbackA, trackB: fallbackB }
  }
}

function Chip({ logo }: { logo: LogoItem }) {
  return (
    <span className="logo-chip" style={{ width: logo.w + 24 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.name}
        style={{ width: logo.w, height: 64, objectFit: 'contain' }}
      />
    </span>
  )
}

function Track({ items, reverse = false, duration = 55 }: { items: LogoItem[]; reverse?: boolean; duration?: number }) {
  return (
    <div
      className={`marquee ${reverse ? 'marquee--reverse' : ''}`}
      style={{ ['--marquee-duration' as never]: `${duration}s` } as CSSProperties}
    >
      <div className="marquee__track">
        {items.map((l) => <Chip key={`a-${l.name}`} logo={l} />)}
      </div>
      <div className="marquee__track" aria-hidden="true">
        {items.map((l) => <Chip key={`b-${l.name}`} logo={l} />)}
      </div>
    </div>
  )
}

export default async function DualMarquee() {
  const { trackA, trackB } = await loadSponsors()

  return (
    <section className="pt-6 pb-6 sm:pt-10 sm:pb-10 bg-white" style={{ borderTop: '1px solid #E2E6EF', borderBottom: '1px solid #E2E6EF' }}>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="max-w-7xl mx-auto px-6 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest inline-flex items-center gap-2" style={{ color: '#8A93A6', letterSpacing: '0.2em' }}>
              Enterprise clients &amp; frameworks
              <ArrowRight size={13} strokeWidth={2} style={{ color: '#1c3c8e' }} />
            </p>
          </div>
          <Track items={trackA} duration={55} />
        </div>
        <div>
          <div className="max-w-7xl mx-auto px-6 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest inline-flex items-center gap-2" style={{ color: '#8A93A6', letterSpacing: '0.2em' }}>
              Tier-1 OE manufacturing partners
              <ArrowRight size={13} strokeWidth={2} style={{ color: '#1c3c8e' }} />
            </p>
          </div>
          <Track items={trackB} reverse duration={65} />
        </div>
      </div>
    </section>
  )
}

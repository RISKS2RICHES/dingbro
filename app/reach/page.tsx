import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'REACH',
  description:
    'Dingbro Ltd statement on REACH — Registration, Evaluation, Authorisation and Restriction of Chemicals. Contact our REACH representative Robert Parfitt.',
}

type Section = { id: string; heading: string; body: React.ReactNode[] }

const sections: Section[] = [
  {
    id: 'overview',
    heading: 'Overview',
    body: [
      'The Registration, Evaluation, Authorisation and Restriction of Chemicals regulations (REACH) came into force in the UK on the 1st June 2007. REACH aims to ensure that the risks posed by the use of chemicals are assessed, documented, minimised and communicated, and that unsafe substances are replaced with safe substances.',
      'It places the responsibility for assessing chemicals with manufacturers and importers, under the aegis of the newly created European Chemicals Agency, and tasks users with ensuring that they inform upstream suppliers about the uses of chemicals and pass relevant information downstream to other users.',
    ],
  },
  {
    id: 'registration',
    heading: 'Registration of Use',
    body: [
      'Since the regulation requires ‘use’ to be registered, downstream users need to inform suppliers of their substance use and ask for pre-registration details, Safety Data Sheets (SDS) and other information by the end of 2008. Ultimately, if a use has not been registered for a chemical, then it will be against the law to use the chemical in that way.',
    ],
  },
  {
    id: 'features',
    heading: 'Important Features',
    body: [
      'REACH applies to ALL chemicals — not only those used in industrial processes, but also those used on a day-to-day basis (furniture, cleaning products, paints, clothing, etc).',
      'REACH applies to all businesses within the supply chain.',
      'One organisation can have several different roles, and therefore different obligations, under REACH. The terms used in REACH to describe a role may be quite differently interpreted elsewhere.',
      'REACH only applies to the chemicals (substances) within products (preparations or articles) — not to the products themselves.',
      'A pre-registration window opened on the 1st June 2008. This offered a free and simple way of continuing production and use of certain substances and extended registration deadlines for those substances to 2010–2018. The window closed on 30th November 2008, after which a full registration must take place.',
      'Substances, and uses, not complying with REACH will not be able to be traded or used.',
    ],
  },
  {
    id: 'commitment',
    heading: 'Dingbro’s Commitment',
    body: [
      'Dingbro Ltd are aware of the Regulations and committed to meeting our legal obligations. We have appointed Robert Parfitt as our REACH representative.',
      (
        <span key="contact">
          He can be contacted by email at{' '}
          <a href="mailto:robert.parfitt@dingbro.com" className="reach-link">robert.parfitt@dingbro.com</a>
          {' '}or by phone on{' '}
          <a href="tel:01224666528" className="reach-link">01224 666528</a>.
        </span>
      ),
      (
        <span key="autoreach">
          Dingbro Ltd are using the automotive industry online communication tool at{' '}
          <a href="https://www.auto-reach.com" target="_blank" rel="noopener noreferrer" className="reach-link">www.auto-reach.com</a>
          {' '}to manage our communications obligations. Our user name is{' '}
          <strong style={{ color: '#0F1117', fontWeight: 600 }}>Dingbro Ltd</strong>
          {' '}and you are invited to register on the site and link with us there.
        </span>
      ),
    ],
  },
]

export default function ReachPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-40 pb-14 md:pt-44 md:pb-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,17,23,0.72), rgba(15,17,23,0.72)), url("https://i.postimg.cc/T1dWbLNQ/dingbrobg-(1).jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#1c3c8e' }} />
            <p
              className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest"
              style={{ color: '#93B4FF', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}
            >
              Compliance
            </p>
          </div>
          <h1
            className="font-bold uppercase text-white leading-[1.05] md:leading-none max-w-3xl"
            style={{ fontFamily: 'var(--font-barlow)', fontSize: 'clamp(34px, 6vw, 72px)' }}
          >
            REACH
          </h1>
          <p
            className="mt-6 max-w-2xl text-base md:text-lg"
            style={{ color: 'rgba(255,255,255,0.78)', fontFamily: 'var(--font-inter)', lineHeight: 1.7 }}
          >
            Registration, Evaluation, Authorisation and Restriction of Chemicals.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
          {/* Sticky TOC */}
          <aside className="lg:sticky lg:top-28 self-start">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#1c3c8e', fontFamily: 'var(--font-inter)', letterSpacing: '0.18em' }}
            >
              Contents
            </p>
            <ul className="space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm transition-colors duration-150"
                    style={{ color: '#4B5563', fontFamily: 'var(--font-inter)' }}
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <div className="space-y-14">
            {sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-28">
                <h2
                  className="font-semibold mb-5"
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontSize: 'clamp(22px, 2.5vw, 30px)',
                    color: '#0F1117',
                  }}
                >
                  {s.heading}
                </h2>
                {s.id === 'features' ? (
                  <ul
                    className="space-y-3 text-base"
                    style={{ color: '#4B5563', lineHeight: 1.8, fontFamily: 'var(--font-inter)' }}
                  >
                    {s.body.map((p, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          style={{
                            display: 'inline-block',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#1c3c8e',
                            marginTop: 11,
                            flexShrink: 0,
                          }}
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div
                    className="space-y-4 text-base"
                    style={{ color: '#4B5563', lineHeight: 1.8, fontFamily: 'var(--font-inter)' }}
                  >
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
              </article>
            ))}

            {/* Contact card */}
            <aside
              className="mt-4 rounded-none p-6 md:p-8"
              style={{ background: '#F4F6FA', borderLeft: '3px solid #1c3c8e' }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: '#1c3c8e', letterSpacing: '0.22em', fontFamily: 'var(--font-inter)' }}
              >
                REACH Representative
              </p>
              <p
                className="font-bold mb-1"
                style={{ fontFamily: 'var(--font-barlow)', fontSize: 22, color: '#0F1117' }}
              >
                Robert Parfitt
              </p>
              <p
                className="text-sm mb-4"
                style={{ color: '#4B5563', fontFamily: 'var(--font-inter)' }}
              >
                Dingbro Ltd — Aberdeen Head Office
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                <a href="mailto:robert.parfitt@dingbro.com" className="reach-link" style={{ color: '#1c3c8e', fontWeight: 600 }}>
                  robert.parfitt@dingbro.com
                </a>
                <a href="tel:01224666528" className="reach-link" style={{ color: '#1c3c8e', fontWeight: 600 }}>
                  01224 666528
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

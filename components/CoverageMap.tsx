'use client'

import { useEffect, useRef, useState } from 'react'
import type { Branch } from '@/data/branches'

export default function CoverageMap({ branches, token }: { branches: Branch[]; token: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [selected, setSelected] = useState<Branch | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      await import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.accessToken = token
      const map = new mapboxgl.Map({
        container: containerRef.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-4.2026, 56.6],
        zoom: 5.0,
        projection: { name: 'mercator' },
        attributionControl: false,
      })
      mapRef.current = map

      map.on('load', () => {
        // Remove blue water — use light grey instead
        try { map.setPaintProperty('water', 'fill-color', '#DDE3EC') } catch {}
        try { map.setPaintProperty('waterway', 'line-color', '#DDE3EC') } catch {}
        const features = branches.map((b) => ({
          type: 'Feature' as const,
          properties: { slug: b.slug },
          geometry: { type: 'Point' as const, coordinates: b.coordinates },
        }))

        map.addSource('branches', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features },
        })

        map.addLayer({
          id: 'branches-x',
          type: 'symbol',
          source: 'branches',
          layout: {
            'text-field': '✕',
            'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
            'text-size': 18,
            'text-allow-overlap': true,
            'text-ignore-placement': true,
          },
          paint: {
            'text-color': '#1c3c8e',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5,
          },
        })

        map.on('mouseenter', 'branches-x', () => { map.getCanvas().style.cursor = 'pointer' })
        map.on('mouseleave', 'branches-x', () => { map.getCanvas().style.cursor = '' })

        map.on('click', 'branches-x', (e) => {
          const slug = e.features?.[0]?.properties?.slug as string | undefined
          if (!slug) return
          const branch = branches.find((b) => b.slug === slug)
          if (branch) setSelected(branch)
        })
      })
    }
    init()
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [branches, token])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />

      {/* Slide-out branch panel */}
      <div
        className="absolute top-0 left-0 h-full bg-white shadow-2xl transition-transform duration-300 ease-out"
        style={{
          width: 340,
          maxWidth: '85%',
          transform: selected ? 'translateX(0)' : 'translateX(-100%)',
          borderRight: '1px solid #E2E6EF',
          zIndex: 5,
        }}
      >
        {selected && (
          <div className="h-full flex flex-col p-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-px w-6" style={{ background: '#1c3c8e' }} />
                <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#1c3c8e', letterSpacing: '0.2em' }}>
                  Branch
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close branch panel"
                className="p-1 text-gray-500 hover:text-gray-900 transition-colors"
                style={{ fontSize: 20, lineHeight: 1 }}
              >
                ✕
              </button>
            </div>
            <h3
              className="font-bold uppercase mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-barlow)', fontSize: 30, color: '#0A0F1C', letterSpacing: '-0.005em' }}
            >
              {selected.name}
            </h3>
            <div className="space-y-1 text-sm mb-6" style={{ color: '#4B5563', lineHeight: 1.6 }}>
              <p>{selected.address}</p>
              <p>{selected.town}</p>
              <p>{selected.postcode}</p>
            </div>
            <div className="space-y-3 pb-6 mb-6" style={{ borderBottom: '1px solid #E2E6EF' }}>
              <a
                href={`tel:${selected.tel.replace(/\s/g, '')}`}
                className="block text-sm font-semibold"
                style={{ color: '#1c3c8e' }}
              >
                {selected.tel}
              </a>
              <a
                href={`mailto:${selected.email}`}
                className="block text-sm"
                style={{ color: '#4B5563' }}
              >
                {selected.email}
              </a>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#8A93A6', letterSpacing: '0.18em' }}>
                  {selected.managerTitle || 'Branch Manager'}
                </p>
                <p style={{ color: '#0A0F1C' }}>{selected.manager}</p>
              </div>
              {selected.deputy && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#8A93A6', letterSpacing: '0.18em' }}>
                    {selected.deputyTitle || 'Deputy'}
                  </p>
                  <p style={{ color: '#0A0F1C' }}>{selected.deputy}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

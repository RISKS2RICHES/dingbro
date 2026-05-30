'use client'

import { useEffect, useRef } from 'react'

export default function BranchMap({ coordinates, name, token }: { coordinates: [number, number]; name: string; token: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      await import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.accessToken = token
      const map = new mapboxgl.Map({
        container: containerRef.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: coordinates,
        zoom: 14,
        projection: { name: 'mercator' },
        attributionControl: false,
      })
      mapRef.current = map
      map.on('load', () => {
        const el = document.createElement('div')
        el.style.cssText = 'width:18px;height:18px;border-radius:50%;background:#1c3c8e;border:3px solid white;box-shadow:0 2px 8px rgba(29,59,139,0.4)'
        new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map)
      })
    }
    init()
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [coordinates, token, name])

  return <div ref={containerRef} className="w-full h-full" />
}

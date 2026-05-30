'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCounterProps {
  value: string
  label: string
  dark?: boolean
}

function parseNumber(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([^0-9]*)([0-9,]+)(.*)$/)
  if (!match) return { prefix: '', number: 0, suffix: value }
  return { prefix: match[1] || '', number: parseInt(match[2].replace(/,/g, ''), 10), suffix: match[3] || '' }
}

export default function StatCounter({ value, label, dark = false }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { prefix, number, suffix } = parseNumber(value)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const duration = 1800
    const steps = 60
    const increment = number / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= number) { setCount(number); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, number])

  return (
    <div ref={ref} className="flex flex-col">
      <span
        className="font-bold leading-none"
        style={{
          fontFamily: 'var(--font-barlow)',
          fontSize: 'clamp(36px, 4vw, 52px)',
          color: dark ? 'white' : '#1c3c8e',
        }}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <span
        className="mt-2 text-xs font-semibold uppercase tracking-widest"
        style={{
          fontFamily: 'var(--font-inter)',
          color: dark ? 'rgba(255,255,255,0.5)' : '#9CA3AF',
          letterSpacing: '0.14em',
        }}
      >
        {label}
      </span>
    </div>
  )
}

'use client'

import { ReactNode, CSSProperties } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  as?: 'div' | 'span' | 'li' | 'p' | 'h2' | 'h3' | 'section'
  className?: string
  style?: CSSProperties
}

export default function Reveal({ children, as = 'div', className = '', style }: RevealProps) {
  const Tag = as as keyof JSX.IntrinsicElements
  return (
    <Tag className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  )
}

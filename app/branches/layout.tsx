import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Branches',
  description: 'Dingbro Ltd branch network — 29 sites across Scotland and North West England.',
}

export default function BranchesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

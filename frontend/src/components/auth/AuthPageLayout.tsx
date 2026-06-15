import type { ReactNode } from 'react'
import { AuthIllustration } from '@/components/auth/AuthIllustration'

interface AuthPageLayoutProps {
  children: ReactNode
}

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-[640px] w-full">
      <AuthIllustration />
      <div className="flex w-full flex-col justify-center px-8 py-16 sm:px-12 lg:w-1/2 lg:px-[135px] lg:py-20">
        {children}
      </div>
    </div>
  )
}

import { memo } from 'react'
import { cn } from '@/lib/utils'

interface NavigationProps {
  onNavigate: (id: string) => void
}

export const Navigation = memo(({ onNavigate }: NavigationProps) => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {/* Navigation is now empty, ready for any future items */}
    </nav>
  )
})
Navigation.displayName = 'Navigation' 
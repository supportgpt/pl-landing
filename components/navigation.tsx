import { memo } from 'react'
import { cn } from '@/lib/utils'

interface NavigationProps {
  onNavigate: (id: string) => void
}

const navItems = [
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'expertise', label: 'Why Us' },
  { id: 'process', label: 'Process' }
]

export const Navigation = memo(({ onNavigate }: NavigationProps) => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className="text-white/80 hover:text-white transition-all duration-200 text-base font-medium hover:scale-105"
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
})
Navigation.displayName = 'Navigation' 
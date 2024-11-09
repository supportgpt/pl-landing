import { memo, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface NavigationProps {
  onNavigate: (id: string) => void
}

const NavigationItem = memo(({ id, label, onNavigate }: { 
  id: string
  label: string
  onNavigate: (id: string) => void 
}) => {
  const handleClick = useCallback(() => {
    onNavigate(id)
  }, [id, onNavigate])

  return (
    <button
      onClick={handleClick}
      className={cn(
        "font-medium appearance-none bg-transparent text-white",
        "hover:text-gray-300 transform-gpu",
        "will-change-transform"
      )}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        touchAction: 'manipulation'
      }}
    >
      {label}
    </button>
  )
})
NavigationItem.displayName = 'NavigationItem'

export const Navigation = memo(({ onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    // Add other items as needed
  ]

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <NavigationItem
          key={item.id}
          id={item.id}
          label={item.label}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  )
})
Navigation.displayName = 'Navigation' 
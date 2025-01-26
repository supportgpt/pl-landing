import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  onNavigate: (id: string) => void
}

const navigationItems = [
  { id: 'services', label: 'Services' },
  { id: 'expertise', label: 'Why Us' },
  { id: 'process', label: 'Process' },
  { id: 'portfolio', label: 'Work' },
  { id: 'apps', label: 'Apps' },
] as const

export function Navigation({ onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (id: string) => {
    onNavigate(id)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="text-white/80 hover:text-white transition-colors duration-200"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10 p-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="text-white/80 hover:text-white transition-colors duration-200 text-left py-2"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  )
} 
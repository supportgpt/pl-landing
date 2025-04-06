import Link from 'next/link'

interface NavigationProps {
  onNavigate: (id: string) => void
}

export function Navigation({ onNavigate }: NavigationProps) {
  return (
    <nav className="hidden md:flex items-center gap-8">
      <Link
        href="#services"
        onClick={(e) => {
          e.preventDefault()
          onNavigate('services')
        }}
        className="text-white/80 hover:text-white transition-colors"
      >
        Services
      </Link>
      <Link
        href="#expertise"
        onClick={(e) => {
          e.preventDefault()
          onNavigate('expertise')
        }}
        className="text-white/80 hover:text-white transition-colors"
      >
        Why Us
      </Link>
      <Link
        href="#process"
        onClick={(e) => {
          e.preventDefault()
          onNavigate('process')
        }}
        className="text-white/80 hover:text-white transition-colors"
      >
        Process
      </Link>
      <Link
        href="#portfolio"
        onClick={(e) => {
          e.preventDefault()
          onNavigate('portfolio')
        }}
        className="text-white/80 hover:text-white transition-colors"
      >
        Projects
      </Link>
    </nav>
  )
} 
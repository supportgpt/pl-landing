import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

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
        Expertise
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
        Work
      </Link>
      <Link
        href="#apps"
        onClick={(e) => {
          e.preventDefault()
          onNavigate('apps')
        }}
        className="text-white/80 hover:text-white transition-colors"
      >
        Apps
      </Link>
    </nav>
  )
} 
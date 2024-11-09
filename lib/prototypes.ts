import { Prototype } from "./types"

export const prototypes: Prototype[] = [
  {
    id: 'finance-app',
    slug: 'finance-app',
    name: 'Finance Dashboard',
    description: 'A modern finance management application with analytics and card management.',
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
  }
]

export function getPrototypeBySlug(slug: string): Prototype | undefined {
  return prototypes.find(p => p.slug === slug)
} 
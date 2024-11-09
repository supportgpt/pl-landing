import { LucideIcon } from 'lucide-react'

export type PrototypeViewType = 'desktop' | 'mobile'
export type ActiveScreen = 'main' | 'transactions' | 'cards'

export interface FormData {
  email: string
  name: string
  projectDetails: string
}

export interface MenuItemType {
  icon: LucideIcon
  label: string
  screen: ActiveScreen
}

export interface PrototypeProps {
  type: PrototypeViewType
}

export interface FormState {
  email: string
  name: string
  projectDetails: string
}

export interface FormError {
  email?: string
  name?: string
  projectDetails?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface PrototypeSubmitResponse {
  success: boolean
  message: string
} 
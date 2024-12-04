'use client'

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Monitor, 
  Users, 
  Settings, 
  CreditCard,
  Smartphone,
  Mail,
  ArrowLeft,
  ArrowRight,
  X,
  Info,
  Share2,
  Zap,
  Box,
  Layout,
  Loader2,
  ChevronDown,
  Handshake,
  Rocket
} from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'
import { cn } from "@/lib/utils"
import { Navigation } from './navigation'

interface FormData {
  email: string
  name: string
  projectDetails: string
}

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement
}

const Divider = () => (
  <div className="py-16">
    <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
      <div className="flex-grow border-t border-white/20"></div>
      <div className="mx-4">
        <div className="w-4 h-4 border-2 border-white/40 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
      <div className="flex-grow border-t border-white/20"></div>
    </div>
  </div>
)

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    projectDetails: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleModalOpen = useCallback(() => {
    requestAnimationFrame(() => {
      setIsModalOpen(true)
    })
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleModalSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (!formData.email || !formData.name || !formData.projectDetails) {
      toast.error('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: `New Project Inquiry from ${formData.name}`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      toast.success('Message sent successfully!')
      setFormData({
        email: '',
        name: '',
        projectDetails: ''
      })
      setIsModalOpen(false)
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNavigation = useCallback((id: string) => {
    try {
      const element = document.getElementById(id)
      if (!element) {
        console.warn(`Element with id "${id}" not found`)
        return
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (prefersReducedMotion) {
        element.scrollIntoView()
      } else {
        requestAnimationFrame(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        })
      }
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }, [])

  const buttonClasses = "bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-200"

  return (
    <main className="min-h-screen bg-black">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Lexend Deca', sans-serif;
          overflow-x: hidden;
        }
      `}</style>
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between h-16 px-4 max-w-[90rem] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/protolaunch.png"
              alt="Protolaunch Logo"
              width={120}
              height={40}
              className="h-8 w-auto sm:h-10"
            />
          </Link>
          
          {/* Navigation */}
          <Navigation onNavigate={handleNavigation} />

          {/* Get in Touch Button */}
          <Button 
            className={cn(buttonClasses, "w-10 h-10 p-0 md:w-auto md:h-auto md:px-6 md:py-2")} 
            onClick={handleModalOpen}
            aria-label="Open contact form"
          >
            <Mail className="h-5 w-5 md:hidden" />
            <span className="hidden md:inline">Get In Touch</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Animated Blobs */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/30 rounded-full blur-[100px]"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0.2 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[100px]"
        />

        <div className="relative pt-32 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[90rem] mx-auto px-4"
          >
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-center mb-12"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  From Vision to Launch
                </span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col items-center gap-8"
              >
                <Button
                  onClick={() => handleNavigation('our-services')}
                  className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full transition-all duration-200 hover:scale-105"
                  aria-label="Get started and view our services"
                >
                  Let's Get Started
                </Button>
                
                {/* Down Arrow */}
                <motion.button
                  onClick={() => handleNavigation('our-services')}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Scroll to our services section"
                  initial={{ y: 0 }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronDown className="h-8 w-8" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* What We Deliver */}
      <section className="py-32 bg-black scroll-mt-20" id="our-services">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-24 text-center text-white">Building Success Together</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Development",
                description: "Technical excellence at every step",
                icon: <Box className="h-8 w-8 mb-4 text-white" />,
                points: [
                  "Modern tech stack",
                  "Scalable architecture",
                  "Clean, maintainable code"
                ]
              },
              {
                title: "Launch-Ready MVP",
                description: "Built for real-world success",
                icon: <Zap className="h-8 w-8 mb-4 text-white" />,
                points: [
                  "Production deployment",
                  "Essential features only",
                  "Built for quick iteration"
                ]
              },
              {
                title: "True Partnership",
                description: "Aligned for long-term success",
                icon: <Users className="h-8 w-8 mb-4 text-white" />,
                points: [
                  "Zero upfront costs",
                  "Equity-based model",
                  "Long-term support"
                ]
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-black border-white/20 border hover:border-white/40 transition-colors duration-200 h-full">
                  <CardContent className="p-8 space-y-6">
                    <div className="p-3 bg-white/5 rounded-lg w-fit">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-white/60">{item.description}</p>
                    <ul className="space-y-3">
                      {item.points.map((point, j) => (
                        <li key={j} className="text-sm text-white/80 flex items-center space-x-3">
                          <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* How It Works Section */}
      <section className="py-32 bg-black scroll-mt-20" id="process">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-24 text-center">From Vision to Launch</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-16">
              {[
                {
                  title: "Confidential Chat",
                  description: "Sign mutual NDA, discuss your vision, and explore possibilities together.",
                  icon: <Mail className="h-6 w-6 text-white" />,
                },
                {
                  title: "Partnership Terms",
                  description: "Review equity terms, discuss responsibilities, and sign partnership agreement.",
                  icon: <Handshake className="h-6 w-6 text-white" />,
                },
                {
                  title: "MVP Development",
                  description: "Weekly updates, regular demos, and continuous feedback throughout the process.",
                  icon: <Settings className="h-6 w-6 text-white" />,
                },
                {
                  title: "Market Launch",
                  description: "Production deployment, launch strategy, and ongoing growth support.",
                  icon: <Rocket className="h-6 w-6 text-white" />,
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-black border-white/20 border hover:border-white/40 transition-colors duration-200 h-full">
                    <CardContent className="p-8">
                      <div className="p-3 bg-white/5 rounded-lg w-fit mb-6">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/80">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Our Ideal Partner */}
      <section className="py-32 bg-black scroll-mt-20" id="partner">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-24 text-center">Our Ideal Partner</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
              <Card className="bg-black border-white/20 border hover:border-white/40 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-8">What We Look For</h3>
                  <ul className="space-y-4">
                    {[
                      "Strong product vision and market understanding",
                      "Commitment to product growth and user acquisition",
                      "Ability to handle operational costs and infrastructure",
                      "Ready to take ownership of product maintenance and updates"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-white/80">
                        <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white/5">
                          <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-black border-white/20 border hover:border-white/40 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-8">Partner Responsibilities</h3>
                  <ul className="space-y-4">
                    {[
                      "Cover all operational costs (hosting, services, tools)",
                      "Lead marketing, user acquisition, and growth strategies",
                      "Manage ongoing product maintenance and feature requests",
                      "Handle customer support and community engagement"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-white/80">
                        <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white/5">
                          <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* CTA Section */}
      <section className="py-24 text-center bg-black">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white">Let's Start Building Today</h2>
          <Button 
            className={cn(buttonClasses, "text-lg px-8 py-4 hover:scale-105 transition-all duration-200")}
            onClick={handleModalOpen}
            aria-label="Open contact form"
          >
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <div className="space-y-6 p-4 sm:p-6">
            <DialogHeader className="space-y-4">
              <DialogTitle id="dialog-title" className="text-2xl sm:text-3xl text-center">
                Get in Touch
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2 text-base"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 text-base"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDetails" className="text-sm font-medium">
                  Project Details
                </Label>
                <Textarea
                  id="projectDetails"
                  name="projectDetails"
                  placeholder="Tell us about your project..."
                  className="w-full px-3 py-2 text-base min-h-[120px]"
                  required
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
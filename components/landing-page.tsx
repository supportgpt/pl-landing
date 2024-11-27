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
  Loader2
} from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'
import LowFidelityExample from "@/components/ui/LowFidelityExample"
import HighFidelityExample from "@/components/prototypes/HighFidelityExample"
import { cn } from "@/lib/utils"
import { Navigation } from './navigation'

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

type PrototypeFormData = {
  email: string
}

const buttonClasses = "bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-200"

interface FormData {
  email: string
  name: string
  projectDetails: string
  inquiryType: string
}

export function LandingPage() {
  const [currentStory, setCurrentStory] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPrototypeModalOpen, setIsPrototypeModalOpen] = useState(false)
  const [prototypeView, setPrototypeView] = useState<'desktop' | 'mobile'>('desktop')
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    projectDetails: '',
    inquiryType: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleModalOpen = useCallback(() => {
    requestAnimationFrame(() => {
      setIsModalOpen(true)
    })
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePrototypeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Add your form submission logic here
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (!formData.email || !formData.name || !formData.projectDetails || !formData.inquiryType) {
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
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setIsModalOpen(false)
      setFormData({ email: '', name: '', projectDetails: '', inquiryType: '' })
      toast.success('Message sent successfully!')
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to send message')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNavigation = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
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
    }
  }, [])

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
            onClick={useCallback(() => {
              requestAnimationFrame(() => setIsModalOpen(true))
            }, [])}
          >
            <Mail className="h-5 w-5 md:hidden" />
            <span className="hidden md:inline">Get In Touch</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-32 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[90rem] mx-auto px-4"
        >
          <div className="flex flex-col items-center">
            <div className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] font-bold leading-[1.1] md:leading-[1.1] tracking-tight max-w-4xl mx-auto mb-8 text-white text-center">
              <div>Build Your MVP.</div>
              <div>Launch in Weeks.</div>
            </div>
            <Button 
              className={cn(buttonClasses, "text-lg px-8 py-4 mb-24 hover:scale-105 transition-all duration-200")}
              onClick={handleModalOpen}
            >
              Get In Touch
            </Button>

            {/* Prototype Preview */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Mobile Preview */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative flex justify-center"
                >
                  <div className="w-[200px] transform scale-90 sm:scale-100">
                    <div className="bg-white rounded-[2rem] p-3 shadow-2xl border-6 border-white">
                      <div className="flex flex-col h-[400px] rounded-xl overflow-hidden">
                        {/* Header */}
                        <header className="bg-gray-200 p-2">
                          <div className="flex items-center justify-between">
                            <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                            <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                          </div>
                        </header>

                        {/* Content */}
                        <main className="flex-1 overflow-y-auto p-2 space-y-2">
                          <div className="h-24 bg-gray-300 rounded-lg animate-pulse"></div>
                          <div className="h-20 bg-gray-300 rounded-lg animate-pulse"></div>
                          <div className="h-20 bg-gray-300 rounded-lg animate-pulse"></div>
                        </main>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Desktop Preview */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative"
                >
                  <div className="bg-white rounded-lg p-3 shadow-2xl">
                    <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
                      <div className="flex h-full">
                        {/* Sidebar - Hide on smaller screens */}
                        <div className="hidden sm:block w-1/4 bg-gray-200 p-3 space-y-3">
                          <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                          <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
                          <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                        {/* Main Content - Adjust width based on sidebar visibility */}
                        <div className="flex-1 p-3 space-y-3 sm:w-3/4">
                          <div className="h-6 w-36 bg-gray-300 rounded animate-pulse"></div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="h-20 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-20 bg-gray-300 rounded animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Divider />

      {/* What We Deliver */}
      <section className="py-32 bg-black scroll-mt-20" id="our-services">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-24 text-center text-white">What We Deliver</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Full-Stack MVP",
                description: "Your product built and launched.",
                icon: <Box className="h-8 w-8 mb-4 text-white" />,
                points: [
                  "From concept to production",
                  "Built for scale",
                  "Ready for users"
                ]
              },
              {
                title: "Interactive Prototype",
                description: "See it work before we build.",
                icon: <Monitor className="h-8 w-8 mb-4 text-white" />,
                points: [
                  "Test with real users",
                  "Validate your idea",
                  "Iterate quickly"
                ]
              },
              {
                title: "Quick Launch",
                description: "No waiting. Just building.",
                icon: <Zap className="h-8 w-8 mb-4 text-white" />,
                points: [
                  "1-week prototype",
                  "2-week MVP",
                  "Launch support"
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-24 text-center">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-16">
              {[
                {
                  step: "Week 1",
                  title: "Prototype",
                  description: "We build a working prototype to validate your idea with real users.",
                  icon: <Users className="h-6 w-6 text-white" />
                },
                {
                  step: "Week 2",
                  title: "Plan",
                  description: "Design the architecture and set up development pipeline.",
                  icon: <Layout className="h-6 w-6 text-white" />
                },
                {
                  step: "Week 2-3",
                  title: "Build",
                  description: "Develop your MVP with production-ready code.",
                  icon: <Settings className="h-6 w-6 text-white" />
                },
                {
                  step: "Week 3",
                  title: "Launch",
                  description: "Deploy your MVP and prepare for user growth.",
                  icon: <Share2 className="h-6 w-6 text-white" />
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
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-white/5 rounded-lg">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium text-white/60">{item.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/80">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Button
              className={cn(buttonClasses, "text-lg px-8 py-4 hover:scale-105 transition-all duration-200")}
              onClick={() => setIsPrototypeModalOpen(true)}
            >
              Try Interactive Demo
            </Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* Success Stories */}
      <section className="py-32 bg-black scroll-mt-20" id="success-stories">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Success Stories</h2>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button
                onClick={() => setCurrentStory((prev) => (prev === 0 ? 1 : 0))}
                variant="outline"
                className={cn(buttonClasses, "w-10 h-10 p-0")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setCurrentStory((prev) => (prev === 0 ? 1 : 0))}
                variant="outline"
                className={cn(buttonClasses, "w-10 h-10 p-0")}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
            >
              {currentStory === 0 ? (
                <>
                  <div className="space-y-8">
                    <Card className="bg-black border-white/20 border hover:border-white/40 transition-colors duration-200">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-white">About the Project</h3>
                        <p className="text-white mb-4">
                          A leading logistics company needed to validate their warehouse scanning application before development.
                          The project aimed to revolutionize their operations through digital transformation.
                        </p>
                        <ul className="space-y-3 text-white">
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Enterprise-scale scanning solution</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Real-time inventory management</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Multi-warehouse system integration</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-black border-white/20 border hover:border-white/40 transition-colors duration-200">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-white">The Challenge</h3>
                        <p className="text-white mb-4">
                          Before committing to development, several critical aspects needed validation:
                        </p>
                        <ul className="space-y-3 text-white">
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Interface usability in warehouse conditions</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Complex workflow optimization</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Staff training requirements</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-black border-white/20 border hover:border-white/40 transition-colors duration-200">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-white">Our Solution</h3>
                        <p className="text-white mb-4">
                          We delivered a comprehensive prototype package that demonstrated:
                        </p>
                        <ul className="space-y-3 text-white">
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Intuitive scanning interface design</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Streamlined workflow processes</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Real-time inventory updates</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative">
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <Image
                          key={i}
                          src={`/images/${i}.png`}
                          alt={`Warehouse Image ${i}`}
                          width={200}
                          height={400}
                          className="rounded-lg border border-white hover:border-gray-700 transition-colors duration-200"
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-8">
                    <Card className="bg-black border-white/20 border hover:border-white/40 transition-colors duration-200">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-white">About SupportGPT</h3>
                        <p className="text-white mb-4">
                          A Shopify app that transforms customer support through AI-powered email assistance. The team needed to validate their innovative concept before development.
                        </p>
                        <ul className="space-y-3 text-white">
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Smart email response generation</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Customizable AI training system</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Automated support workflow</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-black border-white/20 border hover:border-white/40 transition-colors duration-200">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-white">The Challenge</h3>
                        <p className="text-white mb-4">
                          Before development, the team needed to validate several key aspects:
                        </p>
                        <ul className="space-y-3 text-white">
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>AI response accuracy and relevance</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>User-friendly training interface</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Seamless Shopify integration</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-black border-white/20 border hover:border-white/40 transition-colors duration-200">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-white">Our Solution</h3>
                        <p className="text-white mb-4">
                          We created a comprehensive prototype that demonstrated:
                        </p>
                        <ul className="space-y-3 text-white">
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Intuitive email management interface</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Simple AI training workflow</span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                            <span>Efficient response generation system</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative">
                    <div className="grid grid-cols-1 gap-4">
                      {[4, 5].map((i) => (
                        <Image
                          key={i}
                          src={`/images/${i}.png`}
                          alt={`SupportGPT Screenshot ${i}`}
                          width={400}
                          height={225}
                          className="rounded-lg border border-white hover:border-gray-700 transition-colors duration-200 w-full"
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Divider />

      {/* Pricing Section */}
      <section className="py-32 bg-black scroll-mt-20" id="pricing">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-24">
            <span className="text-white/60 uppercase tracking-wider text-sm font-medium mb-4">Pricing Plans</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-24 text-center">Launch Your MVP in Weeks</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              <Card className="bg-black border-white/20 border hover:border-white/40 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-white text-black px-4 py-2 text-sm font-semibold">
                  Most Popular
                </div>
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Startup MVP</h3>
                    <p className="text-white/60">3-week development cycle</p>
                  </div>

                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-white">$1,999</span>
                    <span className="text-white/60 ml-2">flat rate</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      {
                        feature: "Interactive Prototype in 1 Week",
                        description: "Test with real users before building"
                      },
                      {
                        feature: "Full MVP in 2 Weeks",
                        description: "Production-ready codebase"
                      },
                      {
                        feature: "2 Rounds of Revisions",
                        description: "Fine-tune your product"
                      },
                      {
                        feature: "Infrastructure Setup",
                        description: "Ready for user traffic"
                      },
                      {
                        feature: "Launch Support",
                        description: "Technical guidance & deployment"
                      },
                      {
                        feature: "Modern Tech Stack",
                        description: "Built with scalable technologies"
                      }
                    ].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-white/80 group-hover:text-white transition-colors duration-200">
                        <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-200">
                          <div className="h-1.5 w-1.5 rounded-full bg-white/60 group-hover:bg-white transition-colors duration-200" />
                        </div>
                        <div>
                          <div className="font-medium">{item.feature}</div>
                          <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-200">{item.description}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={cn(
                      buttonClasses,
                      "w-full py-6 text-lg font-medium group-hover:scale-[1.02] transition-all duration-200"
                    )}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, inquiryType: 'Startup MVP' }));
                      handleModalOpen();
                    }}
                  >
                    Start Your Project
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black border-white/20 border hover:border-white/40 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold">
                  Enterprise
                </div>
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Custom Build</h3>
                    <p className="text-white/60">Flexible timeline</p>
                  </div>

                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-white">Custom</span>
                    <span className="text-white/60 ml-2">pricing</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      {
                        feature: "Everything in Startup MVP",
                        description: "All core features included"
                      },
                      {
                        feature: "Custom Architecture",
                        description: "Tailored to your needs"
                      },
                      {
                        feature: "Third-party Integrations",
                        description: "Connect with your tools"
                      },
                      {
                        feature: "Flexible Timeline",
                        description: "Adapt to your schedule"
                      },
                      {
                        feature: "Unlimited Revisions",
                        description: "Get it exactly right"
                      },
                      {
                        feature: "Priority Support",
                        description: "Direct access to developers"
                      }
                    ].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-white/80 group-hover:text-white transition-colors duration-200">
                        <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-200">
                          <div className="h-1.5 w-1.5 rounded-full bg-white/60 group-hover:bg-white transition-colors duration-200" />
                        </div>
                        <div>
                          <div className="font-medium">{item.feature}</div>
                          <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-200">{item.description}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={cn(
                      buttonClasses,
                      "w-full py-6 text-lg font-medium group-hover:scale-[1.02] transition-all duration-200"
                    )}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, inquiryType: 'Custom Build' }));
                      handleModalOpen();
                    }}
                  >
                    Contact Us
                  </Button>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Validate Your Idea?</h2>
          <Button 
            className={cn(buttonClasses, "text-lg px-8 py-4 mb-24 hover:scale-105 transition-all duration-200")}
            onClick={handleModalOpen}
          >
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <div className="space-y-6 p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl text-center sm:text-left">
                Get in Touch
              </DialogTitle>
              <DialogDescription className="text-center sm:text-left">
                Tell us about your project and we'll get back to you within 24 hours.
              </DialogDescription>
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
                <Label htmlFor="inquiryType" className="text-sm font-medium">
                  Inquiry Type
                </Label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  className="w-full px-3 py-2 text-base rounded-md border border-white/20 bg-black text-white hover:border-white/40 transition-colors duration-200"
                  required
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  <option value="General">General Inquiry</option>
                  <option value="Startup MVP">Startup MVP ($1,999)</option>
                  <option value="Custom Build">Custom Build</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDetails" className="text-sm font-medium">
                  Project Details
                </Label>
                <Textarea
                  id="projectDetails"
                  name="projectDetails"
                  placeholder="Tell us about your project..."
                  className="w-full min-h-[100px] px-3 py-2 text-base"
                  required
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className={cn(
                    buttonClasses,
                    "w-full py-4 text-lg font-medium hover:scale-[1.02] transition-all duration-200"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPrototypeModalOpen} onOpenChange={setIsPrototypeModalOpen}>
        <DialogContent className="max-w-6xl bg-black border border-white/10 pt-2 w-[95vw] h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setIsPrototypeModalOpen(false)}
            className="absolute right-4 top-4 p-2 text-white/60 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content Container */}
          <div className="space-y-6 mt-6">
            {/* Device Toggle */}
            <div className="hidden md:flex items-center justify-center px-2">
              <div className="bg-white/10 rounded-lg p-1 flex gap-1">
                <button
                  onClick={() => setPrototypeView('desktop')}
                  className={cn(
                    "px-6 py-2 rounded-md flex items-center gap-2 transition-colors",
                    prototypeView === 'desktop'
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/5"
                  )}
                >
                  <Monitor className="h-4 w-4" />
                  <span className="font-medium">Desktop</span>
                </button>
                <button
                  onClick={() => setPrototypeView('mobile')}
                  className={cn(
                    "px-6 py-2 rounded-md flex items-center gap-2 transition-colors",
                    prototypeView === 'mobile'
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/5"
                  )}
                >
                  <Smartphone className="h-4 w-4" />
                  <span className="font-medium">Mobile</span>
                </button>
              </div>
            </div>

            {/* Mobile Message */}
            <div className="block md:hidden h-[60vh] flex flex-col items-center justify-center text-center px-4">
              <Monitor className="h-12 w-12 text-white/60 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Desktop View Recommended</h3>
              <p className="text-white/60 max-w-sm">
                For the best experience viewing our interactive prototypes, please visit this page on a desktop device.
              </p>
            </div>

            {/* Prototype Container */}
            <div className="hidden md:block bg-black border border-white/10 rounded-lg overflow-hidden mt-6">
              <div className={cn(
                "transition-all duration-500 transform",
                prototypeView === 'mobile' 
                  ? "w-[390px] h-[844px] scale-[0.65] origin-top mx-auto" 
                  : "w-full aspect-video scale-[0.8] origin-top",
              )}>
                <HighFidelityExample type={prototypeView} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
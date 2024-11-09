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
    projectDetails: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev === 0 ? 1 : 0))
    }, 10000)
    return () => clearInterval(timer)
  }, [])

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
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'contact'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send')
      }

      setIsModalOpen(false)
      setFormData({ email: '', name: '', projectDetails: '' })
      toast.success('Message sent successfully!')
    } catch (error) {
      toast.error('Failed to send message')
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
            className={`${buttonClasses} w-10 h-10 p-0 md:w-auto md:h-auto md:px-6 md:py-2`} 
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
      <section className="pt-32 pb-16 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[90rem] mx-auto px-4"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-tight max-w-4xl mx-auto mb-8 text-white text-center">
              Transform Your Vision into Reality Before Development
            </h1>
            <Button 
              size="lg" 
              className={`${buttonClasses} will-change-transform`}
              onClick={handleModalOpen}
              style={{
                transform: 'translateZ(0)', // Hardware acceleration
                backfaceVisibility: 'hidden'
              }}
            >
              Get Started
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
      <section className="py-16 bg-black scroll-mt-20" id="our-services">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-left text-white">What We Deliver</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "High-Fidelity Prototypes",
                description: "Experience the impact of a real product without costly development.",
                icon: <Monitor className="h-8 w-8 mb-4 text-white" />,
                points: [
                  "Engage Stakeholders with tangible prototypes",
                  "Validate Early and minimise risks",
                  "Accelerate Buy-In with interactive demos"
                ]
              },
              {
                title: "User Flow Designs",
                description: "Bring your product to life with intuitive, end-to-end user journeys.",
                icon: <Users className="h-8 w-8 mb-4 text-white" />,
                points: [
                  "Map the Journey for smooth user interactions",
                  "Highlight Key Actions for goal accomplishment",
                  "Optimize Usability to enhance engagement"
                ]
              },
              {
                title: "Professional UI Design",
                description: "Deliver a modern, accessible interface optimized for testing.",
                icon: <Layout className="h-8 w-8 mb-4 text-white" />,
                points: [
                  "Enhance User Appeal with compelling visuals",
                  "Boost Consistency with unified design language",
                  "Ensure Accessibility for all users"
                ]
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-black border-white border">
                  <CardContent className="p-6 space-y-4">
                    <div className="relative">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-white">{item.description}</p>
                    <ul className="space-y-2">
                      {item.points.map((point, j) => (
                        <li key={j} className="text-sm text-white flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
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

      {/* What To Expect Section */}
      <section className="py-24 bg-black scroll-mt-20" id="prototypes">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">What To Expect From Our Prototypes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              <div className="bg-black/40 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">User-Centric Design</h3>
                <p className="text-gray-400 text-sm">
                  Intuitive interfaces designed for your target users, ensuring seamless interactions.
                </p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Functional Flows</h3>
                <p className="text-gray-400 text-sm">
                  Complete user journeys with interactive elements and realistic data.
                </p>
              </div>
              <div className="bg-black/40 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Responsive Design</h3>
                <p className="text-gray-400 text-sm">
                  Optimized for both desktop and mobile experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            {/* Desktop View */}
            <Button 
              size="lg"
              onClick={useCallback(() => {
                requestAnimationFrame(() => {
                  setIsPrototypeModalOpen(true)
                })
              }, [])}
              className={cn(
                "hidden md:inline-flex bg-black text-white border border-white hover:bg-white hover:text-black",
                "px-8 py-6 text-lg will-change-transform transition-colors duration-200"
              )}
            >
              Try Interactive Demo
            </Button>

            {/* Mobile View */}
            <Button 
              size="lg"
              disabled
              className={cn(
                "md:hidden bg-black text-white/60 border border-white/20 cursor-not-allowed",
                "px-8 py-6 text-lg"
              )}
            >
              View on Desktop
            </Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* Why Invest in Prototypes */}
      <section className="py-16 bg-black scroll-mt-20" id="why-prototype">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-16 text-left text-white">Why Invest in Prototypes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Monitor className="h-6 w-6" />,
                title: "Reduce Development Costs",
                description: "Validate ideas early to save significant resources."
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Early User Validation",
                description: "Ensure your product resonates with your target audience from day one."
              },
              {
                icon: <Share2 className="h-6 w-6" />,
                title: "Secure Stakeholder Buy-in",
                description: "Present a tangible vision that stakeholders can interact with."
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Faster Time to Market",
                description: "Streamline development and reduce iterations."
              },
              {
                icon: <Box className="h-6 w-6" />,
                title: "Minimize Risk",
                description: "Identify and address potential issues early in the process."
              },
              {
                icon: <Layout className="h-6 w-6" />,
                title: "Clear Development Vision",
                description: "Provide a precise blueprint for developers."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-black border-white border">
                  <CardContent className="p-6">
                    <div className="mb-4 p-2 bg-white/10 rounded-lg w-fit text-white">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Success Stories */}
      <section className="py-16 scroll-mt-20" id="success-stories">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
            <div>
              <div className="text-sm text-gray-400 mb-2">Featured Success Stories</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Success Stories</h2>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button
                onClick={() => setCurrentStory((prev) => (prev === 0 ? 1 : 0))}
                variant="outline"
                size="icon"
                className={buttonClasses}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setCurrentStory((prev) => (prev === 0 ? 1 : 0))}
                variant="outline"
                size="icon"
                className={buttonClasses}
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
                    <Card className="bg-black border-white border">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-white">About the Project</h3>
                        <p className="text-white mb-4">
                          A leading logistics company needed to validate their warehouse scanning application before development.
                          The project aimed to revolutionize their operations through digital transformation.
                        </p>
                        <ul className="space-y-2 text-white">
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Enterprise-scale scanning solution</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Real-time inventory management</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Multi-warehouse system integration</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-black border-white border">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-white">The Challenge</h3>
                        <p className="text-white mb-4">
                          Before committing to development, several critical aspects needed validation:
                        </p>
                        <ul className="space-y-2 text-white">
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Interface usability in warehouse conditions</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Complex workflow optimization</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Staff training requirements</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-black border-white border">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-white">Our Solution</h3>
                        <p className="text-white mb-4">
                          We delivered a comprehensive prototype package that demonstrated:
                        </p>
                        <ul className="space-y-2 text-white">
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Intuitive scanning interface design</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Streamlined workflow processes</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
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
                    <Card className="bg-black border-white border">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-white">About SupportGPT</h3>
                        <p className="text-white mb-4">
                          A Shopify app that transforms customer support through AI-powered email assistance. The team needed to validate their innovative concept before development.
                        </p>
                        <ul className="space-y-2 text-white">
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Smart email response generation</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Customizable AI training system</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Automated support workflow</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-black border-white border">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-white">The Challenge</h3>
                        <p className="text-white mb-4">
                          Before development, the team needed to validate several key aspects:
                        </p>
                        <ul className="space-y-2 text-white">
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>AI response accuracy and relevance</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>User-friendly training interface</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Seamless Shopify integration</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-black border-white border">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-white">Our Solution</h3>
                        <p className="text-white mb-4">
                          We created a comprehensive prototype that demonstrated:
                        </p>
                        <ul className="space-y-2 text-white">
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Intuitive email management interface</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Simple AI training workflow</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
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

      {/* CTA Section */}
      <section className="py-24 text-center bg-black">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Validate Your Idea?</h2>
          <Button size="lg" className={buttonClasses} onClick={handleModalOpen}>
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

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-white hover:text-black border border-black transition-colors py-5 text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </div>
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
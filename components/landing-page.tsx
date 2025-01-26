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
  storeUrl?: string
  businessType: string
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

const portfolioItems = [
  {
    title: "Fair Harbor Clothing",
    description: "Sustainable swimwear brand with advanced product customization and eco-friendly focus.",
    image: "/images/portfolio/fairharbor.png",
    url: "fairharborclothing.com"
  },
  {
    title: "Joon Haircare",
    description: "Premium hair care brand with subscription model and personalized recommendations.",
    image: "/images/portfolio/joon.png",
    url: "joonhaircare.com"
  },
  {
    title: "Diaspora Co.",
    description: "Direct-to-consumer spice company with unique storytelling and ethical sourcing.",
    image: "/images/portfolio/diaspora.png",
    url: "diasporaco.com"
  },
  {
    title: "Loops Beauty",
    description: "Modern skincare brand with innovative product presentation and mobile-first design.",
    image: "/images/portfolio/loops.png",
    url: "loopsbeauty.com"
  },
  {
    title: "Juice Press",
    description: "Multi-location juice brand with complex inventory and order management.",
    image: "/images/portfolio/juicepress.png",
    url: "juicepress.com"
  },
  {
    title: "Sophie Ratner",
    description: "Luxury jewelry brand with 3D product visualization and custom engraving.",
    image: "/images/portfolio/sophieratner.png",
    url: "sophieratner.com"
  }
]

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    projectDetails: '',
    storeUrl: '',
    businessType: ''
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
    
    if (!formData.email || !formData.name || !formData.projectDetails || !formData.businessType) {
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
          subject: `New Shopify Project Inquiry from ${formData.name}`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      toast.success('Message sent successfully!')
      setFormData({
        email: '',
        name: '',
        projectDetails: '',
        storeUrl: '',
        businessType: ''
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

  const buttonClasses = "rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
  const primaryButtonClasses = cn(buttonClasses, "bg-white text-black hover:bg-white/90")
  const secondaryButtonClasses = cn(buttonClasses, "bg-white/10 text-white hover:bg-white/20 border border-white/20")

  return (
    <main className="min-h-screen bg-black">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Lexend Deca', sans-serif;
          overflow-x: hidden;
          background: black;
        }
      `}</style>
      <Toaster position="top-center" />
      
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0">
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
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
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
              className={cn(primaryButtonClasses, "w-10 h-10 p-0 md:w-auto md:h-auto md:px-6 md:py-3")} 
              onClick={handleModalOpen}
              aria-label="Open contact form"
            >
              <Mail className="h-5 w-5 md:hidden text-black" />
              <span className="hidden md:inline">Get In Touch</span>
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden">
          <div className="relative pt-32 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[90rem] mx-auto px-4"
            >
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center max-w-[1000px]"
                >
                  <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-white">
                    Elevate Your
                  </span>
                  <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-white/90">
                    Shopify Store
                  </span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white text-xl text-center max-w-2xl mt-8 mb-12 leading-relaxed"
                >
                  Custom development and design for ambitious brands
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <Button 
                    className={cn(primaryButtonClasses, "px-8 py-6 text-lg w-full sm:w-auto")}
                    onClick={handleModalOpen}
                  >
                    Start Your Project
                  </Button>
                  <Button 
                    className={cn(secondaryButtonClasses, "px-8 py-6 text-lg w-full sm:w-auto")}
                    onClick={() => handleNavigation('portfolio')}
                  >
                    View Our Work
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* Services Section */}
        <section id="services" className="py-32">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Shopify Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 rounded-2xl group cursor-pointer hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-purple-500/20">
                <CardContent className="p-8">
                  <Layout className="w-12 h-12 mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-purple-400 transition-colors">Custom Development</h3>
                  <p className="text-white text-lg leading-relaxed">Crafting Shopify stores that reflect your unique brand identity.</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 rounded-2xl group cursor-pointer hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-blue-500/20">
                <CardContent className="p-8">
                  <Settings className="w-12 h-12 mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors">Theme Customization</h3>
                  <p className="text-white text-lg leading-relaxed">Building unique shopping experiences through custom themes.</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 rounded-2xl group cursor-pointer hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-yellow-500/20">
                <CardContent className="p-8">
                  <Zap className="w-12 h-12 mb-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-yellow-400 transition-colors">App Integration</h3>
                  <p className="text-white text-lg leading-relaxed">Connecting your store with the tools you need to succeed.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        {/* Portfolio Section */}
        <section id="portfolio" className="py-32">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Featured Client Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, i) => (
                <Card key={i} className="group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden rounded-2xl hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-purple-500/20">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-blue-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Link 
                        href={`https://${item.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 bg-white text-black hover:bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
                      >
                        Visit Store
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="text-white/90 mb-6 line-clamp-2">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* Expertise Section */}
        <section id="expertise" className="py-32">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-12">
                <div className="flex gap-6 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                  <div className="flex-shrink-0">
                    <Rocket className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">Shopify Plus Expertise</h3>
                    <p className="text-white text-lg leading-relaxed">Deep experience with enterprise-level Shopify solutions.</p>
                  </div>
                </div>
                <div className="flex gap-6 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                  <div className="flex-shrink-0">
                    <Box className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">Custom Solutions</h3>
                    <p className="text-white text-lg leading-relaxed">Development that adapts to your specific needs.</p>
                  </div>
                </div>
                <div className="flex gap-6 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                  <div className="flex-shrink-0">
                    <Handshake className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">Ongoing Support</h3>
                    <p className="text-white text-lg leading-relaxed">Reliable assistance to keep your store running smoothly.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-8 text-white">Our Expertise</h3>
                    <ul className="space-y-6">
                      {[
                        "Custom Shopify Theme Development",
                        "Shopify Plus Development",
                        "E-commerce Strategy",
                        "Performance Optimization",
                        "Custom App Development"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-lg">
                          <div className="h-2 w-2 rounded-full bg-purple-400" />
                          <span className="text-white">{item}</span>
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

        {/* Process Section */}
        <section id="process" className="py-32">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Discovery",
                  description: "Understanding your vision and requirements.",
                  icon: <Mail className="h-8 w-8 text-purple-400" />,
                },
                {
                  title: "Planning",
                  description: "Creating a clear roadmap for development.",
                  icon: <Settings className="h-8 w-8 text-blue-400" />,
                },
                {
                  title: "Development",
                  description: "Building your solution with regular updates.",
                  icon: <Box className="h-8 w-8 text-green-400" />,
                },
                {
                  title: "Launch",
                  description: "Deploying and supporting your store.",
                  icon: <Rocket className="h-8 w-8 text-yellow-400" />,
                }
              ].map((item, i) => (
                <Card key={i} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 rounded-2xl group cursor-pointer hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-purple-500/20">
                    <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-purple-500/10">
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
                    <p className="text-white text-lg leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
              ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* CTA Section */}
        <section className="py-32 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-20 text-white">Let's Build Your Store</h2>
            <div>
              <Button 
                className={cn(primaryButtonClasses, "text-lg px-12 py-7 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300")}
                onClick={handleModalOpen}
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-white border-0 rounded-2xl sm:max-w-xl w-[95%] p-4 sm:p-6 max-h-[90vh] overflow-y-auto top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] fixed">
            <DialogHeader className="space-y-3 mb-4">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-black">Tell Us About Your Project</DialogTitle>
              <DialogDescription className="text-gray-600 text-base sm:text-lg">
                We'll get back to you within 24 hours to discuss your needs.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 text-sm block mb-1">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl h-12 w-full"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 text-sm block mb-1">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl h-12 w-full"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="storeUrl" className="text-gray-700 text-sm block mb-1">Existing Shopify Store URL (Optional)</Label>
                  <Input
                    id="storeUrl"
                    name="storeUrl"
                    value={formData.storeUrl}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl h-12 w-full"
                    placeholder="your-store.myshopify.com"
                  />
                </div>
                <div>
                  <Label htmlFor="businessType" className="text-gray-700 text-sm block mb-1">Business Type</Label>
                  <Input
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl h-12 w-full"
                    placeholder="e.g. Fashion, Electronics, etc."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="projectDetails" className="text-gray-700 text-sm block mb-1">Project Details</Label>
                  <Textarea
                    id="projectDetails"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 text-gray-900 min-h-[120px] rounded-xl w-full resize-none"
                    placeholder="Tell us about your project requirements..."
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button 
                  type="submit" 
                  className={cn(buttonClasses, "w-full bg-black text-white hover:bg-gray-900 text-base sm:text-lg py-4")}
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
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
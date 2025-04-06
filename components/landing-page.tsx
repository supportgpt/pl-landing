'use client'

import { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Mail,
  ArrowRight,
  Zap,
  Box,
  Layout,
  Loader2,
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
  projectType: string
  companySize?: string
  timeline?: string
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
    title: "Upgrade Your PC",
    description: "Local PC repair business with a professionally designed website to showcase their services and attract local customers.",
    image: "/images/portfolio/upgradeyourpc.png",
    url: "#",
    type: "Local Business"
  },
  {
    title: "Contact247",
    description: "Landing page for a Shopify app that transforms contact forms into AI customer service assistants, providing 24/7 support.",
    image: "/images/portfolio/contact247.png",
    url: "#",
    type: "SaaS Product"
  },
  {
    title: "Joon Haircare",
    description: "Premium hair care brand with a custom Shopify storefront featuring subscription model and personalized recommendations.",
    image: "/images/portfolio/joon.png",
    url: "#",
    type: "E-commerce"
  },
  {
    title: "Loops Beauty",
    description: "Modern skincare brand with innovative product presentation and mobile-first design for an exceptional shopping experience.",
    image: "/images/portfolio/loops.png",
    url: "#",
    type: "E-commerce"
  },
  {
    title: "Pretty Comparison Tables",
    description: "Shopify app enabling merchants to create stunning comparison tables for products and collections to boost conversion rates.",
    image: "/images/apps/comparison-tables.png",
    url: "https://apps.shopify.com/pretty-comparisons",
    type: "Shopify App"
  },
  {
    title: "Pretty Sales Pop Up",
    description: "Shopify app that displays recent store activity with unique sales popups to build social proof and increase conversions.",
    image: "/images/apps/sales-popup.png",
    url: "https://apps.shopify.com/pretty-sales-popup",
    type: "Shopify App"
  }
] as const

const processSteps = [
  {
    title: "Discovery",
    description: "Understanding your business goals and technical requirements.",
    icon: <Mail className="h-8 w-8 text-purple-400" />,
  },
  {
    title: "Strategy",
    description: "Crafting a comprehensive technical solution and project roadmap.",
    icon: <Layout className="h-8 w-8 text-blue-400" />,
  },
  {
    title: "Development",
    description: "Building your solution with agile methodology and regular updates.",
    icon: <Box className="h-8 w-8 text-green-400" />,
  },
  {
    title: "Launch & Support",
    description: "Deploying your solution and providing ongoing maintenance.",
    icon: <Rocket className="h-8 w-8 text-yellow-400" />,
  }
] as const

const expertiseList = [
  "Local Business Websites",
  "SaaS Product Development",
  "Shopify App Development",
  "E-commerce Solutions",
  "Custom Web Applications",
  "UI/UX Design",
  "Performance Optimization",
  "API Integration & Development"
] as const

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    projectDetails: '',
    projectType: '',
    companySize: '',
    timeline: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleModalOpen = useCallback(() => {
    requestAnimationFrame(() => {
      setIsModalOpen(true)
    })
  }, [])

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (!formData.email || !formData.name || !formData.projectDetails || !formData.projectType) {
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
          subject: `New Web Development Project Inquiry from ${formData.name}`
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
        projectType: '',
        companySize: '',
        timeline: ''
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
        body {
          overflow-x: hidden;
          background: black;
        }
      `}</style>
      <Toaster position="bottom-right" />
      
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
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-24 md:pt-32">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="relative z-10 text-left mt-8 sm:mt-0">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Web Solutions for
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  Businesses of All Sizes
                </span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                From local businesses to SaaS startups, we build effective web solutions 
                that drive business growth and connect you with your customers.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button
                  onClick={handleModalOpen}
                  className={primaryButtonClasses}
                  size="lg"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => handleNavigation('portfolio')}
                  className={secondaryButtonClasses}
                  size="lg"
                >
                  View Our Work
                </Button>
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div 
              className="relative z-10 w-full h-full min-h-[400px] lg:min-h-[600px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero.png"
                  alt="Web Solutions for All Businesses"
                  fill
                  className="object-contain object-center"
                  priority
                  quality={90}
                />
              </div>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* Services Section */}
        <section id="services" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-6">Our Services</h2>
            <p className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto">
              Tailored web solutions for businesses at any stage - from local shops to growing SaaS products.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <Box className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Local Business Websites</h3>
                  <p className="text-gray-400">
                    Professional websites for local businesses that attract customers and grow your presence in the community.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <Layout className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">SaaS Development</h3>
                  <p className="text-gray-400">
                    End-to-end SaaS product development from landing pages to complex applications with subscription management.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Shopify Apps</h3>
                  <p className="text-gray-400">
                    Custom Shopify app development to extend functionality and create new revenue streams for your business.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        {/* Expertise Section */}
        <section id="expertise" className="py-32">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
              Why Choose Us
            </h2>
            <p className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto">
              We understand the unique needs of both local businesses and tech startups.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-12">
                <div className="flex gap-6 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                  <div className="flex-shrink-0">
                    <Rocket className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">Local Business Focus</h3>
                    <p className="text-white text-lg leading-relaxed">We help local businesses establish a strong digital presence that attracts nearby customers.</p>
                  </div>
                </div>
                <div className="flex gap-6 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                  <div className="flex-shrink-0">
                    <Box className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">SaaS Expertise</h3>
                    <p className="text-white text-lg leading-relaxed">We build scalable SaaS products that help founders validate their ideas and grow their user base.</p>
                  </div>
                </div>
                <div className="flex gap-6 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                  <div className="flex-shrink-0">
                    <Handshake className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">Shopify App Development</h3>
                    <p className="text-white text-lg leading-relaxed">We create successful Shopify apps that solve real merchant problems and generate recurring revenue.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-8 text-white">Our Expertise</h3>
                    <ul className="space-y-6 mt-6">
                      {expertiseList.map((item, i) => (
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
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
              Our Process
            </h2>
            <p className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto">
              Simple and transparent workflow that delivers results for businesses of all sizes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((item, i) => (
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

        {/* Projects Section */}
        <section id="portfolio" className="py-32">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
              Our Projects
            </h2>
            <p className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto">
              From local businesses to Shopify apps, we've helped clients of all sizes achieve their goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                      {item.url !== "#" && (
                        <Link 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 bg-white text-black hover:bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
                        >
                          {item.type === "Shopify App" ? "View App" : "Visit Site"}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                          {item.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="text-white/90 mb-6">{item.description}</p>
                    </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Grow Your Business Online?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Whether you're a local shop looking for more customers or a SaaS founder building the next big thing, we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className={cn(primaryButtonClasses, "text-lg px-12 py-7 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300")}
                onClick={handleModalOpen}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                className={cn(secondaryButtonClasses, "text-lg px-12 py-7 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300")}
                onClick={() => handleNavigation('portfolio')}
              >
                View Our Work
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
                <div>
                  <Label htmlFor="projectType" className="text-gray-700 text-sm block mb-1">Business Type</Label>
                  <Input
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl h-12 w-full"
                    placeholder="e.g. Local Business, SaaS, E-commerce"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companySize" className="text-gray-700 text-sm block mb-1">Project Goals</Label>
                  <Input
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl h-12 w-full"
                    placeholder="e.g. Increase local sales, Launch SaaS MVP"
                  />
                </div>
                <div>
                  <Label htmlFor="timeline" className="text-gray-700 text-sm block mb-1">Timeline</Label>
                  <Input
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-xl h-12 w-full"
                    placeholder="e.g. 3-6 months, 6-12 months"
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
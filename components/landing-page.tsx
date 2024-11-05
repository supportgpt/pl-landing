'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Monitor, Users, Share2, Zap, Box, Layout, ArrowRight, ArrowLeft, Menu, X, CheckCircle, Info, Mail } from "lucide-react"
import { Toaster, toast } from 'react-hot-toast'
import LowFidelityExample from "@/components/ui/LowFidelityExample"

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

export function LandingPage() {
  const [currentStory, setCurrentStory] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetails: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev === 0 ? 1 : 0))
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email')
      }

      setIsModalOpen(false)
      setFormData({ name: "", email: "", projectDetails: "" })
      toast.success('Form submitted successfully!', {
        style: {
          border: '1px solid #ffffff',
          padding: '16px',
          color: '#ffffff',
          background: '#000000',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#000000',
        },
      })
    } catch (error) {
      const err = error as { message: string }
      console.error('Error:', err)
      toast.error(err.message || 'Something went wrong. Please try again later.', {
        style: {
          border: '1px solid #ffffff',
          padding: '16px',
          color: '#ffffff',
          background: '#000000',
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const buttonClasses = "bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-200"

  const handlePrototypeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send request')
      }

      toast.success('Thank you! A member of our team will reach out to you shortly.', {
        style: {
          border: '1px solid #ffffff',
          padding: '16px',
          color: '#000000',
          background: '#ffffff',
        },
        iconTheme: {
          primary: '#000000',
          secondary: '#ffffff',
        },
      })
      
      setFormData(prev => ({ ...prev, email: "" }))
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        style: {
          border: '1px solid #ffffff',
          padding: '16px',
          color: '#ffffff',
          background: '#000000',
        },
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Lexend_Deca',sans-serif] scroll-smooth overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Lexend Deca', sans-serif;
          overflow-x: hidden;
        }
      `}</style>
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 h-20">
        <div className="w-full max-w-[90rem] mx-auto flex items-center justify-between h-full px-4 relative">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/protolaunch.png"
              alt="Protolaunch Logo"
              width={120}
              height={40}
              className="h-8 w-auto sm:h-10"
            />
          </Link>
          <nav className="absolute right-4">
            <Button 
              className={`${buttonClasses} w-10 h-10 p-0 md:w-auto md:h-auto md:px-6 md:py-2`} 
              onClick={() => setIsModalOpen(true)}
            >
              <Mail className="h-5 w-5 md:hidden" />
              <span className="hidden md:inline">Get In Touch</span>
            </Button>
          </nav>
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
            <Button size="lg" className={`${buttonClasses} mb-12`} onClick={() => setIsModalOpen(true)}>
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
                        {/* Sidebar */}
                        <div className="w-1/4 bg-gray-200 p-3 space-y-3">
                          <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                          <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
                          <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                        {/* Main Content */}
                        <div className="flex-1 p-3 space-y-3">
                          <div className="h-6 w-36 bg-gray-300 rounded animate-pulse"></div>
                          <div className="grid grid-cols-2 gap-3">
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

      {/* Free Low-Fidelity Prototype Offer */}
      <section className="py-16 bg-black scroll-mt-20" id="free-prototype">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">Get Your Free Prototype</h2>
          </div>
          
          {/* Prototype Form */}
          <form
            className="flex flex-col items-center space-y-8"
            onSubmit={handlePrototypeSubmit}
          >
            <div className="w-full max-w-md">
              <Label htmlFor="email" className="sr-only">
                Your Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="w-full bg-white text-black px-5 py-4 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-primary transition duration-300"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                className="bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Get Your Free Prototype'}
              </Button>
              <div className="relative group">
                <Info className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-help" />
                <div className="absolute z-50 bottom-full mb-2 right-0 w-64 p-2 bg-white text-black text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Share your email, and a member of our team will reach out to provide you with a free low-fidelity prototype tailored to your project needs.
                </div>
              </div>
            </div>
          </form>

          {/* Low-Fidelity Example */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Example of a Low-Fidelity Prototype</h3>
            <div className="max-w-5xl mx-auto overflow-hidden">
              <LowFidelityExample />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* CTA Section */}
      <section className="py-24 text-center bg-black">
        <div className="w-full max-w-[90rem] mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Validate Your Idea?</h2>
          <Button size="lg" className={buttonClasses} onClick={() => setIsModalOpen(true)}>
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-black text-white border border-white mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Get In Touch</DialogTitle>
            <DialogDescription className="text-gray-400">
              Tell us about your project and we'll get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleModalSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3 bg-white border-gray-300 text-black"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="col-span-3 bg-white border-gray-300 text-black"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projectDetails" className="text-right">
                  Project Details
                </Label>
                <Textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  className="col-span-3 bg-white border-gray-300 text-black"
                  rows={4}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                className={buttonClasses}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
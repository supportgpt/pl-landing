'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimateOnScrollProps {
  children: React.ReactNode
  threshold?: number
  once?: boolean
  className?: string
  delay?: number
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay,
    }
  })
}

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export function AnimateOnScroll({
  children,
  threshold = 0.2,
  once = true,
  className = '',
  delay = 0
}: AnimateOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={delay}
      variants={fadeUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimateStaggerContainer({
  children,
  threshold = 0.1,
  once = true,
  className = ''
}: AnimateOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeUpItem({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      variants={fadeUpVariants}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
} 
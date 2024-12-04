import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

type ResponseData = {
  success: boolean
  error?: string
}

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Initialize email transporter
const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing email configuration')
    return res.status(500).json({ success: false, error: 'Server configuration error' })
  }

  const { name, email, projectDetails, subject } = req.body

  // Validate required fields
  if (!name || !email || !projectDetails) {
    return res.status(400).json({ success: false, error: 'Missing required fields' })
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email format' })
  }

  try {
    const emailContent = `
      New Project Inquiry
      
      Name: ${name}
      Email: ${email}
      Project Details:
      ${projectDetails}
      
      Sent: ${new Date().toISOString()}
    `.trim()

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: subject || `New Project Inquiry from ${name}`,
      text: emailContent,
      replyTo: email
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Please try again later.'
    })
  }
}

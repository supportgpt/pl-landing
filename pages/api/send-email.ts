import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

interface ErrorWithMessage {
  name?: string;
  message: string;
  code?: string;
  command?: string;
  stack?: string;
}

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Missing email configuration')
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, name, projectDetails, type } = req.body

    let emailContent
    let subject

    if (type === 'contact') {
      // High-fidelity prototype interest from modal
      subject = 'New High-Fidelity Prototype Interest'
      emailContent = `
        New High-Fidelity Prototype Interest
        ----------------------------------
        Name: ${name}
        Email: ${email}
        Project Details: ${projectDetails}
        Time: ${new Date().toISOString()}
      `
    } else {
      // Free low-fidelity prototype request
      subject = 'New Free Low-Fidelity Prototype Request'
      emailContent = `
        New Free Low-Fidelity Prototype Request
        -------------------------------------
        From Email: ${email}
        Message: Interested in a free low-fidelity prototype
        Time: ${new Date().toISOString()}
      `
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject,
      text: emailContent,
    }

    await transporter.sendMail(mailOptions)
    
    return res.status(200).json({ success: true, message: 'Request sent successfully' })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ success: false, message: 'Failed to send request' })
  }
} 
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Missing email configuration')
}

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

transporter.verify(function (error, success) {
  if (error) {
    console.log('SMTP connection error:', error)
  } else {
    console.log('Server is ready to take our messages')
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
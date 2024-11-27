import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

type ResponseData = {
  success: boolean
  error?: string
}

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
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { name, email, projectDetails, inquiryType, message } = req.body

  if (!name || !email || !projectDetails || !inquiryType || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' })
  }

  try {
    // Customize subject based on inquiry type
    let subject = 'New ProtoLaunch Inquiry';
    if (inquiryType === 'General') {
      subject = 'New General Inquiry';
    } else if (inquiryType === 'High Fidelity Prototype') {
      subject = 'New High Fidelity Prototype Request ($499)';
    } else if (inquiryType === 'Startup MVP') {
      subject = 'New Startup MVP Request ($1,999)';
    } else if (inquiryType === 'Custom Build') {
      subject = 'New Custom Build Request';
    }

    const emailContent = `
      New inquiry from ProtoLaunch Landing Page
      
      Name: ${name}
      Email: ${email}
      Inquiry Type: ${inquiryType}
      Message: ${message}
      Project Details: ${projectDetails}
      
      Sent from: ProtoLaunch Landing Page
      Time: ${new Date().toLocaleString()}
    `.trim()

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: emailContent,
      replyTo: email
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ success: false, error: 'Failed to send email' })
  }
}

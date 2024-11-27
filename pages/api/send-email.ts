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

  const { name, email, projectDetails, inquiryType } = req.body

  if (!name || !email || !projectDetails || !inquiryType) {
    return res.status(400).json({ success: false, error: 'Missing required fields' })
  }

  try {
    const subject = `[ProtoLaunch] ${inquiryType} Inquiry from ${name}`

    const emailContent = `
New Project Inquiry
------------------

Contact Information:
Name: ${name}
Email: ${email}

Inquiry Type: ${inquiryType}

Project Details:
${projectDetails}

---
Sent from ProtoLaunch Landing Page
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

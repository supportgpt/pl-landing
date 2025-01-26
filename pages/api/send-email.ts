import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

interface EmailData {
  name: string
  email: string
  projectDetails: string
  storeUrl?: string
  businessType: string
  subject: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing email configuration')
    return res.status(500).json({ message: 'Server configuration error' })
  }

  try {
    const {
      name,
      email,
      projectDetails,
      storeUrl,
      businessType,
      subject
    }: EmailData = req.body

    // Validate required fields
    if (!name || !email || !projectDetails || !businessType) {
      return res.status(400).json({ message: 'Required fields missing' })
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Format email content
    const emailContent = `
      New Shopify Project Inquiry

      Name: ${name}
      Email: ${email}
      Business Type: ${businessType}
      ${storeUrl ? `Existing Store: ${storeUrl}` : 'No existing store'}

      Project Details:
      ${projectDetails}

      Sent: ${new Date().toLocaleString()}
    `.trim()

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: subject || `New Shopify Project Inquiry from ${name}`,
      text: emailContent,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Shopify Project Inquiry</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Business Type:</strong> ${businessType}</p>
            ${storeUrl ? `<p style="margin: 10px 0;"><strong>Existing Store:</strong> <a href="https://${storeUrl}" target="_blank">${storeUrl}</a></p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #444;">Project Details:</h3>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
              ${projectDetails.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee;">
            Sent: ${new Date().toLocaleString()}
          </div>
        </div>
      `,
    })

    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Email sending error:', error)
    res.status(500).json({ message: 'Failed to send email' })
  }
}

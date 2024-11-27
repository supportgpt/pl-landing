import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import type { EmailData, EmailResponse } from '@/types/email'

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Get recipient email from environment variables
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json<EmailResponse>(
      { success: false, error: 'RESEND_API_KEY is not configured' },
      { status: 500 }
    )
  }

  if (!RECIPIENT_EMAIL) {
    return NextResponse.json<EmailResponse>(
      { success: false, error: 'RECIPIENT_EMAIL is not configured' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { name, email, projectDetails, inquiryType } = body as EmailData

    if (!name || !email || !projectDetails || !inquiryType) {
      return NextResponse.json<EmailResponse>(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create a more descriptive subject based on inquiry type
    const subjectPrefix = {
      'Startup MVP': '🚀 [MVP Inquiry]',
      'Custom Build': '🏗️ [Custom Build]',
      'General': '📝 [General Inquiry]'
    }[inquiryType] || '📧 [New Inquiry]'

    const subject = `${subjectPrefix} New inquiry from ${name}`

    const emailContent = `
New inquiry received:

Type: ${inquiryType}
Name: ${name}
Email: ${email}

Project Details:
${projectDetails}

---
Sent from ProtoLaunch Landing Page
    `.trim()

    try {
      await resend.emails.send({
        from: 'ProtoLaunch <onboarding@resend.dev>',
        to: [RECIPIENT_EMAIL],
        subject,
        text: emailContent,
        replyTo: email
      })

      return NextResponse.json<EmailResponse>({ 
        success: true
      })
    } catch (emailError) {
      console.error('Resend API error:', emailError)
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Request error:', error)
    if (error instanceof Error) {
      return NextResponse.json<EmailResponse>(
        { success: false, error: error.message },
        { status: 500 }
      )
    }
    return NextResponse.json<EmailResponse>(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

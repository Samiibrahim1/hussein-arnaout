import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // To send real emails, install resend: npm install resend
  // Then uncomment:
  //
  // const { Resend } = await import('resend')
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'Portfolio <noreply@yourdomain.com>',
  //   to: process.env.CONTACT_EMAIL!,
  //   subject: `New inquiry from ${name}`,
  //   text: `From: ${name} <${email}>\n\n${message}`,
  // })

  console.log('Contact form submission:', { name, email, message })
  return NextResponse.json({ success: true })
}

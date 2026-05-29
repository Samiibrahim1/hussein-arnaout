import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Studio Arnaout.',
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-24 max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-sm uppercase tracking-widest text-accent mb-4">Get in Touch</p>
          <h1 className="font-serif text-5xl leading-tight mb-8 text-charcoal">
            Let&apos;s create something
            <br />
            <span className="italic">remarkable</span>
          </h1>
          <div className="space-y-4 text-charcoal/70">
            <p>Ready to transform your space? We&apos;d love to hear about your project.</p>
            <div className="pt-4 space-y-1">
              <p className="text-sm uppercase tracking-widest text-accent">Studio</p>
              <p>Beirut, Lebanon</p>
            </div>
            <div className="pt-2 space-y-1">
              <p className="text-sm uppercase tracking-widest text-accent">Email</p>
              <p>hello@studioarnaout.com</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}

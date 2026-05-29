'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

type FormData = {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onSubmit = async (data: FormData) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm uppercase tracking-widest mb-2 text-charcoal">Name</label>
        <input
          {...register('name', { required: true })}
          className="w-full border-b border-charcoal/30 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors text-charcoal"
          placeholder="Your name"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">Required</p>}
      </div>

      <div>
        <label className="block text-sm uppercase tracking-widest mb-2 text-charcoal">Email</label>
        <input
          {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          className="w-full border-b border-charcoal/30 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors text-charcoal"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
      </div>

      <div>
        <label className="block text-sm uppercase tracking-widest mb-2 text-charcoal">Message</label>
        <textarea
          {...register('message', { required: true })}
          rows={5}
          className="w-full border-b border-charcoal/30 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors resize-none text-charcoal"
          placeholder="Tell us about your project..."
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">Required</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-charcoal text-cream px-8 py-3 text-sm uppercase tracking-widest hover:bg-warm transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'sent' && (
        <p className="text-green-600 text-sm">Message sent! We&apos;ll be in touch soon.</p>
      )}
      {status === 'error' && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}

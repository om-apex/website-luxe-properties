'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface ContactFormProps {
  brand?: string
}

export function ContactForm({ brand = 'om_luxe_properties' }: ContactFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    if (!formData.message.trim()) {
      setErrorMsg('Please enter a message.')
      return
    }

    setState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formType: 'general',
          metadata: { brand },
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed')
      }

      setState('success')
      setFormData({ firstname: '', lastname: '', email: '', company: '', phone: '', message: '' })
      setTimeout(() => setState('idle'), 5000)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent</h3>
        <p className="text-green-700">
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstname">First Name</Label>
          <Input id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastname">Last Name</Label>
          <Input id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Doe" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
        <Textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} placeholder="How can we help you?" />
      </div>

      {(errorMsg || state === 'error') && (
        <p className="text-sm text-red-600">{errorMsg || 'Something went wrong. Please try again.'}</p>
      )}

      <Button type="submit" disabled={state === 'submitting'} className="w-full bg-brand-primary hover:bg-brand-primary-dark" size="lg">
        {state === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

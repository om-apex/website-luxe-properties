'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function NewsletterClient() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stay in the Loop
            </h1>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              Subscribe to the Om Luxe Properties newsletter for updates on availability,
              local events in Ellijay, and travel inspiration.
            </p>

            {status === 'success' ? (
              <div className="bg-brand-primary/20 border border-brand-primary/30 rounded-xl p-6">
                <p className="text-lg font-medium text-brand-primary">
                  You&apos;re subscribed! Look out for our next newsletter.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name (optional)"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'loading'}
                    className="bg-brand-primary hover:bg-brand-primary-dark text-white px-8"
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

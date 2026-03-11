'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'

function NewsletterForm() {
  const searchParams = useSearchParams()
  const verified = searchParams.get('verified')
  const unsubscribed = searchParams.get('unsubscribed')
  const errorParam = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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
      setSuccessMessage(data.message || 'Check your email to confirm your subscription.')
      setStatus('success')
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.')
      setStatus('error')
    }
  }

  // URL param banners (from verify/unsubscribe redirects)
  const banner = getBanner(verified, unsubscribed, errorParam)

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
              Subscribe to the Om Luxe Properties newsletter for insights on warehouse
              management, supply chain optimization, and industry trends.
            </p>

            {banner && (
              <div className={`rounded-xl p-6 mb-8 ${banner.className}`}>
                <p className={`text-lg font-medium ${banner.textClassName}`}>
                  {banner.message}
                </p>
              </div>
            )}

            {status === 'success' ? (
              <div className="bg-brand-primary/20 border border-brand-primary/30 rounded-xl p-6">
                <p className="text-lg font-medium text-brand-primary">
                  {successMessage}
                </p>
              </div>
            ) : !banner?.hideForm ? (
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
            ) : null}

            {status === 'error' && (
              <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

interface BannerInfo {
  message: string
  className: string
  textClassName: string
  hideForm?: boolean
}

function getBanner(
  verified: string | null,
  unsubscribed: string | null,
  error: string | null
): BannerInfo | null {
  if (verified === 'true') {
    return {
      message: 'Email verified! You\'ll receive our next newsletter.',
      className: 'bg-green-500/20 border border-green-500/30',
      textClassName: 'text-green-400',
      hideForm: true,
    }
  }
  if (verified === 'already') {
    return {
      message: 'Your email is already verified. You\'re all set!',
      className: 'bg-blue-500/20 border border-blue-500/30',
      textClassName: 'text-blue-400',
      hideForm: true,
    }
  }
  if (unsubscribed === 'true') {
    return {
      message: 'You\'ve been unsubscribed. Sorry to see you go.',
      className: 'bg-gray-500/20 border border-gray-500/30',
      textClassName: 'text-gray-300',
    }
  }
  if (unsubscribed === 'already') {
    return {
      message: 'You\'re already unsubscribed.',
      className: 'bg-gray-500/20 border border-gray-500/30',
      textClassName: 'text-gray-300',
    }
  }
  if (error === 'invalid-token') {
    return {
      message: 'Invalid or expired link. Please try subscribing again.',
      className: 'bg-red-500/20 border border-red-500/30',
      textClassName: 'text-red-400',
    }
  }
  if (error === 'verification-failed' || error === 'unsubscribe-failed') {
    return {
      message: 'Something went wrong. Please try again.',
      className: 'bg-red-500/20 border border-red-500/30',
      textClassName: 'text-red-400',
    }
  }
  return null
}

export function NewsletterClient() {
  return (
    <Suspense fallback={
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Stay in the Loop</h1>
          </div>
        </div>
      </div>
    }>
      <NewsletterForm />
    </Suspense>
  )
}

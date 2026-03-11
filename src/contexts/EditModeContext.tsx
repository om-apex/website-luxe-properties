'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import type { SupabaseClient, User } from '@supabase/supabase-js'

interface EditModeContextType {
  editMode: boolean
  setEditMode: (value: boolean) => void
  user: User | null
  isOmApexUser: boolean
  editModeRequested: boolean
  showLoginPrompt: boolean
}

const EditModeContext = createContext<EditModeContextType>({
  editMode: false,
  setEditMode: () => {},
  user: null,
  isOmApexUser: false,
  editModeRequested: false,
  showLoginPrompt: false,
})

function getInitialEditModeRequested(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const search = window.location.search.toLowerCase()
    const params = new URLSearchParams(search)
    return params.get('editmode') === 'true'
  } catch {
    return false
  }
}

function tryCreateClient(): SupabaseClient | null {
  try {
    const { createBrowserClient } = require('@supabase/ssr')
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  } catch (e) {
    console.error('[EditMode] Failed to create Supabase client:', e)
    return null
  }
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [editModeRequested, setEditModeRequested] = useState(getInitialEditModeRequested)
  const supabaseRef = useRef<SupabaseClient | null>(null)

  // Lazily create Supabase client (only on client side)
  if (typeof window !== 'undefined' && !supabaseRef.current) {
    supabaseRef.current = tryCreateClient()
  }

  const isOmApexUser = user?.email?.endsWith('@omapex.com') || false
  const showLoginPrompt = editModeRequested && !isOmApexUser

  // Get initial user and listen for auth changes
  useEffect(() => {
    const supabase = supabaseRef.current
    if (!supabase) return

    let subscription: { unsubscribe: () => void } | null = null

    try {
      const getUser = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user)
        } catch (e) {
          console.error('[EditMode] getUser failed:', e)
        }
      }
      getUser()

      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
        if (!session?.user?.email?.endsWith('@omapex.com')) {
          setEditMode(false)
        }
      })
      subscription = data.subscription
    } catch (e) {
      console.error('[EditMode] Auth setup failed:', e)
    }

    return () => { subscription?.unsubscribe() }
  }, [])

  // Activate editMode when user is authenticated and editMode was requested
  useEffect(() => {
    if (editModeRequested && isOmApexUser) {
      setEditMode(true)
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        if (!url.searchParams.has('editMode')) {
          url.searchParams.set('editMode', 'true')
          window.history.replaceState({}, '', url.toString())
        }
      }
    }
  }, [editModeRequested, isOmApexUser])

  // Keyboard shortcut: Cmd+Shift+E (Mac) / Ctrl+Shift+E (Windows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault()

        if (editMode) {
          // Toggle off
          setEditMode(false)
          setEditModeRequested(false)
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href)
            url.searchParams.delete('editMode')
            window.history.replaceState({}, '', url.toString())
          }
        } else if (isOmApexUser) {
          // Toggle on (already authenticated)
          setEditMode(true)
          setEditModeRequested(true)
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href)
            url.searchParams.set('editMode', 'true')
            window.history.replaceState({}, '', url.toString())
          }
        } else {
          // Not authenticated — show login prompt
          setEditModeRequested(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editMode, isOmApexUser])

  // Handle Google OAuth login
  const handleLogin = useCallback(async () => {
    const supabase = supabaseRef.current
    if (!supabase) return

    const redirectPath = typeof window !== 'undefined'
      ? window.location.pathname + '?editMode=true'
      : '/?editMode=true'

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?redirect=${encodeURIComponent(redirectPath)}`,
        queryParams: {
          hd: 'omapex.com',
        },
      },
    })
  }, [])

  // Redeploy state
  const [deployStatus, setDeployStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleRedeploy = useCallback(async () => {
    setDeployStatus('loading')
    try {
      const res = await fetch('/api/cms/redeploy', { method: 'POST' })
      if (!res.ok) throw new Error('Deploy request failed')
      setDeployStatus('success')
      setTimeout(() => setDeployStatus('idle'), 5000)
    } catch {
      setDeployStatus('error')
      setTimeout(() => setDeployStatus('idle'), 5000)
    }
  }, [])

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode, user, isOmApexUser, editModeRequested, showLoginPrompt }}>
      {showLoginPrompt && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, backgroundColor: 'rgba(17,24,39,0.95)', color: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', fontSize: '14px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <span>Edit mode requires authentication</span>
          <button
            onClick={handleLogin}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', color: '#111827', padding: '6px 16px', borderRadius: '6px', fontWeight: 500, border: 'none', cursor: 'pointer' }}
          >
            <svg style={{ height: '16px', width: '16px' }} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
          <button
            onClick={() => setEditModeRequested(false)}
            style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Dismiss
          </button>
        </div>
      )}
      {editMode && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleRedeploy}
            disabled={deployStatus === 'loading'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: deployStatus === 'success' ? '#059669' : deployStatus === 'error' ? '#DC2626' : '#1F2937',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              border: 'none',
              cursor: deployStatus === 'loading' ? 'wait' : 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              opacity: deployStatus === 'loading' ? 0.7 : 1,
              transition: 'background-color 0.2s, opacity 0.2s',
            }}
          >
            {deployStatus === 'loading' && (
              <svg style={{ height: '16px', width: '16px', animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4m0 12v4m-7.07-14.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
              </svg>
            )}
            {deployStatus === 'idle' && 'Publish Changes'}
            {deployStatus === 'loading' && 'Deploying...'}
            {deployStatus === 'success' && 'Deploy triggered! Live in ~60s'}
            {deployStatus === 'error' && 'Deploy failed — try again'}
          </button>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  return useContext(EditModeContext)
}

'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

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

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [editModeRequested, setEditModeRequested] = useState(false)

  const supabase = createClient()
  const isOmApexUser = user?.email?.endsWith('@omapex.com') || false
  const showLoginPrompt = editModeRequested && !isOmApexUser

  // Get initial user and listen for auth changes
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user?.email?.endsWith('@omapex.com')) {
        setEditMode(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // Check URL for editMode param on mount (case-insensitive)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search.toLowerCase()
      const params = new URLSearchParams(search)
      if (params.get('editmode') === 'true') {
        setEditModeRequested(true)
      }
    }
  }, [])

  // Activate editMode when user is authenticated and editMode was requested
  useEffect(() => {
    if (editModeRequested && isOmApexUser) {
      setEditMode(true)
      // Ensure URL has ?editMode=true
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
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'E') {
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
  }, [supabase.auth])

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode, user, isOmApexUser, editModeRequested, showLoginPrompt }}>
      {showLoginPrompt && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-gray-900/95 text-white px-4 py-3 flex items-center justify-center gap-4 text-sm shadow-lg">
          <span>Edit mode requires authentication</span>
          <button
            onClick={handleLogin}
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-1.5 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
          <button
            onClick={() => setEditModeRequested(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  return useContext(EditModeContext)
}

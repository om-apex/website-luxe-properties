'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

interface EditModeContextType {
  editMode: boolean
  setEditMode: (value: boolean) => void
  user: User | null
  isOmApexUser: boolean
}

const EditModeContext = createContext<EditModeContextType>({
  editMode: false,
  setEditMode: () => {},
  user: null,
  isOmApexUser: false,
})

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const isOmApexUser = user?.email?.endsWith('@omapex.com') || false

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
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('editMode') === 'true' && isOmApexUser) {
        setEditMode(true)
      }
    }
  }, [isOmApexUser])

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode, user, isOmApexUser }}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  return useContext(EditModeContext)
}

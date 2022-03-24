import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import App from './components/App'

export const Squeak = ({ apiKey, url, apiHost }) => {
  const supabase = createClient(url, apiKey)
  const [authState, setAuthState] = useState()
  const [user, setUser] = useState(supabase.auth.user())

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (e, session) => {
        setAuthState(e)
        setUser(session?.user)
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return (
    <App
      user={user}
      authState={authState}
      supabase={supabase}
      apiHost={apiHost}
    />
  )
}

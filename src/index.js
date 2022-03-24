import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import App from './components/App'

export const Squeak = ({ apiKey, url, apiHost }) => {
  const supabase = createClient(url, apiKey)
  const [authState, setAuthState] = useState()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (e, session) => {
        setAuthState(e)
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])
  return <App authState={authState} supabase={supabase} apiHost={apiHost} />
}

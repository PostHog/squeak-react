import { createClient } from '@supabase/supabase-js'
import React from 'react'
import App from './components/App'
import { AuthProvider } from './components/Auth'

export const Squeak = ({ apiKey, url, apiHost }) => {
  const supabase = createClient(url, apiKey)
  return (
    <AuthProvider apiHost={apiHost} supabase={supabase}>
      <App />
    </AuthProvider>
  )
}

import { createClient } from '@supabase/supabase-js'
import React from 'react'
import App from './components/App'

export const Squeak = ({ apiKey, url, apiHost, organizationId }) => {
  const supabase = createClient(url, apiKey)

  return (
    <App
      supabase={supabase}
      apiHost={apiHost}
      organizationId={organizationId}
    />
  )
}

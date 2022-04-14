import React from 'react'
import { createRoot } from 'react-dom/client'
import { Squeak } from '../../src'

const container = document.querySelector('#demo')
const root = createRoot(container)
root.render(
  <div style={{ maxWidth: 450 }}>
    <Squeak
      apiHost='YOUR_API_HOST'
      apiKey='YOUR_SUPABASE_ANON_KEY'
      url='YOUR_SUPABASE_URL'
      organizationId='YOUR_ORGANIZATION_ID'
    />
  </div>
)

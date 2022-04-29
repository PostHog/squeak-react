import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div style={{ maxWidth: 450 }}>
    <Squeak
      apiHost='YOUR_API_HOST'
      apiKey='YOUR_SUPABASE_ANON_KEY'
      url='YOUR_SUPABASE_URL'
      organizationId='YOUR_ORGANIZATION_ID'
    />
  </div>,
  document.getElementById('demo')
)

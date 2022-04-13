import React from 'react'
import { Squeak } from 'squeak-react'

const App = () => {
  return (
    <div style={{ maxWidth: 450 }}>
      <Squeak
        apiHost='YOUR_API_HOST'
        apiKey='YOUR_SUPABASE_ANON_KEY'
        url='YOUR_SUPABASE_URL'
        organizationId='YOUR_ORGANIZATION_ID'
      />
    </div>
  )
}

export default App

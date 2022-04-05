import React from 'react'
import { Squeak } from 'squeak-react'

const App = () => {
  return (
    <Squeak
      apiHost='YOUR_API_HOST'
      apiKey='YOUR_SUPABASE_ANON_KEY'
      url='YOUR_SUPABASE_URL'
      organizationId='YOUR_ORGANIZATION_ID'
    />
  )
}

export default App

import React from 'react'
import { Squeak } from 'squeak-react'

const App = () => {
  return (
    <div style={{ maxWidth: 450 }}>
      <Squeak
        apiHost='//localhost:3000'
        apiKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imloa2J0Y3pjaml4a2FzYnppZnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzQxMTMsImV4cCI6MTk2NTQ1MDExM30.NJqC_2awbjctS-1Gu0QRi-vGJE4Pqux_ssdZbU1DgUg'
        url='https://ihkbtczcjixkasbziftt.supabase.co'
        organizationId='5279d14f-3b03-48fe-af63-4f58274e23b2'
      />
    </div>
  )
}

export default App

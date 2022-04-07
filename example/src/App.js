import React from 'react'
import { Squeak } from 'squeak-react'

const App = () => {
  return (
    <Squeak
      apiHost='http://localhost:3000'
      apiKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0enFscnJ5Z25xZWViYXNwemxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzMzg4NjYsImV4cCI6MTk2MTkxNDg2Nn0.RAIW0QKV3y-EiFyh8xQpb8Tmtz03lm9RNfF1GVAqu_o'
      url='https://htzqlrrygnqeebaspzln.supabase.co'
      organizationId='1'
    />
  )
}

export default App

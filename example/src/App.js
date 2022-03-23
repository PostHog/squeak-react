import React from 'react'
import { Squeak } from 'squeak-react'
import 'squeak-react/dist/index.css'

const App = () => {
  return (
    <Squeak
      apiHost='YOUR_API_HOST'
      apiKey='YOUR_SUPABASE_ANON_KEY'
      url='YOUR_SUPABASE_URL'
    />
  )
}

export default App

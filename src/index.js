import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useRef, useState } from 'react'
import root from 'react-shadow/styled-components'
import App from './components/App'
import { Theme } from './components/Theme'
import getBackgroundColor from './util/getBackgroundColor'
import lightOrDark from './util/lightOrDark'
export const Squeak = ({ apiKey, url, apiHost, organizationId }) => {
  const [darkMode, setDarkMode] = useState(null)
  const containerRef = useRef()

  const supabase = createClient(url, apiKey)

  useEffect(() => {
    if (containerRef.current) {
      const color = getBackgroundColor(containerRef.current)
      setDarkMode(lightOrDark(color) === 'dark')
    }
  }, [])

  return (
    <root.div ref={containerRef}>
      <Theme dark={darkMode} />
      <App
        supabase={supabase}
        apiHost={apiHost}
        organizationId={organizationId}
      />
    </root.div>
  )
}

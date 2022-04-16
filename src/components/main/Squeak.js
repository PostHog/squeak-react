import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useRef, useState } from 'react'
import root from 'react-shadow/styled-components'
import { Provider as SupabaseProvider } from 'react-supabase'
import { Provider as OrgProvider } from '../../context/org'
import getBackgroundColor from '../../util/getBackgroundColor'
import lightOrDark from '../../util/lightOrDark'
import Questions from '../Questions'
import { Theme } from '../Theme'

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
    <SupabaseProvider value={supabase}>
      <OrgProvider value={{ organizationId, apiHost }}>
        <root.div ref={containerRef}>
          <Theme dark={darkMode} />
          <div className='squeak'>
            <Questions />
          </div>
        </root.div>
      </OrgProvider>
    </SupabaseProvider>
  )
}

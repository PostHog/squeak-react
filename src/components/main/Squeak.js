import { createClient } from '@supabase/supabase-js'
import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'
import { Provider as SupabaseProvider } from 'react-supabase'
import { Provider as OrgProvider } from '../../context/org'
import { Provider as UserProvider } from '../../context/user'
import Questions from '../Questions'
import { Theme } from '../Theme'

export const Squeak = ({
  apiKey,
  url,
  apiHost,
  organizationId,
  slug,
  limit,
  onSubmit
}) => {
  const supabase = createClient(url, apiKey)
  const containerRef = useRef()

  return (
    <root.div ref={containerRef}>
      <SupabaseProvider value={supabase}>
        <OrgProvider value={{ organizationId, apiHost }}>
          <UserProvider>
            <Theme containerRef={containerRef} />
            <div className='squeak'>
              <Questions onSubmit={onSubmit} limit={limit} slug={slug} />
            </div>
          </UserProvider>
        </OrgProvider>
      </SupabaseProvider>
    </root.div>
  )
}

import { createClient } from '@supabase/supabase-js'
import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'
import { Provider as SupabaseProvider } from 'react-supabase'
import { Provider as OrgProvider } from '../../context/org'
import { Provider as UserProvider } from '../../context/user'
import SingleQuestion from '../Question'
import { Theme } from '../Theme'

export const Question = ({
  apiHost,
  organizationId,
  onResolve,
  onSubmit,
  question,
  url,
  apiKey,
  ...other
}) => {
  const containerRef = useRef()
  const supabase = other.supabase || createClient(url, apiKey)
  return (
    <root.div ref={containerRef}>
      <SupabaseProvider value={supabase}>
        <OrgProvider value={{ organizationId, apiHost }}>
          <UserProvider>
            <Theme containerRef={containerRef} />
            <div className='squeak'>
              <SingleQuestion
                apiHost={apiHost}
                replies={question?.replies}
                question={question?.question}
                onSubmit={onSubmit}
                onResolve={onResolve}
              />
            </div>
          </UserProvider>
        </OrgProvider>
      </SupabaseProvider>
    </root.div>
  )
}

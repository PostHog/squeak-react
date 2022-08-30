import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'

import { Provider as OrgProvider } from '../../context/org'
import { Provider as UserProvider } from '../../context/user'
import Questions from '../Questions'
import { Theme } from '../Theme'

export const Squeak = ({
  apiHost,
  organizationId,
  slug,
  limit,
  onSubmit,
  onLoad,
  topics = true,
  onSignUp
}) => {
  const containerRef = useRef()

  return (
    <root.div ref={containerRef}>
      <OrgProvider value={{ organizationId, apiHost }}>
        <UserProvider>
          <Theme containerRef={containerRef} />
          <div className='squeak'>
            <Questions
              onSignUp={onSignUp}
              onLoad={onLoad}
              topics={topics}
              onSubmit={onSubmit}
              limit={limit}
              slug={slug}
            />
          </div>
        </UserProvider>
      </OrgProvider>
    </root.div>
  )
}

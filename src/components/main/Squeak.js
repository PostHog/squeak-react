import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'

import { Provider as OrgProvider } from '../../context/org'
import { Provider as UserProvider } from '../../context/user'
import Questions from '../Questions'
import { Theme } from '../Theme'

export const Squeak = ({ apiHost, organizationId, slug, onSubmit }) => {
  const containerRef = useRef()

  return (
    <root.div ref={containerRef}>
      <OrgProvider value={{ organizationId, apiHost }}>
        <UserProvider>
          <Theme containerRef={containerRef} />
          <div className='squeak'>
            <Questions onSubmit={onSubmit} slug={slug} />
          </div>
        </UserProvider>
      </OrgProvider>
    </root.div>
  )
}

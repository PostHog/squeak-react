import React from 'react'
import ReactDOM from 'react-dom'

import { Squeak } from '../../src/components/main/Squeak'

ReactDOM.render(
  <div style={{ maxWidth: 450 }}>
    <Squeak
      profileLink={(user) =>
        user ? `/community/profiles/${user?.profile?.id}` : ''
      }
      apiHost='https://squeak.cloud'
      organizationId='a898bcf2-c5b9-4039-82a0-a00220a8c626'
    />
  </div>,
  document.getElementById('demo')
)

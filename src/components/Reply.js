import React from 'react'
import Avatar from './Avatar'
import Days from './Days'
import Markdown from './Markdown'

export default function Reply({
  squeak_profiles: user,
  created_at,
  body,
  subject
}) {
  return (
    <div className='squeak-reply'>
      <Avatar image={user?.avatar} />
      <div>
        <div className='squeak-reply-details'>
          <p>{user?.first_name || 'Anonymous'}</p>
          <p>
            <Days created={created_at} />
          </p>
        </div>
        {subject && <h3>{subject}</h3>}
        <Markdown>{body}</Markdown>
      </div>
    </div>
  )
}

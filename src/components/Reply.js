import React from 'react'
import Avatar from './Avatar'
import Days from './Days'
import Markdown from './Markdown'

export default function Reply({ profile, created_at, body, subject, badgeText }) {
  return (
    <div className='squeak-reply'>
      <Avatar image={profile.avatar} />
      <div>
        <div className='squeak-reply-details'>
          <p>{profile.first_name || 'Anonymous'}</p>
          <p>
            <Days created={created_at} />
          </p>
          {badgeText && <p>{badgeText}</p>}
        </div>
        {subject && <h3>{subject}</h3>}
        <Markdown>{body}</Markdown>
      </div>
    </div>
  )
}

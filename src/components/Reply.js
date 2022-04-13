import React from 'react'
import Avatar from './Avatar'
import Days from './Days'
import Markdown from './Markdown'

export default function Reply({
  profile,
  created_at,
  body,
  subject,
  badgeText
}) {
  return (
    <div className='squeak-post'>
      <div className='squeak-post-author'>
        <Avatar image={profile?.avatar} />
        <div className='squeak-author-name'>
          {profile?.first_name || 'Anonymous'}
        </div>
        <Days created={created_at} />
        {badgeText && <span className='squeak-author-badge'>{badgeText}</span>}
      </div>
      <div className='squeak-post-content'>
        {subject && <h3>{subject}</h3>}
        <Markdown>{body}</Markdown>
      </div>
    </div>
  )
}

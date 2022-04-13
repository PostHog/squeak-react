import React from 'react'
import Avatar from './Avatar'
import Days from './Days'
import Markdown from './Markdown'

export default function Reply({
  profile,
  created_at,
  body,
  subject,
  badgeText,
  ...other
}) {
  return (
    <div {...other}>
      <div className='squeak-post-author'>
        <Avatar image={profile?.avatar} />
        <strong className='squeak-author-name'>
          {profile?.first_name || 'Anonymous'}
        </strong>
        {badgeText && <span className='squeak-author-badge'>{badgeText}</span>}
        <Days created={created_at} />
      </div>
      <div className='squeak-post-content'>
        {subject && <h3>{subject}</h3>}
        <Markdown>{body}</Markdown>
      </div>
    </div>
  )
}

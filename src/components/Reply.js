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
  resolved,
  resolvedBy,
  isAuthor,
  handleResolve,
  id,
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
        {resolved && resolvedBy === id && (
          <span>
            <p className='squeak-resolved-badge'>SOLUTION</p>
            {isAuthor && (
              <button
                onClick={() => handleResolve(false)}
                className='squeak-undo-resolved'
              >
                Undo
              </button>
            )}
          </span>
        )}
      </div>
      <div className='squeak-post-content'>
        {subject && <h3>{subject}</h3>}
        <Markdown>{body}</Markdown>
        {!resolved && isAuthor && (
          <button
            onClick={() => handleResolve(true, id)}
            className='squeak-resolve-button'
          >
            Mark as solution
          </button>
        )}
      </div>
    </div>
  )
}

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
  isAuthor,
  handleResolve,
  resolved,
  resolvedBy,
  id
}) {
  return (
    <div className='squeak-reply'>
      <Avatar image={profile?.avatar} />
      <div>
        <div className='squeak-reply-details'>
          <p>{profile?.first_name || 'Anonymous'}</p>
          <p>
            <Days created={created_at} />
          </p>
          {badgeText && <p className='squeak-badge'>{badgeText}</p>}
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

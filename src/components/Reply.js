import React, { useState } from 'react'
import { useUser } from '../hooks/useUser'
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
  published,
  handlePublish,
  ...other
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const user = useUser()
  const isModerator = user?.isModerator
  const handleDelete = (e) => {
    e.stopPropagation()
    if (confirmDelete) {
      other.handleDelete(id)
    } else {
      setConfirmDelete(true)
    }
  }

  const handleContainerClick = (e) => {
    setConfirmDelete(false)
  }

  return (
    <div {...other} onClick={handleContainerClick}>
      <div className='squeak-post-author'>
        <Avatar image={profile?.avatar} />
        <strong className='squeak-author-name'>
          {profile?.first_name || 'Anonymous'}
        </strong>
        {badgeText && <span className='squeak-author-badge'>{badgeText}</span>}
        <Days created={created_at} />
        {resolved && resolvedBy === id && (
          <>
            <span className='squeak-resolved-badge'>Solution</span>
            {(isAuthor || isModerator) && (
              <button
                onClick={() => handleResolve(false)}
                className='squeak-undo-resolved'
              >
                Undo
              </button>
            )}
          </>
        )}
      </div>
      <div className='squeak-post-content'>
        {subject && <h3>{subject}</h3>}
        <Markdown>{body}</Markdown>
        <div className='squeak-reply-action-buttons'>
          {!resolved && (isAuthor || isModerator) && (
            <button
              onClick={() => handleResolve(true, id)}
              className='squeak-resolve-button'
            >
              Mark as solution
            </button>
          )}
          {isModerator && (
            <button
              onClick={() => handlePublish(id, !published)}
              className='squeak-publish-button'
            >
              {published ? 'Unpublish' : 'Publish'}
            </button>
          )}
          {isModerator && (
            <button onClick={handleDelete} className='squeak-delete-button'>
              {confirmDelete ? 'Click again to confirm' : 'Delete'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

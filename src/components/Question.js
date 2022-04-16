import React, { useState } from 'react'
import { useClient } from 'react-supabase'
import { useUser } from '../hooks/useUser'
import QuestionForm from './QuestionForm'
import Reply from './Reply'

const getBadge = (questionAuthorId, replyAuthorId, replyAuthorRole) => {
  if (replyAuthorRole === 'admin' || replyAuthorRole === 'moderator') {
    return 'Moderator'
  }

  if (!questionAuthorId || !replyAuthorId) {
    return null
  }

  return questionAuthorId === replyAuthorId ? 'Author' : null
}

export default function Question({
  organizationId,
  question,
  replies,
  onSubmit,
  apiHost
}) {
  const supabase = useClient()
  const [user] = useUser()
  const [firstReply] = replies
  const [resolvedBy, setResolvedBy] = useState(question?.resolved_reply_id)
  const [resolved, setResolved] = useState(question?.resolved)
  const questionAuthorId = firstReply?.profile?.id
  const handleResolve = async (resolved, replyId = null) => {
    await fetch(`${apiHost}/api/question/resolve`, {
      method: 'POST',
      body: JSON.stringify({
        token: supabase.auth?.session()?.access_token,
        messageId: question?.id,
        replyId,
        organizationId,
        resolved
      })
    })
    setResolved(resolved)
    setResolvedBy(replyId)
  }

  return (
    <div className='squeak-question-container'>
      <Reply
        className='squeak-post'
        subject={question.subject}
        {...firstReply}
      />
      {replies && replies.length - 1 > 0 && (
        <ul
          className={`squeak-replies ${
            resolved ? 'squeak-thread-resolved' : ''
          }`}
        >
          {replies.slice(1).map((reply) => {
            const replyAuthorMetadata = reply?.profile?.metadata[0]

            const badgeText = getBadge(
              questionAuthorId,
              reply?.profile?.id,
              replyAuthorMetadata?.role
            )

            return (
              <li
                key={reply.id}
                className={resolvedBy === reply.id ? 'squeak-solution' : ''}
              >
                <Reply
                  className='squeak-post-reply'
                  resolved={resolved}
                  resolvedBy={resolvedBy}
                  handleResolve={handleResolve}
                  isAuthor={user?.profile?.id === questionAuthorId}
                  key={reply.id}
                  {...reply}
                  badgeText={badgeText}
                />
              </li>
            )
          })}
        </ul>
      )}
      {resolved ? (
        <div className='squeak-locked-message'>
          <p>This thread has been closed.</p>
        </div>
      ) : (
        <div className='squeak-reply-form-container'>
          <QuestionForm
            apiHost={apiHost}
            onSubmit={onSubmit}
            messageID={question.id}
            organizationId={organizationId}
            formType='reply'
          />
        </div>
      )}
    </div>
  )
}

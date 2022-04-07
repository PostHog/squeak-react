import { useState } from 'react'
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
  setQuestions,
  getQuestions,
  authState,
  apiHost,
  supabase,
  user
}) {
  const [showReply, setShowReply] = useState(false)
  const [firstReply] = replies
  const questionAuthorId = firstReply?.profile?.id

  return (
    <div>
      <Reply
        setShowReply={setShowReply}
        hideButton={showReply}
        subject={question.subject}
        {...firstReply}
      />
      {replies && replies.length - 1 > 0 && (
        <ul className='squeak-replies'>
          {replies.slice(1).map((reply) => {
            const replyAuthorMetadata = reply?.profile?.metadata[0]

            const badgeText = getBadge(
              questionAuthorId,
              reply?.profile?.id,
              replyAuthorMetadata?.role
            )

            return (
              <li key={reply.id}>
                <Reply
                  key={reply.id}
                  {...reply}
                  badgeText={badgeText}
                  hideButton
                />
              </li>
            )
          })}
        </ul>
      )}
      <div className='squeak-reply-form-container'>
        <QuestionForm
          user={user}
          authState={authState}
          apiHost={apiHost}
          supabase={supabase}
          getQuestions={getQuestions}
          setQuestions={setQuestions}
          messageID={question.id}
          organizationId={organizationId}
          formType='reply'
        />
      </div>
    </div>
  )
}

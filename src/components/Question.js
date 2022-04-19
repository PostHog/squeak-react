import React, { useEffect, useState } from 'react'
import { useClient } from 'react-supabase'
import { useOrg } from '../hooks/useOrg'
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

export default function Question({ question, onSubmit, ...other }) {
  const supabase = useClient()
  const { organizationId, apiHost } = useOrg()
  const user = useUser()
  const [replies, setReplies] = useState(other.replies)
  const [firstReply] = replies
  const [resolvedBy, setResolvedBy] = useState(question?.resolved_reply_id)
  const [resolved, setResolved] = useState(question?.resolved)
  const questionAuthorId = firstReply?.profile?.id
  const userMetadata = user?.profile?.metadata[0]
  const isModerator =
    userMetadata?.role === 'admin' || userMetadata?.role === 'moderator'
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

  const handleReplyDelete = async (id) => {
    await supabase
      .from('squeak_replies')
      .delete()
      .match({ id, organization_id: organizationId })
    setReplies(replies.filter((reply) => id !== reply.id))
  }

  const handlePublish = async (id, published) => {
    await supabase
      .from('squeak_replies')
      .update({ published })
      .match({ id, organization_id: organizationId })
    const newReplies = [...replies]
    newReplies.some((reply) => {
      if (reply.id === id) {
        reply.published = published
        return true
      }
    })
    setReplies(newReplies)
  }

  useEffect(() => {
    setReplies(other.replies)
  }, [other.replies])

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
              (reply.published || (!reply.published && isModerator)) && (
                <li
                  key={reply.id}
                  className={`${
                    resolvedBy === reply.id ? 'squeak-solution' : ''
                  } ${!reply.published ? 'squeak-reply-unpublished' : ''}`}
                >
                  <Reply
                    handlePublish={handlePublish}
                    handleDelete={handleReplyDelete}
                    className='squeak-post-reply'
                    resolved={resolved}
                    resolvedBy={resolvedBy}
                    handleResolve={handleResolve}
                    isModerator={isModerator}
                    isAuthor={user?.profile?.id === questionAuthorId}
                    key={reply.id}
                    {...reply}
                    badgeText={badgeText}
                  />
                </li>
              )
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
            onSubmit={onSubmit}
            messageID={question.id}
            formType='reply'
          />
        </div>
      )}
    </div>
  )
}

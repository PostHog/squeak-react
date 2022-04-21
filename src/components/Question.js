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

const Collapsed = ({
  reply,
  isModerator,
  resolvedBy,
  handlePublish,
  handleReplyDelete,
  resolved,
  handleResolve,
  user,
  questionAuthorId,
  setExpanded,
  replyCount
}) => {
  const replyAuthorMetadata = reply?.profile?.metadata[0]

  const badgeText = getBadge(
    questionAuthorId,
    reply?.profile?.id,
    replyAuthorMetadata?.role
  )
  return (
    <>
      <li>
        <button
          className='squeak-other-replies'
          onClick={() => setExpanded(true)}
        >
          View {replyCount} other {replyCount === 1 ? 'reply' : 'replies'}
        </button>
      </li>

      <li
        className={`${resolvedBy === reply.id ? 'squeak-solution' : ''} ${
          !reply.published ? 'squeak-reply-unpublished' : ''
        }`}
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
          {...reply}
          badgeText={badgeText}
        />
      </li>
    </>
  )
}

const Expanded = ({
  replies,
  isModerator,
  resolvedBy,
  handlePublish,
  handleReplyDelete,
  resolved,
  handleResolve,
  user,
  questionAuthorId
}) => {
  return replies.map((reply) => {
    const replyAuthorMetadata = reply?.profile?.metadata[0]

    const badgeText = getBadge(
      questionAuthorId,
      reply?.profile?.id,
      replyAuthorMetadata?.role
    )

    return (
      <li
        key={reply.id}
        className={`${resolvedBy === reply.id ? 'squeak-solution' : ''} ${
          !reply.published ? 'squeak-reply-unpublished' : ''
        }`}
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
          {...reply}
          badgeText={badgeText}
        />
      </li>
    )
  })
}

export default function Question({ question, onSubmit, onResolve, ...other }) {
  const supabase = useClient()
  const { organizationId, apiHost } = useOrg()
  const user = useUser()
  const [replies, setReplies] = useState([])
  const [firstReply] = replies
  const [resolvedBy, setResolvedBy] = useState(question?.resolved_reply_id)
  const [resolved, setResolved] = useState(question?.resolved)
  const [expanded, setExpanded] = useState(false)
  const questionAuthorId = firstReply?.profile?.id || null
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
    if (onResolve) {
      onResolve(resolved, replyId)
    }
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
    setReplies(
      other.replies.filter(
        (reply) => reply.published || (!reply.published && isModerator)
      )
    )
  }, [other.replies, user])

  useEffect(() => {
    setResolved(question.resolved)
  }, [question.resolved])

  useEffect(() => {
    setResolvedBy(question.resolved_reply_id)
  }, [question.resolved_reply_id])

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
          {expanded || replies.length <= 2 ? (
            <Expanded
              replies={replies.slice(1)}
              isModerator={isModerator}
              resolvedBy={resolvedBy}
              handlePublish={handlePublish}
              handleReplyDelete={handleReplyDelete}
              resolved={resolved}
              handleResolve={handleResolve}
              user={user}
              questionAuthorId={questionAuthorId}
            />
          ) : (
            <Collapsed
              isModerator={isModerator}
              resolvedBy={resolvedBy}
              handlePublish={handlePublish}
              handleReplyDelete={handleReplyDelete}
              resolved={resolved}
              handleResolve={handleResolve}
              user={user}
              questionAuthorId={questionAuthorId}
              setExpanded={setExpanded}
              replyCount={replies.length - 2}
              reply={
                replies[
                  replies.findIndex((reply) => reply.id === resolvedBy)
                ] || replies[replies.length - 1]
              }
            />
          )}
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

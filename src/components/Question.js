import React, { useState } from 'react'
import { Provider as QuestionProvider } from '../context/question'
import { useQuestion } from '../hooks/useQuestion'
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

const Collapsed = ({ setExpanded }) => {
  const { replies, resolvedBy, questionAuthorId } = useQuestion()
  const reply =
    replies[replies.findIndex((reply) => reply?.id === resolvedBy)] ||
    replies[replies.length - 1]
  const replyCount = replies.length - 2
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
        className={`${resolvedBy === reply?.id ? 'squeak-solution' : ''} ${
          !reply?.published ? 'squeak-reply-unpublished' : ''
        }`}
      >
        <Reply className='squeak-post-reply' {...reply} badgeText={badgeText} />
      </li>
    </>
  )
}

const Expanded = ({}) => {
  const question = useQuestion()
  const replies = question.replies?.slice(1)
  const { resolvedBy, questionAuthorId } = question
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
        <Reply className='squeak-post-reply' {...reply} badgeText={badgeText} />
      </li>
    )
  })
}

const Replies = ({ expanded, setExpanded }) => {
  const { resolved, replies, onSubmit, question } = useQuestion()
  return (
    <>
      {replies && replies.length - 1 > 0 && (
        <ul
          className={`squeak-replies ${
            resolved ? 'squeak-thread-resolved' : ''
          }`}
        >
          {expanded || replies.length <= 2 ? (
            <Expanded />
          ) : (
            <Collapsed setExpanded={setExpanded} />
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
    </>
  )
}

export default function Question({ question, onSubmit, onResolve, replies }) {
  const [expanded, setExpanded] = useState(false)
  const [firstReply] = replies

  return (
    <div className='squeak-question-container'>
      <Reply
        className='squeak-post'
        subject={question.subject}
        {...firstReply}
      />
      <QuestionProvider
        onSubmit={onSubmit}
        question={question}
        replies={replies}
        onResolve={onResolve}
      >
        <Replies expanded={expanded} setExpanded={setExpanded} />
      </QuestionProvider>
    </div>
  )
}

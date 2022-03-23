import React, { useState } from 'react'
import QuestionForm from './QuestionForm'
import Reply from './Reply'

export default function Question({
  message,
  replies,
  setQuestions,
  getQuestions
}) {
  const [showReply, setShowReply] = useState(false)
  return (
    <div>
      <Reply
        setShowReply={setShowReply}
        hideButton={showReply}
        subject={message.subject}
        {...replies[0]}
      />
      {replies && replies.length - 1 > 0 && (
        <ul className='squeak-replies'>
          {replies.slice(1).map((reply) => {
            return (
              <li>
                <Reply hideButton={true} key={reply.id} {...reply} />
              </li>
            )
          })}
        </ul>
      )}
      <div className='squeak-reply-form-container'>
        <QuestionForm
          getQuestions={getQuestions}
          setQuestions={setQuestions}
          messageID={message.id}
          formType='reply'
        />
      </div>
    </div>
  )
}

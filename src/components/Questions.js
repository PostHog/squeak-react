import React from 'react'
import Question from './Question'

export default function Questions({
  handleReplySubmit,
  loading,
  questions,
  setQuestions,
  getQuestions
}) {
  return (
    questions &&
    questions.length > 0 && (
      <div>
        <ul className='squeak-questions'>
          {questions.map((question) => {
            return (
              <li key={question.message.id}>
                <Question
                  getQuestions={getQuestions}
                  setQuestions={setQuestions}
                  loading={loading}
                  handleReplySubmit={handleReplySubmit}
                  {...question}
                />
              </li>
            )
          })}
        </ul>
      </div>
    )
  )
}

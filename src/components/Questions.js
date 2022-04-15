import React from 'react'
import Question from './Question'

export default function Questions({
  organizationId,
  handleReplySubmit,
  loading,
  questions,
  setQuestions,
  getQuestions,
  supabase,
  authState,
  apiHost,
  user
}) {
  return (
    questions &&
    questions.length > 0 && (
      <>
        <ul className='squeak-questions'>
          {questions.map((question) => {
            return (
              <li key={question.question.id}>
                <Question
                  organizationId={organizationId}
                  user={user}
                  authState={authState}
                  apiHost={apiHost}
                  supabase={supabase}
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
      </>
    )
  )
}

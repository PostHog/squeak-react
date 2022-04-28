import React, { useEffect, useState } from 'react'
import { useOrg } from '../hooks/useOrg'
import Question from './Question'
import QuestionForm from './QuestionForm'

export default function Questions({
  slug = window.location.pathname.replace(/\/$/, '')
}) {
  const { organizationId, apiHost } = useOrg()
  const [questions, setQuestions] = useState([])
  const getQuestions = async () => {
    const response = await fetch(`${apiHost}/api/questions`, {
      method: 'POST',
      body: JSON.stringify({
        organizationId,
        slug,
        published: true,
        perPage: 100
      })
    })

    if (response.status !== 200) {
      return []
    }

    const { questions } = await response.json()

    return questions
  }

  useEffect(() => {
    getQuestions().then((questions) => {
      setQuestions(questions)
    })
  }, [])

  const handleSubmit = async () => {
    await getQuestions().then((questions) => {
      setQuestions(questions)
    })
  }

  return (
    <>
      {questions && questions.length > 0 && (
        <>
          <ul className='squeak-questions'>
            {questions.map((question) => {
              return (
                <li key={question.question.id}>
                  <Question onSubmit={handleSubmit} {...question} />
                </li>
              )
            })}
          </ul>
        </>
      )}
      <QuestionForm
        onSubmit={handleSubmit}
        organizationId={organizationId}
        formType='question'
      />
    </>
  )
}

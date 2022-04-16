import React, { useEffect, useState } from 'react'
import Question from './Question'
import QuestionForm from './QuestionForm'

export default function App({ apiHost, organizationId }) {
  const [questions, setQuestions] = useState([])

  const getQuestions = async () => {
    const pathname = window.location.pathname
    const response = await fetch(`${apiHost}/api/questions`, {
      method: 'POST',
      body: JSON.stringify({
        organizationId,
        slug: pathname,
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
                  <Question
                    organizationId={organizationId}
                    apiHost={apiHost}
                    onSubmit={handleSubmit}
                    {...question}
                  />
                </li>
              )
            })}
          </ul>
        </>
      )}
      <QuestionForm
        apiHost={apiHost}
        onSubmit={handleSubmit}
        organizationId={organizationId}
        formType='question'
      />
    </>
  )
}

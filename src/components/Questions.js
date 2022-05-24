import React, { useEffect, useState } from 'react'
import { useOrg } from '../hooks/useOrg'
import Question from './Question'
import QuestionForm from './QuestionForm'

export default function Questions({
  slug = window.location.pathname.replace(/\/$/, ''),
  limit = 100
}) {
  const { organizationId, apiHost } = useOrg()
  const [questions, setQuestions] = useState([])
  const [count, setCount] = useState(0)
  const [start, setStart] = useState(0)
  const [loading, setLoading] = useState(false)
  const getQuestions = async ({ limit, start }) => {
    setLoading(true)
    const response = await fetch(`${apiHost}/api/questions`, {
      method: 'POST',
      body: JSON.stringify({
        organizationId,
        slug,
        published: true,
        perPage: limit,
        start
      })
    })

    if (response.status !== 200) {
      return []
    }

    const data = await response.json()
    setLoading(false)
    return data
  }

  useEffect(() => {
    getQuestions({ limit, start }).then((data) => {
      setQuestions([...questions, ...data.questions])
      setCount(data.count)
    })
  }, [])

  const handleSubmit = async () => {
    await getQuestions({ limit: 1, start: 0 }).then((data) => {
      setQuestions([...data.questions, ...questions])
      setCount(data.count)
      setStart(start + 1)
    })
  }

  const handleShowMore = () => {
    getQuestions({ limit, start: start + limit }).then((data) => {
      setQuestions([...questions, ...data.questions])
      setCount(data.count)
      setStart(start + limit)
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
      {start + limit < count && (
        <button
          disabled={loading}
          className='squeak-show-more-questions-button'
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
      <QuestionForm
        onSubmit={handleSubmit}
        organizationId={organizationId}
        formType='question'
      />
    </>
  )
}

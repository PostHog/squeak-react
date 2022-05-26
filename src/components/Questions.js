import React, { useEffect, useState } from 'react'
import { useOrg } from '../hooks/useOrg'
import Question from './Question'
import QuestionForm from './QuestionForm'

const Topics = ({ handleTopicChange, activeTopic }) => {
  const { topics } = useOrg()

  return (
    topics &&
    topics.length > 0 && (
      <ul className='squeak-topics-container'>
        <li>
          <button
            className={activeTopic === null ? 'squeak-active-topic' : ''}
            onClick={() => handleTopicChange(null)}
          >
            All
          </button>
        </li>
        {topics.map(({ label }) => {
          return (
            <li>
              <button
                className={activeTopic === label ? 'squeak-active-topic' : ''}
                onClick={() => handleTopicChange(label)}
              >
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    )
  )
}

export default function Questions({
  slug = window.location.pathname.replace(/\/$/, '')
}) {
  const [activeTopic, setActiveTopic] = useState(null)
  const { organizationId, apiHost } = useOrg()
  const [questions, setQuestions] = useState([])
  const getQuestions = async (topic) => {
    const response = await fetch(`${apiHost}/api/questions`, {
      method: 'POST',
      body: JSON.stringify({
        organizationId,
        slug,
        published: true,
        perPage: 100,
        topic
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

  const handleTopicChange = (topic) => {
    if (topic === activeTopic) return
    getQuestions(topic).then((questions) => {
      setQuestions(questions)
      setActiveTopic(topic)
    })
  }

  return (
    <>
      <Topics handleTopicChange={handleTopicChange} activeTopic={activeTopic} />
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

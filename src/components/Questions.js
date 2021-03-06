import React, { useEffect, useState } from 'react'
import { useOrg } from '../hooks/useOrg'
import Question from './Question'
import QuestionForm from './QuestionForm'

const Topics = ({ handleTopicChange, activeTopic, topics }) => {
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
        {topics.map((label) => {
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
  slug = window.location.pathname.replace(/\/$/, ''),
  limit = 100,
  onSubmit,
  onLoad,
  topics
}) {
  const [activeTopic, setActiveTopic] = useState(null)
  const { organizationId, apiHost } = useOrg()
  const [questions, setQuestions] = useState([])
  const [count, setCount] = useState(0)
  const [start, setStart] = useState(0)
  const [loading, setLoading] = useState(false)
  const [availableTopics, setAvailableTopics] = useState([])
  const getQuestions = async ({ limit, start, topic }) => {
    setLoading(true)
    const response = await fetch(`${apiHost}/api/questions`, {
      method: 'POST',
      body: JSON.stringify({
        organizationId,
        slug,
        published: true,
        perPage: limit,
        start,
        topic
      })
    })

    if (response.status !== 200) {
      return { questions: [], count: 0 }
    }

    const data = await response.json()
    setLoading(false)
    return data
  }

  const getAvailableTopics = (questions) => {
    const availableTopics = []
    questions.forEach(({ question: { topics } }) => {
      topics?.forEach((topic) => {
        if (!availableTopics.includes(topic)) availableTopics.push(topic)
      })
    })
    return availableTopics
  }

  useEffect(() => {
    getQuestions({ limit, start }).then((data) => {
      setQuestions([...questions, ...data.questions])
      setCount(data.count)
      setAvailableTopics(getAvailableTopics([...questions, ...data.questions]))
      onLoad && onLoad()
    })
  }, [])

  const handleSubmit = async () => {
    await getQuestions({ limit: 1, start: 0 }).then((data) => {
      setQuestions([...data.questions, ...questions])
      setCount(data.count)
      setStart(start + 1)
      setAvailableTopics(getAvailableTopics([...questions, ...data.questions]))
      onSubmit && onSubmit(values, formType)
    })
  }

  const handleShowMore = () => {
    getQuestions({ limit, start: start + limit, topic: activeTopic }).then(
      (data) => {
        setQuestions([...questions, ...data.questions])
        setCount(data.count)
        setStart(start + limit)
        setAvailableTopics(
          getAvailableTopics([...questions, ...data.questions])
        )
      }
    )
  }

  const handleTopicChange = (topic) => {
    if (topic === activeTopic) return
    getQuestions({ limit, start: 0, topic }).then((data) => {
      setStart(0)
      setQuestions(data.questions)
      setCount(data.count)
      setActiveTopic(topic)
    })
  }

  return (
    <>
      {topics && (
        <Topics
          topics={availableTopics}
          handleTopicChange={handleTopicChange}
          activeTopic={activeTopic}
        />
      )}
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

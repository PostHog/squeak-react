import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useRef, useState } from 'react'
import root from 'react-shadow/styled-components'
import { Provider, useClient } from 'react-supabase'
import getBackgroundColor from '../../util/getBackgroundColor'
import lightOrDark from '../../util/lightOrDark'
import SingleQuestion from '../Question'
import { Theme } from '../Theme'

export const Question = ({ apiKey, url, apiHost, organizationId, id }) => {
  const supabase = createClient(url, apiKey)
  const [darkMode, setDarkMode] = useState(null)
  const containerRef = useRef()

  useEffect(() => {
    if (containerRef.current) {
      const color = getBackgroundColor(containerRef.current)
      setDarkMode(lightOrDark(color) === 'dark')
    }
  }, [])
  return (
    <root.div ref={containerRef}>
      <Provider value={supabase}>
        <Theme dark={darkMode} />
        <div className='squeak'>
          <QuestionFromId
            apiHost={apiHost}
            organizationId={organizationId}
            id={id}
          />
        </div>
      </Provider>
    </root.div>
  )
}

const QuestionFromId = ({ apiHost, organizationId, id }) => {
  const supabase = useClient()
  const [question, setQuestion] = useState(null)

  const getQuestion = async () => {
    const { data: question } = await supabase
      .from('squeak_messages')
      .select('*')
      .eq('id', id)
      .single()
    const { data: replies } = await supabase
      .from('squeak_replies')
      .select(
        `id, body, created_at,
      profile:squeak_profiles!replies_profile_id_fkey (
          id, first_name, last_name, avatar, metadata:squeak_profiles_readonly(role)
     )`
      )
      .eq('message_id', id)
    setQuestion({ question, replies })
  }

  useEffect(() => {
    getQuestion()
  }, [])

  const handleSubmit = async () => {
    await getQuestion()
  }

  return (
    question && (
      <SingleQuestion
        apiHost={apiHost}
        organizationId={organizationId}
        replies={question?.replies}
        question={question?.question}
        onSubmit={handleSubmit}
      />
    )
  )
}

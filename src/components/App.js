import React, { useEffect, useRef, useState } from 'react'
import QuestionForm from './QuestionForm'
import Questions from './Questions'
import { Theme } from './Theme'

function lightOrDark(color) {
  if (color === 'rgba(0, 0, 0, 0)') {
    return 'light'
  }
  let r, g, b, hsp
  color = color.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  )
  r = color[1]
  g = color[2]
  b = color[3]
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
  return hsp > 127.5 ? 'light' : 'dark'
}

function getBackgroundColor(el) {
  const color = window.getComputedStyle(el).backgroundColor
  if (color !== 'rgba(0, 0, 0, 0)' || el.tagName.toLowerCase() === 'body') {
    return color
  } else {
    return getBackgroundColor(el.parentElement)
  }
}

export default function App({ apiHost, supabase, organizationId }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(null)
  const [authState, setAuthState] = useState()
  const [user, setUser] = useState(supabase.auth.user())
  const containerRef = useRef()

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

  const getProfile = async () => {
    const { data } = await supabase
      .from('squeak_profiles_readonly')
      .select(
        'squeak_profiles!profiles_readonly_profile_id_fkey!inner(avatar, first_name, last_name)'
      )
      .eq('user_id', user?.id)
      .single()
    if (data) {
      setUser({ ...user, profile: data.squeak_profiles })
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      const color = getBackgroundColor(containerRef.current)
      setDarkMode(lightOrDark(color) === 'dark')
    }
    getQuestions().then((questions) => {
      setQuestions(questions)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (e, session) => {
        setAuthState(e)
        setUser(session?.user)
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [supabase.auth])

  useEffect(() => {
    if (user && !user.profile) {
      getProfile()
    }
  }, [user])

  return (
    <div ref={containerRef}>
      <Theme dark={darkMode} />
      {!loading && (
        <div className='squeak'>
          <Questions
            organizationId={organizationId}
            user={user}
            apiHost={apiHost}
            authState={authState}
            supabase={supabase}
            getQuestions={getQuestions}
            setQuestions={setQuestions}
            questions={questions}
          />
          <QuestionForm
            user={user}
            apiHost={apiHost}
            authState={authState}
            supabase={supabase}
            getQuestions={getQuestions}
            setQuestions={setQuestions}
            organizationId={organizationId}
            formType='question'
          />
        </div>
      )}
    </div>
  )
}

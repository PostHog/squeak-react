import React, { useEffect, useState } from 'react'
import QuestionForm from './QuestionForm'
import Questions from './Questions'

export default function App({ apiHost, supabase, organizationId }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  const [authState, setAuthState] = useState()
  const [user, setUser] = useState(supabase.auth.user())

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
        'squeak_profiles!profiles_readonly_profile_id_fkey!inner(avatar, first_name, last_name, id)'
      )
      .eq('user_id', user?.id)
      .single()
    if (data) {
      setUser({ ...user, profile: data.squeak_profiles })
    }
  }

  useEffect(() => {
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
    !loading && (
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
    )
  )
}

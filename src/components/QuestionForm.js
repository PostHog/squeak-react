import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Authentication from './Authentication'
import Logo from './Logo'
import RichText from './RichText'

function QuestionForm({
  title,
  onSubmit,
  subject = true,
  loading,
  initialValues,
  user
}) {
  const handleSubmit = async (values) => {
    onSubmit && (await onSubmit(values))
  }
  return (
    <div>
      {title && <h2>{title}</h2>}
      <Formik
        initialValues={{
          subject: '',
          question: '',
          ...initialValues
        }}
        validate={(values) => {
          const errors = {}
          if (!values.question) {
            errors.question = 'Required'
          }
          if (subject && !values.subject) {
            errors.subject = 'Required'
          }
          return errors
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isValid }) => {
          return (
            <Form className='squeak-form'>
              <div>
                {subject && (
                  <Field
                    required
                    id='subject'
                    name='subject'
                    placeholder='Title'
                    maxLength='50'
                  />
                )}
                <div className='squeak-form-richtext'>
                  <RichText
                    setFieldValue={setFieldValue}
                    initialValue={initialValues?.question}
                  />
                </div>
              </div>
              <span className='squeak-reply-buttons'>
                <button
                  className='squeak-post-button'
                  style={loading || !isValid ? { opacity: '.5' } : {}}
                  disabled={loading || !isValid}
                  type='submit'
                >
                  {user ? 'Post' : 'Preview post'}
                </button>
                <a href='https://posthog.com'>
                  <Logo />
                </a>
              </span>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default function ({
  formType = 'question',
  organizationId,
  messageID,
  setQuestions,
  getQuestions,
  authState,
  apiHost,
  supabase,
  user
}) {
  const [formValues, setFormValues] = useState(null)
  const [view, setView] = useState(null)
  const [loading, setLoading] = useState(false)
  const buttonText = formType === 'question' ? 'Ask a question' : 'Reply'

  useEffect(() => {
    if (authState === 'PASSWORD_RECOVERY') {
      setView('auth')
    }
  }, [authState])

  const insertReply = async ({ body, messageID }) => {
    return fetch(`${apiHost}/api/reply`, {
      method: 'POST',
      body: JSON.stringify({
        body,
        organizationId,
        messageId: messageID,
        token: supabase.auth.session()?.access_token
      })
    })
  }

  const insertMessage = async ({ subject, body, userID }) => {
    return fetch(`${apiHost}/api/question`, {
      method: 'POST',
      body: JSON.stringify({
        subject,
        body,
        organizationId,
        token: supabase.auth.session()?.access_token,
        slug: window.location.pathname
      })
    })
  }

  const handleMessageSubmit = async (values) => {
    setLoading(true)
    const userID = supabase.auth.user()?.id
    if (userID) {
      if (formType === 'question') {
        await insertMessage({
          subject: values.subject,
          body: values.question
        })
      }
      if (formType === 'reply') {
        await insertReply({ body: values.question, messageID })
      }

      await getQuestions().then((questions) => {
        setQuestions(questions)
      })
      setLoading(false)
      setView(null)
      setFormValues(null)
    } else {
      setFormValues(values)
      setView('auth')
      setLoading(false)
    }
  }

  return view ? (
    {
      'question-form': (
        <QuestionForm
          user={user}
          subject={formType === 'question'}
          initialValues={formValues}
          loading={loading}
          onSubmit={handleMessageSubmit}
        />
      ),
      auth: (
        <Authentication
          supabase={supabase}
          initialView={
            authState === 'PASSWORD_RECOVERY' ? 'reset-password' : undefined
          }
          setParentView={setView}
          formValues={formValues}
          handleMessageSubmit={handleMessageSubmit}
          organizationId={organizationId}
          apiHost={apiHost}
          loading={loading}
        />
      )
    }[view]
  ) : (
    <div className='squeak-reply-buttons'>
      <button
        className={
          formType === 'reply' ? 'squeak-reply-button' : 'squeak-ask-button'
        }
        onClick={() => setView('question-form')}
      >
        {buttonText}
      </button>
      {formType === 'question' && user && (
        <button
          onClick={() => supabase.auth.signOut()}
          className='squeak-logout-button'
        >
          Logout
        </button>
      )}
    </div>
  )
}

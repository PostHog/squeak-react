import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useClient } from 'react-supabase'
import { useOrg } from '../hooks/useOrg'
import { useUser } from '../hooks/useUser'
import { Approval } from './Approval'
import Authentication from './Authentication'
import Avatar from './Avatar'
import Logo from './Logo'
import RichText from './RichText'

function QuestionForm({
  title,
  onSubmit,
  subject = true,
  loading,
  initialValues
}) {
  const user = useUser()
  const handleSubmit = async (values) => {
    onSubmit && (await onSubmit(values))
  }
  return (
    <div className='squeak-form-frame'>
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
              <Avatar image={user?.profile?.avatar} />

              <div className=''>
                <div class='squeak-inputs-wrapper'>
                  {subject && (
                    <>
                      <Field
                        required
                        id='subject'
                        name='subject'
                        placeholder='Title'
                        maxLength='140'
                      />
                      <hr />
                    </>
                  )}
                  <div className='squeak-form-richtext'>
                    <RichText
                      setFieldValue={setFieldValue}
                      initialValue={initialValues?.question}
                    />
                  </div>
                </div>
                <span className='squeak-reply-buttons-row'>
                  <button
                    className='squeak-post-button'
                    style={loading || !isValid ? { opacity: '.5' } : {}}
                    disabled={loading || !isValid}
                    type='submit'
                  >
                    {user ? 'Post' : 'Login & post'}
                  </button>
                  <div className='squeak-by-line'>
                    by
                    <a href='https://squeak.posthog.com?utm_source=post-form'>
                      <Logo />
                    </a>
                  </div>
                </span>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default function ({ formType = 'question', messageID, onSubmit }) {
  const supabase = useClient()
  const { organizationId, apiHost } = useOrg()
  const user = useUser()
  const [formValues, setFormValues] = useState(null)
  const [view, setView] = useState(null)
  const [loading, setLoading] = useState(false)
  const buttonText =
    formType === 'question' ? (
      <span>Ask a question</span>
    ) : (
      <span className='squeak-reply-label'>
        <strong>Reply</strong> to question
      </span>
    )

  const insertReply = async ({ body, messageID }) => {
    return fetch(`${apiHost}/api/reply`, {
      method: 'POST',
      body: JSON.stringify({
        body,
        organizationId,
        messageId: messageID,
        token: supabase.auth.session()?.access_token
      })
    }).then((res) => res.json())
  }

  const insertMessage = async ({ subject, body, userID }) => {
    return fetch(`${apiHost}/api/question`, {
      method: 'POST',
      body: JSON.stringify({
        subject,
        body,
        organizationId,
        token: supabase.auth.session()?.access_token,
        slug: window.location.pathname.replace(/\/$/, '')
      })
    }).then((res) => res.json())
  }

  const handleMessageSubmit = async (values) => {
    setLoading(true)
    const userID = supabase.auth.user()?.id
    if (userID) {
      let view = null
      if (formType === 'question') {
        const { published: messagePublished } = await insertMessage({
          subject: values.subject,
          body: values.question
        })
        if (!messagePublished) {
          view = 'approval'
        }
      }
      if (formType === 'reply') {
        const { published: replyPublished } = await insertReply({
          body: values.question,
          messageID
        })
        if (!replyPublished) {
          view = 'approval'
        }
      }

      if (onSubmit) {
        onSubmit(values, formType)
      }
      setLoading(false)
      setView(view)
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
          subject={formType === 'question'}
          initialValues={formValues}
          loading={loading}
          onSubmit={handleMessageSubmit}
        />
      ),
      auth: (
        <Authentication
          banner={{
            title: 'Please signup to post.',
            body: 'Create an account to ask questions & help others.'
          }}
          buttonText={{
            login: 'Login & post question',
            signUp: 'Sign up & post question'
          }}
          setParentView={setView}
          formValues={formValues}
          handleMessageSubmit={handleMessageSubmit}
          loading={loading}
        />
      ),
      login: (
        <Authentication
          setParentView={setView}
          formValues={formValues}
          handleMessageSubmit={() => setView(null)}
          loading={loading}
        />
      ),
      approval: <Approval handleConfirm={() => setView(null)} />
    }[view]
  ) : (
    <div className='squeak-reply-buttons'>
      <Avatar image={user?.profile?.avatar} />
      <button
        className={
          formType === 'reply' ? 'squeak-reply-skeleton' : 'squeak-ask-button'
        }
        onClick={() => setView('question-form')}
      >
        {buttonText}
      </button>
      {formType === 'question' && (
        <button
          onClick={() => {
            if (user) {
              supabase.auth.signOut()
            } else {
              setView('login')
            }
          }}
          className='squeak-auth-button'
        >
          {user ? 'Logout' : 'Login'}
        </button>
      )}
    </div>
  )
}

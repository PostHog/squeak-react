import { Field, Form, Formik } from 'formik'
import getGravatar from 'gravatar'
import React, { useEffect, useRef, useState } from 'react'
import { useClient } from 'react-supabase'
import { useOrg } from '../hooks/useOrg'
import Avatar from './Avatar'

const ForgotPassword = ({ setMessage, setParentView, apiHost }) => {
  const supabase = useClient()
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const handleSubmit = async (values) => {
    setLoading(true)
    const { error } = await supabase.auth.api.resetPasswordForEmail(
      values.email,
      {
        redirectTo: `${apiHost}/reset-password`
      }
    )
    if (error) {
      setMessage(error.message)
    } else {
      setEmailSent(true)
    }
    setLoading(false)
  }

  const handleReturnToPost = (e) => {
    e.preventDefault()
    setParentView('question-form')
  }
  return (
    <Formik
      validateOnMount
      initialValues={{
        email: ''
      }}
      validate={(values) => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Required'
        }
        return errors
      }}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => {
        return (
          <Form>
            <label htmlFor='email'>Email address</label>
            <Field
              required
              id='email'
              name='email'
              type='email'
              placeholder='Email address...'
            />
            {emailSent ? (
              <div>
                <p>Check your email for password reset instructions</p>
                <p>
                  <button
                    onClick={handleReturnToPost}
                    className='squeak-return-to-post'
                  >
                    Click here
                  </button>{' '}
                  to return to your post
                </p>
              </div>
            ) : (
              <button
                style={loading || !isValid ? { opacity: '.5' } : {}}
                type='submit'
              >
                Send password reset instructions
              </button>
            )}
          </Form>
        )
      }}
    </Formik>
  )
}

const SignIn = ({
  setMessage,
  handleMessageSubmit,
  formValues,
  buttonText
}) => {
  const supabase = useClient()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (values) => {
    setLoading(true)
    const { error } = await supabase.auth.signIn(values)
    if (error) {
      setMessage(error.message)
      setLoading(false)
    } else {
      await handleMessageSubmit(formValues)
    }
  }
  return (
    <Formik
      validateOnMount
      initialValues={{
        email: '',
        password: ''
      }}
      validate={(values) => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Required'
        }
        if (!values.password) {
          errors.password = 'Required'
        }
        return errors
      }}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => {
        return (
          <Form>
            <label htmlFor='email'>Email address</label>
            <Field
              required
              id='email'
              name='email'
              type='email'
              placeholder='Email address...'
            />
            <label htmlFor='password'>Password</label>
            <Field
              required
              id='password'
              name='password'
              type='password'
              placeholder='Password...'
            />
            <button
              style={loading || !isValid ? { opacity: '.5' } : {}}
              type='submit'
            >
              {buttonText}
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

const SignUp = ({
  setMessage,
  handleMessageSubmit,
  formValues,
  organizationId,
  apiHost,
  buttonText
}) => {
  const supabase = useClient()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (values) => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password
    })
    if (error) {
      setMessage(error.message)
    } else {
      const gravatar = getGravatar.url(values.email)
      const avatar = await fetch(`https:${gravatar}?d=404`).then(
        (res) => (res.ok && `https:${gravatar}`) || ''
      )
      await fetch(`${apiHost}/api/register`, {
        method: 'POST',
        body: JSON.stringify({
          token: supabase.auth.session()?.access_token,
          organizationId,
          firstName: values.first_name,
          lastName: values.last_name,
          avatar
        })
      })
      await handleMessageSubmit(formValues)
    }
    setLoading(false)
  }
  return (
    <Formik
      validateOnMount
      initialValues={{
        email: '',
        password: '',
        first_name: '',
        last_name: ''
      }}
      validate={(values) => {
        const errors = {}
        if (!values.first_name) {
          errors.first_name = 'Required'
        }
        if (!values.email) {
          errors.email = 'Required'
        }
        if (!values.password) {
          errors.password = 'Required'
        }
        return errors
      }}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => {
        return (
          <Form>
            <div className='squeak-authentication-form-name'>
              <span>
                <label htmlFor='first_name'>First name</label>
                <Field
                  required
                  id='first_name'
                  name='first_name'
                  type='text'
                  placeholder='First name...'
                />
              </span>
              <span>
                <label htmlFor='last_name'>Last name</label>
                <Field
                  id='last_name'
                  name='last_name'
                  type='text'
                  placeholder='Last name...'
                />
              </span>
            </div>
            <label htmlFor='email'>Email address</label>
            <Field
              required
              id='email'
              name='email'
              type='email'
              placeholder='Email address...'
            />
            <label htmlFor='password'>Password</label>
            <Field
              required
              id='password'
              name='password'
              type='password'
              placeholder='Password...'
            />
            <button
              style={loading || !isValid ? { opacity: '.5' } : {}}
              type='submit'
            >
              {buttonText}
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

const ResetPassword = ({ setMessage, setParentView }) => {
  const supabase = useClient()
  const [loading, setLoading] = useState(false)
  const resetPassword = useRef()
  const handleSubmit = async (values) => {
    setLoading(true)
    const { error } = await supabase.auth.update({
      password: values.password
    })
    if (error) {
      setMessage(error.message)
    } else {
      setParentView(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (resetPassword?.current) {
      resetPassword.current.scrollIntoView()
    }
  }, [resetPassword])

  return (
    <div ref={resetPassword}>
      <Formik
        validateOnMount
        initialValues={{
          password: ''
        }}
        validate={(values) => {
          const errors = {}
          if (!values.password) {
            errors.password = 'Required'
          }
          return errors
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => {
          return (
            <Form>
              <label htmlFor='password'>New password</label>
              <Field
                required
                id='password'
                name='password'
                type='password'
                placeholder='New password'
              />
              <button
                style={loading || !isValid ? { opacity: '.5' } : {}}
                type='submit'
              >
                Reset password
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default function Authentication({
  handleMessageSubmit,
  formValues,
  setParentView,
  initialView = 'sign-in',
  buttonText = { login: 'Login', signUp: 'Sign up' },
  banner
}) {
  const { organizationId, apiHost } = useOrg()
  const [view, setView] = useState(initialView)
  const [message, setMessage] = useState(null)

  const handleForgotPassword = (e) => {
    e.preventDefault()
    setView('forgot-password')
  }

  return (
    <div>
      <Avatar />
      {formValues && (
        <div className='squeak-post-preview-container'>
          <div className='squeak-post-preview'>
            {formValues?.subject && <h3>{formValues.subject}</h3>}
            {formValues.question}
          </div>
          <div className='squeak-button-container'>
            <button onClick={() => setParentView('question-form')}>
              Edit post
            </button>
          </div>
        </div>
      )}
      <div className='squeak-authentication-form-container'>
        {banner && (
          <div className='squeak-authentication-form-message'>
            <h4>{banner.title}</h4>
            <p>{banner.body}</p>
          </div>
        )}
        <div className='squeak-authentication-form'>
          <div className='squeak-authentication-navigation'>
            <button
              className={view === 'sign-in' ? 'active' : ''}
              onClick={() => setView('sign-in')}
            >
              Login
            </button>
            <button
              className={view === 'sign-up' ? 'active' : ''}
              onClick={() => setView('sign-up')}
            >
              Signup
            </button>
            <div
              style={{
                opacity:
                  view === 'forgot-password' || view === 'reset-password'
                    ? 0
                    : 1
              }}
              className={`squeak-authentication-navigation-rail ${view}`}
            />
          </div>
          <div className='squeak-authentication-form-wrapper'>
            {message && <p class='squeak-auth-error'>{message}</p>}

            {
              {
                'sign-in': (
                  <SignIn
                    buttonText={buttonText.login}
                    formValues={formValues}
                    handleMessageSubmit={handleMessageSubmit}
                    setMessage={setMessage}
                  />
                ),
                'sign-up': (
                  <SignUp
                    buttonText={buttonText.signUp}
                    formValues={formValues}
                    handleMessageSubmit={handleMessageSubmit}
                    setMessage={setMessage}
                    organizationId={organizationId}
                    apiHost={apiHost}
                  />
                ),
                'forgot-password': (
                  <ForgotPassword
                    setParentView={setParentView}
                    setMessage={setMessage}
                    apiHost={apiHost}
                  />
                ),
                'reset-password': (
                  <ResetPassword
                    setParentView={setParentView}
                    setMessage={setMessage}
                  />
                )
              }[view]
            }
            {view !== 'forgot-password' && view !== 'reset-password' && (
              <button
                onClick={handleForgotPassword}
                className='squeak-forgot-password'
              >
                Forgot password
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

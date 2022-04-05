import React, { useEffect, useRef, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import QuestionForm from './QuestionForm'
import Questions from './Questions'

const GlobalStyles = createGlobalStyle`
  :root {
    --squeak-button-color: #f54e00;
    --squeak-primary-color: rgb(${(props) =>
      props.dark ? '255 255 255' : '0 0 0'} / 30%);
    --squeak-text-color: rgb(${(props) =>
      props.dark ? '255 255 255' : '0 0 0'});
  }
  .squeak *:not(pre *) {
    color: var(--squeak-text-color);
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
      helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
  }
  .squeak
    button:not(.squeak-authentication-navigation
      > button):not(.w-md-editor-toolbar
      button):not(.squeak-post-preview-container
      button):not(.squeak-logout-button):not(.squeak-form-richtext
      button):not(.squeak-return-to-post) {
    border: none;
    background: var(--squeak-button-color);
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 5px;
    font-weight: 600;
    margin-top: 1.25rem;
    cursor: pointer;
  }

  .squeak-form input {
    width: 100%;
    padding: 0;
    border: none;
    font-size: 16px;
    font-weight: 900;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--squeak-primary-color);
    background: transparent;
  }

  .squeak-form > div,
  .squeak-authentication-form {
    border: 1.5px solid var(--squeak-primary-color);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
  }

  .squeak-authentication-form-container h4 {
    margin: 0 0 0.75rem 0;
    font-size: 14px;
    opacity: 0.4;
  }

  .squeak-authentication-form-container label {
    font-size: 14px;
    font-weight: 600;
    opacity: 0.6;
  }

  .squeak-authentication-form-name {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 0.5rem;
  }

  .squeak-authentication-form {
    padding: 1.25rem;
  }

  .squeak-authentication-form button {
    width: 100%;
    transition: color 0.2s;
  }

  .squeak-authentication-form button.active {
    color: var(--squeak-button-color);
  }

  .squeak-authentication-form input {
    border: 1px solid var(--squeak-primary-color);
    font-size: 14px;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    display: block;
    width: 100%;
    background: transparent;
  }

  .squeak-authentication-form label {
    display: block;
    margin-bottom: 0.5rem;
    margin-top: 0.75rem;
  }

  .squeak-authentication-navigation {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-bottom: 0.75rem;
    position: relative;
    margin-bottom: 2rem;
  }

  .squeak-authentication-navigation button {
    font-size: 14px;
    border: none;
    background: none;
    font-weight: 600;
    cursor: pointer;
  }

  .squeak-authentication-navigation-rail {
    position: absolute;
    height: 3px;
    width: 50%;
    background: var(--squeak-button-color);
    bottom: 0;
    transition: all 0.2s;
    left: 0;
    border-radius: 3px;
  }

  .squeak-authentication-navigation-rail.sign-up {
    transform: translateX(100%);
  }

  .squeak-avatar-container {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 100%;
  }

  .squeak-avatar-container img {
    width: 100%;
    height: 100%;
  }

  .squeak-post-preview-container h3 {
    margin: 0 0 0.5rem 0;
    font-size: 16px;
    font-weight: bold;
  }

  .squeak-post-preview-container {
    border: 1px solid var(--squeak-primary-color);
    padding: 1.25rem;
    border-radius: 5px;
    margin-bottom: 2rem;
    box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
      0px 4.5288px 3.62304px rgba(0, 0, 0, 0.0243888);
  }

  .squeak-post-preview-container button {
    font-size: 14px;
    font-weight: bold;
    color: var(--squeak-button-color);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    margin-top: 1rem;
  }

  .squeak-replies,
  .squeak-questions {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .squeak-questions > li {
    padding: 1.25rem 0;
    border-bottom: 1px solid var(--squeak-primary-color);
  }

  .squeak-questions > li > div > .squeak-reply:first-of-type {
    margin-top: 0;
  }

  .squeak-questions {
    margin-bottom: 1.5rem;
  }

  .squeak-reply {
    display: flex;
  }

  .squeak-reply p {
    margin-bottom: 0;
  }

  .squeak-reply-button {
    background: transparent !important;
    color: var(--squeak-button-color) !important;
    margin-top: 0 !important;
    border: 1px solid var(--squeak-button-color) !important;
  }

  .squeak-reply > div:nth-of-type(1) {
    flex-shrink: 0;
  }

  .squeak-reply > div:nth-of-type(2) {
    flex-grow: 1;
    margin-left: 0.75rem;
    overflow: hidden;
  }

  .squeak-reply-details > p:nth-of-type(1) {
    font-weight: bold;
    margin-right: 0.25rem;
    font-size: 15px;
  }

  .squeak-reply-details > p:nth-of-type(2) {
    font-weight: light;
    margin-right: 0.25rem;
    font-size: 13px;
  }

  .squeak-badge {
    font-weight: light;
    font-size: 12px;
    border-radius: 0.25rem;
    padding: 0.25rem;
    border: 1px solid var(--squeak-primary-color);
  }


  .squeak-reply-details p {
    margin: 0;
    display: inline-block;
  }

  .squeak-reply-details {
    margin-bottom: 0.75rem;
    position: relative;
  }

  .squeak-author-badge {
    border-radius: 0.25rem;
    padding: 0.25rem;
    margin-left: 0.25rem;
    font-size: 12px;
    background-color: #dce0e0;
  }

  .squeak-reply h3 {
    font-size: 15px;
    font-weight: bold;
    margin: 0.75rem 0;
  }

  .squeak-reply-form-container,
  .squeak-replies {
    margin-left: calc(40px + 0.75rem);
  }

  .squeak-reply-form-container {
    margin-top: 1.25rem;
  }

  .squeak-reply {
    margin-top: 2rem;
  }

  .squeak-ask-button {
    margin: 0 !important;
  }

  .squeak-reply-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .squeak-post-button {
    margin-top: 0 !important;
  }

  .squeak-form .squeak-reply-buttons {
    margin-top: 1.25rem;
  }

  .squeak-logout-button {
    border: none;
    background: none;
    font-weight: bold;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .squeak-logout-button:hover {
    opacity: 1;
  }

  .squeak-markdown-logo {
    margin: 0 1rem 0 0;
  }

  .squeak-form-richtext-buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
  }

  .squeak-post-markdown p {
    margin-top: 0;
  }

  .squeak-post-markdown a {
    color: var(--squeak-button-color);
    text-decoration: none;
  }

  .squeak-post-markdown pre {
    border-radius: 5px;
    max-height: 450px;
    margin: 0.75rem 0;
    overflow: scroll;
    padding: 1rem;
    font-size: 14px;
  }

  .squeak-form-richtext textarea {
    width: 100%;
    border: none;
    resize: none;
    height: 200px;
    padding: 0.75rem 1rem;
    font-size: 14px;
    background: transparent;
  }

  .squeak-form-richtext-buttons {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0 0 0 0.5rem;
  }

  .squeak-form-richtext-buttons button {
    padding: 0;
    margin: 0;
    width: 32px;
    height: 32px;
    color: var(--squeak-primary-color);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .squeak-form-richtext-buttons button:hover {
    color: var(--squeak-primary-color);
  }

  .squeak-forgot-password {
    background: none !important;
    color: var(--squeak-primary-color) !important;
    margin-top: 0.5rem !important;
  }

  .squeak-return-to-post {
    background: none;
    border: none;
    padding: 0;
    color: var(--squeak-button-color);
    font-weight: 600;
    font-size: inherit;
    width: auto !important;
    cursor: pointer;
  }
`

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

  return (
    <div ref={containerRef}>
      <GlobalStyles dark={darkMode} />
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

import React, { useEffect, useRef, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import QuestionForm from './QuestionForm'
import Questions from './Questions'

const GlobalStyles = createGlobalStyle`
  :root {
    --squeak-button-color: #f54e00;
    --squeak-primary-color: ${(props) =>
      props.dark ? '255 255 255' : '0, 0, 0'};
      --squeak-thread-border-style: dashed;
    }
  .squeak *:not(pre *) {
    color: rgba(var(--squeak-primary-color), 1);
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
  }

  .squeak button {
    background: transparent;
    border: solid 1.5px rgba(var(--squeak-primary-color), .3);
    border-radius: 5px;
    cursor: pointer;
    font-size: .933rem;
    font-weight: 500;
    padding: 0.75rem 1.25rem;
  }

  .squeak-form input {
    width: 100%;
    padding: 0;
    border: none;
    font-size: 16px;
    font-weight: 900;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(var(--squeak-primary-color), .3);
    background: transparent;
  }

  .squeak-form > div,
  .squeak-authentication-form {
    border: 1.5px solid rgba(var(--squeak-primary-color), .3);
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
    border: 1px solid rgba(var(--squeak-primary-color), .3);
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
    flex: 0;
    line-height: 0;
  }

  .squeak-avatar-container svg path:first-child {
    fill: rgba(var(--squeak-primary-color), .3);
  }

  .squeak-avatar-container img,
  .squeak-avatar-container svg {
    border-radius: 100%;
    height: 40px;
    width: 40px;
  }

  .squeak-replies .squeak-avatar-container {
  }

  .squeak-replies .squeak-avatar-container img,
  .squeak-replies .squeak-avatar-container svg {
    border-radius: 100%;
    height: 25px;
    width: 25px;
  }

  .squeak-post-preview-container h3 {
    margin: 0 0 0.5rem 0;
    font-size: 16px;
    font-weight: bold;
  }

  .squeak-post-preview-container {
    border: 1px solid rgba(var(--squeak-primary-color), .3);
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
    border-bottom: 1px solid rgba(var(--squeak-primary-color), .3);
  }

  .squeak-questions > li > div > .squeak-post:first-of-type {
    margin-top: 0;
  }

  .squeak-questions {
    margin-bottom: 1.5rem;
  }

  // affects questions and replies
  .squeak-post {
    display: flex;
    flex-direction: column;
  }

  .squeak-post p {
    margin-bottom: 0;
  }

  .squeak-post-author {
    align-items: center;
    display: flex;
  }

  // add left margin to all elements that aren't the avatar
  .squeak-post-author strong {
    margin-left: calc(8px + 5px);
  }
  .squeak-post-author span {
    margin-left: .5rem;
  }

  .squeak-reply-frame {
    display: flex;
    width: 100%;
  }

  .squeak-reply-frame .squeak-avatar-container {
    flex: 0 0 25px;
    margin-right: 8px;
  }

  .squeak-reply-frame .squeak-avatar-container svg {
    height: 25px;
    width: 25px;
  }

  button.squeak-reply-skeleton {
    padding: 15px;
    flex: 1;
    text-align: left;
  }

  .squeak-reply-skeleton span {
    text-decoration: underline;
  }

  .squeak-form-frame {
    flex: 1;
  }

  .squeak-post-timestamp {
    color: rgba(var(--squeak-primary-color), .6);
    font-size: .875rem;
  }

  .squeak-author-badge {
    font-size: 12px;
    border-radius: 0.25rem;
    padding: 0.25rem;
    border: 1px solid rgba(var(--squeak-primary-color), .3);
  }

  .squeak-post h3 {
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0;
    padding-bottom: .25rem;
  }

  .squeak-replies {
    margin-left: 20px;
  }

  .squeak-replies li {
    padding: 10px 5px 10px calc(25px + 8px);
  }

  // replies styling only
  .squeak-replies li .squeak-post {

  }

  .squeak-replies li .squeak-post-author strong {
    margin-left: 8px;
  }

  .squeak-replies li .squeak-post-content {
    border-left: 0;
    margin-left: calc(25px + 8px); // avatar + avatar right margin
    padding-left: 0;
    padding-bottom: .25rem;
  }

  .squeak-replies li {
    position: relative;
  }

  // left border on replies
  .squeak-replies:not(.thread-resolved) li {
    border-left: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);
  }

    // don't show left border inside, since parent has border
    .squeak-replies:not(.thread-resolved) li:before {
      border-left: none;
    }

  // left border and curved line on replies
  .squeak-reply-form-container:before,
  .squeak-replies li:before {
    border-left: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);
    border-bottom: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);
    border-bottom-left-radius: 6px;
    content: '';
    height: 22px;
    left: 0;
    position: absolute;
    top: 0;
    width: 30px;
  }

  .squeak-replies.thread-resolved li:not(:last-child) {
    border-left: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);
  }

    // don't show left border inside, since parent has border
    .squeak-replies:not(.thread-resolved) li:before {
      border-left: none;
    }

    .squeak-replies.thread-resolved li:not(:last-child):before {
      border-left: none;
    }

  // post content defaults

  .squeak-post-content {
    margin-left: 20px;
    border-left: 1px var(--squeak-thread-border-style) rgba(var(--squeak-primary-color), .4);
    padding-left: calc(25px + 8px);
    padding-bottom: .5rem;
  }

  .squeak-post-markdown {
    font-size: 1rem;
    line-height: 1.4;
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
    font-size: 14px;
    margin: 0.75rem 0;
    max-height: 450px;
    overflow: scroll;
    padding: 1rem;
  }

  .squeak-reply-form-container {
    margin-left: 20px;
    padding-left: calc(25px + 8px);
    padding-top: 10px;
    position: relative;
  }

  .squeak-ask-button {
    margin: 0 !important;
  }

  .squeak-reply-buttons {
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  .squeak-post-button {
    margin-top: 0 !important;
  }

  .squeak-form .squeak-reply-buttons {
    margin-top: 1.25rem;
  }

  .squeak-by-line {
    align-items: center;
    color: rgba(var(--squeak-primary-color), .3) !important;
    display: flex;
    font-size: .8rem;
  }

  .squeak-by-line a {
    display: flex;
    margin-left: .2rem;
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
    margin: 0 .5rem 0 0;
  }

  .squeak-form-richtext-buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
  }

  // UI elements

  .squeak-form-richtext textarea {
    background: transparent;
    border: none;
    font-size: 14px;
    height: 200px;
    padding: 0.75rem 1rem;
    resize: none;
    width: 100%;
  }

  .squeak-form-richtext-buttons {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0 0 0 0.5rem;
  }

  .squeak-form-richtext-buttons button {
    align-items: center;
    background: none;
    border: none;
    border-radius: 3px;
    color: rgba(var(--squeak-primary-color), .3);
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    margin: 0;
    opacity: .5;
    padding: 0;
    width: 32px;
  }

  .squeak-form-richtext-buttons button:hover {
    background: rgba(var(--squeak-primary-color), .1);
    color: rgba(var(--squeak-primary-color), .3);
    opacity: .9;
  }

  .squeak-forgot-password {
    background: none !important;
    color: rgba(var(--squeak-primary-color), .3) !important;
    margin-top: 0.5rem !important;
  }

  .squeak-return-to-post {
    background: none;
    border: none;
    color: var(--squeak-button-color);
    cursor: pointer;
    font-size: inherit;
    font-weight: 600;
    padding: 0;
    width: auto !important;
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

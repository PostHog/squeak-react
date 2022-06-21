import React, { createContext, useEffect, useState } from 'react'

export const Context = createContext(undefined)
export const Provider = ({ value: { apiHost, organizationId }, children }) => {
  const [topics, setTopics] = useState([])
  const [config, setConfig] = useState({})

  const getTopics = async () => {
    return await fetch(`${apiHost}/api/topics`, {
      method: 'POST',
      body: JSON.stringify({
        organizationId
      })
    }).then((res) => res.json())
  }

  const getConfig = async () => {
    return await fetch(`${apiHost}/api/config`, {
      method: 'POST',
      body: JSON.stringify({
        organizationId
      })
    }).then((res) => res.json())
  }

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics)
    })
    getConfig().then((config) => {
      setConfig(config)
    })
  }, [])

  return (
    <Context.Provider value={{ apiHost, organizationId, topics, config }}>
      {children}
    </Context.Provider>
  )
}

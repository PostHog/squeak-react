import React, { createContext, useEffect, useState } from 'react'
import { get, post } from '../lib/api'

export const Context = createContext(undefined)
export const Provider = ({ value: { apiHost, organizationId }, children }) => {
  const [topics, setTopics] = useState([])
  const [config, setConfig] = useState({})

  const getTopics = async () => {
    const { data } = await post(apiHost, `/api/topics`, { organizationId })
    return data
  }

  const getConfig = async () => {
    const { data } = await get(apiHost, '/api/config', { organizationId })
    return data
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

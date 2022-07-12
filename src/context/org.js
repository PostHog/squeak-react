import React, { createContext, useEffect, useState } from 'react'

export const Context = createContext(undefined)
export const Provider = ({ value: { apiHost, organizationId }, children }) => {
  const [config, setConfig] = useState({})

  const getConfig = async () => {
    return await fetch(`${apiHost}/api/config`, {
      method: 'POST',
      body: JSON.stringify({
        organizationId
      })
    }).then((res) => res.json())
  }

  useEffect(() => {
    getConfig().then((config) => {
      setConfig(config)
    })
  }, [])

  return (
    <Context.Provider value={{ apiHost, organizationId, config }}>
      {children}
    </Context.Provider>
  )
}

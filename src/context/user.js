import React, { createContext, useEffect, useState } from 'react'
import { useAuthStateChange, useClient } from 'react-supabase'

export const Context = createContext(undefined)
export const Provider = ({ children }) => {
  const supabase = useClient()
  const [user, setUser] = useState(supabase.auth.user())

  const getProfile = async (user) => {
    const { data } = await supabase
      .from('squeak_profiles_readonly')
      .select(
        'squeak_profiles!profiles_readonly_profile_id_fkey!inner(avatar, first_name, last_name, id, metadata:squeak_profiles_readonly(role))'
      )
      .eq('user_id', user?.id)
      .single()

    return data?.squeak_profiles
  }

  useAuthStateChange(async (e, session) => {
    setUser(session?.user)
  })

  useEffect(() => {
    if (user && !user?.profile) {
      getProfile(user).then((profile) => {
        setUser({ ...user, profile })
      })
    }
  }, [user])

  return <Context.Provider value={user}>{children}</Context.Provider>
}

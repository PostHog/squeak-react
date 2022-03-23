import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children, supabase, apiHost }) => {
  const [user, setUser] = useState(supabase.auth.user())
  const [authState, setAuthState] = useState()

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
  }, [])

  const value = {
    supabase,
    token: () => supabase.auth?.session()?.access_token,
    signIn: (values) => supabase.auth.signIn(values),
    signOut: () => supabase.auth.signOut(),
    signUp: (values) => supabase.auth.signUp(values),
    resetPasswordForEmail: (email) =>
      supabase.auth.api.resetPasswordForEmail(email),
    update: (values) => supabase.auth.update(values),
    user,
    authState,
    apiHost
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

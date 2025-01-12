'use client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface ProviderProps {
    children: ReactNode;
    session?:Session | null
}

const Provider : React.FC<ProviderProps> = ({children,session}) => {
  return (
      <SessionProvider session={session}>
          {children}
    </SessionProvider>
  )
}

export default Provider
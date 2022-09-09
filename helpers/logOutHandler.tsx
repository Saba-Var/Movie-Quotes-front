import { signOut } from 'next-auth/react'
import { NextRouter } from 'next/router'
import { Session } from 'next-auth'

const logOutHandler = (session: Session | null, router: NextRouter) => {
  const callBackUri = `/${router.locale}`

  if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
    if (session) {
      signOut({ callbackUrl: callBackUri })
    } else {
      router.push(callBackUri)
    }
  }

  if (session) {
    signOut({ callbackUrl: callBackUri })
  }
}

export default logOutHandler

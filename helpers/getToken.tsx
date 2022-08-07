import { Session } from 'next-auth'

const getToken = (session: Session | null) => {
  let token: string | null = ''

  if (localStorage?.getItem('token')) {
    token = localStorage?.getItem('token')
  } else if (typeof session?.accessToken === 'string') {
    token = session.accessToken
  }

  return token
}

export default getToken

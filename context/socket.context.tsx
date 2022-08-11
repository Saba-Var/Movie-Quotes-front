import { SocketProviderProps } from './types.d'
import { createContext } from 'react'
import io from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URI!)

export const SocketContext = createContext({ socket })

const SocketProvider = (props: SocketProviderProps) => {
  const { children } = props

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider

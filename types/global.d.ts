import { Dispatch, SetStateAction } from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>

export type Status = { status: number }

export type NewUserData = {
  password: string
  email: string
  name: string
}

export type AccountVerificationToken = {
  token: string
}

export type GoogleUserData = {
  email: string
  name: string
}

export type Token = {
  token: string
}

export type LogInData = {
  password: string
  email: string
}

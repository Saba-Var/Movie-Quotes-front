export type Status = { status: number }

export type NewUserData = {
  name: string
  email: string
  password: string
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

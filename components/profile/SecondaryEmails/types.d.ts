import { SecondaryEmails, SetState } from 'types'

export type SecondaryEmailsProps = {
  email: {
    verified: boolean
    email: string
    _id: string
  }
  setUserSecondaryEmails: SetState<SecondaryEmails>
  setUserPrimaryEmail: SetState<string>
  setEmailChange: SetState<boolean>
  userPrimaryEmail: string
}

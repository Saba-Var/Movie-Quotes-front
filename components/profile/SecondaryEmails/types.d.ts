import { SecondaryEmails, SetState } from 'types'

export type SecondaryEmailsProps = {
  email: {
    verified: boolean
    email: string
    _id: string
  }
  setUserSecondaryEmails: SetState<SecondaryEmails>
  setDeleteEmailList: SetState<string[]>
  setUserPrimaryEmail: SetState<string>
  userSecondaryEmails: SecondaryEmails
  setEmailChange: SetState<boolean>
  userPrimaryEmail: string
}

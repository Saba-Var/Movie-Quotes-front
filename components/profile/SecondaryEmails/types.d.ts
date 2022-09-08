import { SecondaryEmails, SetState } from 'types'

export type SecondaryEmailsProps = {
  email: {
    notDeletable?: boolean
    verified: boolean
    email: string
    _id: string
  }
  setUserSecondaryEmails: SetState<SecondaryEmails>
  setDeleteEmailList: SetState<string[]>
  setUserPrimaryEmail: SetState<string>
  userSecondaryEmails: SecondaryEmails
  notDeletable: boolean | undefined
  setEmailChange: SetState<boolean>
  userPrimaryEmail: string
  primaryEmail: string
}

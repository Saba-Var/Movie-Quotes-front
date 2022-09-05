import { SecondaryEmails, SetState } from 'types'

export type EmailsMobileProps = {
  setUserSecondaryEmails: SetState<SecondaryEmails>
  setDeleteEmailList: SetState<string[]>
  setUserPrimaryEmail: SetState<string>
  userSecondaryEmails: SecondaryEmails
  setEmailChange: SetState<boolean>
  userPrimaryEmail: string
}

import { SecondaryEmails, SetState } from 'types'

export type EmailsProps = {
  setUserSecondaryEmails: SetState<SecondaryEmails>
  setDeleteEmailList: SetState<string[]>
  setUserPrimaryEmail: SetState<string>
  userSecondaryEmails: SecondaryEmails
  setAddEmailModal: SetState<boolean>
  secondaryEmails?: SecondaryEmails
  setEmailChange: SetState<boolean>
  userPrimaryEmail: string
  primaryEmail: string
}

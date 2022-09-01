import { SecondaryEmails, SetState } from 'types'

export type EmailsProps = {
  setUserSecondaryEmails: SetState<SecondaryEmails>
  setUserPrimaryEmail: SetState<string>
  userSecondaryEmails: SecondaryEmails
  secondaryEmails?: SecondaryEmails
  setEmailChange: SetState<boolean>
  userPrimaryEmail: string
  primaryEmail: string
}

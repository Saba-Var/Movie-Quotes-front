import { SecondaryEmails, SetState, UpdatedList } from 'types'

export type EmailsMobileProps = {
  setUserSecondaryEmails: SetState<SecondaryEmails>
  setDeleteEmailList: SetState<string[]>
  setUpdatedList: SetState<UpdatedList>
  setUserPrimaryEmail: SetState<string>
  userSecondaryEmails: SecondaryEmails
  setEmailChange: SetState<boolean>
  updatedList: UpdatedList
  userPrimaryEmail: string
  userEmail: string
  userId: string
}

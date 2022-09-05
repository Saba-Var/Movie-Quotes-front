import { SecondaryEmails, SetState, UpdatedList } from 'types'

export type EmailsMobileProps = {
  setUserSecondaryEmails: SetState<SecondaryEmails>
  setEmailsMobileModal: SetState<boolean>
  setUpdatedList: SetState<UpdatedList>
  setUserPrimaryEmail: SetState<string>
  userSecondaryEmails: SecondaryEmails
  updatedList: UpdatedList
  userPrimaryEmail: string
  userEmail: string
  userId: string
}

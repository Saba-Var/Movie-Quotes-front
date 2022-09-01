import { SetState, UserData } from 'types'

export type UserProfileProps = {
  setUserData: SetState<UserData>
  userData: UserData
}

import { SetState } from 'types'

export type HeaderProps = {
  setRegistrationModal?: SetState<boolean>
  setShowLogIn?: SetState<boolean>
  page: string
}

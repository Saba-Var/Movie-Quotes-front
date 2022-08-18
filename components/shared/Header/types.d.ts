import { SetState } from 'types'

export type HeaderProps = {
  setRegistrationModal?: SetState<boolean>
  setShowSideMenu?: SetState<boolean>
  setShowLogIn?: SetState<boolean>
  showSideMenu?: boolean
  page: string
}

export type HrefData =
  | string
  | {
      pathname: string
      query: {
        id: string
      }
    }

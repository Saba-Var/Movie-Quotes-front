import { SetState } from 'types'

export type HeaderProps = {
  setRegistrationModal?: SetState<boolean>
  setMobileSearchMode?: SetState<boolean>
  setShowSideMenu?: SetState<boolean>
  setShowLogIn?: SetState<boolean>
  mobileSearchMode?: boolean
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

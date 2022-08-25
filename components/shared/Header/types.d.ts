import { SetState } from 'types'

export type HeaderProps = {
  setNewNotificationCount?: SetState<number>
  setRegistrationModal?: SetState<boolean>
  setRegistrationModal?: SetState<boolean>
  setShowNotifications?: SetState<boolean>
  setMobileSearchMode?: SetState<boolean>
  setShowSideMenu?: SetState<boolean>
  setShowLogIn?: SetState<boolean>
  newNotificationCount?: number
  showNotifications?: boolean
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

import { Dispatch, SetStateAction } from 'react'

export type HeaderProps = {
  setRegistrationModal: Dispatch<SetStateAction<boolean>>
  page: string
}

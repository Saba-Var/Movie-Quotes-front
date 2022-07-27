import { Dispatch, SetStateAction } from 'react'

export type FormWrapperProps = {
  setCloseModal: Dispatch<SetStateAction<boolean>>
  children: JSX.Element
  onClick: () => void
  instruction: string
  modalName: string
  title: string
}

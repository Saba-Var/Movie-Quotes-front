import { Dispatch, SetStateAction } from 'react'

export type FormWrapperProps = {
  setCloseModal: Dispatch<SetStateAction<boolean>>
  children: JSX.Element
  instruction: string
  title: string
}

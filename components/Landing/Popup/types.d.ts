import { Dispatch, SetStateAction } from 'react'

export type SetState = Dispatch<SetStateAction<boolean>>

export type PopupProps = {
  setShowPopupModal: Dispatch<SetStateAction<boolean>>
  type: string
}

import { SetState } from 'types'

export type EditQuoteProps = {
  setDeleteModal: SetState<boolean>
  setEditModal: SetState<boolean>
  quoteId: string
}

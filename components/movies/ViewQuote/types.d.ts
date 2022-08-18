import { SetState } from 'types'

export type ViewQuoteProps = {
  setViewQuoteModal: SetState<boolean>
  setDeleteModal: SetState<boolean>
  setEditModal: SetState<boolean>
  quoteId: string
}

import { SetState } from 'types'

export type DeleteQuoteProps = {
  setDeleteModal: SetState<boolean>
  quoteId: string
}

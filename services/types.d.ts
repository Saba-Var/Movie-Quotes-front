export type DeletedQuoteId = { deletedQuoteId: string }

export type CommentReqBody = {
  commentText: string
  quoteId: string
  userId: string
}

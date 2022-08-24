export type DeletedQuoteId = { deletedQuoteId: string }

export type DeletedMovieId = { deletedMovieId: string }

export type CommentReqBody = {
  commentText: string
  quoteId: string
  userId: string
}

export type AddNewNotificationData = {
  receiverId: string
  senderId: string
  notificationType: 'like' | 'comment'
}

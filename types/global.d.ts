import React, { Dispatch, SetStateAction } from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>

export type Status = { status: number }

export type NewUserData = {
  password: string
  email: string
  name: string
}

export type AccountVerificationToken = {
  token: string
}

export type GoogleUserData = {
  email: string
  name: string
}

export type Token = {
  token: string
}

export type LogInData = {
  password: string
  email: string
}

export type SecondaryEmails = {
  notDeletable?: boolean
  verified: boolean
  email: string
  _id: string
}[]

export type UserData = {
  secondaryEmails?: SecondaryEmails
  image?: string
  email: string
  name: string
  _id: string
}

export type FilmGenres = string[]

export type SelectedOptions = {
  value: string
  label: string
}[]

export type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType
  }
}

export type CertainMovieDetails = {
  movieDescriptionEn: string
  movieDescriptionGe: string
  movieNameEn: string
  movieNameGe: string
  movieGenres: string[]
  directorEn: string
  directorGe: string
  quotes?: string[]
  budget: string
  image?: string
  userId: string
  _id: string
}

export type MovieFormData = {
  movieDescriptionEn: string
  movieDescriptionGe: string
  movieNameEn: string
  movieNameGe: string
  movieGenres?: string[]
  directorEn: string
  directorGe: string
  budget: string
}

export type Id = {
  id: string
}

export type AllMovie = CertainMovieDetails[]

export type Quote = {
  _id: string
  quoteEn: string
  quoteGe: string
  likes: string[]
  user: { _id: string; name: string; image?: string }
  comments: {
    user: { _id: string; name: string; image?: string }
    commentText: string
    _id: string
  }[]
  image?: string
  movie: {
    movieNameEn: string
    movieNameGe: string
    _id: string
    image: string
  }
}

export type Quotes = Quote[]

export type QuoteText = {
  quoteEn: string
  quoteGe: string
}

export type CommentType = {
  commentText: string
  _id: string
  user: {
    image?: string
    name: string
  }
}

export type NewsFeedQuotes = {
  quotes: Quotes
  paginationInfo?: {
    hasMoreQuotes: boolean
  }
}

export type Notification = {
  notificationType: 'like' | 'comment'
  date: string
  new: boolean
  _id: string
  user: {
    image?: string
    name: string
    _id: string
  }
}

export type NotificationPaginationData = {
  notifications: Notification[]
  paginationInfo: {
    hasMoreNotifications: boolean
  }
  newNotificationCount: number
}

export type FormProperties = {
  setFieldError: (field: string, message: string) => void
  setFieldValue: (field: string, value: string) => void
  resetForm: () => void
}

export type AlertListTypes =
  | 'image-updated'
  | 'username-updated'
  | 'email-updated'
  | 'password-updated'
  | 'primary-email-updated'

export type UpdatedList = {
  type: AlertListTypes
  id: string
}[]

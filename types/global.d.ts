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

export type UserData = {
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

export type Quotes = {
  _id: string
  quoteEn: string
  quoteGe: string
  likes: string[]
  comments: {
    user: { _id: string; name: string; image?: string }
    commentText: string
    _id: string
  }[]
  image?: string
}[]

export type QuoteText = {
  quoteEn: string
  quoteGe: string
}

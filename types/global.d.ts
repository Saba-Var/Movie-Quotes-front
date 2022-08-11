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
  movie_description_en: string
  movie_description_ge: string
  movie_name_en: string
  movie_name_ge: string
  film_genres: string[]
  director_en: string
  director_ge: string
  budget: string
  image?: string
  userId: string
  _id: string
}

export type MovieFormData = {
  movie_description_en: string
  movie_description_ge: string
  movie_name_en: string
  movie_name_ge: string
  film_genres?: string[]
  director_en: string
  director_ge: string
  budget: string
}

export type Id = {
  id: string
}

export type AllMovie = CertainMovieDetails[]

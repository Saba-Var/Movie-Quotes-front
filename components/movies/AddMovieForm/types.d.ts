export type AddMovieFormProps = {
  setShowAddMovieForm: SetState<boolean>
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

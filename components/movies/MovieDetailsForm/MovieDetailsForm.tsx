import { movieDetailsGeSchema, movieDetailsEnSchema } from 'schemas'
import { useMovieDetailsForm } from './useMovieDetailsForm'
import { MovieDetailsProps } from './types.d'
import { Form, Formik } from 'formik'
import {
  ChangeMovieTextInput,
  MovieDetailsTextarea,
  GenresMultiSelect,
} from 'components'

const MovieDetailsForm: React.FC<MovieDetailsProps> = (props) => {
  const { currentMovie } = props

  const {
    setGenreNotSelected,
    setSelectedOptions,
    genresNotSelected,
    defaultSelection,
    setDisableInputs,
    disableInputs,
    filmGenres,
    locale,
    t,
  } = useMovieDetailsForm(currentMovie.film_genres)

  const {
    movie_description_en,
    movie_description_ge,
    movie_name_ge,
    movie_name_en,
    director_ge,
    director_en,
    budget,
  } = currentMovie

  return (
    <div className='w-[358px] sm:w-[438px] xl:w-[42%]'>
      <Formik
        initialValues={
          locale === 'en'
            ? { movie_description_en, movie_name_en, director_en, budget }
            : { movie_description_ge, movie_name_ge, director_ge, budget }
        }
        validationSchema={
          locale === 'en' ? movieDetailsEnSchema : movieDetailsGeSchema
        }
        onSubmit={() => {}}
      >
        {(data) => {
          return (
            <Form>
              <div
                className={`flex flex-col pt-7 gap-4 h-full ${
                  disableInputs && 'gap-7 pt-0'
                } h-[302px] sm:h-[382px] 3xl:h-[440px]`}
              >
                <ChangeMovieTextInput
                  name={locale === 'en' ? 'movie_name_en' : 'movie_name_ge'}
                  placeholder={t('movies:movie-name')}
                  isDisabled={disableInputs}
                />

                {!disableInputs && (
                  <GenresMultiSelect
                    setGenreNotSelected={setGenreNotSelected}
                    setSelectedOptions={setSelectedOptions}
                    genreNotSelected={genresNotSelected}
                    defaultValue={defaultSelection}
                    isDisabled={disableInputs}
                    hasDefaultValues={true}
                    filmGenres={filmGenres}
                  />
                )}

                {disableInputs && currentMovie.film_genres && (
                  <div className='flex flex-wrap gap-2'>
                    {currentMovie.film_genres.map((el: string) => {
                      return (
                        <div
                          className='text-white text-sm rounded bg-medGray px-[7px] py-[4px]'
                          key={el}
                        >
                          {t(`movies:${el}`)}
                        </div>
                      )
                    })}
                  </div>
                )}

                <ChangeMovieTextInput
                  name={locale === 'en' ? 'director_en' : 'director_ge'}
                  placeholder={t('movies:director')}
                  isDisabled={disableInputs}
                />

                <ChangeMovieTextInput
                  placeholder={t('movies:budget')}
                  isDisabled={disableInputs}
                  name='budget'
                />

                <MovieDetailsTextarea
                  isDisabled={disableInputs}
                  placeholder={t('movies:movie-description')}
                  name={
                    locale === 'en'
                      ? 'movie_description_en'
                      : 'movie_description_ge'
                  }
                />
              </div>
            </Form>
          )
        }}
      </Formik>

      <div>
        <div
          className='text-white mt-8'
          onClick={() => setDisableInputs(false)}
        >
          Edit
        </div>

        {!disableInputs && (
          <div className='text-white' onClick={() => setDisableInputs(true)}>
            Save changes
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetailsForm

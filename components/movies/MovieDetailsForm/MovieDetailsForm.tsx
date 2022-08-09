import { movieDetailsGeSchema, movieDetailsEnSchema } from 'schemas'
import { ChangeMovieTextInput, GenresMultiSelect } from 'components'
import { useMovieDetailsForm } from './useMovieDetailsForm'
import { MovieDetailsProps } from './types.d'
import { Form, Formik } from 'formik'

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
    <div className='w-[358px] h-[302px] sm:w-[438px] sm:h-[382px] 3xl:h-[440px] xl:w-[42%]'>
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
              <div className=''>
                <ChangeMovieTextInput
                  name={locale === 'en' ? 'movie_name_en' : 'movie_name_ge'}
                  isDisabled={disableInputs}
                  placeholder='Movie Name'
                />

                <ChangeMovieTextInput
                  name={locale === 'en' ? 'director_en' : 'director_ge'}
                  isDisabled={disableInputs}
                  placeholder='director'
                />

                <ChangeMovieTextInput
                  isDisabled={disableInputs}
                  placeholder='budget'
                  name='budget'
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
              </div>
            </Form>
          )
        }}
      </Formik>

      <div>
        <div className='text-white' onClick={() => setDisableInputs(false)}>
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

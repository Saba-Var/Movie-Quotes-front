import { useEditMovieInfo } from './useEditMovieInfo'
import { EditMovieInfoProps } from './types.d'
import { addMovieFormSchema } from 'schemas'
import { Form, Formik } from 'formik'
import {
  GenresMultiSelect,
  MoviesFormInputs,
  FormWrapper,
  ErrorAlert,
} from 'components'

const EditMovieInfo: React.FC<EditMovieInfoProps> = (props) => {
  const { currentMovie, setShowEditForm } = props

  const {
    setGenresFetchError,
    setGenreNotSelected,
    setSelectedOptions,
    emptyInputHandler,
    setEmptyFIleError,
    genresFetchError,
    defaultSelection,
    genreNotSelected,
    selectedOptions,
    emptyFileError,
    filmGenres,
    setFile,
    file,
    t,
  } = useEditMovieInfo(setShowEditForm, currentMovie.film_genres)

  return (
    <FormWrapper
      setShowForm={setShowEditForm}
      title={t('movies:change-movie')}
      styles='1xl:top-10'
      hideImage={true}
    >
      <Formik
        validationSchema={addMovieFormSchema}
        initialValues={{
          movie_description_en: currentMovie.movie_description_en,
          movie_description_ge: currentMovie.movie_description_ge,
          movie_name_en: currentMovie.movie_name_en,
          movie_name_ge: currentMovie.movie_name_ge,
          director_en: currentMovie.director_en,
          director_ge: currentMovie.director_ge,
          budget: currentMovie.budget,
        }}
        validateOnMount={false}
        onSubmit={(data) => {
          if (file && !genreNotSelected) {
            console.log(selectedOptions)
          }
        }}
      >
        {() => {
          return (
            <Form>
              <div className='flex flex-col gap-5 2xl:gap-6'>
                {genresFetchError && (
                  <ErrorAlert
                    setShowAlert={setGenresFetchError}
                    styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
                    title='movies:genres-fetch-fail'
                  />
                )}

                <MoviesFormInputs
                  setEmptyFIleError={setEmptyFIleError}
                  emptyInputHandler={emptyInputHandler}
                  emptyFileError={emptyFileError}
                  buttonTitle='change-movie'
                  setFile={setFile}
                  file={file}
                >
                  <GenresMultiSelect
                    setGenreNotSelected={setGenreNotSelected}
                    setSelectedOptions={setSelectedOptions}
                    genreNotSelected={genreNotSelected}
                    defaultValue={defaultSelection}
                    hasDefaultValues={true}
                    filmGenres={filmGenres}
                  />
                </MoviesFormInputs>
              </div>
            </Form>
          )
        }}
      </Formik>
    </FormWrapper>
  )
}

export default EditMovieInfo

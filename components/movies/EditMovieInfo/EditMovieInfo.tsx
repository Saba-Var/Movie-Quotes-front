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
    setMovieEditFailed,
    setEmptyFIleError,
    emptyInputHandler,
    genresFetchError,
    defaultSelection,
    genreNotSelected,
    movieEditFailed,
    emptyFileError,
    submitHandler,
    filmGenres,
    setFile,
    file,
    t,
  } = useEditMovieInfo(setShowEditForm, currentMovie.movieGenres)

  return (
    <FormWrapper
      title={t('movies:change-movie')}
      setShowForm={setShowEditForm}
      styles='1xl:top-10'
      hideImage={true}
    >
      <Formik
        validationSchema={addMovieFormSchema}
        initialValues={{
          movieDescriptionEn: currentMovie.movieDescriptionEn,
          movieDescriptionGe: currentMovie.movieDescriptionGe,
          movieNameEn: currentMovie.movieNameEn,
          movieNameGe: currentMovie.movieNameGe,
          directorEn: currentMovie.directorEn,
          directorGe: currentMovie.directorGe,
          budget: currentMovie.budget,
        }}
        validateOnMount={false}
        onSubmit={(data) =>
          submitHandler(data, currentMovie._id, setShowEditForm)
        }
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

                {movieEditFailed && (
                  <ErrorAlert
                    setShowAlert={setMovieEditFailed}
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

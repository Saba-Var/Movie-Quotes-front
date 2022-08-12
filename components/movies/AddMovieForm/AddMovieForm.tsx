import { useAddMovieForm } from './useAddMovieForm'
import { AddMovieFormProps } from './types.d'
import { addMovieFormSchema } from 'schemas'
import { Form, Formik } from 'formik'
import {
  GenresMultiSelect,
  MoviesFormInputs,
  FormWrapper,
  ErrorAlert,
} from 'components'

const AddMovieForm: React.FC<AddMovieFormProps> = (props) => {
  const { setShowAddMovieForm } = props
  const {
    setExistingMovieErr,
    setGenresFetchError,
    setGenreNotSelected,
    setSelectedOptions,
    emptyInputHandler,
    setEmptyFIleError,
    genresFetchError,
    existingMovieErr,
    genreNotSelected,
    emptyFileError,
    setFilmAddErr,
    submitHandler,
    filmAddErr,
    filmGenres,
    setFile,
    file,
    t,
  } = useAddMovieForm(setShowAddMovieForm)

  return (
    <FormWrapper
      setShowForm={setShowAddMovieForm}
      title={t('movies:add-movie')}
    >
      <Formik
        validationSchema={addMovieFormSchema}
        initialValues={{
          movieDescriptionEn: '',
          movieDescriptionGe: '',
          movieNameEn: '',
          movieNameGe: '',
          directorEn: '',
          directorGe: '',
          budget: '',
        }}
        validateOnMount={false}
        onSubmit={submitHandler}
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

                {existingMovieErr && (
                  <ErrorAlert
                    setShowAlert={setExistingMovieErr}
                    styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
                    title='movies:movie-exists'
                  />
                )}

                {filmAddErr && (
                  <ErrorAlert
                    setShowAlert={setFilmAddErr}
                    styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
                    title='movies:movie-add-err'
                  />
                )}

                <MoviesFormInputs
                  emptyInputHandler={emptyInputHandler}
                  setEmptyFIleError={setEmptyFIleError}
                  emptyFileError={emptyFileError}
                  buttonTitle='add-movie'
                  setFile={setFile}
                  file={file}
                >
                  <GenresMultiSelect
                    setGenreNotSelected={setGenreNotSelected}
                    setSelectedOptions={setSelectedOptions}
                    genreNotSelected={genreNotSelected}
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
export default AddMovieForm

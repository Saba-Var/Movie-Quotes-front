import { useAddMovieForm } from './useAddMovieForm'
import { AddMovieFormProps } from './types.d'
import { addMovieFormSchema } from 'schemas'
import { Form, Formik } from 'formik'
import {
  ImageDragAndDrop,
  TextAreaInput,
  AddTextInput,
  FormWrapper,
  ErrorAlert,
  Button,
} from 'components'

const AddMovieForm: React.FC<AddMovieFormProps> = (props) => {
  const { setShowAddMovieForm } = props
  const {
    setGenresFetchError,
    setEmptyFIleError,
    genresFetchError,
    emptyFileHandler,
    emptyFileError,
    filmGenres,
    setFile,
    file,
    t,
  } = useAddMovieForm()

  return (
    <FormWrapper
      setShowForm={setShowAddMovieForm}
      title={t('movies:add-movie')}
    >
      <Formik
        validationSchema={addMovieFormSchema}
        initialValues={{
          movie_description_en: '',
          movie_description_ge: '',
          movie_name_en: '',
          movie_name_ge: '',
          director_en: '',
          director_ge: '',
          budget: '',
        }}
        validateOnMount={false}
        onSubmit={() => {}}
      >
        {() => {
          return (
            <Form>
              <div className='flex flex-col gap-4 2xl:gap-5'>
                {genresFetchError && (
                  <ErrorAlert
                    setShowAlert={setGenresFetchError}
                    styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
                    title='movies:genres-fetch-fail'
                  />
                )}

                <AddTextInput
                  placeholder='Movie name'
                  name='movie_name_en'
                  language='Eng'
                />

                <AddTextInput
                  placeholder='ფილმის სახელი'
                  name='movie_name_ge'
                  language='ქარ'
                />

                <AddTextInput placeholder={t('movies:budget')} name='budget' />

                {/* Categories */}

                <div className='w-full bg-red-500 h-[45px]'>{filmGenres}</div>

                <AddTextInput
                  placeholder='Director'
                  name='director_en'
                  language='Eng'
                />

                <AddTextInput
                  placeholder='რეჟისორი'
                  name='director_ge'
                  language='ქარ'
                />

                <TextAreaInput
                  placeholder='Movie description'
                  name='movie_description_en'
                  language='Eng'
                />

                <TextAreaInput
                  placeholder='ფილმის აღწერა'
                  name='movie_description_ge'
                  language='ქარ'
                />

                <ImageDragAndDrop
                  setEmptyFIleError={setEmptyFIleError}
                  emptyFileError={emptyFileError}
                  setFile={setFile}
                  file={file}
                />

                <Button
                  styles='bg-orange !hover:scale-105 xl:text-xl'
                  title={t('movies:add-movie')}
                  onClick={emptyFileHandler}
                  type='submit'
                />
              </div>
            </Form>
          )
        }}
      </Formik>
    </FormWrapper>
  )
}
export default AddMovieForm

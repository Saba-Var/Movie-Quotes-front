import { FormWrapper, AddTextInput } from 'components'
import { useAddMovieForm } from './useAddMovieForm'
import { AddMovieFormProps } from './types.d'
import { addMovieFormSchema } from 'schemas'
import { Form, Formik } from 'formik'

const AddMovieForm: React.FC<AddMovieFormProps> = (props) => {
  const { setShowAddMovieForm } = props
  const { t } = useAddMovieForm()

  return (
    <FormWrapper
      setShowForm={setShowAddMovieForm}
      title={t('movies:add-movie')}
    >
      <Formik
        validationSchema={addMovieFormSchema}
        initialValues={{
          movie_name_en: '',
          movie_name_ge: '',
          director_en: '',
          director_ge: '',
        }}
        validateOnMount={false}
        onSubmit={() => {}}
      >
        {() => {
          return (
            <Form>
              <div className='flex flex-col gap-6 xl:gap-8'>
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

                {/* Categories */}

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

                {/* Movie Description EN */}
                {/* Movie Description GE */}

                {/* Image picker */}

                <button
                  type='submit'
                  className='text-white hover:scale-105 active:scale-100 transition-transform'
                >
                  {t('movie:add-movie')}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </FormWrapper>
  )
}
export default AddMovieForm

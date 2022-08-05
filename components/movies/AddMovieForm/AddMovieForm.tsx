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
            <Form className='mt-3 md:mt-6 flex flex-col justify-center items-center animate-fade-in'>
              <div className='flex flex-col gap-4 mb-8'>
                <AddTextInput
                  placeholder='movie-name'
                  name='movie_name_en'
                  language='Eng'
                  page='movies'
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

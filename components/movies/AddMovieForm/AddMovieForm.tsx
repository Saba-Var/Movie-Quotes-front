import { FormWrapper, AddTextInput, Button, TextAreaInput } from 'components'
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
          movie_description_en: '',
          movie_description_ge: '',
        }}
        validateOnMount={false}
        onSubmit={() => {}}
      >
        {() => {
          return (
            <Form>
              <div className='flex flex-col gap-4 xl:gap-7'>
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

                <Button
                  styles='bg-orange !hover:scale-105 xl:text-xl'
                  title={t('movies:add-movie')}
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

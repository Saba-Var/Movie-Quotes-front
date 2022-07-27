import { useRegistrationForm } from './useRegistrationForm'
import { registrationFormValidationSchema } from 'schemas'
import { AuthInputField, Button } from 'components'
import { Formik, Form } from 'formik'

const RegistrationForm = () => {
  const { t, initialValues } = useRegistrationForm()

  return (
    <Formik
      validationSchema={registrationFormValidationSchema}
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      {() => {
        return (
          <Form className='mt-6 flex flex-col justify-center items-center animate-fade-in'>
            <div className='flex flex-col gap-4 mb-8'>
              <AuthInputField type='text' name='name' />
              <AuthInputField type='text' name='email' />
              <AuthInputField type='password' name='password' />
              <AuthInputField name='confirmPassword' type='password' />
            </div>

            <div>
              <Button
                styles={'bg-orange mx-auto block w-[360px]'}
                title={t('landing:start')}
                type='submit'
              />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegistrationForm

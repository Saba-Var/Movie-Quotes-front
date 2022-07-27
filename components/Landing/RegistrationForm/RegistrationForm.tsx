import { AuthInputField, Button, GoogleAuthButton } from 'components'
import { useRegistrationForm } from './useRegistrationForm'
import { registrationFormValidationSchema } from 'schemas'
import { Formik, Form } from 'formik'

const RegistrationForm = () => {
  const { t, initialValues } = useRegistrationForm()

  return (
    <Formik
      validationSchema={registrationFormValidationSchema}
      initialValues={initialValues}
      onSubmit={() => {}}
      validateOnMount={false}
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

            <div className='flex flex-col gap-4'>
              <Button
                styles={'bg-orange mx-auto block w-[360px]'}
                title={t('landing:start')}
                type='submit'
              />
              <GoogleAuthButton
                title={t('registration:google-sign-up')}
                googleAuthHandler={() => {}}
              />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegistrationForm

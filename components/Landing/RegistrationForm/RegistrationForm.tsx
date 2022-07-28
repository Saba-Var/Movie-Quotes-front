import { AuthInputField, Button, GoogleAuthButton } from 'components'
import { useRegistrationForm } from './useRegistrationForm'
import { registrationFormValidationSchema } from 'schemas'
import { RegistrationFormProps } from './types.d'
import { Formik, Form } from 'formik'

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
  const { setRegistrationModal } = props

  const { t, initialValues, submitHandler } =
    useRegistrationForm(setRegistrationModal)

  return (
    <Formik
      validationSchema={registrationFormValidationSchema}
      initialValues={initialValues}
      validateOnMount={false}
      onSubmit={(data) => {
        submitHandler(data)
      }}
    >
      {() => {
        return (
          <Form className='mt-3 md:mt-6 flex flex-col justify-center items-center animate-fade-in'>
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
              <GoogleAuthButton title={t('registration:google-sign-up')} />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegistrationForm
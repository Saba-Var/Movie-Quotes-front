import { useRegistrationForm } from './useRegistrationForm'
import { registrationFormValidationSchema } from 'schemas'
import { RegistrationFormProps } from './types.d'
import { Formik, Form } from 'formik'
import {
  GoogleAuthButton,
  AuthInputField,
  ErrorAlert,
  Button,
} from 'components'

const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
  const { setRegistrationModal, setShowPopupModal } = props

  const { t, initialValues, submitHandler, errorAlert, setErrorAlert } =
    useRegistrationForm(setRegistrationModal, setShowPopupModal)

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
            {errorAlert && (
              <ErrorAlert
                setShowAlert={setErrorAlert}
                title='auth:user-exists'
                animate={true}
              />
            )}

            <div className='flex flex-col gap-4 mb-8'>
              <AuthInputField placeholder='name-reqs' type='text' name='name' />
              <AuthInputField
                placeholder='enter-email'
                type='text'
                name='email'
              />
              <AuthInputField
                placeholder='password-reqs'
                type='password'
                name='password'
              />
              <AuthInputField
                placeholder='confirmPassword'
                name='confirmPassword'
                type='password'
              />
            </div>

            <div className='flex flex-col gap-4'>
              <Button
                styles={'bg-orange mx-auto block w-[360px]'}
                title={t('landing:start')}
                type='submit'
              />
              <GoogleAuthButton title={t('auth:google-sign-up')} />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegistrationForm

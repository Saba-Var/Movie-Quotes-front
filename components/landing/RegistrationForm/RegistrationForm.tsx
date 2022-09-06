import { useRegistrationForm } from './useRegistrationForm'
import { registrationFormValidationSchema } from 'schemas'
import { RegistrationFormProps } from './types'
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
              />
            )}

            <div className='flex flex-col xl:gap-1 mb-3 xl:mb-8'>
              <div className='h-[94px]'>
                <AuthInputField
                  placeholder='name-reqs'
                  type='text'
                  name='name'
                />
              </div>

              <div className='h-[94px]'>
                <AuthInputField
                  placeholder='enter-email'
                  type='text'
                  name='email'
                />
              </div>

              <div className='h-[94px]'>
                <AuthInputField
                  placeholder='password-reqs'
                  type='password'
                  name='password'
                />
              </div>

              <div className='h-[94px]'>
                <AuthInputField
                  placeholder='confirmPassword'
                  name='confirmPassword'
                  type='password'
                />
              </div>
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

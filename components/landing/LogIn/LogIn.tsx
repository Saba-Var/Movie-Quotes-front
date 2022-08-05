import { logInFormSchema } from 'schemas'
import { LogInProps } from './types'
import { useLogIn } from './useLogIn'
import { Formik, Form } from 'formik'
import {
  GoogleAuthButton,
  FormModalWrapper,
  AuthInputField,
  ErrorAlert,
  Button,
} from 'components'

const LogIn: React.FC<LogInProps> = (props) => {
  const { setShowLogIn, setEmailForm, setRegistrationModal } = props
  const {
    setNotVerified,
    submitHandler,
    setAuthError,
    setNotFound,
    notVerified,
    authError,
    notFound,
    t,
  } = useLogIn()

  return (
    <FormModalWrapper styles='md:!h-[600px]' setCloseModal={setShowLogIn}>
      <div className='flex animate-focus-in-text-expand flex-col gap-3 justify-center items-center'>
        {notFound && (
          <ErrorAlert
            styles='!top-0 md:!top-[-10%]'
            title='auth:user-not-found'
            setShowAlert={setNotFound}
            animate={true}
          />
        )}

        {notVerified && (
          <ErrorAlert
            styles='!top-0 md:!top-[-10%]'
            setShowAlert={setNotVerified}
            title='auth:not-verified'
            animate={true}
          />
        )}

        {authError && (
          <ErrorAlert
            styles='!top-0 md:!top-[-10%]'
            setShowAlert={setAuthError}
            title='auth:log-in-failed'
            animate={true}
          />
        )}

        <p className='text-white font-Helvetica-Neue-Geo text-2xl font-medium '>
          {t('auth:log-into')}
        </p>
        <p className='text-medGray mb-6 font-Helvetica-Neue-Geo font-medium text-base'>
          {t('auth:log-in-instruction')}
        </p>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={logInFormSchema}
          validateOnMount={false}
          onSubmit={(data) => submitHandler(data)}
        >
          {() => {
            return (
              <Form>
                <div className='h-24'>
                  <AuthInputField
                    placeholder='enter-email'
                    type='text'
                    name='email'
                  />
                </div>

                <div className='h-24'>
                  <AuthInputField
                    placeholder='password'
                    type='password'
                    name='password'
                  />
                </div>

                <div className='w-[360px] flex justify-between mb-4'>
                  <div className='flex justify-between'>
                    <div className='flex'>
                      <label className='flex gap-2 justify-center items-center cursor-pointer'>
                        <input
                          type={'checkbox'}
                          className='h-4 w-4 cursor-pointer'
                        />
                        <span className='text-white select-none font-Helvetica-Neue-Geo font-medium text-base'>
                          {t('auth:remember-me')}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setShowLogIn(false)
                      setEmailForm(true)
                    }}
                    className='text-blue cursor-pointer hover:scale-110 transition-transform text-base underline font-Helvetica-Neue-Geo'
                  >
                    {t('auth:forgot-password')}
                  </div>
                </div>

                <div className='flex flex-col gap-4'>
                  <Button
                    styles={'bg-orange mx-auto block w-[360px]'}
                    title={t('auth:sign-in')}
                    type='submit'
                  />
                  <GoogleAuthButton title={t('auth:sign-in-google')} />
                </div>

                <p className='text-medGray mt-8 text-center text-base font-Helvetica-Neue-Geo font-medium'>
                  {t("auth:don't-have-account")}
                  <span
                    onClick={() => {
                      setShowLogIn(false)
                      setRegistrationModal(true)
                    }}
                    className='text-blue pl-1 cursor-pointer hover:scale-110 transition-transform text-base font-medium font-Helvetica-Neue-Geo'
                  >
                    {t('common:SignUp')}
                  </span>
                </p>
              </Form>
            )
          }}
        </Formik>
      </div>
    </FormModalWrapper>
  )
}

export default LogIn

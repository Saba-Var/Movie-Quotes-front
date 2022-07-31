import { useEmailForm } from './useEmailForm'
import { EmailFormProps } from './types.d'
import { emailFormSchema } from 'schemas'
import { Formik, Form } from 'formik'
import {
  FormModalWrapper,
  AuthInputField,
  ErrorAlert,
  Button,
  Popup,
} from 'components'

const EmailForm: React.FC<EmailFormProps> = (props) => {
  const {
    setFetchFailed,
    submitHandler,
    defaultValue,
    setNotFound,
    fetchFailed,
    emailSent,
    notFound,
    t,
  } = useEmailForm()

  const { setModal, setShowLogIn } = props

  return (
    <>
      {!emailSent && (
        <FormModalWrapper
          setCloseModal={setModal}
          styles='md:!h-[500px]'
          top='2.5xl:top-[17%]'
        >
          <Formik
            onSubmit={(data) => submitHandler(data)}
            validationSchema={emailFormSchema}
            initialValues={defaultValue}
            validateOnMount={false}
          >
            {() => {
              return (
                <div>
                  <Form className='mt-3 md:mt-6 flex flex-col justify-center items-center animate-fade-in'>
                    {notFound && (
                      <ErrorAlert
                        setShowAlert={setNotFound}
                        title='auth:user-not-found'
                        animate={true}
                      />
                    )}

                    {fetchFailed && (
                      <ErrorAlert
                        setShowAlert={setFetchFailed}
                        title='auth:email-not-sent'
                        animate={true}
                      />
                    )}

                    <p className='text-white text-[32px] font-Helvetica-Neue-Geo font-medium '>
                      {t('auth:forgot-password')}?
                    </p>
                    <p className='text-medGray text-center w-[360px] pt-3 pb-6 text-base'>
                      {t('auth:email-instructions')}
                    </p>

                    <div className='h-[103px]'>
                      <AuthInputField type='text' name='email' />
                    </div>

                    <Button
                      styles={'bg-orange mx-auto block w-[360px]'}
                      title={t('auth:send-instructions')}
                      type='submit'
                    />
                  </Form>

                  <Button
                    onClick={() => {
                      setModal(false)
                      setShowLogIn(true)
                    }}
                    styles={
                      'mx-auto block w-[360px] mt-8 text-medGray text-base font-medium'
                    }
                    title={t('auth:back-to-log-in')}
                    type='button'
                  />
                </div>
              )
            }}
          </Formik>
        </FormModalWrapper>
      )}

      {emailSent && (
        <Popup
          info='password-recover-instructions'
          setShowPopupModal={setShowLogIn}
          setModal={setModal}
          type='activate'
        >
          <p
            onClick={() => setModal(false)}
            className='text-medGray bottom-[-50px] z-[99999] absolute cursor-pointer hover:scale-105 transition-transform text-base font-Helvetica-Neue-Geo font-medium'
          >
            {t('auth:confirm-later')}
          </p>
        </Popup>
      )}
    </>
  )
}

export default EmailForm

import { FormModalWrapper, AuthInputField, Button } from 'components'
import { useEmailForm } from './useEmailForm'
import { EmailFormProps } from './types.d'
import { emailFormSchema } from 'schemas'
import { Formik, Form } from 'formik'

const EmailForm: React.FC<EmailFormProps> = (props) => {
  const { setModal, setShowLogIn } = props
  const { t, defaultValue } = useEmailForm()

  return (
    <FormModalWrapper
      setCloseModal={setModal}
      styles='md:h-[500px]'
      top='2.5xl:top-[15%]'
    >
      <Formik
        validationSchema={emailFormSchema}
        initialValues={defaultValue}
        validateOnMount={false}
        onSubmit={() => {}}
      >
        {() => {
          return (
            <div>
              <Form className='mt-3 md:mt-6 flex flex-col justify-center items-center animate-fade-in'>
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
  )
}

export default EmailForm

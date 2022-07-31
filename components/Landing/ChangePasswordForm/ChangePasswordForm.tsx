import { FormModalWrapper, AuthInputField, Button } from 'components'
import { useChangePasswordForm } from './useChangePasswordForm'
import { ChangePasswordFormProps } from './types.d'
import { passwordChangeFormSchema } from 'schemas'
import { Formik, Form } from 'formik'

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (props) => {
  const { setShowLogIn } = props

  const { setShowForm, showForm, changedSuccessfully, t } =
    useChangePasswordForm()

  return (
    <>
      {showForm && !changedSuccessfully && (
        <FormModalWrapper
          setCloseModal={setShowForm}
          styles='md:!h-[550px]'
          top='2.5xl:top-[17%]'
        >
          <Formik
            onSubmit={() => {}}
            validationSchema={passwordChangeFormSchema}
            initialValues={{ password: '', confirmPassword: '' }}
            validateOnMount={false}
          >
            {() => {
              return (
                <div>
                  <Form className='mt-3 md:mt-6 flex flex-col justify-center items-center animate-fade-in'>
                    <p className='text-white cursor-default text-[32px] font-Helvetica-Neue-Geo font-medium '>
                      {t('auth:create-new-password')}
                    </p>
                    <p className='text-medGray cursor-default text-center w-[360px] pt-3 pb-6 text-base'>
                      {t('auth:new-password-instruction')}
                    </p>

                    <div className='h-[203px] flex flex-col'>
                      <div className='h-24'>
                        <AuthInputField
                          placeholder='password-reqs'
                          type='password'
                          name='password'
                        />
                      </div>
                      <div className='h-24'>
                        <AuthInputField
                          placeholder='confirmPassword'
                          name='confirmPassword'
                          type='password'
                        />
                      </div>
                    </div>

                    <Button
                      styles={'bg-orange block w-[360px]'}
                      title={t('auth:reset-password')}
                      type='submit'
                    />
                  </Form>

                  <Button
                    onClick={() => {
                      setShowForm(false)
                      setShowLogIn(true)
                    }}
                    styles={
                      'mx-auto block w-[360px] mt-8 text-medGray text-base font-medium'
                    }
                    title={t('auth:back-to-log-in')}
                    backIcon={true}
                    type='button'
                  />
                </div>
              )
            }}
          </Formik>
        </FormModalWrapper>
      )}
    </>
  )
}

export default ChangePasswordForm

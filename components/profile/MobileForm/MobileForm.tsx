import { AuthInputField, Button, CancelSave } from 'components'
import { useMobileForm } from './useMobileForm'
import { MobileFormProps } from './types.d'
import { Form, Formik } from 'formik'
import {
  usernameFormSchema,
  passwordFormSchema,
  emailFormSchema,
} from 'schemas'

const MobileForm: React.FC<MobileFormProps> = (props) => {
  const { closeForm, type, userId, setFieldValue } = props

  const {
    duplicateUsernameError,
    setSaveChangesModal,
    saveChangesModal,
    submitHandler,
    t,
  } = useMobileForm(type, userId, closeForm, setFieldValue)

  return (
    <div className='fixed w-full bg-background h-screen z-[9999] right-0'>
      <Formik
        validateOnBlur={duplicateUsernameError ? false : true}
        validateOnChange={duplicateUsernameError ? false : true}
        onSubmit={submitHandler}
        validationSchema={
          type === 'username'
            ? usernameFormSchema
            : type === 'password'
            ? passwordFormSchema
            : emailFormSchema
        }
        initialValues={{
          confirmPassword: '',
          password: '',
          username: '',
          email: '',
        }}
      >
        {() => {
          return (
            <Form>
              {saveChangesModal && (
                <div>
                  <div className='bg-background overflow-hidden top-0 bg-opacity-70 fixed w-screen h-screen'></div>

                  <div className='fixed z-[9999] w-full animate-scale-up'>
                    <div className='w-[90%] bg-gradient-to-br border border-background from-darkBlack to-darkGray mx-auto rounded-xl h-52'>
                      <p className='text-center pt-[68px] pb-11 border-b border-b-gray-700 font-Helvetica-Neue-Geo text-lg'>
                        {t('profile:make-changes')}
                      </p>

                      <div className='flex justify-between items-center pt-3 px-[7%]'>
                        <div
                          className='text-xl cursor-pointer active:scale-100 transition-transform hover:scale-[1.03]'
                          onClick={() => {
                            setSaveChangesModal(false)
                          }}
                        >
                          {t('profile:cancel')}
                        </div>

                        <Button
                          title={t(`profile:confirm`)}
                          styles='bg-orange text-xl !px-2'
                          type='submit'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div
                className={`relative animate-scale-up w-full bg-backgroundGray py-14 ${
                  saveChangesModal && 'opacity-0'
                }`}
              >
                <div className='max-w-[80%] h-[94px] mx-auto'>
                  {type === 'username' && (
                    <AuthInputField
                      placeholder={t('profile:enter-new-username')}
                      valid='!bottom-[7px] !right-3'
                      error='!bottom-3 !right-3'
                      styles='!border'
                      name='username'
                      profile='yes'
                      type='text'
                    />
                  )}
                </div>

                <div className='justify-between'></div>

                {!saveChangesModal && (
                  <CancelSave
                    cancelHandler={() => closeForm(true)}
                    saveHandler={() => {}}
                    mobile={true}
                  />
                )}
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default MobileForm

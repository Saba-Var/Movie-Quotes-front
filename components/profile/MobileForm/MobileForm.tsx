import { SaveChangesModal, AuthInputField, CancelSave } from 'components'
import { useMobileForm } from './useMobileForm'
import { MobileFormProps } from './types.d'
import { Form, Formik } from 'formik'
import {
  usernameFormSchema,
  passwordFormSchema,
  emailFormSchema,
} from 'schemas'

const MobileForm: React.FC<MobileFormProps> = (props) => {
  const {
    setUpdateAlert,
    setFieldValue,
    closeForm,
    setFile,
    userId,
    file,
    type,
  } = props

  const {
    duplicateUsernameError,
    setSaveChangesModal,
    saveChangesModal,
    submitHandler,
    t,
  } = useMobileForm(type, userId, closeForm, setFieldValue, setUpdateAlert)

  return (
    <div className='fixed w-full bg-background h-screen z-[9] right-0'>
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
                <SaveChangesModal
                  closeModal={setSaveChangesModal}
                  setFile={setFile}
                  userId={userId}
                  file={file}
                />
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

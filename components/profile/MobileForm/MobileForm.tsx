import { useMobileForm } from './useMobileForm'
import { MobileFormProps } from './types.d'
import { Form, Formik } from 'formik'
import {
  PasswordRequirements,
  SaveChangesModal,
  AuthInputField,
  CancelSave,
  BackArrow,
} from 'components'
import {
  usernameFormSchema,
  passwordFormSchema,
  emailFormSchema,
} from 'schemas'

const MobileForm: React.FC<MobileFormProps> = (props) => {
  const {
    setUpdateList,
    setFieldValue,
    closeForm,
    setFile,
    userId,
    type,
    file,
  } = props

  const {
    duplicateUsernameError,
    setPasswordErrorAlert,
    setSaveChangesModal,
    passwordErrorAlert,
    saveChangesModal,
    saveChangesError,
    submitHandler,
    navigateBack,
    session,
    t,
  } = useMobileForm(type, userId, closeForm, setUpdateList, setFieldValue)

  return (
    <div
      className={`fixed w-full bg-background h-screen z-[9] right-0 ${
        !session && 'top-[86px] pt-14'
      }`}
    >
      {!session && (
        <div onClick={navigateBack}>
          <BackArrow styles={'w-[18px] h-[18px] !top-[19px] !left-8'} />
        </div>
      )}

      <Formik
        validateOnBlur={
          duplicateUsernameError || saveChangesError ? false : true
        }
        validateOnChange={
          duplicateUsernameError || saveChangesError ? false : true
        }
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
        {(form) => {
          return (
            <Form>
              {saveChangesModal && (
                <SaveChangesModal
                  setPasswordErrorAlert={setPasswordErrorAlert}
                  passwordErrorAlert={passwordErrorAlert}
                  closeModal={setSaveChangesModal}
                  setFile={setFile}
                  userId={userId}
                  file={file}
                />
              )}

              <div
                className={`relative animate-scale-up w-full bg-backgroundGray py-14 ${
                  saveChangesModal && 'opacity-0'
                } ${type === 'password' && 'py-5 pt-9'}`}
              >
                <div
                  className={`max-w-[80%] h-[94px] mx-auto ${
                    type === 'password' && '!h-fit'
                  }`}
                >
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

                  {type === 'email' && (
                    <AuthInputField
                      placeholder={t('profile:enter-new-email')}
                      valid='!bottom-[7px] !right-3'
                      error='!bottom-3 !right-3'
                      styles='!border'
                      name='email'
                      profile='yes'
                      type='text'
                    />
                  )}

                  {type === 'password' && (
                    <div>
                      <PasswordRequirements
                        lowerCaseError={form.errors.password}
                        newPassword={form.values.password}
                        mobileVersion={true}
                      />

                      <div className='flex flex-col mt-5'>
                        <div className='h-[94px]'>
                          <AuthInputField
                            placeholder={t('profile:enter-new-username')}
                            valid='!bottom-[16%] !right-3'
                            error='!bottom-[16%] !right-3'
                            styles='!border'
                            name='password'
                            profile='yes'
                            type='text'
                          />
                        </div>

                        <div className='h-[94px]'>
                          <AuthInputField
                            placeholder={t('profile:enter-new-username')}
                            valid='!bottom-[16%] !right-3'
                            error='!bottom-[16%] !right-3'
                            name='confirmPassword'
                            styles='!border'
                            profile='yes'
                            type='text'
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className='justify-between'></div>

                {!saveChangesModal && (
                  <CancelSave
                    styles={`${type === 'password' && '!-bottom-[10vh]'}`}
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

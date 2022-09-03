import { useUserProfile } from './useUserProfile'
import { UserProfileProps } from './types.d'
import { Form, Formik } from 'formik'
import {
  usernameFormSchema,
  passwordFormSchema,
  userProfileSchema,
} from 'schemas'
import {
  AuthInputField,
  PhotoUpload,
  CancelSave,
  ErrorAlert,
  EditInput,
  Passwords,
  Emails,
  AddEmail,
} from 'components'

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { userData } = props

  const {
    setUserSecondaryEmails,
    userSecondaryEmails,
    setUserPrimaryEmail,
    setDisableUsername,
    setImageFetchError,
    setDeleteEmailList,
    setDisablePassword,
    setFailChangesFail,
    setAddEmailModal,
    userPrimaryEmail,
    saveChangesFail,
    imageFetchError,
    disableUsername,
    disablePassword,
    duplicateError,
    passwordLength,
    setEmailChange,
    addEmailModal,
    submitHandler,
    setTypeError,
    clickHandler,
    emailChange,
    typeError,
    setFile,
    file,
    t,
  } = useUserProfile(userData, userData.secondaryEmails!)

  return (
    <div className='text-white'>
      <AddEmail
        setAddEmailModal={setAddEmailModal}
        addEmailModal={addEmailModal}
        userId={userData._id}
      />

      {userData.name && (
        <Formik
          validationSchema={
            !disableUsername && !disablePassword
              ? userProfileSchema
              : disableUsername && !disablePassword
              ? passwordFormSchema
              : usernameFormSchema
          }
          validateOnChange={duplicateError ? false : true}
          initialValues={{
            username: userData.name,
            confirmPassword: '',
            password: '',
          }}
          onSubmit={submitHandler}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {(form) => {
            return (
              <Form className='relative'>
                {imageFetchError && (
                  <ErrorAlert
                    styles='left-1/2 !-translate-x-1/2 1xl:left-[62%]'
                    setShowAlert={setImageFetchError}
                    title='profile:user-image-error'
                  />
                )}

                {saveChangesFail && (
                  <ErrorAlert
                    styles='left-1/2 !-translate-x-1/2 1xl:left-[62%]'
                    setShowAlert={setFailChangesFail}
                    title='profile:save-failed'
                  />
                )}

                <div className='absolute right-1/2 translate-x-1/2 -top-[270px]'>
                  <PhotoUpload
                    userImageSrc={userData.image}
                    setTypeError={setTypeError}
                    userName={userData.name}
                    typeError={typeError}
                    setFile={setFile}
                    file={file}
                  />
                </div>

                <div className='flex justify-center'>
                  <div className='flex flex-col items-start'>
                    <div className='h-[94px] relative w-[300px] lg:!w-[350px] xl:!w-[400px] 2xl:!w-[480px] mb-12'>
                      <AuthInputField
                        noValidate={disableUsername}
                        placeholder={userData.name}
                        styles='profileInputStyles'
                        disabled={disableUsername}
                        name='username'
                        profile='yes'
                        type='text'
                      />

                      {disableUsername && (
                        <EditInput
                          clickHandler={() => {
                            setDisableUsername(false)
                            form.resetForm()
                          }}
                          text={t('profile:edit')}
                        />
                      )}
                    </div>

                    <Emails
                      setUserSecondaryEmails={setUserSecondaryEmails}
                      secondaryEmails={userData.secondaryEmails}
                      userSecondaryEmails={userSecondaryEmails}
                      setUserPrimaryEmail={setUserPrimaryEmail}
                      setDeleteEmailList={setDeleteEmailList}
                      setAddEmailModal={setAddEmailModal}
                      userPrimaryEmail={userPrimaryEmail}
                      setEmailChange={setEmailChange}
                      primaryEmail={userData.email}
                    />

                    <Passwords
                      setDisablePassword={setDisablePassword}
                      lowerCaseError={form.errors.password}
                      newPassword={form.values.password}
                      disablePassword={disablePassword}
                      passwordLength={passwordLength}
                    />
                  </div>
                </div>

                {(!disableUsername ||
                  file ||
                  !disablePassword ||
                  emailChange) && (
                  <CancelSave
                    styles='!right-0'
                    saveHandler={clickHandler}
                    cancelHandler={() => {
                      setDisableUsername(true)
                      setDisablePassword(true)
                      form.resetForm()
                      form.setFieldValue('username', userData.name)

                      setUserSecondaryEmails(userData.secondaryEmails!)
                      setUserPrimaryEmail(userData.email)
                      if (file) {
                        setFile(null)
                      }
                      setDeleteEmailList([])
                      setEmailChange(false)
                    }}
                  />
                )}
              </Form>
            )
          }}
        </Formik>
      )}
    </div>
  )
}

export default UserProfile

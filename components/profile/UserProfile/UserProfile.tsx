import { useUserProfile } from './useUserProfile'
import { UserProfileProps } from './types.d'
import { Form, Formik } from 'formik'
import {
  usernameFormSchema,
  passwordFormSchema,
  userProfileSchema,
} from 'schemas'
import {
  SaveChangesModal,
  AuthInputField,
  SuccessAlert,
  PhotoUpload,
  CancelSave,
  MobileForm,
  ErrorAlert,
  EditInput,
  Passwords,
  AddEmail,
  Emails,
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
    setUpdatedList,
    addEmailModal,
    submitHandler,
    setTypeError,
    clickHandler,
    updatedList,
    emailChange,
    typeError,
    setFile,
    file,
    t,
  } = useUserProfile(userData, userData.secondaryEmails!)

  return (
    <>
      <div className='text-white '>
        {file && (
          <div className='fixed 1xl:hidden w-full bg-background h-screen z-[9] right-0'>
            <SaveChangesModal
              setImageFetchError={setImageFetchError}
              setUpdatedList={setUpdatedList}
              setTypeError={setTypeError}
              userId={userData._id}
              typeError={typeError}
              setFile={setFile}
              file={file}
            />
          </div>
        )}

        {updatedList.length > 0 && (
          <div className='fixed 1xl:top-32 max-h-[65vh] overflow-y-auto xl:!top-44 xl:pr-[3%] 1xl:!items-end  flex gap-4 flex-col w-full 1xl:!w-fit right-0 z-[99999]'>
            <div className='1xl:hidden h-screen w-full opacity-60 left-0 fixed bg-background top-24'></div>

            {updatedList.map((item) => {
              return (
                <SuccessAlert
                  headerText={t(
                    `profile:${
                      item.type === 'image-updated' ? 'image' : 'username'
                    }-updated`
                  )}
                  setUpdatedList={setUpdatedList}
                  key={item.id}
                  id={item.id}
                />
              )
            })}
          </div>
        )}

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
                <>
                  {!disableUsername && (
                    <div className='1xl:hidden'>
                      <MobileForm
                        setFieldValue={form.setFieldValue}
                        setUpdateList={setUpdatedList}
                        closeForm={setDisableUsername}
                        userId={userData._id}
                        setFile={setFile}
                        type='username'
                        file={file}
                      />
                    </div>
                  )}

                  <Form className='relative pt-10 1xl:!pt-0'>
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

                    <div className='1xl:absolute flex mx-auto w-fit right-1/2 1xl:translate-x-1/2 1xl:!-top-[275px]'>
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
                            styles='profileInputStyles'
                            placeholder={userData.name}
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
                              styles='!right-0'
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
                </>
              )
            }}
          </Formik>
        )}
      </div>
    </>
  )
}

export default UserProfile

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
  EmailsMobile,
  PhotoUpload,
  CancelSave,
  RightArrow,
  MobileForm,
  ErrorAlert,
  EditInput,
  AlertList,
  Passwords,
  AddEmail,
  Emails,
} from 'components'

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { userData } = props

  const {
    setUserSecondaryEmails,
    setEmailsMobileModal,
    userSecondaryEmails,
    setUserPrimaryEmail,
    setDisableUsername,
    setImageFetchError,
    setDeleteEmailList,
    setDisablePassword,
    setFailChangesFail,
    formCancelHandler,
    emailsMobileModal,
    setAddEmailModal,
    userPrimaryEmail,
    saveChangesFail,
    imageFetchError,
    disableUsername,
    disablePassword,
    duplicateError,
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
          <AlertList
            setUpdatedList={setUpdatedList}
            updatedList={updatedList}
          />
        )}

        <div className='hidden 1xl:block'>
          <AddEmail
            setAddEmailModal={setAddEmailModal}
            setUpdatedList={setUpdatedList}
            addEmailModal={addEmailModal}
            userId={userData._id}
          />
        </div>

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

                  {!disablePassword && (
                    <div className='1xl:hidden'>
                      <MobileForm
                        setFieldValue={form.setFieldValue}
                        setUpdateList={setUpdatedList}
                        closeForm={setDisablePassword}
                        userId={userData._id}
                        setFile={setFile}
                        type='password'
                        file={file}
                      />
                    </div>
                  )}

                  {emailsMobileModal && (
                    <EmailsMobile
                      setUserSecondaryEmails={setUserSecondaryEmails}
                      setEmailsMobileModal={setEmailsMobileModal}
                      userSecondaryEmails={userSecondaryEmails}
                      setUserPrimaryEmail={setUserPrimaryEmail}
                      setDeleteEmailList={setDeleteEmailList}
                      userPrimaryEmail={userPrimaryEmail}
                      setUpdatedList={setUpdatedList}
                      setEmailChange={setEmailChange}
                      userEmail={userData.email}
                      updatedList={updatedList}
                      userId={userData._id}
                    />
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

                    <div className='1xl:absolute flex mx-auto w-fit right-1/2 1xl:translate-x-1/2 1xl:!-top-[300px]'>
                      <PhotoUpload
                        userImageSrc={userData.image}
                        setTypeError={setTypeError}
                        userName={userData.name}
                        typeError={typeError}
                        setFile={setFile}
                        file={file}
                      />
                    </div>

                    <div className='flex justify-center mt-4'>
                      <div className='flex flex-col items-start'>
                        <div className='h-[94px] relative w-[85vw] 1xl:w-[300px] lg:!w-[350px] xl:!w-[400px] 2xl:!w-[480px] 1xl:mb-12'>
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
                              clickHandler={() => setDisableUsername(false)}
                              text={t('profile:edit')}
                              styles='!right-0'
                            />
                          )}
                        </div>

                        <div className='hidden 1xl:block'>
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
                        </div>

                        <div className='flex 1xl:hidden flex-col gap-1 w-[85vw] relative'>
                          <div className='flex flex-col gap-2 relative'>
                            <label className='text-white text-base font-Helvetica-Neue-Geo font-thin'>
                              {t(`auth:password`)}
                            </label>
                            <input
                              className={`bg-transparent pb-4 text-inputGray border-b !border-b-gray-700 text-base font-Helvetica-Neue-Geo font-medium rounded w-full h-[38px]`}
                              defaultValue={'#'.repeat(10)}
                              type={'password'}
                              disabled={true}
                            />
                          </div>

                          <div
                            onClick={() => setDisablePassword(false)}
                            className={`cursor-pointer right-0 top-9 absolute active:scale-100 transition-transform hover:scale-[1.02] text-inputGray text-base`}
                          >
                            {t('profile:edit')}
                          </div>
                        </div>

                        <div className='hidden 1xl:block'>
                          <Passwords
                            setDisablePassword={setDisablePassword}
                            lowerCaseError={form.errors.password}
                            newPassword={form.values.password}
                            disablePassword={disablePassword}
                          />
                        </div>

                        <div
                          onClick={() => setEmailsMobileModal(true)}
                          className='flex justify-between w-full items-center 1xl:hidden mt-8'
                        >
                          <p>{t('profile:EMAIL')}</p>
                          <RightArrow />
                        </div>
                      </div>
                    </div>

                    {(!disableUsername ||
                      file ||
                      !disablePassword ||
                      emailChange) && (
                      <div className='hidden 1xl:block'>
                        <CancelSave
                          styles='!right-0'
                          saveHandler={clickHandler}
                          cancelHandler={() => {
                            formCancelHandler(
                              form.resetForm,
                              form.setFieldValue
                            )
                          }}
                        />
                      </div>
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

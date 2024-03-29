import { useGoogleUserProfile } from './useGoogleUserProfile'
import { GoogleUserProfileProps } from './types.d'
import { usernameFormSchema } from 'schemas'
import { Form, Formik } from 'formik'
import {
  SaveChangesModal,
  AuthInputField,
  PhotoUpload,
  CancelSave,
  ErrorAlert,
  MobileForm,
  EditInput,
  AlertList,
} from 'components'

const GoogleUserProfile: React.FC<GoogleUserProfileProps> = (props) => {
  const { userData } = props

  const {
    setDisableUsername,
    setImageFetchError,
    imageFetchError,
    uploadUserImage,
    disableUsername,
    duplicateError,
    setUpdatedList,
    submitHandler,
    setTypeError,
    updatedList,
    typeError,
    setFile,
    file,
    t,
  } = useGoogleUserProfile(userData._id)

  return (
    <>
      <div className='text-white'>
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

        {userData.name && (
          <Formik
            validateOnChange={duplicateError ? false : true}
            initialValues={{ username: userData.name }}
            validationSchema={usernameFormSchema}
            onSubmit={submitHandler}
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

                  <Form className={`relative pt-10 1xl:!pt-0`}>
                    {imageFetchError && (
                      <ErrorAlert
                        styles='left-1/2 !-translate-x-1/2 1xl:left-[62%]'
                        setShowAlert={setImageFetchError}
                        title='profile:user-image-error'
                      />
                    )}

                    <div className='1xl:absolute flex mx-auto w-fit right-1/2 1xl:translate-x-1/2 1xl:!-top-[285px]'>
                      <PhotoUpload
                        userImageSrc={userData.image}
                        setTypeError={setTypeError}
                        userName={userData.name}
                        typeError={typeError}
                        setFile={setFile}
                        file={file}
                      />
                    </div>

                    <div>
                      <div className='h-[94px] mt-10 1xl:mt-0 relative mx-auto max-w-[480px] 1xl:mb-7'>
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

                      <div className='h-[1px] hidden 1xl:block bg-gray-700 mx-auto max-w-[480px] mb-7'></div>

                      <div className='h-[94px] mx-auto max-w-[480px]'>
                        <AuthInputField
                          placeholder={userData.email}
                          styles='profileInputStyles'
                          disabled={true}
                          profile='yes'
                          name='email'
                          type='text'
                        />
                      </div>
                    </div>

                    <div className='hidden 1xl:block'>
                      {(!disableUsername || file) && (
                        <CancelSave
                          styles='1xl:bottom-[-35%] 3xl:!bottom-[-75%]'
                          disableSubmit={disableUsername}
                          saveHandler={uploadUserImage}
                          cancelHandler={() => {
                            setDisableUsername(true)
                            form.resetForm()
                            form.setFieldValue('username', userData.name)
                            if (file) {
                              setFile(null)
                            }
                          }}
                        />
                      )}
                    </div>
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

export default GoogleUserProfile

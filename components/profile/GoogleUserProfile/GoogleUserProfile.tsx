import { useGoogleUserProfile } from './useGoogleUserProfile'
import { GoogleUserProfileProps } from './types.d'
import { usernameFormSchema } from 'schemas'
import { Form, Formik } from 'formik'
import {
  AuthInputField,
  PhotoUpload,
  CancelSave,
  ErrorAlert,
  MobileForm,
  EditInput,
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
    submitHandler,
    setTypeError,
    typeError,
    setFile,
    file,
    t,
  } = useGoogleUserProfile(userData._id)

  return (
    <div className='text-white'>
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
                      closeForm={setDisableUsername}
                      userId={userData._id}
                      type='username'
                    />
                  </div>
                )}

                <Form className={`relative pt-10 1xl:!pt-18`}>
                  {imageFetchError && (
                    <ErrorAlert
                      styles='left-1/2 !-translate-x-1/2 1xl:left-[62%]'
                      setShowAlert={setImageFetchError}
                      title='profile:user-image-error'
                    />
                  )}

                  <div className='1xl:absolute flex mx-auto w-fit right-1/2 1xl:translate-x-1/2 1xl:!-top-[270px]'>
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
                    <div className='h-[94px] mt-10 1xl:mt-0 relative mx-auto max-w-[480px] 1xl:mb-12'>
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

                    <div className='h-[1px] hidden 1xl:block bg-gray-700 mx-auto max-w-[480px] mb-12'></div>

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
  )
}

export default GoogleUserProfile

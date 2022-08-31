import { useUserProfile } from './useUserProfile'
import { UserProfileProps } from './types.d'
import { userProfileSchema } from 'schemas'
import { Form, Formik } from 'formik'
import {
  AuthInputField,
  PhotoUpload,
  CancelSave,
  ErrorAlert,
  EditInput,
  CheckIcon,
  Emails,
} from 'components'

const UserProfile: React.FC<UserProfileProps> = (props) => {
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
  } = useUserProfile(userData._id)

  return (
    <div className='text-white'>
      {userData.name && (
        <Formik
          validationSchema={userProfileSchema}
          validateOnChange={duplicateError ? false : true}
          initialValues={{
            username: userData.name,
            confirmPassword: '',
            password: '',
          }}
          onSubmit={submitHandler}
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
                          }}
                          text={t('profile:edit')}
                        />
                      )}
                    </div>

                    <Emails
                      secondaryEmails={userData.secondaryEmails}
                      primaryEmail={userData.email}
                    />
                  </div>
                </div>

                {(!disableUsername || file) && (
                  <CancelSave
                    styles='!right-0'
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
              </Form>
            )
          }}
        </Formik>
      )}
    </div>
  )
}

export default UserProfile

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
  SuccessAlert,
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
          <div className='fixed 1xl:top-32 max-h-[65vh] overflow-y-auto xl:!top-44 xl:pr-[3%] 1xl:!items-end  flex gap-4 flex-col w-full 1xl:!w-fit right-0 z-[9]'>
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

                  <Form className={`relative pt-10 1xl:!pt-18`}>
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

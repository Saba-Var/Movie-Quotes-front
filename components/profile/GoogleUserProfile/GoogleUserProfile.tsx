import { useGoogleUserProfile } from './useGoogleUserProfile'
import { AuthInputField, Button } from 'components'
import { GoogleUserProfileProps } from './types.d'
import { usernameFormSchema } from 'schemas'
import { Form, Formik } from 'formik'

const GoogleUserProfile: React.FC<GoogleUserProfileProps> = (props) => {
  const { userData } = props

  const {
    setDisableUsername,
    disableUsername,
    duplicateError,
    submitHandler,
    locale,
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
              <Form className='relative'>
                <div>
                  <div className='h-[94px] relative mx-auto max-w-[480px] mb-12'>
                    <AuthInputField
                      placeholder={userData.name}
                      disabled={disableUsername}
                      name='username'
                      profile='yes'
                      type='text'
                    />

                    {disableUsername && (
                      <div
                        onClick={() => setDisableUsername(false)}
                        className={`cursor-pointer -right-16 top-9 absolute active:scale-100 transition-transform hover:scale-[1.02] animate-fade-in text-inputGray text-xl ${
                          locale === 'ge' &&
                          '-right-[60px] top-10 text-sm lg:text-base lg:-right-20 xl:top-9 xl:-right-24 xl:text-xl'
                        }`}
                      >
                        {t('profile:edit')}
                      </div>
                    )}
                  </div>

                  <div className='h-[1px] bg-gray-700 mx-auto max-w-[480px] mb-12'></div>

                  <div className='h-[94px] mx-auto max-w-[480px]'>
                    <AuthInputField
                      placeholder={userData.email}
                      disabled={true}
                      profile='yes'
                      name='email'
                      type='text'
                    />
                  </div>
                </div>

                {!disableUsername && (
                  <div className='absolute items-center animate-fade-in flex bottom-[-170px] gap-8 right-[-13%] xl:right-[-14%] 2xl:right-[-16%] 3xl:right-[-23%]'>
                    <div
                      className='text-xl cursor-pointer active:scale-100 transition-transform hover:scale-[1.03]'
                      onClick={() => {
                        setDisableUsername(true)
                        form.resetForm()
                        form.setFieldValue('username', userData.name)
                      }}
                    >
                      {t('profile:cancel')}
                    </div>

                    <Button
                      title={t('profile:save-changes')}
                      styles='bg-orange text-xl'
                      type='submit'
                    />
                  </div>
                )}
              </Form>
            )
          }}
        </Formik>
      )}
    </div>
  )
}

export default GoogleUserProfile

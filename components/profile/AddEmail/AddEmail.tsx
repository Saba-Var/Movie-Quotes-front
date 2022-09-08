import { AuthInputField, Button } from 'components'
import { useAddEmail } from './useAddEmail'
import { AddEmailProps } from './types.d'
import { emailFormSchema } from 'schemas'
import { Form, Formik } from 'formik'

const AddEmail: React.FC<AddEmailProps> = (props) => {
  const { userId, setAddEmailModal, addEmailModal, setUpdatedList } = props

  const { submitHandler, fetchError, t } = useAddEmail(
    userId,
    setAddEmailModal,
    setUpdatedList
  )

  return (
    <>
      {addEmailModal && (
        <>
          <div
            onClick={() => setAddEmailModal(false)}
            className={`fixed w-full h-screen bg-background opacity-70 left-0  top-0 z-[99999]`}
          ></div>

          <Formik
            validateOnChange={fetchError ? false : true}
            validationSchema={emailFormSchema}
            initialValues={{ email: '' }}
            onSubmit={submitHandler}
            validateOnMount={true}
          >
            {() => {
              return (
                <div className='fixed animate-fade-in rounded-xl py-6 z-[999999] bg-formModalBlue w-[50%] lg:w-[40%] xl:w-[30%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <Form>
                    <p className='text-2xl pl-6 pb-6 border-b border-b-gray-700 font-Helvetica-Neue-Geo font-medium text-white'>
                      {t('profile:add-email')}
                    </p>

                    <div className='px-6 flex flex-col gap-10 mt-10'>
                      <div className='h-[98px]'>
                        <AuthInputField
                          placeholder={t('profile:enter-new-email')}
                          styles='!border'
                          profile='yes'
                          name='email'
                          type='text'
                        />
                      </div>

                      <div className='flex gap-8 ml-auto items-center'>
                        <div
                          className='cursor-pointer text-white animate-fade-in relative text-base active:scale-100 transition-transform hover:scale-[1.03]'
                          onClick={() => setAddEmailModal(false)}
                        >
                          {t('profile:cancel')}
                        </div>

                        <Button
                          title={t('profile:add')}
                          styles='!bg-orange'
                          type='submit'
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              )
            }}
          </Formik>
        </>
      )}
    </>
  )
}

export default AddEmail

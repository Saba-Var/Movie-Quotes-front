import { AuthInputField, Button } from 'components'
import { useTranslation } from 'next-i18next'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const RegistrationForm = () => {
  const { t } = useTranslation()
  const validate = Yup.object({
    name: Yup.string()
      .required('name-required')
      .min(3, 'name-min')
      .max(15, 'max-char')
      .matches(/^[a-z0-9]+$/g, 'lower-required'),

    email: Yup.string().required('email-required').email('valid-email'),

    password: Yup.string()
      .required('password-required')
      .min(8, 'password-min')
      .max(15, 'max-char')
      .matches(/^[a-z0-9]+$/g, 'lower-required'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'password-match')
      .required('confirmPassword-required'),
  })

  return (
    <Formik
      initialValues={{
        confirmPassword: '',
        password: '',
        email: '',
        name: '',
      }}
      validationSchema={validate}
      onSubmit={() => {}}
    >
      {(formik) => {
        return (
          <Form className='mt-6 flex flex-col justify-center items-center animate-fade-in'>
            <div className='flex flex-col gap-4 mb-8'>
              <AuthInputField type='text' name='name' />
              <AuthInputField type='text' name='email' />
              <AuthInputField type='password' name='password' />
              <AuthInputField name='confirmPassword' type='password' />
            </div>
            <div>
              <Button
                styles={'bg-orange mx-auto block w-[360px]'}
                title={t('landing:start')}
                type='submit'
              />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegistrationForm

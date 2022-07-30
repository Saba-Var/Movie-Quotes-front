import * as Yup from 'yup'

export const registrationFormValidationSchema = Yup.object({
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

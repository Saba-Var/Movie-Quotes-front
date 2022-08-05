import { languageValidation } from 'helpers'
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

export const emailFormSchema = Yup.object({
  email: Yup.string().required('email-required').email('valid-email'),
})

export const passwordChangeFormSchema = Yup.object({
  password: Yup.string()
    .required('password-required')
    .min(8, 'password-min')
    .max(15, 'max-char')
    .matches(/^[a-z0-9]+$/g, 'lower-required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'password-match')
    .required('confirmPassword-required'),
})

export const logInFormSchema = Yup.object({
  email: Yup.string().required('email-required').email('valid-email'),
  password: Yup.string().trim().required('password-required'),
})

export const addMovieFormSchema = Yup.object({
  budget: Yup.number().required('required-field').min(0, 'budget-min'),

  movie_name_en: Yup.string()
    .trim()
    .required('required-field')
    .test('input text validation', 'enter-english', function (value) {
      const { path, createError } = this
      return languageValidation({
        language: 'ENG',
        value: value!,
        createError,
        path,
      })
    }),

  movie_name_ge: Yup.string()
    .trim()
    .required('required-field')
    .test('input text validation', 'enter-georgian', function (value) {
      const { path, createError } = this
      return languageValidation({
        language: 'GEO',
        value: value!,
        createError,
        path,
      })
    }),

  director_en: Yup.string()
    .trim()
    .required('required-field')
    .test('input text validation', 'enter-english', function (value) {
      const { path, createError } = this
      return languageValidation({
        language: 'ENG',
        value: value!,
        createError,
        path,
      })
    }),

  director_ge: Yup.string()
    .trim()
    .required('required-field')
    .test('input text validation', 'enter-georgian', function (value) {
      const { path, createError } = this
      return languageValidation({
        language: 'GEO',
        value: value!,
        createError,
        path,
      })
    }),

  movie_description_en: Yup.string()
    .trim()
    .required('required-field')
    .test('input text validation', 'enter-english', function (value) {
      const { path, createError } = this
      return languageValidation({
        language: 'ENG',
        value: value!,
        createError,
        path,
      })
    }),

  movie_description_ge: Yup.string()
    .trim()
    .required('required-field')
    .test('input text validation', 'enter-georgian', function (value) {
      const { path, createError } = this
      return languageValidation({
        language: 'GEO',
        value: value!,
        createError,
        path,
      })
    }),
})

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

  movieNameEn: Yup.string()
    .trim()
    .required('required-field')
    .test('Movie name validation (Eng)', 'enter-english', function (value) {
      const { path, createError } = this
      return languageValidation({
        language: 'ENG',
        value: value!,
        createError,
        path,
      })
    }),

  movieNameGe: Yup.string()
    .trim()
    .required('required-field')
    .test('Movie name validation (Geo)', 'enter-georgian', function (value) {
      const { path, createError } = this
      return languageValidation({
        language: 'GEO',
        value: value!,
        createError,
        path,
      })
    }),

  directorEn: Yup.string()
    .trim()
    .required('required-field')
    .test('Director name validation (Eng)', 'enter-english', function (value) {
      const { path, createError } = this
      return languageValidation({
        language: 'ENG',
        value: value!,
        createError,
        path,
      })
    }),

  directorGe: Yup.string()
    .trim()
    .required('required-field')
    .test('Director name validation (Geo)', 'enter-georgian', function (value) {
      const { path, createError } = this
      return languageValidation({
        language: 'GEO',
        value: value!,
        createError,
        path,
      })
    }),

  movieDescriptionEn: Yup.string()
    .trim()
    .required('required-field')
    .test(
      'Movie description validation (Eng)',
      'enter-english',
      function (value) {
        const { path, createError } = this
        return languageValidation({
          language: 'ENG',
          value: value!,
          createError,
          path,
        })
      }
    ),

  movieDescriptionGe: Yup.string()
    .trim()
    .required('required-field')
    .test(
      'Movie description validation (Geo)',
      'enter-georgian',
      function (value) {
        const { path, createError } = this
        return languageValidation({
          language: 'GEO',
          value: value!,
          createError,
          path,
        })
      }
    ),
})

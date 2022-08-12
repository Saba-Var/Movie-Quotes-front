import { CreateErrorOptions, ValidationError } from 'yup'

export type languageValidationData = {
  createError: (params?: CreateErrorOptions | undefined) => ValidationError
  language: 'ENG' | 'GEO'
  value: string
  path: string
}

import { languageValidationData } from './types.d'

function languageValidation(data: languageValidationData) {
  const { createError, language, path, value } = data

  if (value) {
    let languageRegex = /[\u10A0-\u10FF]/
    const text = value.replace(/\s/g, '')
    let errorMessage = 'enter-georgian'

    if (language === 'ENG') {
      languageRegex = /^[A-Za-z][A-Za-z0-9]*$/
      errorMessage = 'enter-english'
    }

    if (value && text) {
      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        const isValidLanguage = languageRegex.test(char)

        if (
          !isValidLanguage &&
          !/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/.test(char) &&
          !+char &&
          char !== '0'
        ) {
          return createError({ path, message: errorMessage })
        }
      }
    }

    return true
  }

  return false
}

export default languageValidation

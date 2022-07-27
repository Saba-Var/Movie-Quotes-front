import { ErrorIcon, ValidIcon } from 'components'
import { AuthInputFieldProps } from './types.d'
import { useTranslation } from 'next-i18next'
import { ErrorMessage } from 'formik'
import { useField } from 'formik'

const AuthInputField: React.FC<AuthInputFieldProps> = (props) => {
  const { type } = props
  const { t } = useTranslation()

  const [field, meta] = useField(props)

  const isValid = meta.touched && !meta.error

  return (
    <div className='flex flex-col gap-2 animate-fade-in'>
      <div className='flex flex-col gap-2 relative'>
        <label
          className='text-white text-base font-Helvetica-Neue-Geo font-thin'
          htmlFor={field.name}
        >
          {t(`registration:${field.name}`)}
          <span className='text-red-500 text-base font-Helvetica-Neue'> *</span>
        </label>
        <input
          {...field}
          {...props}
          className={`bg-inputGray pl-3 pr-7 text-inputBlack text-base font-Helvetica-Neue rounded w-[360px] border ${
            meta.error && meta.touched && 'border-errorRed'
          } ${isValid && 'border-green'} h-[38px] outline-none`}
          autoComplete='off'
          type={type}
        />

        {meta.error && meta.touched && (
          <ErrorIcon styles='absolute right-3 bottom-[11px]' />
        )}
        {isValid && <ValidIcon styles='absolute right-3 bottom-[11px]' />}
      </div>

      <ErrorMessage name={field.name}>
        {(errorMessage) => {
          return (
            <div className='text-errorRed text-sm'>
              {t(`registration:${errorMessage}`)}.
            </div>
          )
        }}
      </ErrorMessage>
    </div>
  )
}

export default AuthInputField

import { ErrorIcon, ValidIcon, EyeIcon } from 'components'
import { useAuthInputField } from './useAuthInputField'
import { AuthInputFieldProps } from './types.d'
import { ErrorMessage } from 'formik'

const AuthInputField: React.FC<AuthInputFieldProps> = (props) => {
  const { type } = props

  const { field, isValid, error, touched, t, isPasswordField } =
    useAuthInputField(props)

  return (
    <div className='flex flex-col gap-1 animate-fade-in'>
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
          className={`bg-inputGray pl-3 pr-7 text-inputBlack text-base font-Helvetica-Neue-Geo font-medium rounded w-[360px] border ${
            error && touched && 'border-errorRed'
          } ${isValid && 'border-green'} h-[38px] outline-none`}
          autoComplete='off'
          type={type}
        />

        {error && touched && (
          <ErrorIcon styles='absolute right-3 bottom-[11px]' />
        )}

        {isValid && <ValidIcon styles='absolute right-3 bottom-[9px]' />}

        {isPasswordField && (
          <EyeIcon
            styles={`${(isValid || (error && touched)) && 'right-10'}`}
          />
        )}
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

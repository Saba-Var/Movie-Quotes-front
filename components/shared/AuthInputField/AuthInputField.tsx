import { ErrorIcon, ValidIcon, EyeIcon } from 'components'
import { useAuthInputField } from './useAuthInputField'
import { AuthInputFieldProps } from './types.d'
import { ErrorMessage } from 'formik'

const AuthInputField: React.FC<AuthInputFieldProps> = (props) => {
  const { placeholder } = props

  const {
    passwordShowHandler,
    isPasswordField,
    inputType,
    isValid,
    isError,
    field,
    t,
  } = useAuthInputField(props)

  return (
    <div className='flex flex-col gap-1 animate-fade-in'>
      <div className='flex flex-col gap-2 relative'>
        <label
          className='text-white text-base font-Helvetica-Neue-Geo font-thin'
          htmlFor={field.name}
        >
          {t(`auth:${field.name}`)}
          <span className='text-red-500 text-base font-Helvetica-Neue'> *</span>
        </label>
        <input
          {...field}
          {...props}
          className={`bg-inputGray pl-3 pr-7 placeholder text-inputBlack text-base font-Helvetica-Neue-Geo font-medium rounded w-[360px] border ${
            isError && 'border-errorRed'
          } ${isValid && 'border-green'} h-[38px] outline-none`}
          autoComplete='off'
          type={inputType}
          placeholder={t(`auth:${placeholder}`)}
        />

        {isError && (
          <ErrorIcon
            styles={`absolute ${
              isPasswordField && 'right-8'
            } right-3 bottom-[11px]`}
          />
        )}

        {isValid && (
          <ValidIcon
            styles={`absolute ${
              isPasswordField && 'right-7'
            } right-3 bottom-[9px]`}
          />
        )}

        {isPasswordField && <EyeIcon onClick={passwordShowHandler} />}
      </div>

      <ErrorMessage name={field.name}>
        {(errorMessage) => {
          return (
            <div className='text-errorRed text-sm animate-fade-in'>
              {t(`auth:${errorMessage}`)}.
            </div>
          )
        }}
      </ErrorMessage>
    </div>
  )
}

export default AuthInputField

import { ErrorIcon, ValidIcon, EyeIcon } from 'components'
import { useAuthInputField } from './useAuthInputField'
import { AuthInputFieldProps } from './types.d'
import { ErrorMessage } from 'formik'

const AuthInputField: React.FC<AuthInputFieldProps> = (props) => {
  const { placeholder, noValidate, error, valid, disabled, profile, styles } =
    props

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

          {!profile && (
            <span className='text-red-500 text-base font-Helvetica-Neue'>
              {' '}
              *
            </span>
          )}
        </label>
        <input
          {...field}
          {...props}
          className={`bg-inputGray pl-3 pr-7 text-inputBlack text-base font-Helvetica-Neue-Geo font-medium rounded w-[360px] ${
            !profile && 'border'
          } ${isError && '!border-errorRed'} ${
            isValid && !noValidate && !disabled && '!border-green'
          } ${profile && '!w-full'} h-[38px] outline-none ${
            profile && disabled && '1xl:placeholder:text-inputBlack'
          } ${styles}`}
          placeholder={!profile ? t(`auth:${placeholder}`) : placeholder}
          disabled={disabled ? true : false}
          autoComplete='off'
          type={inputType}
        />

        {isError && (
          <ErrorIcon
            styles={`absolute ${
              isPasswordField && 'right-8'
            } right-3 bottom-[11px] ${
              profile &&
              '!right-0 1xl:!right-3 bottom-[17px] 1xl:!bottom-[11px]'
            } ${error}`}
          />
        )}

        {isValid && !noValidate && !disabled && (
          <ValidIcon
            styles={`absolute ${
              isPasswordField && 'right-7'
            } right-3 bottom-[9px] ${
              profile &&
              '!right-0 1xl:!right-3 !bottom-[16px] 1xl:!bottom-[9px]'
            } ${valid}`}
          />
        )}

        {isPasswordField && <EyeIcon onClick={passwordShowHandler} />}
      </div>

      <ErrorMessage name={field.name}>
        {(errorMessage) => {
          return (
            <div className='text-errorRed text-sm'>
              {t(`auth:${errorMessage}`)}.
            </div>
          )
        }}
      </ErrorMessage>
    </div>
  )
}

export default AuthInputField

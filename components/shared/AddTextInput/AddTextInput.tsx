import { useAddTextInput } from './useAddTextInput'
import { ErrorIcon, ValidIcon } from 'components'
import { AddTextInputProps } from './types.d'
import { ErrorMessage } from 'formik'

const AddTextInput: React.FC<AddTextInputProps> = (props) => {
  const { language, placeholder, page } = props

  const { field, isError, isValid, t } = useAddTextInput(props)

  return (
    <div className='flex flex-col gap-1 animate-fade-in'>
      <div className='flex flex-col gap-2 relative'>
        <input
          {...field}
          {...props}
          className={`bg-inputGray pl-3 pr-7 !outline-none text-inputBlack text-base font-Helvetica-Neue-Geo font-medium rounded w-[360px] border ${
            isError && 'border-errorRed'
          } ${isValid && 'border-green'} h-[38px] outline- none`}
          autoComplete='off'
          type='text'
          placeholder={t(`${page}:${placeholder}`)}
        />

        {isError && <ErrorIcon styles={`absolute  right-3 bottom-[11px]`} />}
        {isValid && <ValidIcon styles={`absolute right-3 bottom-[9px]`} />}
      </div>

      <ErrorMessage name={field.name}>
        {(errorMessage) => {
          return (
            <div className='text-errorRed text-sm animate-fade-in'>
              {t(`common:${errorMessage}`)}.
            </div>
          )
        }}
      </ErrorMessage>
    </div>
  )
}

export default AddTextInput

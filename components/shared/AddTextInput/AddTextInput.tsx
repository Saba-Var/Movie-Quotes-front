import { useAddTextInput } from './useAddTextInput'
import { ErrorIcon, ValidIcon } from 'components'
import { AddTextInputProps } from './types.d'
import { ErrorMessage } from 'formik'

const AddTextInput: React.FC<AddTextInputProps> = (props) => {
  const { language, placeholder, name } = props

  const { field, isError, isValid, t } = useAddTextInput(props)

  return (
    <div className='flex flex-col animate-fade-in h-11'>
      <div className='flex flex-col relative w-full'>
        <input
          {...field}
          {...props}
          className={`!bg-transparent border-gray-500 pl-3 pr-7 !outline-none text-white text-base 2xl:text-xl font-Helvetica-Neue-Geo font-medium rounded border ${
            isError && 'border-errorRed'
          } ${isValid && 'border-green'} h-10 2xl:h-[45px] outline-none `}
          autoComplete='off'
          type={name === 'budget' ? 'number' : 'text'}
          placeholder={placeholder}
        />

        {isError && (
          <ErrorIcon
            styles={`absolute right-16 bottom-[16px] ${
              name === 'budget' && 'right-6'
            }`}
          />
        )}

        {isValid && (
          <ValidIcon
            styles={`absolute right-16 bottom-[15px] ${
              name === 'budget' && 'right-6'
            }`}
          />
        )}

        {
          <p className='absolute cursor-default select-none right-3 bottom-[9px] text-medGray text-base 2xl:text-xl'>
            {language}
          </p>
        }
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

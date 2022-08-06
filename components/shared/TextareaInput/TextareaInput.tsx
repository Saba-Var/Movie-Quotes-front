import { useAddTextInput } from './useTextAreaInput'
import { ErrorIcon, ValidIcon } from 'components'
import { TextAreaInputProps } from './types.d'
import { ErrorMessage } from 'formik'

const TextAreaInput: React.FC<TextAreaInputProps> = (props) => {
  const { language, placeholder } = props

  const { field, isError, isValid, t } = useAddTextInput(props)

  return (
    <div className='flex flex-col animate-fade-in h-[58px]'>
      <div className='flex flex-col relative w-full'>
        <textarea
          {...field}
          {...props}
          className={`!bg-transparent placeholder-white border-gray-500 resize-none h-14 xl:h-[60px] pl-3 pr-7 !outline-none text-white 2xl:text-xl  text-base  font-Helvetica-Neue-Geo font-medium rounded border ${
            isError && 'border-errorRed'
          } ${isValid && 'border-green'} outline-none `}
          autoComplete='off'
          placeholder={placeholder}
        ></textarea>

        {isError && <ErrorIcon styles={`absolute right-16 top-[16px]`} />}
        {isValid && <ValidIcon styles={`absolute right-16 top-[15px]`} />}

        {
          <p className='absolute cursor-default select-none right-3 top-[9px] text-medGray text-base 2xl:text-xl'>
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

export default TextAreaInput

import { useChangeMovieTextInput } from './useChangeMovieTextInput'
import { ChangeMovieTextInputProps } from './types.d'
import { ErrorMessage } from 'formik'

const ChangeMovieTextInput: React.FC<ChangeMovieTextInputProps> = (props) => {
  const { name, placeholder, isDisabled } = props

  const { t, field } = useChangeMovieTextInput(props)

  return (
    <div className='flex flex-col animate-fade-in h-11'>
      <div className='flex flex-col relative w-full'>
        <input
          {...field}
          {...{ name }}
          type={name === 'budget' ? 'number' : 'text'}
          disabled={isDisabled ? true : false}
          placeholder={placeholder}
          autoComplete='off'
          className={`outline-none ${
            (name === 'movie_name_en' || name === 'movie_name_ge') &&
            'text-lightGold text-2xl font-Helvetica-Neue-Geo font-medium'
          } bg-transparent ${
            !isDisabled && 'border-gray-500 border px-4 py-2 rounded'
          }`}
        />
      </div>

      {!isDisabled && (
        <ErrorMessage name={field.name}>
          {(errorMessage) => {
            return (
              <div className='text-errorRed text-sm animate-fade-in'>
                {t(`common:${errorMessage}`)}.
              </div>
            )
          }}
        </ErrorMessage>
      )}
    </div>
  )
}

export default ChangeMovieTextInput

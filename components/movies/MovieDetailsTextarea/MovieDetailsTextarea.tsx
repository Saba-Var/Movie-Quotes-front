import { useMovieDetailsTextarea } from './useMovieDetailsTextarea'
import { MovieDetailsTextareaProps } from './types.d'
import { ErrorMessage } from 'formik'

const MovieDetailsTextarea: React.FC<MovieDetailsTextareaProps> = (props) => {
  const { placeholder, name, isDisabled } = props

  const { field, t } = useMovieDetailsTextarea(props)

  return (
    <div className='flex flex-col animate-fade-in h-[58px]'>
      <div className='flex flex-col relative w-full'>
        <textarea
          {...field}
          {...{ name }}
          disabled={isDisabled ? true : false}
          className={`text-inputGray resize-none h-[190px] outline-none rounded border border-gray-500 bg-transparent ${
            isDisabled && 'border-0'
          }`}
          placeholder={placeholder}
          autoComplete='off'
        ></textarea>
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

export default MovieDetailsTextarea

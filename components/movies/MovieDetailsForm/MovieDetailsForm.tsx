import { movieDetailsGeSchema, movieDetailsEnSchema } from 'schemas'
import { useMovieDetailsForm } from './useMovieDetailsForm'
import { MovieDetailsProps } from './types.d'
import { Form, Formik } from 'formik'

const MovieDetailsForm: React.FC<MovieDetailsProps> = (props) => {
  const { currentMovie } = props

  const { locale } = useMovieDetailsForm()

  return (
    <div className='bg-red-900 w-[358px] h-[302px] sm:w-[438px] sm:h-[382px] 3xl:h-[440px] xl:w-[42%]'>
      <Formik
        initialValues={
          locale === 'en' && currentMovie
            ? {
                movie_description_en: currentMovie?.movie_description_en,
                movie_name_en: currentMovie?.movie_name_en,
                director_en: currentMovie?.director_en,
                budget: currentMovie?.budget,
              }
            : {
                movie_description_ge: currentMovie?.movie_description_ge,
                movie_name_ge: currentMovie?.movie_name_ge,
                director_ge: currentMovie?.director_ge,
                budget: currentMovie?.budget,
              }
        }
        validationSchema={
          locale === 'en' ? movieDetailsEnSchema : movieDetailsGeSchema
        }
        onSubmit={() => {}}
      >
        {() => {
          return <Form></Form>
        }}
      </Formik>
    </div>
  )
}

export default MovieDetailsForm

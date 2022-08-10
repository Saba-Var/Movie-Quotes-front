import { movieDetailsGeSchema, movieDetailsEnSchema } from 'schemas'
import { useMovieInfo } from './useMovieInfo'
import { MovieDetailsProps } from './types'
import { Form, Formik } from 'formik'
import {
  ChangeMovieTextInput,
  MovieDetailsTextarea,
  GenresMultiSelect,
  EditOrDelete,
} from 'components'

const MovieInfo: React.FC<MovieDetailsProps> = (props) => {
  const { currentMovie } = props

  const {
    setGenreNotSelected,
    setSelectedOptions,
    genresNotSelected,
    defaultSelection,
    setDisableInputs,
    disableInputs,
    filmGenres,
    locale,
    t,
  } = useMovieInfo(currentMovie.film_genres)

  const {
    movie_description_en,
    movie_description_ge,
    movie_name_ge,
    movie_name_en,
    director_ge,
    director_en,
    budget,
  } = currentMovie

  return (
    <div className='w-[358px] sm:w-[438px] xl:w-[42%]'>
      <div className='h-[302px] sm:h-[382px] 3xl:h-[440px] flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <p className='text-lightGold animate-fade-in cursor-default font-Helvetica-Neue-Geo font-medium text-2xl'>
            {t('movies:movie-name')}
          </p>
          <div className='hidden xl:block animate-scale-up'>
            <EditOrDelete
              deleteHandler={() => {}}
              setDisabledInputs={setDisableInputs}
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          {currentMovie.film_genres.map((el: string) => {
            return (
              <div
                className='text-white animate-scale-up cursor-default text-sm rounded bg-medGray px-[7px] py-[4px]'
                key={el}
              >
                {t(`movies:${el}`)}
              </div>
            )
          })}
        </div>

        <div className='animate-fade-in flex items-center cursor-default gap-[10px]'>
          <p className='text-inputGray text-lg'>{t('movies:director')}:</p>
          <p className='text-white text-lg font-medium font-Helvetica-Neue-Geo'>
            {locale === 'en' ? director_en : director_ge}
          </p>
        </div>

        <div className='animate-fade-in flex items-center cursor-default gap-[10px]'>
          <p className='text-inputGray text-lg'>{t('movies:budget')}:</p>
          <p className='text-white  text-lg font-medium font-Helvetica-Neue-Geo'>
            {budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}$
          </p>
        </div>

        <p className='break-words animate-focus-in-text-expand cursor-default text-inputGray text-lg font-Helvetica-Neue-Geo'>
          {locale === 'en' ? movie_description_en : movie_description_ge}
        </p>
      </div>
    </div>
  )
}

export default MovieInfo

{
  /* <Formik
initialValues={
  locale === 'en'
    ? { movie_description_en, movie_name_en, director_en, budget }
    : { movie_description_ge, movie_name_ge, director_ge, budget }
}
validationSchema={
  locale === 'en' ? movieDetailsEnSchema : movieDetailsGeSchema
}
onSubmit={() => {}}
>
{(data) => {
  return (
    <Form>
      <div
        className={`flex flex-col gap-4 h-full ${
          disableInputs && 'gap-7'
        } h-[302px] sm:h-[382px] 3xl:h-[440px]`}
      >
        <div className='flex justify-between items-center'>
          <ChangeMovieTextInput
            name={locale === 'en' ? 'movie_name_en' : 'movie_name_ge'}
            placeholder={t('movies:movie-name')}
            isDisabled={disableInputs}
          />
          <div className='hidden xl:block'>
            <EditOrDelete
              deleteHandler={() => data.resetForm()}
              setDisabledInputs={setDisableInputs}
            />
          </div>
        </div>

        {!disableInputs && (
          <GenresMultiSelect
            setGenreNotSelected={setGenreNotSelected}
            setSelectedOptions={setSelectedOptions}
            genreNotSelected={genresNotSelected}
            defaultValue={defaultSelection}
            isDisabled={disableInputs}
            hasDefaultValues={true}
            filmGenres={filmGenres}
          />
        )}

        {disableInputs && currentMovie.film_genres && (
          <div className='flex flex-wrap gap-2'>
            {currentMovie.film_genres.map((el: string) => {
              return (
                <div
                  className='text-white text-sm rounded bg-medGray px-[7px] py-[4px]'
                  key={el}
                >
                  {t(`movies:${el}`)}
                </div>
              )
            })}
          </div>
        )}

        <ChangeMovieTextInput
          name={locale === 'en' ? 'director_en' : 'director_ge'}
          placeholder={t('movies:director')}
          isDisabled={disableInputs}
        />

        <ChangeMovieTextInput
          placeholder={t('movies:budget')}
          isDisabled={disableInputs}
          name='budget'
        />

        <MovieDetailsTextarea
          isDisabled={disableInputs}
          placeholder={t('movies:movie-description')}
          name={
            locale === 'en'
              ? 'movie_description_en'
              : 'movie_description_ge'
          }
        />

        <div className='xl:hidden flex justify-end mt-16'>
          <EditOrDelete
            setDisabledInputs={setDisableInputs}
            deleteHandler={() => data.resetForm()}
          />
        </div>
      </div>
    </Form>
  )
}}
</Formik> */
}

import { useMovieInfo } from './useMovieInfo'
import { MovieDetailsProps } from './types'
import {
  DeleteDialogWrapper,
  EditMovieInfo,
  EditOrDelete,
  ErrorAlert,
  Button,
} from 'components'

const MovieInfo: React.FC<MovieDetailsProps> = (props) => {
  const { currentMovie } = props

  const {
    movieDeleteHandler,
    setShowEditForm,
    setDeleteError,
    setDeleteModal,
    showEditForm,
    deleteError,
    deleteModal,
    locale,
    t,
  } = useMovieInfo()

  const {
    movieDescriptionEn,
    movieDescriptionGe,
    movieNameGe,
    movieNameEn,
    directorGe,
    directorEn,
    budget,
    _id,
  } = currentMovie

  return (
    <div className='w-[358px] sm:w-[438px] xl:w-[42%]'>
      {deleteModal && (
        <DeleteDialogWrapper
          setDeleteDialogWrapper={setDeleteModal}
          question={t('movies:delete-movie-question')}
          title={t('movies:delete-movie')}
        >
          <div className='flex justify-center gap-12 mt-12'>
            <Button
              onClick={() => setDeleteModal(false)}
              styles='bg-gray-400 1xl:!text-xl w-[100px]'
              title={t('common:no')}
              type='button'
            />

            <Button
              onClick={() => movieDeleteHandler(_id)}
              styles='bg-orange 1xl:!text-xl w-[100px]'
              title={t('common:yes')}
              type='button'
            />
          </div>
        </DeleteDialogWrapper>
      )}

      {deleteError && (
        <ErrorAlert
          styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
          setShowAlert={setDeleteError}
          title={t('movies:delete-failed')}
        />
      )}

      {showEditForm && (
        <EditMovieInfo
          setShowEditForm={setShowEditForm}
          currentMovie={currentMovie}
        />
      )}

      <div className='h-[302px] sm:h-[382px] 3xl:h-[440px] flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <p className='text-lightGold animate-fade-in cursor-default font-Helvetica-Neue-Geo font-medium text-2xl'>
            {locale === 'en' ? movieNameEn : movieNameGe}
          </p>
          <div className='hidden xl:block animate-scale-up'>
            <EditOrDelete
              setDeleteModal={setDeleteModal}
              setEditModal={setShowEditForm}
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          {currentMovie.movieGenres.map((el: string) => {
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
            {locale === 'en' ? directorEn : directorGe}
          </p>
        </div>

        <div className='animate-fade-in flex items-center cursor-default gap-[10px]'>
          <p className='text-inputGray text-lg'>{t('movies:budget')}:</p>
          <p className='text-white  text-lg font-medium font-Helvetica-Neue-Geo'>
            {budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}$
          </p>
        </div>

        <p className='break-words animate-focus-in-text-expand cursor-default text-inputGray text-lg font-Helvetica-Neue-Geo'>
          {locale === 'en' ? movieDescriptionEn : movieDescriptionGe}
        </p>

        <div className='xl:hidden animate-scale-up flex justify-between'>
          <div className='bg-orange'>Add quote</div>
          <EditOrDelete
            setDeleteModal={setDeleteModal}
            setEditModal={setShowEditForm}
          />
        </div>
      </div>
    </div>
  )
}

export default MovieInfo

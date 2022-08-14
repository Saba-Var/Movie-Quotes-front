import { useMovieMultiSelect } from './useMovieMultiSelect'
import { CameraReel, SelectorArrow } from 'components'
import { MovieMultiSelectProps } from './types.d'
import { useMovies } from 'hooks'
import Image from 'next/image'

const MovieMultiSelect: React.FC<MovieMultiSelectProps> = (props) => {
  const { setSelectedMovieId, movieIdError, setMovieIdError } = props

  const { t, isOpen, setIsOpen, selectedMovieName, setSelectedMovieName } =
    useMovieMultiSelect()

  const { movieList, locale } = useMovies()

  return (
    <div className='h-[86px] relative'>
      {isOpen && (
        <div>
          <div
            onClick={() => {
              setIsOpen(false)
            }}
            className='w-screen h-screen fixed top-0 left-0'
          ></div>

          <div
            className={`bg-black absolute h-[258px] bottom-[-268px] left-1/2 -translate-x-1/2 w-[80vw] 1xl:w-[38vw] lg:!w-[48vw] 3xl:!w-[45vw] z-[999] ${
              movieList.length <= 1 && '!h-[86px] !-bottom-24'
            } ${movieList.length === 2 && '!h-[172px] !bottom-[-184px]'} ${
              movieList.length > 3 && 'overflow-y-scroll'
            }`}
          >
            {movieList.length >= 1 &&
              movieList.map((movie) => {
                const imageSrc = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${movie.image}`

                return (
                  <div
                    onClick={() => {
                      setSelectedMovieId(movie._id)
                      if (locale === 'en') {
                        setSelectedMovieName(movie.movieNameEn)
                      } else {
                        setSelectedMovieName(movie.movieNameGe)
                      }
                      setMovieIdError(false)
                      setIsOpen(false)
                    }}
                    key={movie._id}
                    className='flex hover:bg-backgroundGray px-4 h-[86px] justify-between items-center cursor-pointer'
                  >
                    <p className='text-white text-2xl'>
                      {locale === 'en' ? movie.movieNameEn : movie.movieNameGe}
                    </p>

                    <Image
                      className='rounded-lg'
                      loader={() => imageSrc}
                      unoptimized={true}
                      height={'70px'}
                      width={'70px'}
                      src={imageSrc}
                      alt='user'
                    />
                  </div>
                )
              })}

            {movieList.length === 0 && (
              <p
                onClick={() => {
                  setIsOpen(false)
                }}
                className='text-white cursor-pointer pt-7 h-full text-center text-2xl'
              >
                add movie
              </p>
            )}
          </div>
        </div>
      )}

      <div
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        className={`cursor-pointer !z-[999999999] border-transparent border h-[86px] w-full bg-black justify-between rounded px-4 flex items-center ${
          movieIdError && '!border-errorRed'
        }`}
      >
        <div className='flex items-center gap-3 cursor-pointer'>
          <CameraReel />
          <p className='text-white font-Helvetica-Neue-Geo text-2xl'>
            {selectedMovieName
              ? selectedMovieName
              : t('news-feed:choose-movie')}
          </p>
        </div>

        <SelectorArrow isSelected={isOpen} />
      </div>

      {movieIdError && (
        <p className='text-errorRed font-medium text-sm animate-fade-in'>
          {t('common:required-field')}
        </p>
      )}
    </div>
  )
}

export default MovieMultiSelect

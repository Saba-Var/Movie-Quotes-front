import { useMovieDetails } from './useMovieDetails'
import { MovieInfo, QuoteList } from 'components'
import { MovieDetailsProps } from './types'
import Image from 'next/image'

const MovieDetails: React.FC<MovieDetailsProps> = (props) => {
  const { movieList } = props

  const { currentMovie, imageSrc, t, addQuoteModal, setAddQuoteModal } =
    useMovieDetails(movieList)

  return (
    <>
      {currentMovie && (
        <div className='mt-10 1xl:mt-5'>
          <p className='text-white animate-fade-in text-start font-Helvetica-Neue-Geo font-medium text-2xl hidden xl:block mb-8'>
            {t('movies:movie-description')}
          </p>
          <div className='text-white flex flex-col items-center xl:items-start gap-8'>
            <div className='flex flex-col gap-6 xl:gap-0 xl:flex-row items-center xl:justify-between w-full'>
              <div className='hover:scale-[1.03] transition-transform relative w-[358px] h-[302px] sm:w-[438px] sm:h-[382px] xl:w-[55%] 3xl:h-[440px]'>
                <Image
                  className='animate-fold-out rounded-xl'
                  loader={() => imageSrc}
                  unoptimized={true}
                  src={imageSrc}
                  layout='fill'
                  alt='movie'
                  priority
                />
              </div>

              <MovieInfo
                setAddQuoteModal={setAddQuoteModal}
                currentMovie={currentMovie}
              />
            </div>

            <QuoteList
              setAddQuoteModal={setAddQuoteModal}
              addQuoteModal={addQuoteModal}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default MovieDetails

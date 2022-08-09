import { useMovieDetails } from './useMovieDetails'
import { MovieDetailsProps } from './types.d'
import { MovieDetailsForm } from 'components'
import Image from 'next/image'

const MovieDetails: React.FC<MovieDetailsProps> = (props) => {
  const { movieList } = props

  const { currentMovie, imageSrc, t } = useMovieDetails(movieList)

  return (
    <div className='mt-10 1xl:mt-5'>
      <p className='text-white text-start font-Helvetica-Neue-Geo font-medium text-2xl hidden xl:block mb-8'>
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

          <MovieDetailsForm currentMovie={currentMovie} />
        </div>

        <p className='bg-blue w-[358px] text-3xl flex justify-center items-center h-[302px] sm:w-[438px] sm:h-[382px] xl:w-[55%] 3xl:h-[440px]'>
          Quotes will be added soon
        </p>
      </div>
    </div>
  )
}

export default MovieDetails

import { useDefaultMovieInfo } from './useDefaultMovieInfo'
import Image from 'next/image'

const DefaultMovieInfo = () => {
  const { movieName, directorName, imageSrc, t, movieGenres, image } =
    useDefaultMovieInfo()

  return (
    <div className='bg-black rounded-[4px] py-4 px-3 xl:px-0 xl:bg-transparent items-center flex gap-[5%]'>
      <div className='hover:scale-[1.03] transition-transform relative w-[102px] h-[75px] sm:w-[290px] sm:h-[158px] 1xl:w-[102px] 1xl:h-[75px] xl:!w-[290px] xl:!h-[158px]'>
        {image && (
          <Image
            className='animate-fold-out round ed-xl rounded-[10px]'
            loader={() => imageSrc}
            unoptimized={true}
            src={imageSrc}
            layout='fill'
            alt='movie'
            priority
          />
        )}
      </div>

      <div className='flex flex-col gap-1 xl:gap-4'>
        <p className='text-white animate-fade-in xl:text-lightGold xl:font-medium text-base sm:text-2xl 1xl:text-base xl:!text-2xl'>
          {movieName && movieName.length > 30
            ? movieName?.slice(0, 30) + '...'
            : movieName}
        </p>

        <div className='hidden xl:flex xl:flex-row gap-2 flex-wrap'>
          {movieGenres &&
            movieGenres.map((genre) => {
              return (
                <div
                  className='bg-medGray animate-scale-up font-medium h-[30px] flex px-[10px] justify-center items-center rounded-[4px]'
                  key={genre}
                >
                  {t(`movies:${genre}`)}
                </div>
              )
            })}
        </div>

        <p className='text-white animate-fade-in text-base font-medium sm:text-2xl 1xl:text-base xl:!text-2xl'>
          <span className='text-inputGray animate-fade-in sm:text-2xl 1xl:text-base text-base xl:!text-2xl font-Helvetica-Neue-Geo font-bold'>
            {t('movies:director')}:
          </span>{' '}
          {directorName && directorName.length > 22
            ? directorName?.slice(0, 22) + '...'
            : directorName}
        </p>
      </div>
    </div>
  )
}

export default DefaultMovieInfo

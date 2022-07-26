import { FilmCoverProps } from 'components'

const FilmCover: React.FC<FilmCoverProps> = (props) => {
  const { src, info, quote } = props

  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
      }}
      className={`w-screen h-[950px] lg:h-[1200px] bg-no-repeat bg-center bg-cover bg-fixed relative`}
    >
      <div className='h-[950px] lg:h-[1200px] w-full gradient absolute top-0 md:opacity-50 left-0 lg:opacity-0'></div>
      <div className='absolute left-9 top-1/2 -translate-y-1/2 flex gap-2 hover:scale-105 transition-transform'>
        <div className='text-white animate-fade-in'>──</div>
        <div className='flex flex-col gap-3  '>
          <p className='text-white font-bold font-Montserrat animate-fade-in text-xl md:text-3xl lg:text-4xl xl:text-5xl !leading-[150%] w-[370px] lg:w-[650px] md:w-[550px] xl:w-[790px]'>
            “{quote}”
          </p>
          <p className='text-lightGray text-base md:text-2xl lg:text-3xl font-bold animate-fade-in'>
            {info}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FilmCover

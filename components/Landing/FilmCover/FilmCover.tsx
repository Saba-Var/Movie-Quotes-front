import { FilmCoverProps } from 'components'

const FilmCover: React.FC<FilmCoverProps> = (props) => {
  const { src, isAttached, info, quote } = props

  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
      }}
      className={`w-screen h-[1200px] bg-no-repeat bg-center bg-cover ${
        isAttached && 'bg-fixed'
      } relative`}
    >
      <div className='absolute left-9 top-1/2 -translate-y-1/2 flex gap-2'>
        <div className='text-white'>──</div>
        <div className='flex flex-col gap-3'>
          <p className='text-white font-Montserrat text-xl leading-[150%] w-72'>
            “{quote}”
          </p>
          <p className='text-white'>{info}</p>
        </div>
      </div>
    </div>
  )
}

export default FilmCover

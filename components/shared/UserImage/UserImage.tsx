import { UserImageProps } from './types.d'
import Image from 'next/image'

const UserImage: React.FC<UserImageProps> = (props) => {
  const { image, name, imageStyles } = props

  return (
    <div className='flex items-center gap-4'>
      {image && (
        <div
          className={`w-10 h-10 relative lg:w-[60px] lg:h-[60px] ${imageStyles}`}
        >
          <Image
            className='rounded-full select-none'
            loader={() => `${process.env.NEXT_PUBLIC_API_BASE_URI}/${image}`}
            unoptimized={true}
            alt='quote image'
            src={`${process.env.NEXT_PUBLIC_API_BASE_URI}/${image}`}
            layout='fill'
            priority
          />
        </div>
      )}

      {!image && (
        <div className='bg-green w-10 h-10 lg:w-[60px] lg:h-[60px] flex justify-center items-center rounded-full'>
          <p className='text-3xl pb-2'>{name[0]}</p>
        </div>
      )}

      <p className='text-white text-xl cursor-default'>{name}</p>
    </div>
  )
}

export default UserImage

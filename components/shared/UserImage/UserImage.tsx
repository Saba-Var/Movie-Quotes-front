import { UserImageProps } from './types.d'
import Image from 'next/image'

const UserImage: React.FC<UserImageProps> = (props) => {
  const { image, name, imageStyles, notificationImage, newNotification } = props

  return (
    <div className='flex items-center gap-4'>
      {image && (
        <div
          className={`w-10 h-10 ${
            newNotification && 'border-[2px] rounded-full border-green'
          } relative lg:w-[60px] lg:h-[60px] ${imageStyles}`}
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

      {!image && name && (
        <div
          className={`bg-slate-600 w-10 h-10 lg:w-[60px] lg:h-[60px] flex justify-center items-center rounded-full ${
            newNotification && 'border-[2px] !border-green'
          }`}
        >
          <p className='text-xl select-none pb-1 lg:text-3xl lg:pb-2 text-white'>
            {name[0]}
          </p>
        </div>
      )}

      {!notificationImage && (
        <p className='text-white text-xl font-Helvetica-Neue-Geo'>{name}</p>
      )}
    </div>
  )
}

export default UserImage

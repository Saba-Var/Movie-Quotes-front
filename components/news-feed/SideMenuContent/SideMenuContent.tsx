import { useNewsFeed } from 'hooks'
import Image from 'next/image'

const SideMenuContent = () => {
  const { userData } = useNewsFeed()

  const src = `${process.env.NEXT_PUBLIC_API_BASE_URI}/${userData.image}`

  return (
    <>
      {!userData.image && <div className='text-white'>{userData.name[0]}</div>}
      {userData.image && (
        <div>
          <Image
            className='rounded-full'
            unoptimized={true}
            loader={() => src}
            height={'100px'}
            width={'100px'}
            alt='user'
            src={src}
          />
        </div>
      )}
      <div>{userData.name}</div>
    </>
  )
}

export default SideMenuContent

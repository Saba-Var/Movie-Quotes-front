import { useNewsFeed } from 'hooks'
import Image from 'next/image'

const SideMenuContent = () => {
  const { userData, t, imageSrc, navigate } = useNewsFeed()

  return (
    <div>
      <div className='flex gap-5 1xl:gap-6 items-center mb-10'>
        {!userData.image && (
          <div className='text-white'>{userData.name[0]}</div>
        )}
        {userData.image && (
          <Image
            className='rounded-full'
            unoptimized={true}
            loader={() => imageSrc}
            height={'60px'}
            width={'60px'}
            src={imageSrc}
            alt='user'
          />
        )}
        <div className='flex flex-col'>
          <div className='text-white font-Helvetica-Neue-Geo font-medium text-xl 1xl:text-base'>
            {userData.name}
          </div>
          <div className='text-inputGray text-sm cursor-pointer'>
            {t('side-menu:edit-profile')}
          </div>
        </div>
      </div>

      <div onClick={() => navigate('news-feed')} className='cursor-pointer'>
        <p className='text-white mb-10'>{t('side-menu:news-feed')}</p>
      </div>

      <div onClick={() => navigate('profile')} className='cursor-pointer'>
        <p className='text-white'>{t('side-menu:movies-list')}</p>
      </div>
    </div>
  )
}

export default SideMenuContent

import { useSideMenuContent } from './useSideMenuContent'
import { HomeIcon, CameraIcon } from 'components'
import { SideMenuProps } from './types.d'
import { useNewsFeed } from 'hooks'
import Image from 'next/image'

const SideMenuContent: React.FC<SideMenuProps> = (props) => {
  const { setCloseMenu, setShowSideMenu } = props
  const { userData, t, imageSrc } = useNewsFeed()

  const { closeHandler, page } = useSideMenuContent(
    setShowSideMenu,
    setCloseMenu
  )

  return (
    <div>
      <div className='flex gap-5 1xl:gap-6 items-center mb-10 h-[60px]'>
        {!userData.image && (
          <p
            className={`text-white cursor-default h-[60px] w-[60px] bg-green rounded-full flex justify-center items-center text-3xl pb-1 ${
              page.includes('profile') && 'border rounded-full border-orange'
            }`}
          >
            {userData.name && String(userData.name[0]).toUpperCase()}
          </p>
        )}
        {userData.image && (
          <div
            className={`h-[60px] w-[60px] ${
              page.includes('profile') && 'border rounded-full border-orange'
            }`}
          >
            <Image
              className='rounded-full'
              loader={() => imageSrc}
              unoptimized={true}
              height={'60px'}
              width={'60px'}
              src={imageSrc}
              alt='user'
            />
          </div>
        )}
        <div className='flex flex-col'>
          <div className='text-white cursor-default font-Helvetica-Neue-Geo font-medium text-xl 1xl:text-base'>
            {userData.name}
          </div>
          <div
            onClick={() => closeHandler('profile')}
            className='text-inputGray text-sm cursor-pointer'
          >
            {t('side-menu:edit-profile')}
          </div>
        </div>
      </div>

      <div className='pl-3'>
        <div
          onClick={() => closeHandler('news-feed')}
          className='cursor-pointer flex gap-12'
        >
          <HomeIcon isSelected={page.includes('news-feed')} />
          <p className='text-white font-Helvetica-Neue-Geo font-medium text-xl mb-10'>
            {t('side-menu:news-feed')}
          </p>
        </div>

        <div
          onClick={() => closeHandler('movies')}
          className='cursor-pointer flex gap-12'
        >
          <CameraIcon isSelected={page.includes('movies')} />
          <p className='text-white font-Helvetica-Neue-Geo font-medium text-xl'>
            {t('side-menu:movies-list')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SideMenuContent

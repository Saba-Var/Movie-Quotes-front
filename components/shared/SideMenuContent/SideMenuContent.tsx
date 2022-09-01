import { useSideMenuContent } from './useSideMenuContent'
import { HomeIcon, CameraIcon } from 'components'
import { SideMenuProps } from './types'
import Image from 'next/image'

const SideMenuContent: React.FC<SideMenuProps> = (props) => {
  const { setCloseMenu, setShowSideMenu } = props

  const { closeHandler, page, imageSrc, t, userData } = useSideMenuContent(
    setShowSideMenu,
    setCloseMenu
  )

  return (
    <div>
      <div className='flex gap-5 1xl:gap-6 items-center mb-10 h-[60px]'>
        {!userData.image && (
          <p
            className={`text-white animate-fold-out cursor-default h-[60px] w-[60px] bg-slate-600 rounded-full flex justify-center items-center text-3xl pb-1 ${
              page.includes('profile') && 'border rounded-full border-orange'
            }`}
          >
            {userData.name && String(userData.name[0]).toUpperCase()}
          </p>
        )}

        {userData.image && (
          <div
            className={`h-[52px] w-[60px] ${
              page.includes('profile') && 'border rounded-full border-orange'
            } select-none relative`}
          >
            <Image
              className='rounded-full animate-fold-out select-none'
              loader={() => imageSrc}
              unoptimized={true}
              src={imageSrc}
              layout='fill'
              alt='user'
              priority
            />
          </div>
        )}

        <div className='flex flex-col'>
          <div className='text-white cursor-default font-Helvetica-Neue-Geo font-medium text-xl 1xl:text-2xl animate-focus-in-text-expand'>
            {userData.name}
          </div>
          <div
            onClick={() => {
              closeHandler('profile')
            }}
            className='text-inputGray animate-focus-in-text-expand text-sm cursor-pointer hover:scale-105 transition-transform'
          >
            {t('side-menu:edit-profile')}
          </div>
        </div>
      </div>

      <div className='pl-3 flex flex-col gap-10 animate-focus-in-text-expand'>
        <div
          onClick={() => {
            closeHandler('news-feed')
          }}
          className='cursor-pointer flex gap-12 hover:scale-105 transition-transform'
        >
          <HomeIcon isSelected={page.includes('news-feed')} />
          <p className='text-white font-Helvetica-Neue-Geo font-medium text-xl'>
            {t('side-menu:news-feed')}
          </p>
        </div>

        <div
          onClick={() => {
            closeHandler('movies')
          }}
          className='cursor-pointer flex gap-12 hover:scale-105 transition-transform'
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

import { HeaderProps } from './types.d'
import { logOutHandler } from 'helpers'
import { useHeader } from './useHeader'
import Link from 'next/link'
import {
  NotificationIcon,
  MobileSearchBar,
  SelectorArrow,
  Notifications,
  SearchIcon,
  MenuIcon,
  Button,
} from 'components'

const Header: React.FC<HeaderProps> = (props) => {
  const {
    setNewNotificationCount,
    setRegistrationModal,
    newNotificationCount,
    setShowNotifications,
    setMobileSearchMode,
    showNotifications,
    mobileSearchMode,
    setShowSideMenu,
    setShowLogIn,
    showSideMenu,
    page,
  } = props

  const {
    languageChangeHandler,
    setShowSelector,
    showSelector,
    language,
    hrefData,
    session,
    router,
    t,
  } = useHeader()

  return (
    <div
      className={`py-5 px-9 fixed !w-screen z-[9998] ${
        page === 'news-feed'
          ? 'bg-backgroundGray !pt-8 1xl:!pt-6'
          : 'bg-background'
      } h-[86px]`}
    >
      {showSelector && (
        <div
          onClick={() => setShowSelector(false)}
          className='fixed top-0 left-0 w-full h-full'
        ></div>
      )}

      <div className='flex justify-between items-center'>
        <p
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          className={`text-lightGold animate-fade-in cursor-pointer text-base font-Helvetica-Neue ${
            page === 'news-feed' && 'hidden 1xl:block'
          }`}
        >
          MOVIE QUOTES
        </p>

        {page === 'news-feed' && (
          <div
            onClick={() => {
              showNotifications && setShowNotifications!(false)
              setShowSideMenu && setShowSideMenu(!showSideMenu)
            }}
          >
            <MenuIcon />
          </div>
        )}

        <div className='flex gap-4 items-center'>
          {page === 'news-feed' && (
            <>
              {hrefData.toString().includes('news-feed') && (
                <>
                  <div
                    onClick={() => {
                      showNotifications && setShowNotifications!(false)
                      setMobileSearchMode && setMobileSearchMode(true)
                    }}
                  >
                    <SearchIcon />
                  </div>

                  {mobileSearchMode && (
                    <MobileSearchBar
                      setMobileSearchMode={setMobileSearchMode!}
                    />
                  )}
                </>
              )}

              {showNotifications && (
                <>
                  <div
                    onClick={() => {
                      setShowNotifications!(false)
                    }}
                    className='z-[99999] bg-formModalBlue hidden 1xl:block animate-fade-in !opacity-30 fixed top-0 left-0 w-screen h-screen'
                  ></div>

                  <Notifications
                    setNewNotificationCount={setNewNotificationCount!}
                  />
                </>
              )}

              <div
                onClick={() => {
                  setShowNotifications!(!showNotifications)
                }}
              >
                <div>
                  <div className='relative cursor-pointer'>
                    <NotificationIcon />

                    {typeof newNotificationCount === 'number' &&
                      newNotificationCount > 0 && (
                        <div className='bg-medRed flex justify-center items-center -top-[8px] left-[11px] absolute rounded-full h-[23px] w-[23px]'>
                          <p className='text-white text-base select-none'>
                            {newNotificationCount}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className='hidden 1xl:block relative z-[9999] mr-5'>
            <div
              className='flex justify-center items-center gap-2 cursor-pointer '
              onClick={() => setShowSelector(!showSelector)}
            >
              <p className='text-base text-white cursor-pointer select-none'>
                {language === 'Eng' ? 'Eng' : 'ქარ'}
              </p>
              <SelectorArrow isSelected={showSelector} />
            </div>

            {showSelector && (
              <div
                className={`absolute animate-dropdown border bg-background border-white py-3 rounded-md gap-1 flex flex-col w-28 justify-center -left-5 top-7 items-center ${
                  language === 'Eng' && '-left-10'
                }`}
              >
                <Link href={hrefData} scroll={false} locale='en' rel='preload'>
                  <a
                    onClick={() => languageChangeHandler(t('common:Eng'))}
                    className='text-base text-white hover:scale-110 transition-transform'
                  >
                    English
                  </a>
                </Link>

                <Link href={hrefData} scroll={false} rel='preload' locale='ge'>
                  <a
                    onClick={() => languageChangeHandler(t('common:Geo'))}
                    className='text-base text-white hover:scale-110 transition-transform'
                  >
                    ქართული
                  </a>
                </Link>
              </div>
            )}
          </div>

          {page === 'home' && (
            <>
              <Button
                onClick={() =>
                  setRegistrationModal && setRegistrationModal(true)
                }
                styles='bg-orange hidden 1xl:block'
                title={t('common:SignUp')}
                type='button'
              />

              <Button
                onClick={() => setShowLogIn && setShowLogIn(true)}
                styles='border border-white'
                title={t('common:Log-in')}
                type='button'
              />
            </>
          )}
          <div className='hidden'></div>

          {page !== 'home' && (
            <Button
              styles='hidden 1xl:block border border-white select-none'
              onClick={() => logOutHandler(session, router)}
              title={t('common:Log-out')}
              type='button'
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Header

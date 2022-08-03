import { HeaderProps } from './types.d'
import { useHeader } from './useHeader'
import Link from 'next/link'
import {
  NotificationIcon,
  SelectorArrow,
  SearchIcon,
  MenuIcon,
  Button,
} from 'components'

const Header: React.FC<HeaderProps> = (props) => {
  const { page, setRegistrationModal, setShowLogIn } = props

  const {
    languageChangeHandler,
    setShowSelector,
    logOutHandler,
    showSelector,
    language,
    router,
    t,
  } = useHeader()

  return (
    <div
      className={`py-5 px-9 fixed w-screen z-[99] ${
        page === 'news-feed'
          ? 'bg-backgroundGray !pt-8 md:!pt-6'
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
          className={`text-lightGold cursor-pointer animate-fade-in text-base font-Helvetica-Neue ${
            page === 'news-feed' && 'hidden md:block'
          }`}
        >
          MOVIE QUOTES
        </p>

        {page === 'news-feed' && <MenuIcon />}

        <div className='flex gap-4 items-center'>
          {page === 'news-feed' && (
            <>
              <NotificationIcon />
              <SearchIcon />
            </>
          )}

          <div className='hidden md:block relative z-[9999] mr-5'>
            <div
              className='flex justify-center animate-fade-in items-center gap-2 cursor-pointer '
              onClick={() => setShowSelector(!showSelector)}
            >
              <p className='text-base text-white cursor-pointer select-none'>
                {language}
              </p>
              <SelectorArrow isSelected={showSelector} />
            </div>

            {showSelector && (
              <div
                className={`absolute animate-dropdown border bg-background border-white py-3 rounded-md gap-1 flex flex-col w-28 justify-center -left-5 top-7 items-center ${
                  language === 'Eng' && '-left-10'
                }`}
              >
                <Link scroll={false} href={router.pathname} locale={'en'}>
                  <a
                    onClick={() => languageChangeHandler(t('common:Eng'))}
                    className='text-base text-white hover:scale-110 transition-transform'
                  >
                    {t('common:English')}
                  </a>
                </Link>

                <Link scroll={false} href={router.pathname} locale={'ge'}>
                  <a
                    onClick={() => languageChangeHandler(t('common:Geo'))}
                    className='text-base text-white hover:scale-110 transition-transform'
                  >
                    {t('common:Georgian')}
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
                styles='bg-orange hidden md:block'
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
              onClick={() => logOutHandler()}
              styles='hidden md:block border border-white'
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

import { Button, SelectorArrow } from 'components'
import { HeaderProps } from './types.d'
import { useHeader } from './useHeader'
import Link from 'next/link'

const Header: React.FC<HeaderProps> = (props) => {
  const { page } = props

  const { t, showSelector, language, languageChangeHandler, setShowSelector } =
    useHeader()

  return (
    <div className='bg-background py-5 px-9 fixed w-screen z-[99]'>
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
          className='text-lightGold cursor-pointer animate-fade-in text-base font-Helvetica-Neue'
        >
          MOVIE QUOTES
        </p>

        <div className='flex gap-4 items-center'>
          <div className='hidden md:block relative z-[9999] mr-5'>
            <div
              className='flex justify-center animate-fade-in items-center gap-2 cursor-pointer '
              onClick={() => setShowSelector(!showSelector)}
            >
              <p className='text-base text-white cursor-pointer'>{language}</p>
              <SelectorArrow isSelected={showSelector} />
            </div>

            {showSelector && (
              <div
                className={`absolute border bg-background border-white py-3 rounded-md gap-1 flex flex-col w-28 justify-center -left-5 top-7 items-center ${
                  language === 'Eng' && '-left-10'
                }`}
              >
                <Link scroll={false} href={'/'} locale={'en'}>
                  <a
                    onClick={() => languageChangeHandler(t('common:Eng'))}
                    className='text-base text-white hover:scale-110 transition-transform'
                  >
                    {t('common:English')}
                  </a>
                </Link>

                <Link scroll={false} href={'/'} locale={'ge'}>
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
                styles='bg-orange hidden md:block'
                title={t('common:SignUp')}
              />
              <Button styles='border border-white' title={t('common:Log-in')} />
            </>
          )}

          {page !== 'home' && (
            <Button styles='border border-white' title={t('common:Log-out')} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Header

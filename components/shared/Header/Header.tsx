import { HeaderProps, SelectorArrow } from 'components'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Header: React.FC<HeaderProps> = (props) => {
  const { page } = props
  const locale = useRouter().locale

  const [showSelector, setShowSelector] = useState(false)
  const [language, setLanguage] = useState('')

  const { t } = useTranslation()

  const languageChangeHandler = (lan: string) => {
    setShowSelector(false)
    setLanguage(lan)
  }

  useEffect(() => {
    if (locale === 'en') {
      return setLanguage(t('common:Eng'))
    }
    setLanguage(t('common:Geo'))
  }, [locale, t])

  return (
    <div className='bg-background py-8 px-9'>
      {showSelector && (
        <div
          onClick={() => setShowSelector(false)}
          className='fixed top-0 left-0 w-full h-full'
        ></div>
      )}

      <div className='flex justify-between items-center'>
        <p className='text-lightGold text-base font-Helvetica-Neue'>
          MOVIE QUOTES
        </p>

        <div className='flex gap-4 items-center'>
          <div className='hidden md:block relative z-[9999] mr-5'>
            <div
              className='flex justify-center items-center gap-2'
              onClick={() => setShowSelector(!showSelector)}
            >
              <p className='text-base text-white cursor-pointer'>{language}</p>
              <SelectorArrow isSelected={showSelector} />
            </div>

            {showSelector && (
              <div
                className={`absolute border border-white py-3 rounded-md gap-1 flex flex-col w-28 justify-center -left-5 top-7 items-center ${
                  language === 'Eng' && '-left-5 !w-16 !py-3'
                }`}
              >
                <Link href={'/'} locale={'en'}>
                  <a
                    onClick={() => languageChangeHandler(t('common:Eng'))}
                    className='text-base text-white'
                  >
                    {t('common:Eng')}
                  </a>
                </Link>

                <Link href={'/'} locale={'ge'}>
                  <a
                    onClick={() => languageChangeHandler(t('common:Geo'))}
                    className='text-base text-white'
                  >
                    {t('common:Geo')}
                  </a>
                </Link>
              </div>
            )}
          </div>

          {page === 'home' && (
            <>
              {' '}
              <button className='bg-orange hidden md:block  text-white text-base px-6 py-2 rounded-md'>
                {t('common:SignUp')}
              </button>
              <button className='text-white text-base px-6 py-2 border rounded-md border-white'>
                {t('common:Log-in')}
              </button>
            </>
          )}

          {page !== 'home' && (
            <button className='text-white text-base px-6 py-2 border rounded-md border-white'>
              {t('common:Log-out')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header

import { interstellar, lord, tenenbaums } from 'public/assets/images/'
import { Button, FilmCover } from 'components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

function FilmList() {
  const { t } = useTranslation()
  const locale = useRouter().locale

  return (
    <div className='flex flex-col overflow-x-hidden'>
      <div className='bg-background w-full h-[75vh]'>
        <div className='flex flex-col gap-8 pt-28 md:pt-32 lg:pt-[14%]'>
          <div className='flex justify-center'>
            <p
              className={`text-lightGold !leading-[150%] w-72 md:w-[450px] lg:w-[700px] text-center text-2xl font-Montserrat md:text-4xl lg:text-6xl ${
                locale === 'ge' && 'text-xl md:text-3xl lg:text-5xl'
              }`}
            >
              {t('landing:find-quote')}
            </p>
          </div>
          <Button
            styles='bg-orange px-4 block mx-auto !text-xl'
            title={t('landing:start')}
          />
        </div>
      </div>

      <div>
        <FilmCover
          info={`${t('landing:interstellar')}, 2014`}
          quote={t('landing:interstellar-quote')}
          src={interstellar.src}
        />

        <FilmCover
          info={`${t('landing:the-royal-tenenbaums')}, 2001`}
          quote={t('landing:the-royal-tenenbaums-quote')}
          src={tenenbaums.src}
          isAttached={true}
        />

        <FilmCover
          info={`${t('landing:the-lord-of-the-rings')}, 2003`}
          quote={t('landing:the-lord-of-the-rings-quote')}
          isAttached={true}
          src={lord.src}
        />
      </div>
      <footer className='bg-background text-lightGold pl-8 h-12 text-xs font-Helvetica-Neue flex items-center'>
        © 2022 movie quotes. All rights reserved.
      </footer>
    </div>
  )
}

export default FilmList

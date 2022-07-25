import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Button } from 'components'

function FilmList() {
  const { t } = useTranslation()
  const locale = useRouter().locale

  return (
    <div className='bg-background w-full h-[60vh]'>
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
          title={t('landing:start')}
          styles='bg-orange px-4 block mx-auto'
        />
      </div>
    </div>
  )
}

export default FilmList

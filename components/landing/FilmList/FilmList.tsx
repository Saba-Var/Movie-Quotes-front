import { interstellar, lord, tenenbaums } from 'public'
import { Button, FilmCover } from 'components'
import { useFilmList } from './useFilmList'
import { FilmListProps } from './types'

const FilmList: React.FC<FilmListProps> = (props) => {
  const { setRegistrationModal } = props

  const { t, locale } = useFilmList()

  return (
    <div className='flex flex-col overflow-x-hidden'>
      <div className='bg-background w-full h-screen'>
        <div className='flex flex-col gap-8 pt-72 lg:pt-[20%]'>
          <div className='flex justify-center'>
            <p
              className={`text-lightGold cursor-default animate-fade-in hover:scale-105 transition-transform !leading-[150%] w-72 md:w-[450px] lg:w-[720px] text-center text-2xl font-Montserrat font-bold md:text-4xl lg:text-6xl ${
                locale === 'ge' &&
                'w-96 text-xl md:w-[600px] md:text-3xl lg:text-5xl'
              }`}
            >
              {t('landing:find-quote')}
            </p>
          </div>
          <Button
            onClick={() => setRegistrationModal(true)}
            styles='bg-orange px-4 block mx-auto !text-xl'
            title={t('landing:start')}
            type='button'
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
        />

        <FilmCover
          info={`${t('landing:the-lord-of-the-rings')}, 2003`}
          quote={t('landing:the-lord-of-the-rings-quote')}
          positionRight={true}
          src={lord.src}
        />
      </div>
      <footer className='bg-background text-lightGold pl-8 h-12 text-xs font-medium font-Helvetica-Neue flex items-center'>
        © 2022 movie quotes. {t('landing:rights')}
      </footer>
    </div>
  )
}

export default FilmList

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Header, FilmList, RegistrationModal } from 'components'
import type { GetStaticProps } from 'next'
import { useLanding } from 'hooks'

const Home = () => {
  const { setRegistrationModal, showRegistrationModal } = useLanding()

  return (
    <div className='overflow-x-hidden'>
      {showRegistrationModal && (
        <RegistrationModal setRegistrationModal={setRegistrationModal} />
      )}

      <div className={`${showRegistrationModal && 'blur-[6px]'}`}>
        <Header setRegistrationModal={setRegistrationModal} page='home' />
        <FilmList setRegistrationModal={setRegistrationModal} />
      </div>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'landing',
        'registration',
      ])),
    },
  }
}

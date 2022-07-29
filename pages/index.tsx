import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Header, FilmList, RegistrationModal, Popup } from 'components'
import type { GetStaticProps } from 'next'
import { useLanding } from 'hooks'

const Home = () => {
  const {
    showRegistrationModal,
    setRegistrationModal,
    setShowPopupModal,
    showPopupModal,
  } = useLanding()

  return (
    <div className='overflow-x-hidden'>
      {showRegistrationModal && (
        <RegistrationModal
          setShowPopupModal={setShowPopupModal}
          setRegistrationModal={setRegistrationModal}
        />
      )}

      {showPopupModal && (
        <Popup type='activate' setShowPopupModal={setShowPopupModal} />
      )}

      <div
        className={`${
          (showRegistrationModal || showPopupModal) && 'blur-[6px]'
        }`}
      >
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

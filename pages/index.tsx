import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useLanding } from 'hooks'
import {
  RegistrationModal,
  ErrorAlert,
  EmailForm,
  FilmList,
  Header,
  LogIn,
  Popup,
} from 'components'

const Home = () => {
  const {
    showRegistrationModal,
    setShowActivatedModal,
    setRegistrationModal,
    showActivatedModal,
    setShowPopupModal,
    setActivationFail,
    showPopupModal,
    activationFail,
    setShowLogIn,
    setEmailForm,
    showLogIn,
    emailForm,
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

      {showActivatedModal && (
        <Popup type='verified' setShowPopupModal={setShowActivatedModal} />
      )}

      {activationFail && (
        <ErrorAlert
          styles='left-[50%] !-translate-x-1/2'
          setShowAlert={setActivationFail}
          title='account-activation-fail'
        />
      )}

      {showLogIn && (
        <LogIn setEmailForm={setEmailForm} setShowLogIn={setShowLogIn} />
      )}

      {emailForm && (
        <EmailForm setShowLogIn={setShowLogIn} setModal={setEmailForm} />
      )}

      <div
        className={`${
          (showRegistrationModal || showPopupModal) && 'blur-[6px]'
        }`}
      >
        <Header
          setRegistrationModal={setRegistrationModal}
          setShowLogIn={setShowLogIn}
          page='home'
        />
        <FilmList setRegistrationModal={setRegistrationModal} />
      </div>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'landing', 'auth'])),
    },
  }
}

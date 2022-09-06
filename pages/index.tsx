import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useLanding } from 'hooks'
import Head from 'next/head'
import {
  ChangePasswordForm,
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
      <Head>
        <title>Home</title>
        <meta
          content='initial-scale=1.0, width=device-width'
          name='viewport'
          key='Home'
        />
      </Head>

      {showRegistrationModal && (
        <RegistrationModal
          setRegistrationModal={setRegistrationModal}
          setShowPopupModal={setShowPopupModal}
          setShowLogIn={setShowLogIn}
        />
      )}

      {showPopupModal && (
        <Popup
          setShowPopupModal={setShowPopupModal}
          buttonTitle='open-email'
          info='check-email'
          type='activate'
          title='thank'
        />
      )}

      {showActivatedModal && (
        <Popup
          setShowPopupModal={setShowActivatedModal}
          buttonTitle='open-news-feed'
          info='account-activated'
          type='verified'
          title='thank'
        />
      )}

      {activationFail && (
        <ErrorAlert
          styles='left-[50%] !-translate-x-1/2'
          setShowAlert={setActivationFail}
          title='auth:account-activation-fail'
        />
      )}

      {showLogIn && (
        <LogIn
          setRegistrationModal={setRegistrationModal}
          setEmailForm={setEmailForm}
          setShowLogIn={setShowLogIn}
        />
      )}

      {emailForm && (
        <EmailForm setShowLogIn={setShowLogIn} setModal={setEmailForm} />
      )}

      <ChangePasswordForm setShowLogIn={setShowLogIn} />

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
      ...(await serverSideTranslations(locale!, ['landing', 'common', 'auth'])),
    },
  }
}

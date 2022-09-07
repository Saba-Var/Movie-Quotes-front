import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useProfile } from 'hooks'
import Head from 'next/head'
import {
  ProfileFormWrapper,
  GoogleUserProfile,
  UserProfile,
  ErrorAlert,
  Layout,
} from 'components'

const Profile = () => {
  const {
    setSecondaryEmailError,
    secondaryEmailError,
    setUserData,
    userData,
    session,
    t,
  } = useProfile()

  return (
    <div className='1xl:mt-4 1xl:h-full 1xl:pb'>
      <Head>
        <title>Profile</title>
        <meta
          content='initial-scale=1.0, width=device-width'
          name='viewport'
          key='Profile'
        />
      </Head>

      <p className='text-white pl-[15%] text-2xl font-Helvetica-Neue-Geo hidden 1xl:block'>
        {t('profile:my-profile')}
      </p>

      {secondaryEmailError && (
        <ErrorAlert
          styles='left-1/2 !-translate-x-1/2 1xl:left-[63%] xl:!left-[48%]'
          setShowAlert={setSecondaryEmailError}
          title='profile:email-activation-fail'
        />
      )}

      <ProfileFormWrapper>
        {session ? (
          <GoogleUserProfile userData={userData} />
        ) : (
          <UserProfile setUserData={setUserData} userData={userData} />
        )}
      </ProfileFormWrapper>
    </div>
  )
}

Profile.PageLayout = Layout

export default Profile

export const getServerSideProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'side-menu',
        'landing',
        'profile',
        'common',
        'auth',
      ])),
    },
  }
}

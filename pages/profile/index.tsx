import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useProfile } from 'hooks'
import {
  ProfileFormWrapper,
  GoogleUserProfile,
  UserProfile,
  Layout,
} from 'components'

const Profile = () => {
  const { t, session, userData, setUserData } = useProfile()

  return (
    <div className='mt-4 h-full pb-24'>
      <p className='text-white pl-[15%] text-2xl font-Helvetica-Neue-Geo'>
        {t('profile:my-profile')}
      </p>

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

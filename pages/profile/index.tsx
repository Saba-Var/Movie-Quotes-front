import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, ProfileFormWrapper, GoogleUserProfile } from 'components'
import type { GetStaticProps } from 'next'
import { useProfile } from 'hooks'

const Profile = () => {
  const { t, session, userData } = useProfile()

  return (
    <div className='mt-4'>
      <p className='text-white pl-[15%] text-2xl font-Helvetica-Neue-Geo'>
        {t('profile:my-profile')}
      </p>

      <ProfileFormWrapper>
        <>{session && <GoogleUserProfile userData={userData} />}</>
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

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { Layout } from 'components'

const Profile = () => {
  return <div className='w-full h-screen bg-gray-600 !block'>Profile</div>
}

Profile.PageLayout = Layout

export default Profile

export const getServerSideProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'side-menu',
        'landing',
        'common',
        'auth',
      ])),
    },
  }
}

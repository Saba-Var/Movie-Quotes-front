import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { Layout } from 'components'
import Link from 'next/link'

const Movies = () => {
  return (
    <div className='w-full h-screen bg-gray-600 !block'>
      <Link href={'/en/movies/123'}>
        <a>Movie 123</a>
      </Link>
    </div>
  )
}

Movies.PageLayout = Layout

export default Movies

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

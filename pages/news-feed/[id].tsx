import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Layout } from 'components'

const Quote = () => {
  const { query } = useRouter()
  const movieId = query.id

  return <div className='w-full h-screen bg-gray-600 !block'>{movieId}</div>
}

Quote.PageLayout = Layout

export default Quote

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

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { ErrorPage } from 'components'
import Head from 'next/head'

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta
          content='initial-scale=1.0, width=device-width'
          name='viewport'
          key='Not Found'
        />
      </Head>

      <ErrorPage statusCode={404} />
    </>
  )
}

export default NotFound

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['error'])),
    },
  }
}

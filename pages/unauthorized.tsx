import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { ErrorPage } from 'components'
import Head from 'next/head'

const Unauthorized = () => {
  return (
    <>
      <Head>
        <title>Unauthorized</title>
        <meta
          content='initial-scale=1.0, width=device-width'
          name='viewport'
          key='Unauthorized'
        />
      </Head>

      <ErrorPage statusCode={403} />
    </>
  )
}

export default Unauthorized

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['error'])),
    },
  }
}

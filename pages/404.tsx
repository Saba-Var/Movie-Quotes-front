import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { ErrorPage } from 'components'

const NotFound = () => {
  return <ErrorPage statusCode={404} />
}

export default NotFound

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['error'])),
    },
  }
}

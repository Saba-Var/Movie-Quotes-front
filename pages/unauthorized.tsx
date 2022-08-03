import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps } from 'next'
import { ErrorPage } from 'components'

const Unauthorized = () => {
  return <ErrorPage statusCode={403} />
}

export default Unauthorized

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['error'])),
    },
  }
}

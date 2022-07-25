import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'landing'])),
    },
  }
}

const Home = () => {
  let { t } = useTranslation()
  const router = useRouter()

  return (
    <div>
      <h1>{t('landing:start')}</h1>

      {router.locales?.map((locale) => {
        return (
          <Link key={locale} href={router.asPath} locale={locale}>
            <a>{locale}</a>
          </Link>
        )
      })}
    </div>
  )
}

export default Home

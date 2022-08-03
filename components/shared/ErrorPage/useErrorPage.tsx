import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Router from 'next/router'

export const useErrorPage = (statusCode: 404 | 403) => {
  const { t } = useTranslation()

  const locale = useRouter().locale

  const clickHandler = () => {
    Router.push(`/${locale}`)
  }

  let buttonTitle = t('error:return-home')

  let alert = t('error:Whoops')
  let alertMessage = t('error:page-not-found')

  if (statusCode === 403) {
    alert = t('error:not-pass')
    alertMessage = t('error:no-permission')
  }

  return { alert, alertMessage, buttonTitle, clickHandler }
}

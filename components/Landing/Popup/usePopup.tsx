import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SetState } from './types'

export const usePopup = (setShowPopupModal: SetState, type: string) => {
  const { t } = useTranslation()

  const locale = useRouter().locale

  const popupCloseHandler = () => {
    setShowPopupModal(false)
  }

  let info = 'check-email'
  let buttonTitle = 'open-email'
  let actionUri = 'https://mail.google.com/'

  if (type !== 'activate') {
    info = 'account-activated'
    buttonTitle = 'open-news-feed'
    actionUri = process.env.NEXT_PUBLIC_API_BASE_URI!
  }

  return {
    popupCloseHandler,
    buttonTitle,
    actionUri,
    locale,
    info,
    t,
  }
}

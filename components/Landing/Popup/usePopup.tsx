import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SetState } from 'types'

export const usePopup = (
  setShowPopupModal: SetState<boolean>,
  type: string,
  setModal: SetState<boolean> | undefined
) => {
  const { t } = useTranslation()

  const locale = useRouter().locale

  const popupCloseHandler = () => {
    setShowPopupModal(false)

    if (setModal) {
      setModal(false)
    }
  }

  let buttonTitle = 'open-email'
  let actionUri = 'https://mail.google.com/'

  if (type !== 'activate') {
    buttonTitle = 'open-news-feed'
    actionUri = `${locale}/news-feed`
  }

  return {
    popupCloseHandler,
    buttonTitle,
    actionUri,
    locale,
    t,
  }
}

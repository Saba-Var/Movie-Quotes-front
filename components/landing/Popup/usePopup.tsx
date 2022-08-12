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

  let actionUri = 'https://mail.google.com/'

  if (type !== 'activate') {
    actionUri = `${locale}/news-feed`
  }

  return {
    popupCloseHandler,
    actionUri,
    locale,
    t,
  }
}

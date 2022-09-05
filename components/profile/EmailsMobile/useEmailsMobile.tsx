import { useTranslation } from 'next-i18next'
import { changePrimaryEmail } from 'services'
import { SetState, UpdatedList } from 'types'
import { updateAlertList } from 'helpers'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useEmailsMobile = (setUpdatedList: SetState<UpdatedList>) => {
  const [changePrimaryModal, setChangePrimaryModal] = useState(false)
  const [saveChangesFail, setFailChangesFail] = useState(false)

  const [emailId, setEmailId] = useState<string | null>('')

  const { t } = useTranslation()
  const { socket } = useSockets()

  const primaryEmailChange = async (
    userPrimaryEmail: string,
    userId: string
  ) => {
    try {
      const response = await changePrimaryEmail(userPrimaryEmail, userId)

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        socket.emit(
          'CHANGE_PRIMARY_EMAIL',
          userPrimaryEmail,
          response.data.newSecondaryEmail
        )

        updateAlertList(setUpdatedList, 'primary-email-updated')
        setChangePrimaryModal(false)
      }
    } catch (error) {
      setFailChangesFail(true)
    }
  }

  return {
    setChangePrimaryModal,
    changePrimaryModal,
    primaryEmailChange,
    setEmailId,
    emailId,
    t,
  }
}

import { useTranslation } from 'next-i18next'
import { changePrimaryEmail } from 'services'
import { SetState, UpdatedList } from 'types'
import { updateAlertList } from 'helpers'
import { useSockets } from 'hooks'
import { useId, useState } from 'react'

export const useEmailsMobile = (
  setUpdatedList: SetState<UpdatedList>,
  userEmail: string,
  setUserPrimaryEmail: SetState<string>
) => {
  const [changePrimaryModal, setChangePrimaryModal] = useState(false)
  const [saveChangesFail, setFailChangesFail] = useState(false)

  const [emailId, setEmailId] = useState<string | null>('')

  const { socket } = useSockets()
  const { t } = useTranslation()

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
      setUserPrimaryEmail(userEmail)
      setFailChangesFail(true)
      setChangePrimaryModal(false)
    }
  }

  return {
    setChangePrimaryModal,
    changePrimaryModal,
    setFailChangesFail,
    primaryEmailChange,
    saveChangesFail,
    setEmailId,
    emailId,
    t,
  }
}

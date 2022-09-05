import { useTranslation } from 'next-i18next'
import { changePrimaryEmail, deleteEmail } from 'services'
import { SetState, UpdatedList } from 'types'
import { changeUserPrimaryEmail, updateAlertList } from 'helpers'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useEmailsMobile = (
  setUpdatedList: SetState<UpdatedList>,
  userEmail: string,
  setUserPrimaryEmail: SetState<string>,
  userPrimaryEmail: string,
  userId: string
) => {
  const [changePrimaryModal, setChangePrimaryModal] = useState(false)
  const [deleteEmailModal, setDeleteEmailModal] = useState(false)
  const [saveChangesFail, setFailChangesFail] = useState(false)

  const [emailId, setEmailId] = useState<string | null>('')

  const { socket } = useSockets()
  const { t } = useTranslation()

  const primaryEmailChangeHandler = async () => {
    changeUserPrimaryEmail(
      userPrimaryEmail,
      userId,
      socket,
      setUpdatedList,
      setFailChangesFail,
      setChangePrimaryModal,
      setUserPrimaryEmail,
      userEmail
    )
  }

  return {
    primaryEmailChangeHandler,
    setChangePrimaryModal,
    setDeleteEmailModal,
    changePrimaryModal,
    setFailChangesFail,
    deleteEmailModal,
    saveChangesFail,
    setEmailId,
    emailId,
    t,
  }
}

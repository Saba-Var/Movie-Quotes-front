import { SecondaryEmails, SetState, UpdatedList } from 'types'
import { changeUserPrimaryEmail } from 'helpers'
import { useTranslation } from 'next-i18next'
import { deleteEmail } from 'services'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useEmailsMobile = (
  setUpdatedList: SetState<UpdatedList>,
  userEmail: string,
  setUserPrimaryEmail: SetState<string>,
  userPrimaryEmail: string,
  userId: string,
  setUserSecondaryEmails: SetState<SecondaryEmails>,
  userSecondaryEmails: SecondaryEmails
) => {
  const [disableEmailModal, setDisableAddEmailModal] = useState(true)
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

  const deleteEmailHandler = async () => {
    try {
      const emailToDelete = userSecondaryEmails.find(
        (email) => email._id === emailId
      )

      if (emailToDelete) {
        const response = await deleteEmail(emailToDelete.email, userId)

        if (response.status === 200) {
          setUserSecondaryEmails(
            userSecondaryEmails.filter((el) => el._id !== emailId)
          )
          socket.emit('DELETE_EMAIL', emailToDelete.email)
          setDeleteEmailModal(false)
        }
      }
    } catch (error) {
      setFailChangesFail(true)
    }
  }

  return {
    primaryEmailChangeHandler,
    setDisableAddEmailModal,
    setChangePrimaryModal,
    setDeleteEmailModal,
    changePrimaryModal,
    setFailChangesFail,
    deleteEmailHandler,
    disableEmailModal,
    deleteEmailModal,
    saveChangesFail,
    setEmailId,
    emailId,
    t,
  }
}

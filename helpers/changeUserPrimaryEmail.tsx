import { updateAlertList } from 'helpers'
import { changePrimaryEmail } from 'services'
import { Socket } from 'socket.io-client'
import { SetState, UpdatedList } from 'types'

const changeUserPrimaryEmail = async (
  userPrimaryEmail: string,
  userId: string,
  socket: Socket,
  setUpdatedList: SetState<UpdatedList>,
  setFailChangesFail: SetState<boolean>,
  closeModal: SetState<boolean>,
  setUserPrimaryEmail?: SetState<string>,
  userEmail?: string
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
      closeModal(false)
    }
  } catch (error) {
    setUserPrimaryEmail && setUserPrimaryEmail(userEmail!)
    setFailChangesFail(true)
    closeModal && closeModal(false)
  }
}

export default changeUserPrimaryEmail

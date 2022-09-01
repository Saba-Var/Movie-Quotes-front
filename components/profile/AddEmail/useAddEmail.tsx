import { useTranslation } from 'next-i18next'
import { addSecondaryEmail } from 'services'
import { FormProperties, SetState } from 'types'
import { useSockets } from 'hooks'
import { useState } from 'react'

export const useAddEmail = (
  userId: string,
  setAddEmailModal: SetState<boolean>
) => {
  const [fetchError, setFetchError] = useState(false)

  const { socket } = useSockets()
  const { t } = useTranslation()

  const submitHandler = async (
    form: { email: string },
    { setFieldError }: FormProperties
  ) => {
    try {
      const response = await addSecondaryEmail(form.email, userId!)

      if (response.status === 201) {
        socket.emit('ADD_SECONDARY_EMAIL', response.data)
        setAddEmailModal(false)
      }
    } catch (error) {
      setFieldError('email', 'email-is-added')
      setFetchError(true)
    }
  }

  return { t, submitHandler, fetchError }
}

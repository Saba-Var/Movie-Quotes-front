import { useRegistrationModal } from './useRegistrationModal'
import { RegistrationModalProps } from './type.d'
import { AuthFormWrapper } from 'components'

const RegistrationModal: React.FC<RegistrationModalProps> = (props) => {
  const { setRegistrationModal } = props

  const { t } = useRegistrationModal()

  return (
    <AuthFormWrapper
      instruction={t('registration:instruction')}
      setCloseModal={setRegistrationModal}
      title={t('registration:create')}
    >
      <div></div>
    </AuthFormWrapper>
  )
}

export default RegistrationModal

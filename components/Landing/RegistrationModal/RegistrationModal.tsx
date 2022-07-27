import { AuthFormWrapper, RegistrationForm } from 'components'
import { useRegistrationModal } from './useRegistrationModal'
import { RegistrationModalProps } from './type.d'

const RegistrationModal: React.FC<RegistrationModalProps> = (props) => {
  const { setRegistrationModal } = props

  const { t } = useRegistrationModal()

  return (
    <AuthFormWrapper
      instruction={t('registration:instruction')}
      setCloseModal={setRegistrationModal}
      title={t('registration:create')}
      modalName='registration'
      onClick={() => {}}
    >
      <div>
        <RegistrationForm />
      </div>
    </AuthFormWrapper>
  )
}

export default RegistrationModal

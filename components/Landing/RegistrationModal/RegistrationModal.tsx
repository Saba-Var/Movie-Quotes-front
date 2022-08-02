import { AuthFormWrapper, RegistrationForm } from 'components'
import { useRegistrationModal } from './useRegistrationModal'
import { RegistrationModalProps } from './type.d'

const RegistrationModal: React.FC<RegistrationModalProps> = (props) => {
  const { setRegistrationModal, setShowPopupModal, setShowLogIn } = props

  const { t } = useRegistrationModal()

  return (
    <AuthFormWrapper
      instruction={t('auth:instruction')}
      setCloseModal={setRegistrationModal}
      title={t('auth:create')}
      modalName='registration'
      onClick={() => {
        setRegistrationModal(false)
        setShowLogIn(true)
      }}
    >
      <div>
        <RegistrationForm
          setRegistrationModal={setRegistrationModal}
          setShowPopupModal={setShowPopupModal}
        />
      </div>
    </AuthFormWrapper>
  )
}

export default RegistrationModal

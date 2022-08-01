import { FormModalWrapper } from 'components'
import { LogInProps } from './types.d'
import { useLogIn } from './useLogIn'

const LogIn: React.FC<LogInProps> = (props) => {
  const { setShowLogIn, setEmailForm } = props
  const { t } = useLogIn()

  return (
    <FormModalWrapper setCloseModal={setShowLogIn}>
      <>
        <div className='flex animate-focus-in-text-expand flex-col gap-3 justify-center items-center'>
          <p className='text-white font-Helvetica-Neue-Geo text-2xl font-medium '>
            {t('auth:log-into')}
          </p>
          <h2 className='text-white text-3xl mt-10 mb-12'>
            Form will be added soon!
          </h2>
          <div
            onClick={() => {
              setShowLogIn(false)
              setEmailForm(true)
            }}
            className='text-blue cursor-pointer hover:scale-110 transition-transform text-3xl underline font-Helvetica-Neue-Geo'
          >
            {t('auth:forgot-password')}
          </div>
        </div>
      </>
    </FormModalWrapper>
  )
}
export default LogIn

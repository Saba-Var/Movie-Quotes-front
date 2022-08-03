import { WizardIcon, GhostIcon, Button } from 'components'
import { useErrorPage } from './useErrorPage'
import { ErrorPageProps } from './types.d'

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const { statusCode } = props

  const { alert, alertMessage, buttonTitle, clickHandler } =
    useErrorPage(statusCode)

  return (
    <div className='bg-darkBlue h-screen w-screen overflow-hidden flex justify-center pt-[27vh]'>
      <div className='flex flex-col'>
        <div className='flex justify-center mb-7'>
          {statusCode === 404 && <GhostIcon />}
          {statusCode === 403 && <WizardIcon />}
        </div>

        <p className='text-white text-center text-2xl mb-4 font-Helvetica-Neue-Geo font-bold'>
          {alert}
        </p>
        <p className='text-white mb-8 text-center text-base font-Helvetica-Neue-Geo font-semibold'>
          {alertMessage}
        </p>

        <Button
          styles='bg-orange w-[150px] block mx-auto'
          onClick={clickHandler}
          title={buttonTitle}
          type='button'
        />
      </div>
    </div>
  )
}

export default ErrorPage

import { ErrorIcon, MiniCloseIcon } from 'components'
import { useErrorAlert } from './useErrorAlert'
import { ErrorAlertProps } from './types.d'

const ErrorAlert: React.FC<ErrorAlertProps> = (props) => {
  const { title, styles, setShowAlert } = props

  const { exit, clickHandler } = useErrorAlert(setShowAlert)

  return (
    <div
      className={`px-1 md:text-2xl z-[999999] animate-bounce-in-top  bg-red-100 border border-rose-600 text-red-700 md:px-4 py-1 md:py-3 rounded fixed 
       ${exit && 'animate-bounce-out-top'} ${styles}`}
    >
      <div className='flex items-center justify-between'>
        <div className='text-center flex items-center flex-wrap text-sm '>
          <span className='mr-1 md:inline-block hidden  '>
            <ErrorIcon />
          </span>
          <strong data-cy={title} className=' font-bold text-red mr-1'>
            {title}
          </strong>

          <span className='ml-1 inline-block' onClick={clickHandler}>
            <MiniCloseIcon />
          </span>
        </div>
      </div>
    </div>
  )
}

export default ErrorAlert
import { SuccessAlertProps } from './types'
import { CheckIcon, CloseIcon } from 'components/icons'

const SuccessAlert: React.FC<SuccessAlertProps> = (props) => {
  const { headerText, setSuccessAlert, instructions } = props

  return (
    <div className='p-4 z-[99999] animate-scale-up rounded fixed bg-lightGreen right-[1%] top-[15%] xl:right-[18%] xl:top-[12%]'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <CheckIcon styles='w-[24px] h-[24px]' />
          <p className='text-green text-base font-Helvetica-Neue-Geo'>
            {headerText}
          </p>
        </div>

        <div
          onClick={() => setSuccessAlert(false)}
          className='cursor-pointer hover:scale-110 active:scale-100 transition-transform'
        >
          <CloseIcon fill='#69746f' styles='w-[18px] h-[18px]' noStyle={true} />
        </div>
      </div>

      {instructions && (
        <p className='text-base px-8 mt-4 text-gray-800 pb-5'>{instructions}</p>
      )}
    </div>
  )
}

export default SuccessAlert

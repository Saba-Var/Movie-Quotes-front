import { CheckIcon, CloseIcon } from 'components'
import { SuccessAlertProps } from './types'

const SuccessAlert: React.FC<SuccessAlertProps> = (props) => {
  const { headerText, setSuccessAlert, instructions } = props

  return (
    <div className='p-4 mx-auto 1xl:mx-0 animate-scale-up w-[90%] sm:w-[60%] 1xl:w-[40%] xl:!w-[30%] 2xl:!w-[24%] rounded bg-lightGreen'>
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
          <CloseIcon styles='w-[18px] h-[18px]' fill='#69746f' noStyle={true} />
        </div>
      </div>

      {instructions && (
        <p className='text-base px-8 mt-4 text-gray-800 pb-5'>{instructions}</p>
      )}
    </div>
  )
}

export default SuccessAlert

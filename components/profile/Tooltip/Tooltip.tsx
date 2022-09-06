import { TooltipProps } from './types.d'
import { InfoIcon } from 'components'

const Tooltip: React.FC<TooltipProps> = (props) => {
  const { text, styles, textStyle } = props

  return (
    <div
      className={`absolute px-2 gap-2 -top-24 animate-scale-up -right-36 items-center flex w-[280px] h-[56px] text-gray-700 rounded-[4px] bg-white ${styles}`}
    >
      <div className='absolute animate-scale-up right-[102px] top-4 z-[-1] w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-t-[50px] border-t-white'></div>
      <div className='flex gap-2 items-center'>
        <InfoIcon color='gray' styles='!w-5 !h-5' />
        <p className={`text-base ${textStyle}`}>{text}</p>
      </div>
    </div>
  )
}

export default Tooltip

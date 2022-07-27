import { GoogleAuthButtonProps } from './types.d'
import { GoogleIcon } from 'components'

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = (props) => {
  const { title } = props

  return (
    <div className='mx-auto animate-fade-in cursor-pointer hover:scale-105 transition-transform flex justify-center items-center gap-2 w-[360px] border border-inputGray rounded-lg !h-[40px]'>
      <GoogleIcon />
      <p className='text-base text-white'>{title}</p>
    </div>
  )
}

export default GoogleAuthButton

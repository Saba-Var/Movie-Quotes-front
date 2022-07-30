import { GoogleAuthButtonProps } from './types.d'
import { signIn } from 'next-auth/react'
import { GoogleIcon } from 'components'
import { useRouter } from 'next/router'

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = (props) => {
  const locale = useRouter().locale
  const { title } = props

  const clickHandler = async () => {
    signIn('google', {
      callbackUrl: `${window.location.origin}/${locale}/news-feed`,
    })
  }

  return (
    <div
      onClick={clickHandler}
      className='mx-auto animate-fade-in cursor-pointer hover:scale-105 transition-transform flex justify-center items-center gap-2 w-[360px] border border-inputGray rounded-lg !h-[40px]'
    >
      <GoogleIcon />
      <p className='text-base text-white'>{title}</p>
    </div>
  )
}

export default GoogleAuthButton

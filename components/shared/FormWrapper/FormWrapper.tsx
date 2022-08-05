import { FormWrapperProps } from './types.d'
import { CloseIcon } from 'components'
import { useNewsFeed } from 'hooks'
import Image from 'next/image'

const FormWrapper: React.FC<FormWrapperProps> = (props) => {
  const { children, setShowForm, title } = props

  const { userData, imageSrc } = useNewsFeed()

  return (
    <div className='hidden 1xl:block'>
      <div
        onClick={() => setShowForm(false)}
        className='fixed w-full h-screen bg-background opacity-70 top-[86px] z-[9]'
      ></div>

      <div className='fixed z-[999] animate-fade-in !rounded-[12px] bg-formModalBlue pb-12 w-[850px] lg:w-[961px] right-[2%] lg:right-[5%] h-fit 2xl:left-0 2xl:translate-x-1/2'>
        <div className='h-[93px] relative border-b border-b-gray-600 w-full flex justify-center items-center'>
          <p className='text-center animate-focus-in-text-expand text-2xl text-white font-Helvetica-Neue-Geo font-medium'>
            {title}
          </p>

          <div onClick={() => setShowForm(false)}>
            <CloseIcon />
          </div>
        </div>

        <div className='px-8 pt-8'>
          <div className='h-[60px] flex gap-4 items-center mb-7 animate-fade-in'>
            {!userData.image && (
              <p
                className={`text-white animate-fold-out cursor-default h-[60px] w-[60px] bg-green rounded-full flex justify-center items-center text-3xl pb-1 `}
              >
                {userData.name && String(userData.name[0]).toUpperCase()}
              </p>
            )}
            {userData.image && (
              <div className={`h-[60px] w-[60px]`}>
                <Image
                  className='rounded-full animate-fold-out'
                  loader={() => imageSrc}
                  unoptimized={true}
                  height={'60px'}
                  width={'60px'}
                  src={imageSrc}
                  alt='user'
                />
              </div>
            )}
            <p className='text-white font-Helvetica-Neue-Geo text-xl'>
              {userData.name}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

export default FormWrapper

import { FormWrapperProps } from './types.d'
import { CloseIcon } from 'components'
import { useNewsFeed } from 'hooks'
import Image from 'next/image'

const FormWrapper: React.FC<FormWrapperProps> = (props) => {
  const { children, setShowForm, title } = props

  const { userData, imageSrc } = useNewsFeed()

  return (
    <div>
      <div
        onClick={() => setShowForm(false)}
        className='fixed w-full h-screen bg-background opacity-70 top-[86px] z-[9]'
      ></div>

      <div className='fixed right-0 top-0 w-screen z-[999] animate-fade-in !rounded-[12px] bg-formModalBlue 1xl:top-24 1xl:left-[35%] pb-6 1xl:w-[550px] lg:!w-[700px] xl:!w-[961px] lg:right-[5%] h-fit 2xl:!left-[-3%] 2xl:translate-x-1/2 xl:!left-[27%]'>
        <div className='h-[70px] relative border-b border-b-gray-600 w-full flex justify-center items-center'>
          <p className='text-center animate-focus-in-text-expand text-2xl text-white font-Helvetica-Neue-Geo font-medium'>
            {title}
          </p>

          <div onClick={() => setShowForm(false)}>
            <CloseIcon />
          </div>
        </div>

        <div className='px-8 pt-4'>
          <div className='h-[50px] flex gap-4 items-center mb-4 animate-fade-in'>
            {!userData.image && (
              <p
                className={`text-white animate-fold-out cursor-default h-[50px] w-[50px] bg-green rounded-full flex justify-center items-center text-3xl pb-1 `}
              >
                {userData.name && String(userData.name[0]).toUpperCase()}
              </p>
            )}
            {userData.image && (
              <div className={`h-[50px] w-[50px]`}>
                <Image
                  className='rounded-full animate-fold-out'
                  loader={() => imageSrc}
                  unoptimized={true}
                  height={'50px'}
                  width={'50px'}
                  src={imageSrc}
                  alt='user'
                />
              </div>
            )}
            <p className='text-white animate-focus-in-text-expand font-Helvetica-Neue-Geo text-xl'>
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

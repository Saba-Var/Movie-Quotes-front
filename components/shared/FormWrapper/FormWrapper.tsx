import { FormWrapperProps } from './types.d'
import { CloseIcon } from 'components'
import { useNewsFeed } from 'hooks'
import Image from 'next/image'

const FormWrapper: React.FC<FormWrapperProps> = (props) => {
  const {
    disableOverflow,
    closeHandler,
    setShowForm,
    titleStyle,
    hideImage,
    children,
    styles,
    title,
  } = props

  const { userData, imageSrc } = useNewsFeed()

  return (
    <div>
      <div
        onClick={() => {
          closeHandler && closeHandler()
          setShowForm(false)
        }}
        className={`fixed w-full h-screen bg-background opacity-60 left-0  top-0 z-[99999]`}
      ></div>

      <div
        className={`fixed ${
          !disableOverflow && 'overflow-y-auto'
        } right-0 top-0 w-screen z-[99999] animate-fade-in !rounded-[12px] bg-formModalBlue h-screen 1xl:!h-fit pb-2 1xl:w-[50vw] 1xl:left-[28%] 2xl:top-4 ${styles}`}
      >
        <div className='h-[55px] 2xl:h-16 relative border-b border-b-gray-600 w-full flex justify-center items-center'>
          <p
            className={`text-center animate-focus-in-text-expand text-2xl text-white font-Helvetica-Neue-Geo font-medium ${titleStyle}`}
          >
            {title}
          </p>

          <div
            onClick={() => {
              closeHandler && closeHandler()
              setShowForm(false)
            }}
          >
            <CloseIcon />
          </div>
        </div>

        <div className='px-8 pt-5'>
          {!hideImage && (
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
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export default FormWrapper

import { FormWrapperProps } from './types'

const AuthFormWrapper: React.FC<FormWrapperProps> = (props) => {
  const { setCloseModal, instruction, children, title } = props

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen w-screen z-[9999] bg-darkGray`}
        onClick={() => {
          setCloseModal(false)
        }}
      ></div>
      <div
        className={`fixed h-[732px]  w-full md:w-[601px] md:h-[704px] z-[99999] left-1/2 -translate-x-1/2 md:top-[2%] lg:top-[5%] xl:top-[10%]`}
      >
        <div
          className={`h-screen animate-scale-up md:h-[732px] rounded-xl bg-darkBlue pt-[73px] px-8 md:px-[121px]`}
        >
          <div className='flex animate-focus-in-text-expand flex-col gap-3 justify-center items-center'>
            <p className='text-white font-Helvetica-Neue text-2xl font-medium '>
              {title}
            </p>
            <p className='font-normal text-medGray text-base'>{instruction}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthFormWrapper

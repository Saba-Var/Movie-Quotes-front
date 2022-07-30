import { useAuthFormWrapper } from './useAuthFormWrapper'
import { FormWrapperProps } from './types'

const AuthFormWrapper: React.FC<FormWrapperProps> = (props) => {
  const { setCloseModal, instruction, modalName, children, onClick, title } =
    props

  const { linkName, question } = useAuthFormWrapper(modalName)

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen w-screen z-[9999] bg-darkGray`}
        onClick={() => {
          setCloseModal(false)
        }}
      ></div>
      <div
        className={`fixed h-[732px] w-full md:w-[601px] md:h-[704px] z-[99999] left-1/2 -translate-x-1/2 2.5xl:top-[10%]`}
      >
        <div
          className={`h-screen animate-scale-up md:h-[750px] rounded-xl bg-darkBlue pt-7 sm:pt-14 px-8 md:px-[121px]`}
        >
          <div className='flex animate-focus-in-text-expand flex-col gap-3 justify-center items-center'>
            <p className='text-white font-Helvetica-Neue text-2xl font-medium '>
              {title}
            </p>
            <p className='font-normal text-medGray text-base'>{instruction}</p>
          </div>
          {children}
          <div className='flex justify-center gap-1 mt-5 animate-fade-in'>
            <p className='text-medGray cursor-default font-medium text-base font-Helvetica-Neue-Geo'>
              {question}
            </p>
            <div
              className='text-blue cursor-pointer hover:scale-110 transition-transform text-base font-medium font-Helvetica-Neue-Geo'
              onClick={onClick}
            >
              {linkName}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthFormWrapper

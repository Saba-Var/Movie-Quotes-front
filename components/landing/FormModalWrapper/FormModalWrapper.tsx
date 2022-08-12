import { FormModalWrapperProps } from './types'

const FormModalWrapper: React.FC<FormModalWrapperProps> = (props) => {
  const { children, setCloseModal, styles, top } = props

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen w-screen z-[9999] bg-darkGray`}
        onClick={() => {
          setCloseModal(false)
        }}
      ></div>
      <div
        className={`fixed h-[732px] w-full md:w-[601px] md:h-[704px] z-[99999] left-1/2 -translate-x-1/2 2.5xl:top-[10%] ${top}`}
      >
        <div
          className={`h-screen animate-scale-up md:h-[750px] ${styles} rounded-xl bg-darkBlue pt-7 sm:pt-14 px-8 md:px-[121px]`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
export default FormModalWrapper

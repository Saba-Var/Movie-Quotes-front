import { useAuthFormWrapper } from './useAuthFormWrapper'
import { FormModalWrapper } from 'components'
import { FormWrapperProps } from './types'

const AuthFormWrapper: React.FC<FormWrapperProps> = (props) => {
  const { setCloseModal, instruction, modalName, children, onClick, title } =
    props

  const { linkName, question } = useAuthFormWrapper(modalName)

  return (
    <FormModalWrapper setCloseModal={setCloseModal}>
      <>
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
      </>
    </FormModalWrapper>
  )
}

export default AuthFormWrapper

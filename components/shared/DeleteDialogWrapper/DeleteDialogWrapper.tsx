import { DeleteDialogWrapperProps } from './types'
import { FormWrapper } from 'components'

const DeleteDialogWrapper: React.FC<DeleteDialogWrapperProps> = (props) => {
  const { setDeleteDialogWrapper, question, title, children } = props

  return (
    <FormWrapper
      setShowForm={setDeleteDialogWrapper}
      top='1xl:!top-[86px]'
      hideImage={true}
      title={title}
    >
      <div className='flex flex-col py-9'>
        <div className='text-xl 1xl:text-2xl xl:!text-3xl text-center'>
          {question}?
        </div>
        {children}
      </div>
    </FormWrapper>
  )
}

export default DeleteDialogWrapper

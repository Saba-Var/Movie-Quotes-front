import { AddButtonProps } from './types.d'
import { AddIcon } from 'components'

const AddButton: React.FC<AddButtonProps> = (props) => {
  const { title } = props

  return (
    <button className='bg-orange animate-fade-in cursor-pointer hover:scale-105 active:scale-100 transition-transform w-[154px] px-4 h-12 rounded flex gap-2 justify-center items-center'>
      <AddIcon />
      <p className='text-white animate-fade-in'>{title}</p>
    </button>
  )
}

export default AddButton

import { PencilIcon, TrashIcon } from 'components'
import { EditOrDeleteProps } from './types.d'

const EditOrDelete: React.FC<EditOrDeleteProps> = (props) => {
  const { setDeleteModal, setEditModal } = props

  return (
    <div className='flex justify-between w-[144px] rounded-[10px] h-10 py-[10px] px-7 bg-darkPurple'>
      <div onClick={() => setEditModal(true)}>
        <PencilIcon />
      </div>

      <div className='!w-[1px] bg-medGray h-4'></div>

      <div onClick={() => setDeleteModal(true)}>
        <TrashIcon />
      </div>
    </div>
  )
}

export default EditOrDelete

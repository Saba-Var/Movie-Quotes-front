import { AddButtonProps } from './types.d'
import { useAddButton } from './useAddButton'
import { AddIcon } from 'components'

const AddButton: React.FC<AddButtonProps> = (props) => {
  const { title } = props
  const { locale } = useAddButton()

  return (
    <button
      className={`bg-orange animate-fade-in cursor-pointer hover:scale-105 active:scale-100 transition-transform w-[154px]  px-4 h-12 rounded flex gap-2 justify-center items-center ${
        locale === 'ge' && 'w-52 px-0'
      }`}
    >
      <AddIcon />
      <p
        className={`text-white text-xl animate-fade-in ${
          locale === 'ge' && 'text-base'
        }`}
      >
        {title}
      </p>
    </button>
  )
}

export default AddButton
